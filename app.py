from flask import Flask, render_template, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS


app = Flask(__name__)
CORS(app, resources={r'*':{'origins': '*'}})

models = {
    'KNN': joblib.load(open('KNN_model.pkl', 'rb')),
    'SVM': joblib.load(open('SVM_model.pkl', 'rb')),
    'Random Forest': joblib.load(open('Random_Forest.pkl', 'rb')),
    'Logistic Regression': joblib.load(open('Log_reg.pkl', 'rb'))
}

@app.route('/')
def home():
    return render_template("index.html")

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
        
       
        model_name = data['model']
        model = models[model_name]
        
        # Make prediction
        prediction = model.predict([features])[0]
        
        # Get probability if available
        probability = None
        if hasattr(model, 'predict_proba'):
            proba = model.predict_proba([features])[0]
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
