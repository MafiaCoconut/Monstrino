# Project Structure

```
background-removal-service/
├── app/                          # Main application package
│   ├── __init__.py              # Package initializer
│   ├── main.py                  # FastAPI application entry point
│   ├── config.py                # Configuration management with Pydantic
│   │
│   ├── api/                     # API layer
│   │   ├── __init__.py
│   │   └── routes.py            # API endpoints (/cutout, /health, /)
│   │
│   ├── core/                    # Core functionality
│   │   ├── __init__.py
│   │   ├── logging.py           # Structured logging with structlog
│   │   └── exceptions.py        # Custom exception classes
│   │
│   ├── services/                # Business logic services
│   │   ├── __init__.py
│   │   ├── model_loader.py      # Model loading & device management
│   │   └── segmentation.py      # GroundingDINO + SAM2 pipeline
│   │
│   └── utils/                   # Utility functions
│       ├── __init__.py
│       ├── image_processing.py       # Image loading, encoding, cropping
│       └── mask_postprocessing.py    # Mask cleanup and refinement
│
├── tests/                       # Test suite
│   ├── __init__.py
│   ├── test_api.py              # API endpoint tests
│   └── test_mask_postprocessing.py   # Mask utility tests
│
├── pyproject.toml              # Project metadata (Poetry/pip)
├── requirements.txt            # Python dependencies
├── setup.sh                    # Quick setup script
├── test_service.py             # End-to-end test script
│
├── Dockerfile                  # Docker image for ROCm
├── docker-compose.yml          # Docker Compose configuration
├── .env.example                # Example environment variables
├── .gitignore                  # Git ignore rules
│
├── README.md                   # Main documentation
├── EXAMPLES.md                 # API usage examples
├── FAQ.md                      # Frequently asked questions
├── CHANGELOG.md                # Version history
└── PROJECT_STRUCTURE.md        # This file

# Generated at runtime:
├── models/                     # Downloaded model weights (not in git)
│   ├── groundingdino_swint_ogc.pth
│   └── sam2_hiera_small.pt
│
└── cache/                      # Model cache directories (not in git)
    ├── huggingface/
    └── torch/
```

## Module Descriptions

### `app/main.py`
FastAPI application initialization with:
- CORS middleware
- Lifespan management (startup/shutdown)
- Router inclusion
- Uvicorn configuration

### `app/config.py`
Configuration management using Pydantic Settings:
- Environment variable loading
- Type validation
- Default values
- Directory creation

### `app/api/routes.py`
API endpoints:
- `POST /cutout` - Main object extraction endpoint
- `GET /health` - Health check with model status
- `GET /` - Service information

### `app/core/logging.py`
Structured logging setup:
- JSON logs for production
- Console logs for development
- Log level configuration
- Context management

### `app/core/exceptions.py`
Custom exceptions:
- `BackgroundRemovalError` - Base exception
- `ModelLoadError` - Model loading failures
- `ImageProcessingError` - Image processing errors
- `DetectionError` - Object detection failures
- `SegmentationError` - Segmentation failures
- `InvalidInputError` - Input validation errors

### `app/services/model_loader.py`
Model loading and device management:
- `detect_device()` - Auto-detect ROCm/CUDA/CPU
- `download_model_weights()` - Download from HuggingFace
- `get_sam2_checkpoint()` - SAM2 model retrieval
- `get_groundingdino_checkpoint()` - GroundingDINO retrieval
- `DeviceManager` - Device abstraction

### `app/services/segmentation.py`
Segmentation pipeline:
- `SegmentationService` - Main service class
- `_load_grounding_dino()` - Load detection model
- `_load_sam2()` - Load segmentation model
- `detect_objects()` - Text-based object detection
- `segment_object()` - Mask generation from bbox
- `process()` - Full pipeline with mode selection

### `app/utils/image_processing.py`
Image utilities:
- `load_image_from_bytes()` - Load and resize images
- `apply_mask_to_image()` - Create transparent background
- `encode_image_to_bytes()` - Encode to PNG/WebP
- `encode_image_to_base64()` - Base64 encoding
- `calculate_bbox_from_mask()` - Bbox calculation

### `app/utils/mask_postprocessing.py`
Mask postprocessing:
- `remove_small_components()` - Remove artifacts
- `fill_holes()` - Fill mask holes
- `feather_edges()` - Soft edge feathering
- `smooth_mask_edges()` - Morphological smoothing
- `postprocess_mask()` - Full pipeline
- `combine_masks()` - Merge multiple masks
- `dilate_mask()` / `erode_mask()` - Morphological ops

### `tests/test_api.py`
API tests:
- Health check endpoint
- Parameter validation
- Error handling
- Binary and JSON responses
- Different modes and formats

### `tests/test_mask_postprocessing.py`
Mask utility tests:
- Component removal
- Hole filling
- Feathering
- Edge smoothing
- Mask combination
- Dilation/erosion

### `test_service.py`
End-to-end verification:
- Device detection test
- Segmentation pipeline test
- Postprocessing test
- Full workflow test

## Data Flow

```
HTTP Request (multipart/form-data)
    ↓
FastAPI Router (app/api/routes.py)
    ↓
Image Loading (app/utils/image_processing.py)
    ↓
GroundingDINO Detection (app/services/segmentation.py)
    ↓
SAM2 Segmentation (app/services/segmentation.py)
    ↓
Mask Postprocessing (app/utils/mask_postprocessing.py)
    ↓
Apply Mask (app/utils/image_processing.py)
    ↓
Encode Output (PNG/WebP)
    ↓
HTTP Response (binary image or JSON)
```

## Configuration Files

### `.env`
Environment variables:
```bash
MODEL_DIR=./models              # Model storage
DEVICE=auto                     # Device selection
MAX_IMAGE_SIZE=2048             # Max dimension
BOX_THRESHOLD=0.35              # Detection threshold
TEXT_THRESHOLD=0.25             # Text matching threshold
MIN_MASK_AREA=100               # Min mask pixels
FEATHER_RADIUS=3                # Edge feathering
FILL_HOLES=true                 # Enable hole filling
```

### `pyproject.toml`
Project metadata and dependencies (Poetry-compatible)

### `requirements.txt`
Direct pip installation list

### `Dockerfile`
ROCm-enabled Docker image:
- Base: `rocm/dev-ubuntu-22.04:6.2`
- Python 3.14
- PyTorch with ROCm
- Model dependencies

### `docker-compose.yml`
Service composition with GPU support

## Development Workflow

1. **Setup**: Run `./setup.sh` for automated installation
2. **Configure**: Edit `.env` for custom settings
3. **Test**: Run `python3 test_service.py` for verification
4. **Develop**: Edit code in `app/`
5. **Test**: Run `pytest` for unit tests
6. **Run**: Start with `python3 -m app.main`
7. **Deploy**: Use Docker or direct deployment

## Extension Points

### Add New Detection Model
Edit `app/services/segmentation.py`:
```python
def _load_your_detector(self):
    # Load your model
    return model

def detect_objects(self, image, prompt):
    # Your detection logic
    return detections
```

### Add New Segmentation Model
Edit `app/services/segmentation.py`:
```python
def _load_your_segmenter(self):
    # Load your model
    return model

def segment_object(self, image, detection):
    # Your segmentation logic
    return mask
```

### Add Custom Postprocessing
Edit `app/utils/mask_postprocessing.py`:
```python
def your_postprocess(mask: np.ndarray) -> np.ndarray:
    # Your logic
    return processed_mask

# Add to pipeline in postprocess_mask()
```

### Add New Endpoint
Edit `app/api/routes.py`:
```python
@router.post("/your-endpoint")
async def your_endpoint(...):
    # Your logic
    return response
```

### Add Middleware
Edit `app/main.py`:
```python
from your_middleware import YourMiddleware

app.add_middleware(YourMiddleware, ...)
```

## Performance Considerations

- Models are loaded once and cached
- First request triggers model loading (slow)
- Subsequent requests reuse loaded models
- GPU inference is ~5-10x faster than CPU
- Image resizing reduces inference time
- Postprocessing is CPU-bound

## Security Considerations

- No authentication by default (add in production)
- File size limits enforced by FastAPI
- Image format validation
- No data persistence (all in-memory)
- No external API calls (except model downloads)

## Monitoring

- Structured logs (JSON format)
- Health endpoint for readiness checks
- Timing metrics in response
- GPU monitoring via `rocm-smi`

## Deployment Options

1. **Direct**: `python3 -m app.main`
2. **Uvicorn**: `uvicorn app.main:app --host 0.0.0.0 --port 8000`
3. **Docker**: `docker-compose up -d`
4. **Systemd**: Create service unit
5. **Kubernetes**: Create deployment manifests

---

For more information, see [README.md](README.md) and [EXAMPLES.md](EXAMPLES.md).
