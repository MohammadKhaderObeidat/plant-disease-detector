"""
Plant Disease Detection API Server
Provides endpoints for disease classification and localization
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
import cv2
import base64
import io
from PIL import Image
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Load the trained model
MODEL_PATH = os.path.join(os.path.dirname(__file__), '..', 'EfficientNetB4_model.h5')
model = tf.keras.models.load_model(MODEL_PATH)

# Class labels
CLASS_LABELS = ['Healthy', 'Powdery', 'Rust']
CLASS_COLORS = {
    'Healthy': '#10b981',      # Green
    'Powdery': '#f59e0b',      # Amber
    'Rust': '#ef4444'          # Red
}

def preprocess_image(image_data):
    """Preprocess image for model prediction"""
    from tensorflow.keras.applications.efficientnet import preprocess_input as eff_preprocess
    
    # Convert base64 to image
    if isinstance(image_data, str):
        image_data = base64.b64decode(image_data)
    
    img = Image.open(io.BytesIO(image_data)).convert('RGB')
    img = img.resize((128, 128))
    img_array = np.array(img, dtype='float32')
    img_array = eff_preprocess(img_array)
    img_array = np.expand_dims(img_array, axis=0)
    
    return img_array, img

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'model': 'EfficientNetB4',
        'classes': CLASS_LABELS
    })

@app.route('/api/predict', methods=['POST'])
def predict():
    """Predict plant disease from image"""
    try:
        data = request.get_json()
        if not data or 'image' not in data:
            return jsonify({'error': 'No image provided'}), 400
        
        # Preprocess image
        img_array, original_img = preprocess_image(data['image'])
        
        # Make prediction
        predictions = model.predict(img_array, verbose=0)
        predicted_class_idx = np.argmax(predictions[0])
        predicted_class = CLASS_LABELS[predicted_class_idx]
        confidence = float(predictions[0][predicted_class_idx])
        
        # Get all class probabilities
        class_probabilities = {
            CLASS_LABELS[i]: float(predictions[0][i]) 
            for i in range(len(CLASS_LABELS))
        }
        
        return jsonify({
            'success': True,
            'prediction': predicted_class,
            'confidence': confidence,
            'probabilities': class_probabilities,
            'color': CLASS_COLORS.get(predicted_class, '#6b7280'),
            'timestamp': datetime.now().isoformat()
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/batch-predict', methods=['POST'])
def batch_predict():
    """Batch predict multiple images"""
    try:
        data = request.get_json()
        if not data or 'images' not in data:
            return jsonify({'error': 'No images provided'}), 400
        
        results = []
        for idx, image_data in enumerate(data['images']):
            try:
                img_array, _ = preprocess_image(image_data)
                predictions = model.predict(img_array, verbose=0)
                predicted_class_idx = np.argmax(predictions[0])
                predicted_class = CLASS_LABELS[predicted_class_idx]
                confidence = float(predictions[0][predicted_class_idx])
                
                results.append({
                    'index': idx,
                    'prediction': predicted_class,
                    'confidence': confidence,
                    'color': CLASS_COLORS.get(predicted_class, '#6b7280')
                })
            except Exception as e:
                results.append({
                    'index': idx,
                    'error': str(e)
                })
        
        return jsonify({
            'success': True,
            'results': results,
            'total': len(results),
            'timestamp': datetime.now().isoformat()
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/info', methods=['GET'])
def model_info():
    """Get model information"""
    return jsonify({
        'model_name': 'EfficientNetB4',
        'classes': CLASS_LABELS,
        'class_colors': CLASS_COLORS,
        'input_size': [128, 128, 3],
        'framework': 'TensorFlow/Keras',
        'version': '1.0.0'
    })

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=5000)
