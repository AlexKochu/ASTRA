```
_    ____ _____ ____     _    
   / \  / ___|_   _|  _ \   / \   
  / _ \ \___ \ | | | |_) | / _ \  
 / ___ \ ___) || | |  _ < / ___ \ 
/_/   \_\____/ |_| |_| \_/_/   \_\
```

ASTRA — Intelligent Planetary Defense Platform

Autonomous Space Threat Recognition & Analysis
Core v2.0 — Quad-Core ML Array | Real-Time Hazard Synthesis | Celestial Telemetry Engine

[ 🌐 Live Platform → https://carynth.vercel.app/ ]

Table of Contents

Live Demo
Overview
Key Features
System Architecture
ML Model Pipeline
Repository Structure
Dataset & Feature Engineering
Installation & Operation
API Reference
Tech Stack
Performance Benchmarks
License


Live Demo

Platform is live and fully operational.

🌐 URLhttps://carynth.vercel.app/⚙️ HostVercel📡 StatusActive

Overview
ASTRA is an advanced AI-powered planetary defense platform engineered to evaluate and predict the hazard potential of Near-Earth Objects (NEOs). By ingesting raw celestial telemetry data, ASTRA's Quad-Core ML Array delivers rapid, high-confidence hazard classifications — categorizing asteroids as hazardous or non-hazardous with measurable precision.
The platform is built on a modern SaaS frontend, a high-throughput Flask REST API backend, and a suite of four independently trained and serialized machine learning models, each employing a distinct classification paradigm.

Key Features
◈ Quad-Core ML Array
Dynamically hot-swap between four pre-trained classification models at runtime:
ModelParadigmAccuracyK-Nearest Neighbors (KNN)Proximity Map~73% ✦ Top PerformerRandom ForestDecision Tree Ensembles~69%Support Vector Machine (SVM)Vector Space Separation~60%Logistic RegressionSigmoid Bound Probability~54%
◈ Interactive Diagnostics Console
Submit custom celestial telemetry parameters — Absolute Magnitude, Relative Velocity, Estimated Diameter, and Miss Distance — and receive a real-time hazard synthesis with impact probability scoring.
◈ Premium SaaS Frontend
A responsive, production-grade dashboard built with custom CSS, GSAP scroll-triggered animations, Lenis momentum scrolling, and Vanilla Tilt.js 3D glassmorphism micro-interactions.
◈ Real-Time Telemetry Backend
A Flask REST API providing sub-second hazard predictions, model-switching, and persistent model state via Joblib serialization.

System Architecture
 ┌──────────────────────────────────────────────────────────────────┐
 │                        CLIENT BROWSER                            │
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
 └──────────────┼───────────────────────────────────────────────────┘
                │  HTTP POST  /predict
                │  { absolute_magnitude_h, estimated_diameter_min_km, ... }
                ▼
 ┌──────────────────────────────────────────────────────────────────┐
 │                      FLASK REST API  (app.py)                    │
 │                                                                  │
 │   ┌─────────────────────────────────────────────────────────┐    │
 │   │                     Request Router                      │    │
 │   │                        /predict                         │    │
 │   └──────────────────────┬──────────────────────────────────┘    │
 │                          │                                        │
 │            ┌─────────────▼──────────────┐                        │
 │            │     Feature Preprocessor   │                        │
 │            │  (scaler.pkl / Validation) │                        │
 │            └─────────────┬──────────────┘                        │
 │                          │                                        │
 │      ┌───────────────────▼───────────────────┐                   │
 │      │           Quad-Core ML Array           │                   │
 │      │                                        │                   │
 │      │  ┌─────────┐  ┌──────────┐            │                   │
 │      │  │knn_model│  │svm_model │            │                   │
 │      │  │  .pkl   │  │  .pkl    │            │                   │
 │      │  └─────────┘  └──────────┘            │                   │
 │      │  ┌──────────────────┐ ┌─────────────┐ │                   │
 │      │  │random_forest_    │ │logistic_    │ │                   │
 │      │  │  model.pkl       │ │model.pkl    │ │                   │
 │      │  └──────────────────┘ └─────────────┘ │                   │
 │      └───────────────────┬───────────────────┘                   │
 │                          │                                        │
 │            ┌─────────────▼──────────────┐                        │
 │            │    Hazard Classification   │                        │
 │            │  + Impact Probability (%)  │                        │
 │            └─────────────┬──────────────┘                        │
 └──────────────────────────┼───────────────────────────────────────┘
                            │  JSON Response
                            │  { is_hazardous: bool, prediction: str }
                            ▼
                      ASTRA Dashboard

ML Model Pipeline
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
              │       Feature Scaling        │
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
         │        │  Logistic Reg.    │          │
         │        │  Training         │          │
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
   ┌─────▼──────┐   ┌────────▼──────┐   ┌────────▼────────┐
   │ knn_model  │   │  svm_model    │   │ random_forest_  │
   │   .pkl     │   │    .pkl       │   │   model.pkl     │
   └────────────┘   └───────────────┘   └─────────────────┘
                         ┌──────────────────────┐
                         │  logistic_model.pkl  │
                         └──────────────────────┘

Repository Structure
NeOs/
│
├── app.py                          # Flask application — API endpoints & model loader
├── code.ipynb                      # EDA, preprocessing, training & evaluation notebook
│
├── knn_model.pkl                   # Serialized K-Nearest Neighbors classifier
├── svm_model.pkl                   # Serialized Support Vector Machine classifier
├── random_forest_model.pkl         # Serialized Random Forest classifier
├── logistic_model.pkl              # Serialized Logistic Regression classifier
├── scaler.pkl                      # Serialized Feature Scaler
│
├── templates/
│   └── index.html                  # ASTRA frontend dashboard (Jinja2 entry point)
│
└── static/
    ├── css/
    │   └── style.css               # SaaS theme, glassmorphism, animations
    └── js/
        └── script.js               # Fetch API calls, model switching, UI handlers

Dataset & Feature Engineering
The classification models were trained on Near-Earth Object telemetry originally sourced from NASA's orbital data repositories.
Input Features
FeatureUnitDescriptionabsolute_magnitude_hHIntrinsic luminosity of the physical objectestimated_diameter_min_kmkmEstimated minimum physical diameterestimated_diameter_max_kmkmEstimated maximum physical diameterrelative_velocity_kmpskm/sVelocity of the NEO relative to Earth at closest approachmiss_distance_kmkmPredicted closest approach margin from Earth's center
Target Variable
  hazardous  →  { 0: Non-Hazardous,  1: Potentially Hazardous }

Detailed preprocessing steps, exploratory data analysis charts, feature correlation heatmaps, and model comparison results are documented in code.ipynb.


Installation & Operation
Prerequisites

Python 3.9+ (tested up to 3.14)
pip package manager
A virtual environment tool (recommended)


Step 1 — Navigate to the project directory
bashcd /path/to/NeOs
Step 2 — Create and activate a virtual environment
bash# Create environment
python3 -m venv venv

# Activate — macOS / Linux
source venv/bin/activate

# Activate — Windows
venv\Scripts\activate
Step 3 — Install dependencies
bashpip install flask flask-cors numpy scikit-learn joblib pandas
Step 4 — Start the server
bashpython app.py
Step 5 — Access the platform
http://localhost:8000

The port may vary. Check the Flask startup logs for the active address.


API Reference
POST /predict
Submit telemetry parameters and receive a hazard classification.
Request Body
json{
  "model": "KNN",
  "absolute_magnitude_h": 22.1,
  "estimated_diameter_min_km": 0.04,
  "estimated_diameter_max_km": 0.09,
  "relative_velocity_kmps": 18.5,
  "miss_distance_km": 45000000
}
Response
json{
  "prediction": "Hazardous",
  "is_hazardous": true,
  "probability": 83.0,
  "model_used": "KNN"
}

Tech Stack
Frontend
TechnologyPurposeHTML5 + CSS3Structure and SaaS-grade stylingVanilla JavaScriptAPI integration and event handlingGSAP + ScrollTriggerScroll-based animation frameworkLenisSmooth momentum scrollingVanilla Tilt.js3D glassmorphism micro-interactions
Backend & Machine Learning
TechnologyPurposePython 3.9+Core runtimeFlaskREST API frameworkFlask-CORSCross-origin request handlingScikit-LearnModel training and evaluationNumPy + pandasNumerical and tabular data processingJoblibModel serialization and fast loadingJupyter NotebookEDA, training, and benchmarking environment

Performance Benchmarks
  Model                   Accuracy    Paradigm
  ─────────────────────────────────────────────────────────
  K-Nearest Neighbors     ~73.0%  ◀   Top Performing
  Random Forest           ~69.0%
  Support Vector Machine  ~60.0%
  Logistic Regression     ~54.0%
  ─────────────────────────────────────────────────────────
  * Full benchmark table available in code.ipynb

License
This project is licensed under the terms specified in the repository. See LICENSE for details.


ASTRA Core v2.0 — Built for planetary-scale threat intelligence.