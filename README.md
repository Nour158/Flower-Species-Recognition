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
├── outputs/
│   └── train/
│       └── best_densenet121_flowers.pth
│
├── architecture/
│
├── figures/
│
└── dataset/
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

## 🖥 Interactive Application

The project includes a Gradio web application for real-time flower classification.

Run the application:

```bash
python app.py
```

Then open the local Gradio link in your browser and upload a flower image to receive predictions.

---

## ▶ Running the Notebook

Open:

```text
Flower_Recognition.ipynb
```

Run all cells to:

* Prepare the dataset
* Train the model
* Evaluate performance
* Save the trained model
* Generate visualizations

---

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
* **Doha Ismail **
