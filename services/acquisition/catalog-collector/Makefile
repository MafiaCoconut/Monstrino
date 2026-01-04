# ==========================================
# ‖  Monstrino Catalog Collector Makefile  ‖
# ==========================================
DOTENV := .env
SHELL := /bin/bash
.PHONY: run dev prod pytest run-with-local-bd

ifneq (,$(wildcard .env))
    include .env
    export $(shell sed 's/=.*//' .env)
endif

ENV ?= dev

# ========== Service Name ==========
SERVICE_NAME := catalog-collector

# ======== Include Makefiles ==========
include ../../../Makefiles/common.mk
include $(ROOT_DIR)/Makefiles/monstrino-packages.mk
include $(ROOT_DIR)/Makefiles/run.mk
include $(ROOT_DIR)/Makefiles/pytest.mk

# ========== Monstrino Packages ==========
PACKAGES_DIR := ../../../packages

LOCAL_DEPS := \
    $(PACKAGES_DIR)/monstrino-core \
    $(PACKAGES_DIR)/monstrino-models \
    $(PACKAGES_DIR)/monstrino-repositories \
    $(PACKAGES_DIR)/monstrino-testing \
    $(PACKAGES_DIR)/monstrino-api \
    $(PACKAGES_DIR)/monstrino-infra \

# =========== Commands ===========
run:
	DB_MODE=test PYTHONPATH=src \
	uv run uvicorn src.main:app --reload --reload-exclude "*.log" --port 8010 --log-config src/infra/logging/logging_config.json

run-with-local-bd:
	DB_MODE=local PYTHONPATH=src \
	uv run uvicorn src.main:app --reload --reload-exclude "*.log" --port 8010 --log-config src/infra/logging/logging_config.json

pytest:
	poetry run pytest -q --disable-warnings --tb=short

pytest-with-logs:
	poetry run pytest --log-cli-level=INFO -s -ra $(ARGS)


