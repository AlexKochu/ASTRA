```
 ▄▄▄·  .▄▄ · ▄▄▄▄▄▄▄▄   ▄▄▄·
▐█ ▀█ ▐█ ▀. •██  ▀▄ █·▐█ ▀█
▄█▀▀█ ▄▀▀▀█▄ ▐█.▪▐▀▀▄ ▄█▀▀█
▐█ ▪▐▌▐█▄▪▐█ ▐█▌·▐█•█▌▐█ ▪▐▌
 ▀  ▀  ▀▀▀▀  ▀▀▀ .▀  ▀ ▀  ▀
```

# ASTRA — Intelligent Planetary Defense Platform

> **Autonomous Space Threat Recognition & Analysis**
> Core v2.0 — Quad-Core ML Array | Real-Time Hazard Synthesis | Celestial Telemetry Engine

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [System Architecture](#system-architecture)
- [ML Model Pipeline](#ml-model-pipeline)
- [Repository Structure](#repository-structure)
- [Dataset & Feature Engineering](#dataset--feature-engineering)
- [Installation & Operation](#installation--operation)
- [API Reference](#api-reference)
- [Tech Stack](#tech-stack)
- [Performance Benchmarks](#performance-benchmarks)

---

## Overview

ASTRA is an advanced AI-powered planetary defense platform engineered to evaluate and predict the hazard potential of **Near-Earth Objects (NEOs)**. By ingesting raw celestial telemetry data, ASTRA's Quad-Core ML Array delivers rapid, high-confidence hazard classifications — categorizing asteroids as **hazardous** or **non-hazardous** with measurable precision.

The platform is built on a modern SaaS frontend, a high-throughput Flask REST API backend, and a suite of four independently trained and serialized machine learning models, each employing a distinct classification paradigm.

---

## Key Features

### ◈ Quad-Core ML Array

Dynamically hot-swap between four pre-trained classification models at runtime:

| Model | Paradigm | Accuracy |
|---|---|---|
| K-Nearest Neighbors (KNN) | Proximity Map | ~77% ✦ Top Performer |
| Support Vector Machine (SVM) | Vector Space Separation | — |
| Random Forest | Decision Tree Ensembles | — |
| Logistic Regression | Sigmoid Bound Probability | — |

### ◈ Interactive Diagnostics Console

Submit custom celestial telemetry parameters — Absolute Magnitude, Relative Velocity, Estimated Diameter, and Miss Distance — and receive a real-time hazard synthesis with impact probability scoring.

### ◈ Premium SaaS Frontend

A responsive, production-grade dashboard built with custom CSS, GSAP scroll-triggered animations, Lenis momentum scrolling, and Vanilla Tilt.js 3D glassmorphism micro-interactions.

### ◈ Real-Time Telemetry Backend

A Flask REST API providing sub-second hazard predictions, model-switching, and persistent model state via Joblib serialization.

---

## System Architecture

```
 ┌──────────────────────────────────────────────────────────────────┐
 │                      CLIENT BROWSER                              │
 │                                                                  │
 │   ┌────────────────────────────────────────────────────────┐     │
 │   │              ASTRA Dashboard  (index.html)             │     │
 │   │                                                        │     │
 │   │   ┌──────────────┐      ┌──────────────────────────┐  │     │
 │   │   │  Telemetry   │      │   Diagnostics Console    │  │     │
 │   │   │  Input Form  │      │   (Live Hazard Output)   │  │     │
 │   │   └──────┬───────┘      └──────────────────────────┘  │     │
 │   │          │  script.js (Fetch API / Event Handlers)     │     │
 │   └──────────┼─────────────────────────────────────────────┘     │
 └──────────────┼──────────────────────────────────────────────────-┘
                │  HTTP POST  /predict
                │  { magnitude, velocity, diameter, miss_distance }
                ▼
 ┌──────────────────────────────────────────────────────────────────┐
 │                    FLASK REST API  (app.py)                       │
 │                                                                  │
 │   ┌─────────────────────────────────────────────────────────┐    │
 │   │                  Request Router                         │    │
 │   │    /predict    /switch-model    /status    /health      │    │
 │   └──────────────────────┬──────────────────────────────────┘    │
 │                          │                                        │
 │            ┌─────────────▼──────────────┐                        │
 │            │     Feature Preprocessor   │                        │
 │            │   (Scaling / Validation)   │                        │
 │            └─────────────┬──────────────┘                        │
 │                          │                                        │
 │      ┌───────────────────▼───────────────────┐                   │
 │      │         Quad-Core ML Array             │                   │
 │      │                                        │                   │
 │      │  ┌─────────┐  ┌─────┐  ┌──────────┐  │                   │
 │      │  │  KNN    │  │ SVM │  │  Random  │  │                   │
 │      │  │ .pkl    │  │.pkl │  │  Forest  │  │                   │
 │      │  └─────────┘  └─────┘  │   .pkl   │  │                   │
 │      │                        └──────────┘  │                   │
 │      │              ┌─────────────────┐      │                   │
 │      │              │  Logistic Reg.  │      │                   │
 │      │              │     .pkl        │      │                   │
 │      │              └─────────────────┘      │                   │
 │      └───────────────────┬───────────────────┘                   │
 │                          │                                        │
 │            ┌─────────────▼──────────────┐                        │
 │            │    Hazard Classification   │                        │
 │            │  + Impact Probability (%)  │                        │
 │            └─────────────┬──────────────┘                        │
 └──────────────────────────┼──────────────────────────────────────-┘
                            │  JSON Response
                            │  { hazardous: bool, probability: float }
                            ▼
                    ASTRA Dashboard
```

---

## ML Model Pipeline

```
   ┌──────────────────────────────────────────────────────────┐
   │              code.ipynb  (Training Notebook)             │
   └─────────────────────────┬────────────────────────────────┘
                             │
              ┌──────────────▼──────────────┐
              │       Raw NASA Dataset       │
              │  (Near-Earth Object Records) │
              └──────────────┬──────────────┘
                             │
              ┌──────────────▼──────────────┐
              │      Data Preprocessing      │
              │  · Null handling             │
              │  · Feature selection         │
              │  · Label encoding            │
              └──────────────┬──────────────┘
                             │
              ┌──────────────▼──────────────┐
              │      Feature Scaling         │
              │  · StandardScaler / MinMax   │
              │  · Train / Test Split        │
              └──────────────┬──────────────┘
                             │
         ┌───────────────────┼───────────────────┐
         │                   │                   │
    ┌────▼─────┐       ┌─────▼────┐       ┌─────▼────────┐
    │   KNN    │       │   SVM    │       │    Random    │
    │ Training │       │ Training │       │    Forest    │
    └────┬─────┘       └─────┬────┘       └─────┬────────┘
         │                   │                   │
         │        ┌──────────┴────────┐          │
         │        │ Logistic Reg.     │          │
         │        │ Training          │          │
         │        └──────────┬────────┘          │
         │                   │                   │
         └───────────────────┼───────────────────┘
                             │
              ┌──────────────▼──────────────┐
              │    Hyperparameter Tuning     │
              │    Cross-Validation          │
              │    Accuracy Benchmarking     │
              └──────────────┬──────────────┘
                             │
         ┌───────────────────┼───────────────────┐
         │                   │                   │
   ┌─────▼──────┐   ┌────────▼──────┐   ┌────────▼──────┐
   │ KNN_model  │   │  SVM_model    │   │ Random_Forest │
   │   .pkl     │   │    .pkl       │   │    .pkl       │
   └────────────┘   └───────────────┘   └───────────────┘
                           ┌─────────────────────┐
                           │    Log_reg.pkl       │
                           └─────────────────────┘
```

---

## Repository Structure

```
NeOs/
│
├── app.py                          # Flask application — API endpoints & model loader
├── code.ipynb                      # EDA, preprocessing, training & evaluation notebook
│
├── KNN_model.pkl                   # Serialized K-Nearest Neighbors classifier
├── SVM_model.pkl                   # Serialized Support Vector Machine classifier
├── Random_Forest.pkl               # Serialized Random Forest classifier
├── Log_reg.pkl                     # Serialized Logistic Regression classifier
│
├── templates/
│   └── index.html                  # ASTRA frontend dashboard (Jinja2 entry point)
│
└── static/
    ├── css/
    │   └── style.css               # SaaS theme, glassmorphism, animations
    └── js/
        └── script.js               # Fetch API calls, model switching, UI handlers
```

---

## Dataset & Feature Engineering

The classification models were trained on Near-Earth Object telemetry originally sourced from NASA's orbital data repositories.

### Input Features

| Feature | Unit | Description |
|---|---|---|
| `absolute_magnitude` | H | Intrinsic luminosity of the physical object |
| `est_diameter_min` | km | Estimated minimum physical diameter |
| `est_diameter_max` | km | Estimated maximum physical diameter |
| `relative_velocity` | km/s | Velocity of the NEO relative to Earth at closest approach |
| `miss_distance` | km | Predicted closest approach margin from Earth's center |

### Target Variable

```
  hazardous  →  { 0: Non-Hazardous,  1: Potentially Hazardous }
```

> Detailed preprocessing steps, exploratory data analysis charts, feature correlation heatmaps, and model comparison results are documented in `code.ipynb`.

---

## Installation & Operation

### Prerequisites

- Python 3.9+ (tested up to 3.14)
- pip package manager
- A virtual environment tool (recommended)

---

### Step 1 — Navigate to the project directory

```bash
cd /path/to/NeOs
```

### Step 2 — Create and activate a virtual environment

```bash
# Create environment
python3 -m venv venv

# Activate — macOS / Linux
source venv/bin/activate

# Activate — Windows
venv\Scripts\activate
```

### Step 3 — Install dependencies

```bash
pip install flask flask-cors numpy scikit-learn joblib pandas
```

### Step 4 — Start the server

```bash
python app.py
```

### Step 5 — Access the platform

```
http://localhost:8000
```

> The port may vary. Check the Flask startup logs for the active address.

---

## API Reference

### `POST /predict`

Submit telemetry parameters and receive a hazard classification.

**Request Body**

```json
{
  "model": "KNN",
  "absolute_magnitude": 22.1,
  "est_diameter_min": 0.04,
  "est_diameter_max": 0.09,
  "relative_velocity": 18.5,
  "miss_distance": 45000000
}
```

**Response**

```json
{
  "model_used": "KNN",
  "hazardous": true,
  "probability": 0.83,
  "classification": "POTENTIALLY HAZARDOUS"
}
```

---

### `GET /status`

Returns the currently active model and system health.

```json
{
  "active_model": "KNN",
  "status": "operational",
  "models_loaded": ["KNN", "SVM", "Random_Forest", "Log_reg"]
}
```

---

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| HTML5 + CSS3 | Structure and SaaS-grade styling |
| Vanilla JavaScript | API integration and event handling |
| GSAP + ScrollTrigger | Scroll-based animation framework |
| Lenis | Smooth momentum scrolling |
| Vanilla Tilt.js | 3D glassmorphism micro-interactions |

### Backend & Machine Learning

| Technology | Purpose |
|---|---|
| Python 3.9+ | Core runtime |
| Flask | REST API framework |
| Flask-CORS | Cross-origin request handling |
| Scikit-Learn | Model training and evaluation |
| NumPy + pandas | Numerical and tabular data processing |
| Joblib | Model serialization and fast loading |
| Jupyter Notebook | EDA, training, and benchmarking environment |

---

## Performance Benchmarks

```
  Model                  Accuracy    Paradigm
  ─────────────────────────────────────────────────────────
  K-Nearest Neighbors    ~77.0%  ◀   Top Performing
  Support Vector Machine  —
  Random Forest           —
  Logistic Regression     —
  ─────────────────────────────────────────────────────────
  * Full benchmark table available in code.ipynb
```

---

## License

This project is licensed under the terms specified in the repository. See `LICENSE` for details.

---

> ASTRA Core v2.0 — Built for planetary-scale threat intelligence.