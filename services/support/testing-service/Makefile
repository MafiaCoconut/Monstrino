# =========================================
# ‖  Monstrino Sandbox Service Makefile  ‖
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
SERVICE_NAME := testing-service

# ========= Include Makefiles ==========
include ../../../Makefiles/common.mk
include $(ROOT_DIR)/Makefiles/monstrino-packages.mk
include $(ROOT_DIR)/Makefiles/run.mk
include $(ROOT_DIR)/Makefiles/pytest.mk


# ========== Monstrino Packages ==========
PACKAGES_DIR := ../../../packages

LOCAL_DEPS := \
    $(PACKAGES_DIR)/monstrino-core \
    $(PACKAGES_DIR)/monstrino-models \
    $(PACKAGES_DIR)/monstrino-contracts \
    $(PACKAGES_DIR)/monstrino-repositories \
    $(PACKAGES_DIR)/monstrino-api \
    $(PACKAGES_DIR)/monstrino-infra \
    $(PACKAGES_DIR)/monstrino-testing



# =========== Commands ===========

pytest:
	poetry run pytest -q --disable-warnings --tb=short

pytest-with-logs:
	poetry run pytest --log-cli-level=INFO -s -ra $(ARGS)
