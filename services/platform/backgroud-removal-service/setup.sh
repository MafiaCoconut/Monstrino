#!/bin/bash
# Quick start script for Background Removal Service

set -e

echo "🚀 Background Removal Service - Quick Start"
echo "==========================================="
echo ""

# Check Python version
echo "📌 Checking Python version..."
PYTHON_VERSION=$(python3 --version 2>&1 | grep -oP '\d+\.\d+' | head -1)
if (( $(echo "$PYTHON_VERSION < 3.10" | bc -l) )); then
    echo "❌ Python 3.10+ required, found $PYTHON_VERSION"
    exit 1
fi
echo "✅ Python $PYTHON_VERSION found"
echo ""

# Check ROCm (optional)
echo "📌 Checking ROCm..."
if command -v rocm-smi &> /dev/null; then
    echo "✅ ROCm detected:"
    rocm-smi --showproductname 2>/dev/null | head -5
else
    echo "⚠️  ROCm not found - will use CPU mode"
fi
echo ""

# Create virtual environment
if [ ! -d ".venv" ]; then
    echo "📌 Creating virtual environment..."
    python3 -m venv .venv
    echo "✅ Virtual environment created"
else
    echo "✅ Virtual environment already exists"
fi
echo ""

# Activate virtual environment
echo "📌 Activating virtual environment..."
source .venv/bin/activate
echo "✅ Virtual environment activated"
echo ""

# Upgrade pip
echo "📌 Upgrading pip..."
pip install --upgrade pip setuptools wheel -q
echo "✅ pip upgraded"
echo ""

# Install PyTorch with ROCm
echo "📌 Installing PyTorch with ROCm support..."
if command -v rocm-smi &> /dev/null; then
    echo "   (This may take a few minutes...)"
    pip3 install torch torchvision --index-url https://download.pytorch.org/whl/rocm6.2 -q
else
    echo "   Installing CPU-only PyTorch..."
    pip3 install torch torchvision -q
fi
echo "✅ PyTorch installed"
echo ""

# Install dependencies
echo "📌 Installing dependencies..."
pip install -r requirements.txt -q
echo "✅ Dependencies installed"
echo ""

# Install GroundingDINO and SAM2
echo "📌 Installing GroundingDINO..."
pip install git+https://github.com/IDEA-Research/GroundingDINO.git -q
echo "✅ GroundingDINO installed"
echo ""

echo "📌 Installing SAM2..."
pip install git+https://github.com/facebookresearch/segment-anything-2.git -q
echo "✅ SAM2 installed"
echo ""

# Create .env if not exists
if [ ! -f ".env" ]; then
    echo "📌 Creating .env file..."
    cp .env.example .env
    echo "✅ .env file created"
else
    echo "✅ .env file already exists"
fi
echo ""

# Create directories
echo "📌 Creating directories..."
mkdir -p models cache/huggingface cache/torch
echo "✅ Directories created"
echo ""

# Test PyTorch
echo "📌 Testing PyTorch installation..."
python3 -c "
import torch
print(f'PyTorch version: {torch.__version__}')
print(f'CUDA available: {torch.cuda.is_available()}')
if torch.cuda.is_available():
    print(f'GPU: {torch.cuda.get_device_name(0)}')
    print(f'GPU count: {torch.cuda.device_count()}')
"
echo ""

echo "✅ Installation complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Activate virtual environment: source .venv/bin/activate"
echo "   2. Start server: python3 -m app.main"
echo "   3. Check health: curl http://localhost:8000/health"
echo "   4. Test cutout: curl -X POST http://localhost:8000/cutout \\"
echo "                        -F 'image=@test.jpg' \\"
echo "                        -F 'prompt=person' \\"
echo "                        -o output.png"
echo ""
echo "📚 For more information, see README.md"
