# ==============================
# Monstrino Service Makefile
# ==============================
DOTENV := .env
SHELL := /bin/bash
.PHONY: run

ifneq (,$(wildcard .env))
    include .env
    export $(shell sed 's/=.*//' .env)
endif

SERVICE_NAME := dolls-importer

MONSTRINO_MODELS_PACKAGE_NAME := monstrino-models
MONSTRINO_MODELS_PACKAGE_PATH := ../../../monstrino-models
MONSTRINO_MODELS_PACKAGE_GIT  := git@github.com:MafiaCoconut/monstrino-models.git
MONSTRINO_MODELS_PACKAGE_TAG  := 0.1.0

MONSTRINO_REPOSITORIES_PACKAGE_NAME := monstrino-repositories
MONSTRINO_REPOSITORIES_PACKAGE_PATH := ../../../monstrino-repositories
MONSTRINO_REPOSITORIES_PACKAGE_GIT  := git@github.com:MafiaCoconut/monstrino-repositories.git
MONSTRINO_REPOSITORIES_PACKAGE_TAG  := 0.1.0

ENV ?= dev




run:
	cd src && poetry run uvicorn main:app --reload --port 8010 --log-config infrastructure/logging/logging_config.json

switch-monstrino-models-dev:
	@echo "🔧 Switching $(MONSTRINO_MODELS_PACKAGE_NAME) to local editable path..."
	poetry remove $(MONSTRINO_MODELS_PACKAGE_NAME) || true
	poetry add --editable $(MONSTRINO_MODELS_PACKAGE_PATH)
	@echo "✅ $(MONSTRINO_MODELS_PACKAGE_NAME) installed locally (editable)."

switch-monstrino-models-prod:
	@echo "🚀 Устанавливаем $(MONSTRINO_MODELS_PACKAGE_NAME) by SSH Git ($(MONSTRINO_MODELS_PACKAGE_TAG))..."
	poetry remove $(MONSTRINO_MODELS_PACKAGE_NAME) || true
	poetry add git+ssh://$(MONSTRINO_MODELS_PACKAGE_GIT)
	@echo "✅ $(MONSTRINO_MODELS_PACKAGE_NAME) installed from Git by SSH."

switch-monstrino-repositories-dev:
	@echo "🔧 Switching $(MONSTRINO_REPOSITORIES_PACKAGE_NAME) to local editable path..."
	poetry remove $(MONSTRINO_REPOSITORIES_PACKAGE_NAME) || true
	poetry add --editable $(MONSTRINO_REPOSITORIES_PACKAGE_PATH)
	@echo "✅ $(MONSTRINO_REPOSITORIES_PACKAGE_NAME) installed locally (editable)."

switch-monstrino-repositories-prod:
	@echo "🚀 Install $(MONSTRINO_REPOSITORIES_PACKAGE_NAME) by SSH Git ($(MONSTRINO_REPOSITORIES_PACKAGE_TAG))..."
	poetry remove $(MONSTRINO_REPOSITORIES_PACKAGE_NAME) || true
	poetry add git+ssh://$(MONSTRINO_REPOSITORIES_PACKAGE_GIT)
	@echo "✅ $(MONSTRINO_REPOSITORIES_PACKAGE_NAME) installed from Git by SSH."




dev: switch-monstrino-models-dev switch-monstrino-repositories-dev

# === PROD MODE: использовать git tag ===
prod: switch-monstrino-models-prod switch-monstrino-repositories-prod
