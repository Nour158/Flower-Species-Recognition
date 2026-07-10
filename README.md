# 🌸 Flower Species Recognition using DenseNet121

A deep learning project that classifies flower images into five different species using a **pre-trained DenseNet121** model with transfer learning in PyTorch.

## 📌 Overview

This project demonstrates how transfer learning can be applied to image classification. A DenseNet121 model pre-trained on ImageNet is fine-tuned to recognize five flower species with high accuracy.

The project includes:

* Data preprocessing and augmentation
* Exploratory Data Analysis (EDA)
* Transfer Learning using DenseNet121
* Model training and validation
* Performance evaluation
* Confusion matrix and classification report
* Architecture visualization
* Interactive web interface using Gradio

---

## 🌼 Flower Classes

The model classifies images into the following categories:

* 🌸 Daisy
* 🌼 Dandelion
* 🌹 Rose
* 🌻 Sunflower
* 🌷 Tulip

---

## 🛠 Technologies Used

* Python
* PyTorch
* TorchVision
* NumPy
* Pandas
* Matplotlib
* Seaborn
* Scikit-learn
* Pillow
* Gradio
* React

---

## 📂 Project Structure

```text
Flower-Species-Recognition/
│
├── app.py                         # Gradio application
├── Flower_Recognition.ipynb       # Training notebook
├── README.md
├── requirements.txt
├── .gitignore
│
├── frontend/                      # React.js web interface
│   ├── src/                       # React source code
│   ├── public/                    # Static assets
│   ├── package.json               # Node.js dependencies
│   ├── vite.config.js             # Vite configuration
│   └── index.html                 # Entry HTML file
│
├── backend/                       # FastAPI backend for React UI
│   ├── main.py                    # API server
│   ├── requirements.txt           # Python dependencies
│   └── models/
│       └── best_densenet121_flowers.pth
│
├── outputs/
│   └── train/
│       └── best_densenet121_flowers.pth
│
├── architecture/                  # Model architecture diagrams
│
├── figures/                       # Figures and visualizations
│
└── dataset/                       # Flower dataset
```

---

## 🚀 Model

* **Architecture:** DenseNet121
* **Pre-trained Weights:** ImageNet
* **Framework:** PyTorch
* **Input Size:** 224 × 224 × 3
* **Output Classes:** 5

The original DenseNet121 classifier was replaced with a fully connected layer containing **5 output neurons**, corresponding to the flower classes.

---

## 📊 Training Pipeline

1. Load the flower dataset.
2. Apply preprocessing and data augmentation.
3. Initialize DenseNet121 with ImageNet weights.
4. Replace the classifier layer.
5. Train using transfer learning.
6. Validate after each epoch.
7. Save the best-performing model.
8. Evaluate using accuracy, confusion matrix, and classification report.

---

## 📈 Evaluation

The trained model is evaluated using:

* Classification Accuracy
* Precision
* Recall
* F1-Score
* Confusion Matrix
* Classification Report

---

## 🖥 Interactive Applications

This project provides **two user interfaces** for flower classification:

### 🌸 Option 1 – Gradio Interface

The project includes a simple Gradio web application for real-time flower classification.

Run the application:

```bash
python app.py
```

Then open the local Gradio URL displayed in the terminal and upload a flower image to receive predictions.

---

### ⚛️ Option 2 – React Web Interface

A modern React.js frontend is also included, powered by a FastAPI backend that serves the trained DenseNet121 model.

#### Step 1 – Start the Backend

Navigate to the backend directory:

```bash
cd backend
```

Create and activate a virtual environment.

**Windows**

```bash
python -m venv .venv
.venv\Scripts\activate
```

**Linux / macOS**

```bash
python3 -m venv .venv
source .venv/bin/activate
```

Install the required packages:

```bash
pip install -r requirements.txt
```

Run the FastAPI server:

```bash
uvicorn main:app --reload --port 8000
```

The backend API will be available at:

```text
http://localhost:8000
```

API documentation:

```text
http://localhost:8000/docs
```

---

#### Step 2 – Start the React Frontend

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install the required packages:

```bash
npm install
```

Start the React application:

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:5173
```

The React application communicates with the FastAPI backend to perform real-time flower classification.

---

## ▶ Running the Notebook

Open:

```text
Flower_Recognition.ipynb
```

Run all cells to:

- Prepare the dataset
- Train the DenseNet121 model
- Evaluate model performance
- Save the trained model
- Generate visualizations and performance metrics

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/Nour158/Flower-Species-Recognition.git
```

Move into the project directory:

```bash
cd Flower-Species-Recognition
```

Install the required packages:

```bash
pip install -r requirements.txt
```

---

## 📸 Sample Workflow

1. Upload a flower image.
2. The image is resized to **224×224**.
3. The image is normalized using ImageNet statistics.
4. DenseNet121 predicts the flower species.
5. The predicted class and confidence scores are displayed.

---

## 📚 Dataset

Flower Recognition Dataset containing five classes:

* Daisy
* Dandelion
* Rose
* Sunflower
* Tulip

---

## 👥 Contributors
* **Nourallah Ghonim**
* **Mariam Eladawy**
* **Jaslim Mohamed**
* **Doha Ismail**
