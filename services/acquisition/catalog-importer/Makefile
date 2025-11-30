# =========================================
# ‖  Monstrino Importer Service Makefile  ‖
# =========================================
DOTENV := .env
SHELL := /bin/bash
.PHONY: run dev prod pytest

ifneq (,$(wildcard .env))
    include .env
    export $(shell sed 's/=.*//' .env)
endif

ENV ?= dev

# ========== Service Name ==========
SERVICE_NAME := catalog-importer-service

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



# =========== Commands ===========
run:
	cd src && poetry run uvicorn main:app --reload --port 8010 --log-config infrastructure/logging/logging_config.json

pytest:
	poetry run pytest -q --disable-warnings --tb=short

pytest-with-logs:
	poetry run pytest --log-cli-level=INFO -s -ra $(ARGS)


