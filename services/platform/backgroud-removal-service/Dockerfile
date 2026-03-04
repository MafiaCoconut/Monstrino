# Dockerfile for Background Removal Service
# Optimized for AMD Radeon GPU (ROCm)

FROM rocm/dev-ubuntu-22.04:6.2

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    python3.14 \
    python3.14-dev \
    python3-pip \
    git \
    wget \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Set Python 3.14 as default
RUN update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.14 1
RUN update-alternatives --install /usr/bin/python python /usr/bin/python3.14 1

# Upgrade pip
RUN python3 -m pip install --upgrade pip setuptools wheel

# Install PyTorch with ROCm support
RUN pip3 install torch torchvision --index-url https://download.pytorch.org/whl/rocm6.2

# Copy requirements
COPY requirements.txt .

# Install Python dependencies
RUN pip3 install -r requirements.txt

# Install GroundingDINO and SAM2 from git
RUN pip3 install git+https://github.com/IDEA-Research/GroundingDINO.git
RUN pip3 install git+https://github.com/facebookresearch/segment-anything-2.git

# Copy application code
COPY app/ ./app/
COPY .env.example .env

# Create directories for models and cache
RUN mkdir -p /app/models /app/cache/huggingface /app/cache/torch

# Expose port
EXPOSE 8000

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV MODEL_DIR=/app/models
ENV HF_HOME=/app/cache/huggingface
ENV TORCH_HOME=/app/cache/torch
ENV DEVICE=auto

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD python3 -c "import requests; requests.get('http://localhost:8000/health')"

# Run the application
CMD ["python3", "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
