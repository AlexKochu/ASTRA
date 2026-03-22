# ASTRA: Intelligent Planetary Defense Platform 🛡️

ASTRA (Core v2.0) is an advanced, AI-powered system designed to evaluate and predict the hazard potential of Near-Earth Objects (NEOs). By leveraging celestial telemetry data, ASTRA employs a quad-core machine learning array to accurately assess impact risks, categorizing asteroids as hazardous or non-hazardous with precision speeds.

## 🚀 Key Features
* **Quad-Core ML Array:** Dynamically hot-swap between four pre-trained machine learning models:
  * **K-Nearest Neighbors (KNN)** - Proximity Map (*Top performing model at ~77% accuracy*)
  * **Support Vector Machine (SVM)** - Vector Space Separation
  * **Random Forest** - Decision Tree Ensembles
  * **Logistic Regression** - Sigmoid Bound Probability
* **Interactive Diagnostics Tool:** Input custom celestial telemetry (Absolute Magnitude, Velocity, Estimated Diameter, Miss Distance) to run live hazard synthesis.
* **Premium SaaS Frontend:** A modern, dynamic, responsive UI built with custom CSS, GSAP scroll-based animations, Lenis for buttery-smooth scrolling, and 3D micro-interactions.
* **Real-Time Telemetry Backend:** High-speed data processing via a Flask REST API, providing instant hazard predictions and impact probabilities.

## 🛠️ Tech Stack
**Frontend:**
* HTML5, Form-driven Vanilla JavaScript, and Advanced CSS3 (SaaS aesthetic)
* GSAP & ScrollTrigger (Animation framework)
* Lenis (Smooth momentum scrolling)
* Vanilla Tilt.js (3D Glassmorphism interactions)

**Backend & Machine Learning:**
* Python (v3.14+ compatible), Flask, Flask-CORS
* Scikit-Learn, NumPy, pandas, Joblib (Model training and deployment)
* Jupyter Notebook (`code.ipynb` for EDA, model training, and comparisons)

## 📁 Repository Structure
```text
NeOs/
├── app.py                     # Main Flask application and API endpoints
├── code.ipynb                 # Data Preprocessing, EDA, and Model Training Notebook
├── KNN_model.pkl              # Serialized K-Nearest Neighbors model
├── SVM_model.pkl              # Serialized Support Vector Machine model
├── Random_Forest.pkl          # Serialized Random Forest model
├── Log_reg.pkl                # Serialized Logistic Regression model
├── templates/
│   └── index.html             # Main frontend interface (ASTRA Dashboard)
└── static/
    ├── css/
    │   └── style.css          # Core SaaS-themed styles and animations
    └── js/
        └── script.js          # Client-side API integration and event handling
```

## ⚙️ Installation & Operation

1. **Clone the repository** (if applicable) and navigate to the project directory:
   ```bash
   cd /path/to/NeOs
   ```

2. **Set up a Python virtual environment (recommended):**
   ```bash
   python3 -m venv venv
   source venv/bin/activate      # On macOS/Linux
   # venv\Scripts\activate       # On Windows
   ```

3. **Install the required dependencies:**
   ```bash
   pip install flask flask-cors numpy scikit-learn joblib pandas
   ```

4. **Initialize the Core (Start the server):**
   ```bash
   python app.py
   ```

5. **Access the Platform:**
   Open your browser and navigate to: `http://localhost:8000` (or the port specified by Flask).

## 📊 Dataset & Modeling
The predictive models were rigorously trained on Near Earth Object data (originally sourced from NASA telemetry). The evaluation metrics process the following custom features:
* **Absolute Magnitude (H):** Intrinsic luminosity of the physical object.
* **Estimated Minimum Diameter (km)**
* **Estimated Maximum Diameter (km)**
* **Relative Velocity (km/s):** The cinematic velocity relative to Earth.
* **Miss Distance (km):** The predicted closest approach margin.

Data cleaning, feature scaling, and model hyperparameter tuning details are thoroughly documented within the `code.ipynb` interactive notebook.
