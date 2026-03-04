# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-03-02

### Added
- Initial release of Background Removal Service
- GroundingDINO integration for text-based object detection
- SAM2 integration for high-quality segmentation
- AMD Radeon GPU support via ROCm
- CPU fallback when GPU is not available
- FastAPI REST API with `/cutout` endpoint
- Multiple detection modes: `best`, `largest`, `all`
- Mask postprocessing pipeline:
  - Remove small artifacts
  - Fill holes
  - Smooth and feather edges
- Support for PNG and WebP output formats
- Binary and JSON response modes
- Structured logging with structlog
- Comprehensive error handling
- Health check endpoint
- Docker support with ROCm
- Docker Compose configuration
- Automatic model downloading from HuggingFace Hub
- Configuration via environment variables
- Unit tests for mask postprocessing
- Integration tests for API endpoints
- Complete documentation:
  - README.md
  - EXAMPLES.md
  - FAQ.md
- Setup script for easy installation
- Test service script for verification

### Features
- **Text-based object detection**: Describe objects in natural language
- **High-quality segmentation**: State-of-the-art GroundingDINO + SAM2 pipeline
- **GPU acceleration**: Optimized for AMD Radeon GPUs via ROCm
- **Automatic postprocessing**: Clean masks with artifact removal and feathering
- **Flexible output**: PNG/WebP with transparent background
- **Multiple modes**: Extract best match, largest object, or all matching objects
- **Production-ready**: Logging, error handling, health checks, metrics
- **Easy deployment**: Docker support with GPU passthrough

### Configuration
- `MODEL_DIR`: Model weights directory
- `DEVICE`: Device selection (auto/cpu/cuda/rocm)
- `MAX_IMAGE_SIZE`: Maximum image dimension
- `BOX_THRESHOLD`: Detection confidence threshold
- `TEXT_THRESHOLD`: Text matching threshold
- `MIN_MASK_AREA`: Minimum mask area filter
- `FEATHER_RADIUS`: Edge feathering radius
- `FILL_HOLES`: Enable hole filling

### Dependencies
- Python 3.14+
- FastAPI 0.115.0+
- PyTorch 2.4.0+ with ROCm 6.2
- GroundingDINO (from git)
- SAM2 (from git)
- OpenCV, Pillow, NumPy, SciPy

### Performance
- AMD Radeon RX 7900 XTX benchmarks:
  - 640x480: ~800ms inference
  - 1920x1080: ~1500ms inference
  - 3840x2160: ~2800ms inference

### Testing
- Unit tests for mask postprocessing utilities
- Integration tests for API endpoints
- Test service script for end-to-end verification
- Pytest configuration with asyncio support

### Documentation
- Complete README with installation and usage instructions
- API examples for curl, Python, JavaScript
- FAQ covering common questions and issues
- Docker deployment guide
- Performance benchmarks and optimization tips

## [Unreleased]

### Planned Features
- [ ] Batch processing endpoint
- [ ] Video frame processing
- [ ] WebSocket API for streaming
- [ ] Prometheus metrics endpoint
- [ ] Rate limiting
- [ ] Authentication/API keys
- [ ] Model caching improvements
- [ ] Support for SAM2 large model
- [ ] Support for additional output formats (TIFF, BMP)
- [ ] Edge dilation/erosion controls
- [ ] Custom mask refinement options
- [ ] Multi-GPU support
- [ ] Quantized models for faster inference
- [ ] ONNX Runtime support
- [ ] OpenAPI/Swagger UI customization
- [ ] Grafana dashboard templates
- [ ] Kubernetes deployment manifests

### Known Issues
- First request is slow due to model loading (pre-warming recommended)
- Large images (>4K) may cause OOM on GPUs with <8GB VRAM
- Some unusual object descriptions may not match well
- Multi-worker support is limited (models loaded per worker)

### Future Improvements
- Better prompt understanding (e.g., "leftmost", "in the background")
- Improved mask refinement for hair/fur/transparent objects
- Support for instance segmentation (separate masks per object)
- Model compression for faster loading
- Better error messages for common issues
- CLI tool for command-line usage
- Python SDK for easier integration

---

## Version History

- **1.0.0** (2026-03-02): Initial release

---

For detailed changes, see the git commit history.
