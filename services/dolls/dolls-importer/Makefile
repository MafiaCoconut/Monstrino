# ==============================
# Monstrino Service Makefile
# ==============================
DOTENV := .env

ifneq (,$(wildcard .env))
    include .env
    export $(shell sed 's/=.*//' .env)
endif

SERVICE_NAME := dolls-importer
PACKAGE_NAME := monstrino-models
GITHUB_TOKEN ?= none
PACKAGE_PATH := ../../../monstrino-models
PACKAGE_GIT  := git@github.com:MafiaCoconut/monstrino-models.git
PACKAGE_TAG  := 0.1.0
ENV ?= dev



SHELL := /bin/bash

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
	@echo "🚀 Устанавливаем $(PACKAGE_NAME) через SSH Git ($(PACKAGE_TAG))..."
	poetry remove $(PACKAGE_NAME) || true
	GIT_SSH_COMMAND=poetry add git+ssh://$(PACKAGE_GIT)
	@echo "✅ $(PACKAGE_NAME) установлен из Git по SSH."