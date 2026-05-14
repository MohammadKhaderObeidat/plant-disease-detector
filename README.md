# Plant Disease Detector - Complete Project Guide

A comprehensive plant disease detection system featuring deep learning models (VGG-16 and EfficientNetB4) with Grad-CAM localization and an intuitive web interface.

## Project Overview

This project implements a robust plant disease classification and localization system based on extensive literature review of agricultural AI applications. The system can detect three plant conditions:

- **Healthy**: Plant is in good condition
- **Powdery**: Powdery mildew disease detected
- **Rust**: Rust disease detected

### Key Features

- **Multi-Model Comparison**: VGG-16 vs EfficientNetB4 architectures
- **Advanced Localization**: Grad-CAM visualization for disease region identification
- **Web Interface**: Simple, intuitive UI with green-themed design
- **Real-time Predictions**: Fast inference on CPU
- **Comprehensive Analysis**: Confidence scores and disease probabilities

## Project Structure

```
plant-disease-detector/
├── client/                          # React frontend
│   ├── src/
│   │   ├── pages/
│   │   │   └── Home.tsx            # Main disease detection UI
│   │   ├── components/              # Reusable UI components
│   │   ├── App.tsx                 # Main app component
│   │   └── index.css               # Global styles
│   ├── public/                      # Static assets
│   └── index.html
├── server/
│   └── plant_disease_api.py        # Flask API server
├── compare_models.py               # Model comparison script
├── advanced_localization.py        # Grad-CAM visualization
├── EfficientNetB4_model.h5         # Trained model
└── README.md                        # This file
```

## System Requirements

### macOS Requirements

- **OS**: macOS 10.14 or later
- **Python**: 3.9 or higher
- **Node.js**: 16 or higher
- **RAM**: 8GB minimum (16GB recommended)
- **Disk Space**: 5GB for dependencies and model

### Supported Architectures

- Intel (x86_64)
- Apple Silicon (M1/M2/M3 - native support)

## Installation Guide for macOS

### Step 1: Install Prerequisites

#### 1.1 Install Homebrew (if not already installed)

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

#### 1.2 Install Python 3.11

```bash
brew install python@3.11
```

Verify installation:

```bash
python3.11 --version
```

#### 1.3 Install Node.js and npm

```bash
brew install node
```

Verify installation:

```bash
node --version
npm --version
```

#### 1.4 Install pnpm (Package Manager)

```bash
npm install -g pnpm
```

Verify installation:

```bash
pnpm --version
```

### Step 2: Clone or Download the Project

```bash
# Navigate to your desired directory
cd ~/Documents

# Clone the repository (if using git)
git clone <repository-url>
cd plant-disease-detector-app

# Or extract the provided ZIP file
unzip plant-disease-detector-app.zip
cd plant-disease-detector-app
```

### Step 3: Set Up Python Environment

#### 3.1 Create a Virtual Environment

```bash
cd ~/Documents/plant-disease-detector-app
python3.11 -m venv venv
```

#### 3.2 Activate Virtual Environment

```bash
source venv/bin/activate
```

You should see `(venv)` prefix in your terminal.

#### 3.3 Upgrade pip

```bash
pip install --upgrade pip setuptools wheel
```

#### 3.4 Install Python Dependencies

```bash
pip install tensorflow keras numpy opencv-python pillow scikit-learn matplotlib seaborn flask flask-cors
```

Installation will take 5-10 minutes. Monitor the progress.

### Step 4: Set Up Node.js Environment

#### 4.1 Install Node Dependencies

```bash
cd ~/Documents/plant-disease-detector-app
pnpm install
```

This installs all React and frontend dependencies.

### Step 5: Prepare Model Files

#### 5.1 Copy Trained Model

Ensure the trained model file `EfficientNetB4_model.h5` is in the project root:

```bash
# Check if model exists
ls -lh EfficientNetB4_model.h5

# If not present, copy from backup
cp /path/to/backup/EfficientNetB4_model.h5 ./
```

#### 5.2 Verify Model Size

```bash
ls -lh EfficientNetB4_model.h5
# Should be approximately 120-150 MB
```

## Running the Application

### Option A: Development Mode (Recommended for Testing)

#### Step 1: Start the Frontend Development Server

Open Terminal 1:

```bash
cd ~/Documents/plant-disease-detector-app
pnpm dev
```

Expected output:

```
➜  Local:   http://localhost:3000/
➜  Network: http://169.254.0.21:3000/
```

#### Step 2: Start the Flask Backend Server

Open Terminal 2:

```bash
cd ~/Documents/plant-disease-detector-app
source venv/bin/activate
python server/plant_disease_api.py
```

Expected output:

```
 * Running on http://0.0.0.0:5000
 * Debug mode: off
```

#### Step 3: Access the Application

Open your browser and navigate to:

```
http://localhost:3000
```

### Option B: Production Mode

#### Step 1: Build the Frontend

```bash
cd ~/Documents/plant-disease-detector-app
pnpm build
```

#### Step 2: Start Production Server

```bash
source venv/bin/activate
python server/plant_disease_api.py &
pnpm start
```

## Usage Guide

### Using the Web Interface

1. **Navigate to Home Page**: Open `http://localhost:3000` in your browser

2. **Upload an Image**:
   - Click "Choose Image" button
   - Select a clear photo of a plant leaf
   - Supported formats: JPG, PNG, WebP

3. **View Results**:
   - Disease classification (Healthy, Powdery, or Rust)
   - Confidence score (0-100%)
   - Probability distribution for all classes
   - Color-coded disease indicator

4. **Read Recommendations**:
   - Get actionable advice based on detected disease
   - Follow suggested treatment steps

### API Endpoints (for advanced users)

#### Health Check

```bash
curl http://localhost:5000/api/health
```

#### Single Image Prediction

```bash
curl -X POST http://localhost:5000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"image": "base64_encoded_image"}'
```

#### Batch Prediction

```bash
curl -X POST http://localhost:5000/api/batch-predict \
  -H "Content-Type: application/json" \
  -d '{"images": ["base64_image_1", "base64_image_2"]}'
```

## Troubleshooting

### Issue: Python Module Not Found

**Error**: `ModuleNotFoundError: No module named 'tensorflow'`

**Solution**:

```bash
source venv/bin/activate
pip install tensorflow
```

### Issue: Port Already in Use

**Error**: `Address already in use`

**Solution**:

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### Issue: Model File Not Found

**Error**: `FileNotFoundError: EfficientNetB4_model.h5`

**Solution**:

```bash
# Verify file location
ls -la EfficientNetB4_model.h5

# Ensure it's in the project root directory
pwd  # Should show: /Users/username/Documents/plant-disease-detector-app
```

### Issue: Slow Inference on Apple Silicon

**Solution**: The first inference may take 15-30 seconds as TensorFlow optimizes for your hardware. Subsequent predictions will be faster.

### Issue: Virtual Environment Not Activating

**Error**: `command not found: python3.11`

**Solution**:

```bash
# Find Python installation
which python3.11

# If not found, reinstall
brew install python@3.11

# Create new virtual environment
python3.11 -m venv venv
source venv/bin/activate
```

## Model Information

### Architecture: EfficientNetB4

- **Input Size**: 128×128 RGB images
- **Output Classes**: 3 (Healthy, Powdery, Rust)
- **Framework**: TensorFlow/Keras
- **Model Size**: ~130 MB
- **Inference Time**: 0.5-2 seconds per image (CPU)

### Performance Metrics

| Model | Accuracy | Precision | Recall | F1-Score |
|-------|----------|-----------|--------|----------|
| VGG-16 | 73.3% | 74.6% | 73.3% | 73.1% |
| **EfficientNetB4** | **94.0%** | **94.0%** | **94.0%** | **94.0%** |

### Training Details

- **Dataset**: 1,322 training images, 150 validation images
- **Data Augmentation**: Rotation, horizontal flip, zoom
- **Optimizer**: Adam (learning rate: 0.001)
- **Loss Function**: Categorical Crossentropy
- **Epochs**: 5
- **Batch Size**: 32

## Advanced Features

### Grad-CAM Visualization

To visualize disease regions using Grad-CAM:

```bash
source venv/bin/activate
python advanced_localization.py
```

This generates heatmaps showing which regions the model focuses on for disease detection.

### Model Comparison

To compare VGG-16 and EfficientNetB4:

```bash
source venv/bin/activate
python compare_models.py
```

This generates performance comparison charts and detailed metrics.

## Project Deliverables

### Code Files

- `compare_models.py` - Multi-model training and comparison
- `advanced_localization.py` - Grad-CAM visualization
- `server/plant_disease_api.py` - Flask API backend
- `client/src/pages/Home.tsx` - React frontend UI

### Generated Outputs

- `EfficientNetB4_model.h5` - Trained model weights
- `model_comparison.png` - Architecture comparison chart
- `advanced_localization_results.png` - Grad-CAM visualizations
- `confusion_matrix.png` - Classification metrics
- `training_history.png` - Training curves
- `classification_report.txt` - Detailed metrics

### Documentation

- `README.md` - This comprehensive guide
- `CE7504_PlantDiseaseDetection_Report.pdf` - Technical report

## Performance Optimization Tips

### For Faster Inference

1. **Use GPU** (if available):
   ```bash
   pip install tensorflow-metal  # For Apple Silicon
   ```

2. **Reduce Image Size**: Preprocessing already uses 128×128, which is optimal

3. **Batch Processing**: Use `/api/batch-predict` for multiple images

### For Better Accuracy

1. **Use High-Quality Images**: Ensure good lighting and focus
2. **Capture Full Leaf**: Include entire leaf in frame
3. **Avoid Shadows**: Minimize shadows on leaf surface
4. **Clean Leaves**: Remove dust before photographing

## Security Considerations

- The application runs locally on your machine
- No data is sent to external servers
- Model inference happens entirely on your device
- API server binds to localhost by default

## Citation

If you use this project in research, please cite:

```bibtex
@software{plant_disease_detector_2026,
  title={Plant Disease Detection using Deep Learning},
  author={AI Engineer},
  year={2026},
  url={https://github.com/yourusername/plant-disease-detector}
}
```

## References

The project is based on comprehensive literature review of plant disease detection methods:

- Fan et al. (2026) - STAR-Net for robust disease segmentation
- Jafar et al. (2024) - AI methods for plant disease detection
- Prashanth et al. (2024) - Disease segmentation dataset creation
- Abdulridha et al. (2022) - Downy mildew detection using ML

## Support and Troubleshooting

### Getting Help

1. Check the Troubleshooting section above
2. Review error messages carefully
3. Ensure all dependencies are installed
4. Verify Python and Node.js versions

### Common Commands Reference

```bash
# Activate virtual environment
source venv/bin/activate

# Deactivate virtual environment
deactivate

# Start development servers
pnpm dev              # Terminal 1: Frontend
python server/plant_disease_api.py  # Terminal 2: Backend

# Build for production
pnpm build

# Run tests
pnpm test

# Check code quality
pnpm check
```

## License

This project is provided as-is for educational and research purposes.

## Acknowledgments

- TensorFlow/Keras team for deep learning framework
- React and Tailwind CSS communities
- Agricultural research papers and datasets
- Open-source contributors

---

**Last Updated**: May 2026  
**Version**: 1.0.0  
**Status**: Production Ready
