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
SERVICE_NAME := sandbox-service

#
include ../../Makefiles/common.mk
include $(ROOT_DIR)/Makefiles/monstrino-packages.mk
include $(ROOT_DIR)/Makefiles/run.mk
include $(ROOT_DIR)/Makefiles/pytest.mk

# ========== Monstrino Packages ==========
MONSTRINO_CORE_PACKAGE_NAME := monstrino-core
MONSTRINO_CORE_PACKAGE_PATH := $(ROOT_DIR)/packages/monstrino-core
MONSTRINO_CORE_PACKAGE_GIT  := git@github.com:MafiaCoconut/monstrino-core.git
MONSTRINO_CORE_PACKAGE_TAG  := 0.1.0

MONSTRINO_MODELS_PACKAGE_NAME := monstrino-models
MONSTRINO_MODELS_PACKAGE_PATH := $(ROOT_DIR)/packages/monstrino-models
MONSTRINO_MODELS_PACKAGE_GIT  := git@github.com:MafiaCoconut/monstrino-models.git
MONSTRINO_MODELS_PACKAGE_TAG  := 0.1.0

MONSTRINO_REPOSITORIES_PACKAGE_NAME := monstrino-repositories
MONSTRINO_REPOSITORIES_PACKAGE_PATH := $(ROOT_DIR)/packages/monstrino-repositories
MONSTRINO_REPOSITORIES_PACKAGE_GIT  := git@github.com:MafiaCoconut/monstrino-repositories.git
MONSTRINO_REPOSITORIES_PACKAGE_TAG  := 0.1.0

$(eval $(call SWITCH_DEV,$(MONSTRINO_CORE_PACKAGE_NAME),$(MONSTRINO_CORE_PACKAGE_PATH)))
$(eval $(call SWITCH_DEV,$(MONSTRINO_MODELS_PACKAGE_NAME),$(MONSTRINO_MODELS_PACKAGE_PATH)))
$(eval $(call SWITCH_DEV,$(MONSTRINO_REPOSITORIES_PACKAGE_NAME),$(MONSTRINO_REPOSITORIES_PACKAGE_PATH)))

$(eval $(call SWITCH_PROD,$(MONSTRINO_CORE_PACKAGE_NAME),$(MONSTRINO_MODELS_PACKAGE_PATH),$(MONSTRINO_CORE_PACKAGE_TAG),$(MONSTRINO_CORE_PACKAGE_GIT)))
$(eval $(call SWITCH_PROD,$(MONSTRINO_MODELS_PACKAGE_NAME),$(MONSTRINO_MODELS_PACKAGE_PATH),$(MONSTRINO_MODELS_PACKAGE_TAG),$(MONSTRINO_MODELS_PACKAGE_GIT)))
$(eval $(call SWITCH_PROD,$(MONSTRINO_REPOSITORIES_PACKAGE_NAME),$(MONSTRINO_REPOSITORIES_PACKAGE_PATH),$(MONSTRINO_REPOSITORIES_PACKAGE_TAG),$(MONSTRINO_REPOSITORIES_PACKAGE_GIT)))


# =========== Commands ===========
run:
	cd src && poetry run uvicorn main:app --reload --port 8010 --log-config infrastructure/logging/logging_config.json

pytest:
	poetry run pytest -q --disable-warnings --tb=short

pytest-with-logs:
	poetry run pytest --log-cli-level=INFO -s -ra $(ARGS)
dev: switch-monstrino-core-dev switch-monstrino-models-dev switch-monstrino-repositories-dev
prod: switch-monstrino-core-prod switch-monstrino-models-prod switch-monstrino-repositories-prod

