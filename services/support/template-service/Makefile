# =========================================
# ‖  Monstrino Template Service Makefile  ‖
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
SERVICE_NAME := template-service

# ======== Paths ==========
ROOT_DIR       := ../../..
MAKEFILES_PATH := $(ROOT_DIR)/Makefiles
PACKAGES_DIR   := $(ROOT_DIR)/packages

# ======== Include Makefiles ==========
include $(MAKEFILES_PATH)/monstrino-packages.mk
include $(MAKEFILES_PATH)/run.mk
include $(MAKEFILES_PATH)/pytest.mk



# ========== Monstrino Packages (LOCAL_DEPS) ==========
LOCAL_DEPS := \
    $(PACKAGES_DIR)/monstrino-core \
    $(PACKAGES_DIR)/monstrino-models \
    $(PACKAGES_DIR)/monstrino-repositories \
    $(PACKAGES_DIR)/monstrino-testing


# =========== Commands ===========
run:
	cd src && poetry run uvicorn main:app --reload --port 8010 --log-config infrastructure/logging/logging_config.json

pytest:
	poetry run pytest -q --disable-warnings --tb=short

pytest-with-logs:
	poetry run pytest --log-cli-level=INFO -s -ra $(ARGS)


