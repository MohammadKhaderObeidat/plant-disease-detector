# macOS Setup Guide - Plant Disease Detector

Complete step-by-step instructions for setting up and running the Plant Disease Detector application on macOS.

## Table of Contents

1. [System Requirements](#system-requirements)
2. [Pre-Installation Checklist](#pre-installation-checklist)
3. [Installation Steps](#installation-steps)
4. [Running the Application](#running-the-application)
5. [Verification Steps](#verification-steps)
6. [Troubleshooting](#troubleshooting)

## System Requirements

### Minimum Requirements

- **macOS Version**: 10.14 (Mojave) or later
- **RAM**: 8 GB
- **Disk Space**: 5 GB free
- **Processor**: Intel or Apple Silicon (M1/M2/M3)

### Recommended Requirements

- **macOS Version**: 12.0 (Monterey) or later
- **RAM**: 16 GB or more
- **Disk Space**: 10 GB free
- **Processor**: Apple Silicon (M1/M2/M3) for better performance

## Pre-Installation Checklist

Before starting, ensure you have:

- [ ] Administrator access on your Mac
- [ ] Internet connection (for downloading dependencies)
- [ ] At least 5 GB of free disk space
- [ ] Terminal application (included with macOS)
- [ ] Text editor (VS Code, Sublime Text, or similar)

## Installation Steps

### Step 1: Open Terminal

1. Press `Cmd + Space` to open Spotlight Search
2. Type "Terminal" and press Enter
3. A new Terminal window will open

### Step 2: Install Homebrew

Homebrew is a package manager for macOS that simplifies software installation.

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

**Expected Output**:
```
==> Installation successful!
==> Homebrew has been successfully installed
```

**For Apple Silicon Macs**, add Homebrew to PATH:

```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

Verify Homebrew installation:

```bash
brew --version
```

### Step 3: Install Python 3.11

```bash
brew install python@3.11
```

This will take 2-5 minutes.

**Verify Installation**:

```bash
python3.11 --version
```

Expected output: `Python 3.11.x`

### Step 4: Install Node.js and npm

```bash
brew install node
```

**Verify Installation**:

```bash
node --version
npm --version
```

Expected output:
- `v18.x.x` or higher for Node
- `9.x.x` or higher for npm

### Step 5: Install pnpm

```bash
npm install -g pnpm
```

**Verify Installation**:

```bash
pnpm --version
```

Expected output: `8.x.x` or higher

### Step 6: Download Project Files

Choose one method:

#### Method A: Using Git (if you have git installed)

```bash
cd ~/Documents
git clone <repository-url>
cd plant-disease-detector-app
```

#### Method B: Extract ZIP File

1. Download the project ZIP file
2. Double-click to extract
3. Open Terminal and navigate:

```bash
cd ~/Documents/plant-disease-detector-app
```

### Step 7: Create Python Virtual Environment

```bash
cd ~/Documents/plant-disease-detector-app
python3.11 -m venv venv
```

This creates an isolated Python environment for the project.

### Step 8: Activate Virtual Environment

```bash
source venv/bin/activate
```

You should see `(venv)` at the beginning of your terminal prompt.

### Step 9: Upgrade pip

```bash
pip install --upgrade pip setuptools wheel
```

### Step 10: Install Python Dependencies

```bash
pip install tensorflow keras numpy opencv-python pillow scikit-learn matplotlib seaborn flask flask-cors
```

**Installation Time**: 5-15 minutes (first time)

**Progress Indicators**:
- You'll see download progress bars
- TensorFlow is the largest package (~500 MB)
- Installation completes with "Successfully installed"

### Step 11: Install Node Dependencies

In the same Terminal (or a new one with the project directory):

```bash
cd ~/Documents/plant-disease-detector-app
pnpm install
```

**Installation Time**: 2-5 minutes

### Step 12: Verify Model File

Ensure the trained model exists:

```bash
ls -lh EfficientNetB4_model.h5
```

Expected output:
```
-rw-r--r--  1 user  staff  130M May 14 10:30 EfficientNetB4_model.h5
```

If the file is missing, copy it from the backup:

```bash
cp /path/to/backup/EfficientNetB4_model.h5 ./
```

## Running the Application

### Method 1: Development Mode (Recommended)

This is the easiest way to test the application.

#### Terminal 1: Start Frontend

```bash
cd ~/Documents/plant-disease-detector-app
pnpm dev
```

**Expected Output**:
```
➜  Local:   http://localhost:3000/
➜  Network: http://169.254.0.21:3000/
```

#### Terminal 2: Start Backend

Open a new Terminal window:

```bash
cd ~/Documents/plant-disease-detector-app
source venv/bin/activate
python server/plant_disease_api.py
```

**Expected Output**:
```
 * Running on http://0.0.0.0:5000
 * Press CTRL+C to quit
```

#### Access the Application

Open your web browser and go to:

```
http://localhost:3000
```

### Method 2: Production Mode

For a more stable, production-like setup:

#### Step 1: Build Frontend

```bash
cd ~/Documents/plant-disease-detector-app
pnpm build
```

**Expected Output**:
```
✓ built in 45.23s
```

#### Step 2: Start Backend

```bash
source venv/bin/activate
python server/plant_disease_api.py
```

#### Step 3: Start Frontend Server

In a new Terminal:

```bash
cd ~/Documents/plant-disease-detector-app
pnpm start
```

#### Access the Application

Open your browser to:

```
http://localhost:3000
```

## Verification Steps

### Step 1: Verify Python Installation

```bash
python3.11 --version
pip --version
```

### Step 2: Verify Node Installation

```bash
node --version
npm --version
pnpm --version
```

### Step 3: Verify Virtual Environment

```bash
source venv/bin/activate
which python
# Should show: /Users/username/Documents/plant-disease-detector-app/venv/bin/python
```

### Step 4: Verify Model File

```bash
ls -lh EfficientNetB4_model.h5
# File should be ~130 MB
```

### Step 5: Test API Endpoint

```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "model": "EfficientNetB4",
  "classes": ["Healthy", "Powdery", "Rust"]
}
```

### Step 6: Test Web Interface

1. Open `http://localhost:3000` in your browser
2. You should see the Plant Disease Detector interface
3. Try uploading a test image

## Troubleshooting

### Issue 1: "command not found: python3.11"

**Cause**: Python not installed or not in PATH

**Solution**:

```bash
# Reinstall Python
brew install python@3.11

# For Apple Silicon, add to PATH
echo 'export PATH="/opt/homebrew/opt/python@3.11/bin:$PATH"' >> ~/.zprofile
source ~/.zprofile

# Verify
python3.11 --version
```

### Issue 2: "ModuleNotFoundError: No module named 'tensorflow'"

**Cause**: Python dependencies not installed

**Solution**:

```bash
source venv/bin/activate
pip install tensorflow keras
```

### Issue 3: "Address already in use" (Port 3000 or 5000)

**Cause**: Another process is using the port

**Solution**:

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or use specific process names
pkill -f "node"
pkill -f "python"
```

### Issue 4: Virtual Environment Not Activating

**Cause**: Virtual environment not created properly

**Solution**:

```bash
# Remove old environment
rm -rf venv

# Create new environment
python3.11 -m venv venv

# Activate
source venv/bin/activate
```

### Issue 5: "FileNotFoundError: EfficientNetB4_model.h5"

**Cause**: Model file missing

**Solution**:

```bash
# Check current directory
pwd

# Verify file exists
ls -la EfficientNetB4_model.h5

# If missing, copy from backup
cp /path/to/backup/EfficientNetB4_model.h5 ./
```

### Issue 6: Slow Inference on First Run

**Cause**: TensorFlow optimizing for your hardware

**Solution**: This is normal. First inference takes 15-30 seconds. Subsequent predictions will be faster.

### Issue 7: "npm ERR! code EACCES"

**Cause**: Permission issues with npm

**Solution**:

```bash
# Fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.zprofile
```

### Issue 8: Terminal Shows "zsh: command not found"

**Cause**: Command not in PATH or shell configuration issue

**Solution**:

```bash
# Reload shell configuration
source ~/.zprofile

# Or restart Terminal
# Press Cmd+Q to quit Terminal, then reopen it
```

## Performance Tips

### For Faster Inference

1. **Use Apple Silicon Native Support**:
   ```bash
   pip install tensorflow-metal
   ```

2. **Close Unnecessary Applications**: Free up RAM

3. **Use SSD**: Ensure project is on fast storage

### For Better Accuracy

1. **Use High-Quality Images**: Good lighting, clear focus
2. **Capture Full Leaf**: Include entire leaf in frame
3. **Avoid Shadows**: Minimize shadows on leaf
4. **Clean Leaves**: Remove dust before photographing

## Uninstalling

To completely remove the application:

```bash
# Deactivate virtual environment
deactivate

# Remove project directory
rm -rf ~/Documents/plant-disease-detector-app

# Optional: Remove Homebrew packages (if not used elsewhere)
brew uninstall python@3.11
brew uninstall node
npm uninstall -g pnpm
```

## Getting Help

### Check Logs

```bash
# Frontend logs (from Terminal 1)
# Look for error messages in the output

# Backend logs (from Terminal 2)
# Look for error messages in the output
```

### Common Commands Reference

```bash
# Navigate to project
cd ~/Documents/plant-disease-detector-app

# Activate virtual environment
source venv/bin/activate

# Deactivate virtual environment
deactivate

# Start development servers
pnpm dev              # Terminal 1
python server/plant_disease_api.py  # Terminal 2

# Build for production
pnpm build

# Stop servers
Ctrl+C  # In each Terminal

# Check versions
python3.11 --version
node --version
pnpm --version
```

## Next Steps

After successful installation:

1. **Explore the Interface**: Upload sample images to test
2. **Review Results**: Check confidence scores and recommendations
3. **Run Advanced Features**: Try Grad-CAM visualization
4. **Read Documentation**: Review the main README.md

## Support

For issues or questions:

1. Check the Troubleshooting section
2. Review error messages carefully
3. Ensure all prerequisites are installed
4. Try restarting Terminal and the application

---

**Version**: 1.0.0  
**Last Updated**: May 2026  
**Platform**: macOS 10.14+
