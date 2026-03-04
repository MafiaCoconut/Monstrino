.PHONY: help setup run run-prod run-docker test clean docker-build docker-up docker-down health

# Default target
.DEFAULT_GOAL := help

# Variables
PYTHON := python3.12
VENV_DIR := .venv
VENV_PYTHON := $(VENV_DIR)/bin/python
VENV_PIP := $(VENV_DIR)/bin/pip
HOST := 0.0.0.0
PORT := 8000

help: ## Show this help message
	@echo "╔══════════════════════════════════════════════════════════════════╗"
	@echo "║          Background Removal Service - Makefile                  ║"
	@echo "╚══════════════════════════════════════════════════════════════════╝"
	@echo ""
	@echo "Available commands:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'
	@echo ""
	@echo "Quick start:"
	@echo "  1. make setup    # Install dependencies"
	@echo "  2. make run      # Start the service"
	@echo "  3. make test     # Run tests"
	@echo ""

setup: ## Initialize environment and install dependencies
	@echo "🚀 Setting up Background Removal Service..."
	@echo ""
	@echo "📌 Checking Python version..."
	@$(PYTHON) --version || (echo "❌ Python 3.10+ required" && exit 1)
	@echo ""
	@echo "📌 Creating virtual environment..."
	@test -d $(VENV_DIR) || $(PYTHON) -m venv $(VENV_DIR)
	@echo "✅ Virtual environment created"
	@echo ""
	@echo "📌 Upgrading pip..."
	@$(VENV_PIP) install --upgrade pip setuptools wheel -q
	@echo "✅ pip upgraded"
	@echo ""
	@echo "📌 Installing PyTorch with ROCm support..."
	@if command -v rocm-smi > /dev/null 2>&1; then \
		echo "   ROCm detected, installing PyTorch with ROCm..."; \
		$(VENV_PIP) install torch torchvision --index-url https://download.pytorch.org/whl/rocm6.2 -q; \
	else \
		echo "   ROCm not found, installing CPU-only PyTorch..."; \
		$(VENV_PIP) install torch torchvision -q; \
	fi
	@echo "✅ PyTorch installed"
	@echo ""
	@echo "📌 Installing dependencies..."
	@$(VENV_PIP) install -r requirements.txt -q
	@echo "✅ Dependencies installed"
	@echo ""
	@echo "📌 Installing build tools (ninja)..."
	@$(VENV_PIP) install ninja -q
	@echo "✅ Build tools installed"
	@echo ""
	@echo "📌 Installing GroundingDINO..."
	@$(VENV_PIP) install --no-build-isolation git+https://github.com/IDEA-Research/GroundingDINO.git -q
	@echo "✅ GroundingDINO installed"
	@echo ""
	@echo "📌 Installing SAM2..."
	@$(VENV_PIP) install --no-build-isolation git+https://github.com/facebookresearch/segment-anything-2.git -q
	@echo "✅ SAM2 installed"
	@echo ""
	@echo "📌 Creating directories..."
	@mkdir -p models cache/huggingface cache/torch
	@echo "✅ Directories created"
	@echo ""
	@echo "📌 Creating .env file..."
	@test -f .env || cp .env.example .env
	@echo "✅ .env file ready"
	@echo ""
	@echo "✅ Setup complete!"
	@echo ""
	@echo "Next steps:"
	@echo "  - Run: make run"
	@echo "  - Test: make health"
	@echo ""

run: ## Run the service in development mode
	@echo "🚀 Starting Background Removal Service..."
	@echo ""
	@if [ ! -d $(VENV_DIR) ]; then \
		echo "❌ Virtual environment not found. Run 'make setup' first."; \
		exit 1; \
	fi
	@echo "📍 Service will be available at: http://$(HOST):$(PORT)"
	@echo "📍 Health check: http://$(HOST):$(PORT)/health"
	@echo "📍 API docs: http://$(HOST):$(PORT)/docs"
	@echo ""
	@echo "Press Ctrl+C to stop"
	@echo ""
	@$(VENV_PYTHON) -m app.main

run-prod: ## Run the service in production mode with Uvicorn
	@echo "🚀 Starting Background Removal Service (Production)..."
	@echo ""
	@if [ ! -d $(VENV_DIR) ]; then \
		echo "❌ Virtual environment not found. Run 'make setup' first."; \
		exit 1; \
	fi
	@echo "📍 Service will be available at: http://$(HOST):$(PORT)"
	@echo ""
	@$(VENV_DIR)/bin/uvicorn app.main:app --host $(HOST) --port $(PORT) --workers 1

test: ## Run tests
	@echo "🧪 Running tests..."
	@if [ ! -d $(VENV_DIR) ]; then \
		echo "❌ Virtual environment not found. Run 'make setup' first."; \
		exit 1; \
	fi
	@$(VENV_DIR)/bin/pytest -v

test-quick: ## Run quick tests (unit tests only)
	@echo "🧪 Running unit tests..."
	@if [ ! -d $(VENV_DIR) ]; then \
		echo "❌ Virtual environment not found. Run 'make setup' first."; \
		exit 1; \
	fi
	@$(VENV_DIR)/bin/pytest tests/test_mask_postprocessing.py -v

test-service: ## Run end-to-end service tests
	@echo "🧪 Running service tests..."
	@if [ ! -d $(VENV_DIR) ]; then \
		echo "❌ Virtual environment not found. Run 'make setup' first."; \
		exit 1; \
	fi
	@$(VENV_PYTHON) test_service.py

health: ## Check service health
	@echo "🏥 Checking service health..."
	@curl -s http://localhost:$(PORT)/health | jq . || echo "❌ Service not responding. Is it running?"

docker-build: ## Build Docker image
	@echo "🐳 Building Docker image..."
	@docker build -t background-removal-service .

docker-up: ## Start service with Docker Compose
	@echo "🐳 Starting service with Docker Compose..."
	@docker-compose up -d
	@echo "✅ Service started"
	@echo "📍 Available at: http://localhost:$(PORT)"

docker-down: ## Stop service with Docker Compose
	@echo "🐳 Stopping service..."
	@docker-compose down
	@echo "✅ Service stopped"

docker-logs: ## Show Docker logs
	@docker-compose logs -f

clean: ## Clean cache and temporary files
	@echo "🧹 Cleaning..."
	@rm -rf __pycache__ .pytest_cache .mypy_cache .ruff_cache
	@find . -type d -name __pycache__ -exec rm -rf {} + 2>/dev/null || true
	@find . -type f -name "*.pyc" -delete 2>/dev/null || true
	@echo "✅ Cache cleaned"

clean-all: clean ## Clean everything including models and venv
	@echo "🧹 Cleaning all..."
	@rm -rf $(VENV_DIR) models/ cache/
	@echo "✅ Everything cleaned"
	@echo "⚠️  Run 'make setup' to reinstall"

format: ## Format code with black and ruff
	@echo "✨ Formatting code..."
	@$(VENV_DIR)/bin/black app/ tests/ || pip install black && $(VENV_DIR)/bin/black app/ tests/
	@$(VENV_DIR)/bin/ruff check app/ tests/ --fix || pip install ruff && $(VENV_DIR)/bin/ruff check app/ tests/ --fix
	@echo "✅ Code formatted"

lint: ## Lint code with ruff
	@echo "🔍 Linting code..."
	@$(VENV_DIR)/bin/ruff check app/ tests/ || pip install ruff && $(VENV_DIR)/bin/ruff check app/ tests/

type-check: ## Check types with mypy
	@echo "🔍 Type checking..."
	@$(VENV_DIR)/bin/mypy app/ || pip install mypy && $(VENV_DIR)/bin/mypy app/

info: ## Show environment information
	@echo "ℹ️  Environment Information"
	@echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
	@echo "Python version:"
	@$(PYTHON) --version 2>&1 || echo "  Not found"
	@echo ""
	@echo "Virtual environment:"
	@if [ -d $(VENV_DIR) ]; then echo "  ✅ Created"; else echo "  ❌ Not found (run 'make setup')"; fi
	@echo ""
	@echo "ROCm:"
	@if command -v rocm-smi > /dev/null 2>&1; then \
		echo "  ✅ Installed"; \
		rocm-smi --showproductname 2>/dev/null | head -3 | sed 's/^/  /'; \
	else \
		echo "  ❌ Not found (will use CPU)"; \
	fi
	@echo ""
	@echo "Docker:"
	@if command -v docker > /dev/null 2>&1; then echo "  ✅ Installed ($(shell docker --version))"; else echo "  ❌ Not found"; fi
	@echo ""
	@echo "Service status:"
	@if curl -s http://localhost:$(PORT)/health > /dev/null 2>&1; then \
		echo "  ✅ Running (http://localhost:$(PORT))"; \
	else \
		echo "  ❌ Not running"; \
	fi

quickstart: ## Show quick start guide
	@./QUICKSTART.sh

install-dev: ## Install development dependencies
	@echo "📦 Installing development dependencies..."
	@$(VENV_PIP) install pytest pytest-asyncio httpx black ruff mypy
	@echo "✅ Development dependencies installed"
