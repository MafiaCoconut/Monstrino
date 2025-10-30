# ==============================
# Monstrino Service Makefile
# ==============================

SERVICE_NAME := dolls-importer
PACKAGE_NAME := monstrino-models
PACKAGE_PATH := ../../../monstrino-models
PACKAGE_GIT  := https://github.com/MafiaCoconut/monstrino-models.git
PACKAGE_TAG  := v0.1.0
ENV ?= dev

SHELL := /bin/bash
DOTENV := .env
.PHONY: run

run:
	cd src && poetry run uvicorn main:app --reload --port 8010 --log-config infrastructure/logging/logging_config.json

dev:
	@echo "🔧 Switching $(PACKAGE_NAME) to local editable path..."
	poetry remove $(PACKAGE_NAME) || true
	poetry add --editable $(PACKAGE_PATH)
	@echo "✅ $(PACKAGE_NAME) установлен локально (editable)."

# === PROD MODE: использовать git tag ===
prod:
	@echo "🚀 Switching $(PACKAGE_NAME) to Git-tag $(PACKAGE_TAG)..."
	poetry remove $(PACKAGE_NAME) || true
	poetry add git+$(PACKAGE_GIT)@$(PACKAGE_TAG)
	@echo "✅ $(PACKAGE_NAME) установлен из Git ($(PACKAGE_TAG))."