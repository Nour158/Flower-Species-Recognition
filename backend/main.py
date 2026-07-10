from io import BytesIO
from pathlib import Path

import torch
import torch.nn as nn
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image, UnidentifiedImageError
from torchvision import transforms
from torchvision.models import densenet121

BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "models" / "best_densenet121_flowers.pth"
MAX_FILE_SIZE = 10 * 1024 * 1024
ALLOWED_TYPES = {"image/jpeg", "image/png", "image/webp", "image/bmp"}

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

app = FastAPI(
    title="Flower Species Recognition API",
    description="DenseNet121 API for classifying five flower species.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = None
classes = None

transform = transforms.Compose(
    [
        transforms.Resize(256),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize(
            mean=[0.485, 0.456, 0.406],
            std=[0.229, 0.224, 0.225],
        ),
    ]
)


def load_model():
    global model, classes

    if not MODEL_PATH.exists():
        raise RuntimeError(
            f"Model checkpoint not found at {MODEL_PATH}. "
            "Copy best_densenet121_flowers.pth into backend/models/."
        )

    checkpoint = torch.load(MODEL_PATH, map_location=device)
    classes = checkpoint.get(
        "classes", ["daisy", "dandelion", "rose", "sunflower", "tulip"]
    )

    loaded_model = densenet121(weights=None)
    in_features = loaded_model.classifier.in_features
    loaded_model.classifier = nn.Linear(in_features, len(classes))
    loaded_model.load_state_dict(checkpoint["model_state_dict"])
    loaded_model.to(device)
    loaded_model.eval()

    model = loaded_model


@app.on_event("startup")
def startup_event():
    load_model()


@app.get("/api/health")
def health():
    return {
        "status": "ok",
        "device": str(device),
        "model_loaded": model is not None,
        "classes": classes,
    }


@app.post("/api/predict")
async def predict(file: UploadFile = File(...)):
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=415,
            detail="Unsupported image type. Use JPG, PNG, WEBP, or BMP.",
        )

    content = await file.read()

    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=413,
            detail="Image is too large. Maximum size is 10 MB.",
        )

    try:
        image = Image.open(BytesIO(content)).convert("RGB")
    except (UnidentifiedImageError, OSError):
        raise HTTPException(status_code=400, detail="The uploaded file is not a valid image.")

    tensor = transform(image).unsqueeze(0).to(device)

    with torch.inference_mode():
        logits = model(tensor)
        probabilities = torch.softmax(logits, dim=1)[0]

    best_index = int(torch.argmax(probabilities).item())
    probability_map = {
        classes[index]: round(float(probabilities[index].item()), 6)
        for index in range(len(classes))
    }

    return {
        "predicted_class": classes[best_index],
        "confidence": probability_map[classes[best_index]],
        "probabilities": probability_map,
    }
