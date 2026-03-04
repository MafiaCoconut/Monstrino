#!/bin/bash
# Quick Start Guide for Background Removal Service
# Run this script to see a quick overview of commands

cat << 'EOF'
╔══════════════════════════════════════════════════════════════════════════════╗
║                    BACKGROUND REMOVAL SERVICE                                ║
║                         Quick Start Guide                                    ║
╚══════════════════════════════════════════════════════════════════════════════╝

🚀 INSTALLATION
───────────────────────────────────────────────────────────────────────────────

1. Quick Setup (Automated):
   ./setup.sh

2. Manual Setup:
   # Install PyTorch with ROCm
   pip3 install torch torchvision --index-url https://download.pytorch.org/whl/rocm6.2
   
   # Install dependencies
   pip install -r requirements.txt
   
   # Install models
   pip install git+https://github.com/IDEA-Research/GroundingDINO.git
   pip install git+https://github.com/facebookresearch/segment-anything-2.git

3. Docker Setup:
   docker-compose up -d


🏃 RUNNING THE SERVICE
───────────────────────────────────────────────────────────────────────────────

1. Development Mode:
   python3 -m app.main

2. Production Mode:
   uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 1

3. Docker:
   docker-compose up

Service will be available at: http://localhost:8000


✅ VERIFICATION
───────────────────────────────────────────────────────────────────────────────

1. Check Health:
   curl http://localhost:8000/health | jq .

2. Run Tests:
   python3 test_service.py

3. Test API:
   curl -X POST http://localhost:8000/cutout \
     -F "image=@test.jpg" \
     -F "prompt=person" \
     -o output.png


📝 BASIC USAGE
───────────────────────────────────────────────────────────────────────────────

Extract object from image:

curl -X POST http://localhost:8000/cutout \
  -F "image=@your-image.jpg" \
  -F "prompt=red backpack" \
  -F "mode=best" \
  -F "output_format=png" \
  -o result.png

Parameters:
  - image: Input image file (jpg/png/webp)
  - prompt: Text description ("red backpack", "person", "cat", etc.)
  - mode: best | largest | all
  - output_format: png | webp
  - return_json: false | true


📚 EXAMPLES
───────────────────────────────────────────────────────────────────────────────

Extract person:
  curl -X POST http://localhost:8000/cutout \
    -F "image=@photo.jpg" -F "prompt=person" -o person.png

Extract with JSON response:
  curl -X POST http://localhost:8000/cutout \
    -F "image=@photo.jpg" -F "prompt=dog" -F "return_json=true" | jq .

Extract all matching objects:
  curl -X POST http://localhost:8000/cutout \
    -F "image=@table.jpg" -F "prompt=bottles" -F "mode=all" -o bottles.png

See EXAMPLES.md for more examples in curl, Python, and JavaScript.


⚙️  CONFIGURATION
───────────────────────────────────────────────────────────────────────────────

Edit .env file:

  MODEL_DIR=./models              # Model storage directory
  DEVICE=auto                     # auto, cpu, cuda, or rocm
  MAX_IMAGE_SIZE=2048             # Maximum image dimension
  BOX_THRESHOLD=0.35              # Detection confidence (0.0-1.0)
  TEXT_THRESHOLD=0.25             # Text matching threshold (0.0-1.0)
  MIN_MASK_AREA=100               # Minimum mask size (pixels)
  FEATHER_RADIUS=3                # Edge feathering (0 = disabled)
  FILL_HOLES=true                 # Fill holes in masks


🐛 TROUBLESHOOTING
───────────────────────────────────────────────────────────────────────────────

GPU not detected:
  # Check ROCm
  rocm-smi
  
  # Check PyTorch
  python3 -c "import torch; print(torch.cuda.is_available())"
  
  # Reinstall PyTorch with ROCm
  pip3 install torch --index-url https://download.pytorch.org/whl/rocm6.2

Slow inference:
  # Reduce image size
  echo "MAX_IMAGE_SIZE=1024" >> .env
  
  # Or use CPU (slower but more compatible)
  echo "DEVICE=cpu" >> .env

Models not downloading:
  # Clear cache and retry
  rm -rf cache/ models/
  python3 -m app.main

See FAQ.md for more troubleshooting tips.


📖 DOCUMENTATION
───────────────────────────────────────────────────────────────────────────────

  README.md              - Complete documentation
  EXAMPLES.md            - API usage examples
  FAQ.md                 - Common questions and issues
  PROJECT_STRUCTURE.md   - Code organization
  CHANGELOG.md           - Version history


🎯 COMMON TASKS
───────────────────────────────────────────────────────────────────────────────

Check if service is running:
  curl http://localhost:8000/health

View logs:
  # If running directly
  Check console output
  
  # If using Docker
  docker-compose logs -f

Stop service:
  # If running directly
  Ctrl+C
  
  # If using Docker
  docker-compose down

Update models:
  rm -rf models/ cache/
  python3 -m app.main  # Will re-download on startup


💡 TIPS
───────────────────────────────────────────────────────────────────────────────

✓ Use specific prompts for better results: "the red backpack" > "backpack"
✓ First request is slow (model loading) - subsequent requests are fast
✓ Pre-warm models: Make a dummy request after startup
✓ For batch processing, see EXAMPLES.md #10
✓ Use mode=best for highest confidence, mode=largest for biggest object
✓ PNG has better transparency support, WebP is more compact
✓ Check GPU usage: watch -n 1 rocm-smi


🔧 DEVELOPMENT
───────────────────────────────────────────────────────────────────────────────

Run tests:
  pytest
  pytest tests/test_api.py -v
  pytest --cov=app tests/

Format code:
  black app/ tests/
  ruff check app/ tests/

Type checking:
  mypy app/


📦 DOCKER
───────────────────────────────────────────────────────────────────────────────

Build image:
  docker build -t background-removal-service .

Run with GPU:
  docker run -p 8000:8000 \
    --device=/dev/kfd --device=/dev/dri --group-add video \
    -v $(pwd)/models:/app/models \
    background-removal-service

Run with CPU only:
  docker run -p 8000:8000 \
    -v $(pwd)/models:/app/models \
    -e DEVICE=cpu \
    background-removal-service


🌐 ENDPOINTS
───────────────────────────────────────────────────────────────────────────────

GET  /                   - Service information
GET  /health             - Health check with status
POST /cutout             - Main object extraction endpoint


🔗 USEFUL LINKS
───────────────────────────────────────────────────────────────────────────────

GroundingDINO: https://github.com/IDEA-Research/GroundingDINO
SAM2:          https://github.com/facebookresearch/segment-anything-2
ROCm:          https://rocm.docs.amd.com/
FastAPI:       https://fastapi.tiangolo.com/


📞 SUPPORT
───────────────────────────────────────────────────────────────────────────────

1. Check the logs for error messages
2. Run the test script: python3 test_service.py
3. Check FAQ.md for common issues
4. Consult README.md for detailed documentation


╔══════════════════════════════════════════════════════════════════════════════╗
║                        Ready to get started!                                 ║
║                    Run: ./setup.sh to begin                                  ║
╚══════════════════════════════════════════════════════════════════════════════╝

EOF
