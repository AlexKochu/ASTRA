from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS


app = Flask(__name__)
CORS(app, resources={r'*':{'origins': '*'}})

scaler = joblib.load(open('scaler.pkl', 'rb'))

models = {
    'KNN': joblib.load(open('knn_model.pkl', 'rb')),
    'SVM': joblib.load(open('svm_model.pkl', 'rb')),
    'Random Forest': joblib.load(open('random_forest_model.pkl', 'rb')),
    'Logistic Regression': joblib.load(open('logistic_model.pkl', 'rb'))
}

@app.route('/')
def home():
    return jsonify({"status": "ASTRA Backend API is operational", "version": "2.0"})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        
        features = [
            float(data['absolute_magnitude_h']),
            float(data['estimated_diameter_min_km']),
            float(data['estimated_diameter_max_km']),
            float(data['relative_velocity_kmps']),
            float(data['miss_distance_km'])
        ]
        
       
        # Scale features
        features_scaled = scaler.transform([features])
        
        model_name = data['model']
        model = models[model_name]
        
        # Make prediction
        prediction = model.predict(features_scaled)[0]
        
        # Get probability if available
        probability = None
        if hasattr(model, 'predict_proba'):
            proba = model.predict_proba(features_scaled)[0]
            probability = float(proba[1]) * 100  # Probability of being hazardous
        
        result = {
            'prediction': 'Hazardous' if prediction == 1 else 'Not Hazardous',
            'is_hazardous': bool(prediction),
            'probability': probability,
            'model_used': model_name
        }
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000, debug=True)
