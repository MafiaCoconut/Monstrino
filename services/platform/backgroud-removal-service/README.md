# Background Removal Service

Production-ready background removal service using **GroundingDINO** (text-based object detection) and **SAM2** (segmentation). Optimized for **AMD Radeon GPU** via **ROCm**.

## Features

- 🎯 **Text-based object detection**: Describe what to extract (e.g., "red backpack", "a mug")
- 🔍 **High-quality segmentation**: Using state-of-the-art GroundingDINO + SAM2 pipeline
- 🚀 **AMD GPU acceleration**: Optimized for AMD Radeon GPUs via ROCm (with CPU fallback)
- 🎨 **Clean output**: Automatic mask postprocessing (remove artifacts, fill holes, feather edges)
- 📦 **Multiple modes**: Extract best match, largest object, or all matching objects
- 🖼️ **Flexible output**: PNG/WebP with transparent background, binary or JSON response
- 📊 **Production-ready**: Structured logging, error handling, health checks, metrics

## Architecture

```
Input Image + Prompt
        ↓
  GroundingDINO (text → bbox detection)
        ↓
     SAM2 (bbox → precise mask)
        ↓
  Mask Postprocessing
   - Remove small artifacts
   - Fill holes
   - Smooth & feather edges
        ↓
  Apply mask → Transparent background
        ↓
    Output Image (PNG/WebP)
```

## Requirements

- **OS**: Linux (Ubuntu 22.04+ recommended)
- **Python**: 3.14+
- **GPU**: AMD Radeon GPU with ROCm 6.2+ (optional, falls back to CPU)
- **RAM**: 8GB+ (16GB+ recommended)
- **VRAM**: 8GB+ for GPU inference

## Installation

### 1. Check ROCm Support

```bash
# Check if ROCm is installed
rocm-smi

# Check ROCm version
apt list --installed | grep rocm

# Expected output: ROCm 6.2 or higher
```

If ROCm is not installed, follow the [official ROCm installation guide](https://rocm.docs.amd.com/en/latest/deploy/linux/quick_start.html).

### 2. Clone Repository

```bash
cd /home/coconut/Projects/Monstrino/services/platform/backgroud-removal-service
```

### 3. Install Dependencies

```bash
# Create virtual environment (optional but recommended)
python3.14 -m venv .venv
source .venv/bin/activate

# Upgrade pip
pip install --upgrade pip setuptools wheel

# Install PyTorch with ROCm support
pip3 install torch torchvision --index-url https://download.pytorch.org/whl/rocm6.2

# Install other dependencies
pip install -r requirements.txt

# Install GroundingDINO and SAM2
pip install git+https://github.com/IDEA-Research/GroundingDINO.git
pip install git+https://github.com/facebookresearch/segment-anything-2.git
```

### 4. Configure Environment

```bash
# Copy example config
cp .env.example .env

# Edit configuration (optional)
nano .env
```

Configuration options:
- `MODEL_DIR`: Directory for model weights (default: `./models`)
- `DEVICE`: `auto`, `cpu`, `cuda`, or `rocm` (default: `auto`)
- `MAX_IMAGE_SIZE`: Maximum image dimension in pixels (default: `2048`)
- `BOX_THRESHOLD`: Detection confidence threshold (default: `0.35`)
- `TEXT_THRESHOLD`: Text matching threshold (default: `0.25`)

### 5. Download Models

Models will be automatically downloaded on first use. To pre-download:

```bash
python3 -c "
from app.services.model_loader import get_groundingdino_checkpoint, get_sam2_checkpoint
get_groundingdino_checkpoint()
get_sam2_checkpoint('small')
"
```

## Usage

### Start Server

```bash
# Development mode
python3 -m app.main

# Production mode with Uvicorn
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 1

# The server will start on http://localhost:8000
```

### Verify GPU Usage

Check logs for:
```
device_auto_detected device_type=rocm device=cuda:0 gpu_name=AMD Radeon...
```

Or check the health endpoint:
```bash
curl http://localhost:8000/health
```

### API Endpoints

#### Health Check
```bash
curl http://localhost:8000/health
```

#### Cutout (Binary Response)

```bash
curl -X POST http://localhost:8000/cutout \
  -F "image=@/path/to/image.jpg" \
  -F "prompt=red backpack" \
  -F "mode=best" \
  -F "output_format=png" \
  -o output.png
```

Parameters:
- `image`: Input image file (jpg/png/webp)
- `prompt`: Text description of object to extract (e.g., "the red backpack", "a mug")
- `mode`: `best` (highest confidence), `largest` (biggest area), or `all` (all matches)
- `output_format`: `png` or `webp`
- `return_json`: `false` (default) or `true`

Response headers (binary mode):
- `X-Score`: Detection confidence score
- `X-BBox`: Bounding box as `x1,y1,x2,y2`
- `X-Label`: Detected object label
- `X-Inference-Time-Ms`: Inference time in milliseconds

#### Cutout (JSON Response)

```bash
curl -X POST http://localhost:8000/cutout \
  -F "image=@/path/to/image.jpg" \
  -F "prompt=black cat" \
  -F "mode=best" \
  -F "output_format=png" \
  -F "return_json=true" \
  | jq .
```

Response:
```json
{
  "image_base64": "iVBORw0KGgoAAAANS...",
  "bbox": [123, 456, 789, 1011],
  "score": 0.87,
  "label": "black cat",
  "model_info": {
    "device": "cuda:0",
    "device_type": "rocm",
    "detector": "GroundingDINO",
    "segmenter": "SAM2"
  },
  "timings_ms": {
    "image_load_ms": 45.2,
    "inference_ms": 1234.5,
    "postprocess_ms": 67.8,
    "compose_ms": 23.4,
    "total_ms": 1370.9
  }
}
```

### Examples

#### Extract specific object
```bash
curl -X POST http://localhost:8000/cutout \
  -F "image=@photo.jpg" \
  -F "prompt=the person wearing a red shirt" \
  -F "mode=best" \
  -o person.png
```

#### Extract largest object
```bash
curl -X POST http://localhost:8000/cutout \
  -F "image=@photo.jpg" \
  -F "prompt=car" \
  -F "mode=largest" \
  -o car.png
```

#### Extract all matching objects
```bash
curl -X POST http://localhost:8000/cutout \
  -F "image=@photo.jpg" \
  -F "prompt=bottles" \
  -F "mode=all" \
  -o bottles.png
```

#### WebP output
```bash
curl -X POST http://localhost:8000/cutout \
  -F "image=@photo.jpg" \
  -F "prompt=mug" \
  -F "output_format=webp" \
  -o mug.webp
```

## Docker

### Build Image

```bash
docker build -t background-removal-service .
```

### Run Container (CPU)

```bash
docker run -p 8000:8000 \
  -v $(pwd)/models:/app/models \
  background-removal-service
```

### Run Container (AMD GPU with ROCm)

```bash
docker run -p 8000:8000 \
  --device=/dev/kfd \
  --device=/dev/dri \
  --group-add video \
  -v $(pwd)/models:/app/models \
  background-removal-service
```

## Testing

Run tests:
```bash
# Install test dependencies
pip install pytest pytest-asyncio httpx

# Run all tests
pytest

# Run specific test file
pytest tests/test_mask_postprocessing.py -v

# Run with coverage
pytest --cov=app tests/
```

Note: Integration tests that require model inference will be skipped if models are not available.

## Performance

### Benchmarks (AMD Radeon RX 7900 XTX)

| Image Size | Inference Time | Total Time |
|------------|---------------|------------|
| 640x480    | ~800ms        | ~950ms     |
| 1920x1080  | ~1500ms       | ~1700ms    |
| 3840x2160  | ~2800ms       | ~3100ms    |

*Times include detection, segmentation, and postprocessing*

### Optimization Tips

1. **Pre-warm models**: Make a dummy request after startup
2. **Batch processing**: Process multiple images with the same prompt
3. **Image size**: Reduce `MAX_IMAGE_SIZE` for faster inference
4. **Workers**: Use `--workers 1` only (models are not thread-safe by default)
5. **GPU memory**: Monitor with `rocm-smi` and adjust batch size

## Troubleshooting

### ROCm Not Detected

```bash
# Check ROCm installation
rocm-smi

# Check PyTorch ROCm support
python3 -c "import torch; print(torch.cuda.is_available())"

# Reinstall PyTorch with ROCm
pip3 install torch torchvision --index-url https://download.pytorch.org/whl/rocm6.2
```

### Models Not Downloading

```bash
# Check internet connection
ping huggingface.co

# Set proxy if needed
export HTTP_PROXY=http://proxy:port
export HTTPS_PROXY=http://proxy:port

# Clear cache and retry
rm -rf cache/ models/
```

### Out of Memory

Reduce image size:
```bash
# In .env
MAX_IMAGE_SIZE=1024
```

Or use CPU:
```bash
# In .env
DEVICE=cpu
```

### Slow Inference

- Check if GPU is being used: `curl http://localhost:8000/health`
- Reduce image resolution
- Use smaller SAM2 model (tiny instead of small)

## Project Structure

```
background-removal-service/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application
│   ├── config.py            # Configuration management
│   ├── api/
│   │   ├── __init__.py
│   │   └── routes.py        # API endpoints
│   ├── core/
│   │   ├── __init__.py
│   │   ├── logging.py       # Structured logging
│   │   └── exceptions.py    # Custom exceptions
│   ├── services/
│   │   ├── __init__.py
│   │   ├── model_loader.py  # Model loading & device management
│   │   └── segmentation.py  # GroundingDINO + SAM2 pipeline
│   └── utils/
│       ├── __init__.py
│       ├── image_processing.py       # Image utilities
│       └── mask_postprocessing.py    # Mask cleanup
├── tests/
│   ├── __init__.py
│   ├── test_api.py
│   └── test_mask_postprocessing.py
├── pyproject.toml           # Project metadata
├── requirements.txt         # Python dependencies
├── Dockerfile              # Docker image
├── .env.example            # Example configuration
├── .gitignore
└── README.md               # This file
```

## Extension Points

### Add New Models

Edit [`app/services/segmentation.py`](app/services/segmentation.py):
- `_load_grounding_dino()`: Replace with alternative detector
- `_load_sam2()`: Replace with alternative segmenter

### Custom Postprocessing

Edit [`app/utils/mask_postprocessing.py`](app/utils/mask_postprocessing.py):
- Add new postprocessing functions
- Modify `postprocess_mask()` pipeline

### Add Batch Endpoint

Add to [`app/api/routes.py`](app/api/routes.py):
```python
@router.post("/cutout/batch")
async def cutout_batch(images: list[UploadFile], prompts: list[str]):
    # Process multiple images
    ...
```

### Rate Limiting

Add middleware in [`app/main.py`](app/main.py):
```python
from slowapi import Limiter
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
```

## License

This project uses the following open-source models:
- **GroundingDINO**: Apache 2.0 License
- **SAM2**: Apache 2.0 License

## References

- [GroundingDINO](https://github.com/IDEA-Research/GroundingDINO)
- [Segment Anything Model 2 (SAM2)](https://github.com/facebookresearch/segment-anything-2)
- [ROCm Documentation](https://rocm.docs.amd.com/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)

## Support

For issues, please check:
1. Logs: Check console output for errors
2. Health endpoint: `curl http://localhost:8000/health`
3. GPU status: `rocm-smi`
4. Dependencies: Ensure all packages installed correctly

---

**Built with ❤️ using GroundingDINO, SAM2, and FastAPI**
