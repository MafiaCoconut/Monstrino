# =====================================
# ‖  Monstrino Base Package Makefile  ‖
# =====================================
SHELL := /bin/bash

# --- Params, which package should know before include ---
# PACKAGE_NAME
# PACKAGE_TAG  (опционально)
# PACKAGE_DIR  (опционально, default = src/$(PACKAGE_NAME))

PACKAGE_DIR ?= $(PACKAGE_NAME)
POETRY ?= poetry
PYTHON ?= $(shell which python3)

.PHONY: build clean test tag publish bump-version check-version info

# =======================================
# 🔧 BUILD / TEST / CLEAN
# =======================================

build:
	@echo "🔧 Building $(PACKAGE_NAME)..."
	$(POETRY) build
	@echo "✅ Built successfully."

test:
	@echo "🧪 Running tests for $(PACKAGE_NAME)..."
	$(POETRY) run pytest -q --disable-warnings --tb=short

clean:
	@echo "🧹 Cleaning $(PACKAGE_NAME)..."
	rm -rf dist build *.egg-info
	find . -type d -name "__pycache__" -exec rm -rf {} +
	@echo "✅ Clean complete."

# =======================================
# 🚀 VERSION CONTROL / PUBLISH
# =======================================

check-version:
	@if [ -z "$$(git status --porcelain)" ]; then \
		echo "✅ Working tree clean."; \
	else \
		echo "❌ Working tree not clean! Commit or stash changes before tagging."; \
		exit 1; \
	fi

tag: check-version
	@echo "🏷️  Tagging v$(PACKAGE_TAG)..."
	git tag -a v$(PACKAGE_TAG) -m "Release $(PACKAGE_TAG)"
	git push origin v$(PACKAGE_TAG)
	@echo "✅ Tagged $(PACKAGE_NAME) v$(PACKAGE_TAG)."

#publish: build
#	@echo "🚀 Publishing $(PACKAGE_NAME) to PyPI..."
#	$(POETRY) publish --build
#	@echo "✅ Published successfully."

bump-version:
	@echo "📈 Updating version to $(PACKAGE_TAG)..."
	sed -i "s/^version = .*/version = \"$(PACKAGE_TAG)\"/" pyproject.toml
	@echo "✅ Version updated."

# =======================================
# ℹ️  INFO
# =======================================

info:
	@echo "📦  Package: $(PACKAGE_NAME)"
	@echo "🏷️  Version: $(PACKAGE_TAG)"
	@echo "📂  Directory: $(ROOT_DIR)/packages/$(PACKAGE_DIR)"
