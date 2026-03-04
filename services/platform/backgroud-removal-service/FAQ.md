# Frequently Asked Questions (FAQ)

## Installation & Setup

### Q: What Python version is required?
**A:** Python 3.10+ is required. Python 3.14 is recommended for best performance.

### Q: Can I use this without a GPU?
**A:** Yes! The service automatically falls back to CPU if no GPU is detected. However, inference will be slower (3-10x depending on image size).

### Q: Do I need ROCm for AMD GPUs?
**A:** Yes, ROCm 6.2+ is required for AMD GPU acceleration. Without ROCm, the service will use CPU mode.

### Q: Can I use this with NVIDIA GPUs?
**A:** The service is optimized for AMD ROCm, but you can modify it for CUDA by:
1. Installing PyTorch with CUDA: `pip3 install torch torchvision`
2. Setting `DEVICE=cuda` in `.env`

### Q: How much VRAM do I need?
**A:** 
- Minimum: 6GB VRAM (for SAM2 tiny + GroundingDINO)
- Recommended: 8GB+ VRAM (for SAM2 small + GroundingDINO)
- For SAM2 large: 12GB+ VRAM

### Q: Models won't download. What should I do?
**A:** 
1. Check internet connection
2. Check HuggingFace is accessible: `ping huggingface.co`
3. If behind proxy, set: `export HTTP_PROXY=http://proxy:port`
4. Clear cache: `rm -rf cache/ models/` and retry
5. Manual download: Download from HuggingFace and place in `models/` directory

## Usage

### Q: What makes a good prompt?
**A:** 
- ✅ **Good prompts**: Specific descriptions
  - "the red backpack"
  - "person wearing blue shirt"
  - "white coffee mug on table"
  - "black cat"

- ❌ **Poor prompts**: Generic or ambiguous
  - "object"
  - "thing"
  - Single word without context (depends on image)

### Q: Can I extract multiple objects at once?
**A:** Yes, use `mode=all`. This will detect all objects matching the prompt and combine them into a single mask.

### Q: How do I choose between "best", "largest", and "all" modes?
**A:** 
- `best`: Use when you want the most confident detection (default)
- `largest`: Use when you want the biggest object in the scene
- `all`: Use when you want all objects matching the prompt

### Q: What's the difference between PNG and WebP output?
**A:** 
- **PNG**: Better transparency support, larger file size, universally supported
- **WebP**: Smaller file size, good transparency, not supported by all applications

### Q: Can I use this for batch processing?
**A:** Yes! See [EXAMPLES.md](EXAMPLES.md) for batch processing scripts in Bash and Python.

### Q: Why is my object not detected?
**A:** 
1. **Prompt too generic**: Make it more specific
2. **Low confidence**: Try lowering `BOX_THRESHOLD` in `.env`
3. **Object too small**: Object might be below minimum size
4. **Unusual angle/occlusion**: Model may struggle with unusual viewpoints
5. **Try different wording**: "person" vs "man" vs "woman"

## Performance

### Q: How fast is inference?
**A:** On AMD Radeon RX 7900 XTX:
- 640x480: ~800ms
- 1920x1080: ~1500ms
- 3840x2160: ~2800ms

Times include detection + segmentation + postprocessing.

### Q: How can I make it faster?
**A:**
1. Reduce image size: Set `MAX_IMAGE_SIZE=1024` in `.env`
2. Use smaller SAM2 model: Edit `segmentation.py` to use `sam2_hiera_tiny.pt`
3. Disable postprocessing: Modify `routes.py` to skip postprocessing steps
4. Use GPU: Ensure ROCm is properly installed

### Q: Why is first request slow?
**A:** Models are loaded on first request. Subsequent requests will be much faster. You can pre-warm the models by making a dummy request after startup.

### Q: Can I run multiple workers?
**A:** Not recommended. Models are loaded per worker, consuming VRAM. Use `--workers 1`.

### Q: How much memory does it use?
**A:**
- CPU RAM: ~4-6GB during inference
- GPU VRAM: ~6-8GB (depends on model size)
- Disk (models): ~2.5GB

## Troubleshooting

### Q: Error: "ROCm not found"
**A:** 
1. Check ROCm installation: `rocm-smi`
2. Check PyTorch sees GPU: `python3 -c "import torch; print(torch.cuda.is_available())"`
3. Reinstall PyTorch with ROCm: `pip3 install torch --index-url https://download.pytorch.org/whl/rocm6.2`

### Q: Error: "CUDA out of memory"
**A:**
1. Reduce image size: `MAX_IMAGE_SIZE=1024`
2. Use CPU: `DEVICE=cpu`
3. Close other GPU applications
4. Use smaller model: SAM2 tiny instead of small

### Q: Error: "GroundingDINO not found"
**A:** Install GroundingDINO:
```bash
pip install git+https://github.com/IDEA-Research/GroundingDINO.git
```

### Q: Error: "SAM2 not found"
**A:** Install SAM2:
```bash
pip install git+https://github.com/facebookresearch/segment-anything-2.git
```

### Q: Service crashes on startup
**A:**
1. Check Python version: `python3 --version` (need 3.10+)
2. Check dependencies: `pip install -r requirements.txt`
3. Check logs for specific error
4. Try running test: `python3 test_service.py`

### Q: Segmentation quality is poor
**A:**
1. Try different prompt wording
2. Adjust thresholds in `.env`:
   - `BOX_THRESHOLD=0.3` (lower = more detections)
   - `TEXT_THRESHOLD=0.2` (lower = more permissive)
3. Try different modes: `mode=largest` instead of `mode=best`
4. Check if object is clearly visible in image

### Q: Mask has holes or artifacts
**A:** The postprocessing should handle this automatically. If issues persist:
1. Increase `FEATHER_RADIUS` for softer edges
2. Increase `MIN_MASK_AREA` to remove small artifacts
3. Enable hole filling: `FILL_HOLES=true`

## Docker

### Q: How do I enable GPU in Docker?
**A:** For AMD GPUs:
```bash
docker run --device=/dev/kfd --device=/dev/dri --group-add video ...
```

### Q: Docker build fails
**A:**
1. Check Docker version: `docker --version` (need 20.10+)
2. Check disk space: `df -h`
3. Try building with more memory: `docker build --memory 8g .`

### Q: Container exits immediately
**A:**
1. Check logs: `docker logs <container-id>`
2. Check if ports are available: `lsof -i :8000`
3. Try running interactively: `docker run -it ...`

## Development

### Q: How do I run tests?
**A:**
```bash
pytest
pytest tests/test_api.py -v
pytest --cov=app tests/
```

### Q: How do I add a new model?
**A:** Edit `app/services/segmentation.py`:
1. Add model loader in `_load_your_model()` method
2. Modify detection/segmentation logic
3. Update model info in response

### Q: How do I customize postprocessing?
**A:** Edit `app/utils/mask_postprocessing.py`:
1. Add your custom function
2. Call it in `postprocess_mask()` pipeline
3. Add configuration options in `config.py`

### Q: How do I add authentication?
**A:** Add middleware in `app/main.py`:
```python
from fastapi import Security, HTTPException
from fastapi.security import HTTPBearer

security = HTTPBearer()

@app.middleware("http")
async def auth_middleware(request, call_next):
    # Your auth logic
    ...
```

### Q: How do I add rate limiting?
**A:** Use `slowapi`:
```bash
pip install slowapi
```

Then in `app/main.py`:
```python
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
```

## Production

### Q: How do I deploy to production?
**A:**
1. Use Docker: `docker-compose up -d`
2. Use reverse proxy (nginx) for HTTPS
3. Set up monitoring (Prometheus/Grafana)
4. Configure proper logging
5. Set up health checks
6. Use environment variables for secrets

### Q: How many requests per second can it handle?
**A:** 
- With GPU: ~1-2 RPS (depending on image size)
- With CPU: ~0.1-0.3 RPS
- For higher throughput, use multiple instances behind a load balancer

### Q: How do I monitor the service?
**A:**
1. Health endpoint: `GET /health`
2. Check logs: structured JSON logs
3. Add Prometheus metrics (custom integration)
4. Monitor GPU: `watch -n 1 rocm-smi`

### Q: How do I scale horizontally?
**A:**
1. Deploy multiple instances
2. Use load balancer (nginx, HAProxy)
3. Each instance needs its own GPU (or use CPU)
4. Share model cache via volume

### Q: What about data privacy?
**A:** 
- All processing is local (no cloud APIs)
- Images are not stored (processed in memory)
- No telemetry or external requests (except model downloads)
- Suitable for sensitive data

## Miscellaneous

### Q: What license is this?
**A:** Check LICENSE file. Models used:
- GroundingDINO: Apache 2.0
- SAM2: Apache 2.0

### Q: Can I use this commercially?
**A:** Check the licenses of the models used. Both GroundingDINO and SAM2 are Apache 2.0, which allows commercial use.

### Q: How do I contribute?
**A:**
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

### Q: Where can I get help?
**A:**
1. Check README.md and EXAMPLES.md
2. Check logs for error messages
3. Run test suite: `python3 test_service.py`
4. Check issues on GitHub
5. Consult model documentation (GroundingDINO, SAM2)

### Q: Can I use other segmentation models?
**A:** Yes! Edit `app/services/segmentation.py` to integrate:
- SAM (original)
- MobileSAM
- FastSAM
- Other open-vocabulary detectors (OWL-ViT, etc.)

### Q: Does it work with videos?
**A:** Not directly, but you can:
1. Extract frames from video
2. Process each frame via API
3. Reassemble into video

### Q: Can I run this on Windows/Mac?
**A:** 
- **Windows**: Possible with WSL2 + ROCm (limited support)
- **Mac**: CPU mode only (no ROCm support)
- Recommended: Linux for best performance

### Q: How accurate is the segmentation?
**A:** Depends on:
- Image quality
- Object visibility
- Prompt specificity
- Model configuration

For optimal results, use high-quality images with clear objects and specific prompts.
