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

#SOURCE_FOULDER := ""

# ======== Include Makefiles ==========
include ../../../Makefiles/common.mk
include $(ROOT_DIR)/Makefiles/monstrino-packages.mk
include $(ROOT_DIR)/Makefiles/run.mk
include $(ROOT_DIR)/Makefiles/pytest.mk

# ========== Kubernetes ==========
NAMESPACE := ""
NAMESPACE_TEST := "monstrino-test"
NAMESPACE_PROD := "monstrino-prod"

REGISTRY := registry.monstrino.com
SERVER_PLATFORM := --platform linux/amd64

SERVICE_IMAGE_NAME := $(REGISTRY)/monstrino/monstrino-catalog-collector
GIT_SHA1 := $(shell git rev-parse --short=10 --verify HEAD)
SERVICE_TAG_IMAGE_NAME := $(SERVICE_IMAGE_NAME):$(GIT_SHA1)

KUBERNETES_FOLDER := $(ROOT_DIR)/monstrino-configurations/kubernetes/
K8S_TEST_FOLDER := $(KUBERNETES_FOLDER).test/services/acquisition/catalog-collector
K8S_PROD_FOLDER := $(KUBERNETES_FOLDER).prod/services/acquisition/catalog-collector

MH_ARCHIVE_FOLDER_TEST_FOLDER := $(K8S_TEST_FOLDER)/mh_archive
MH_ARCHIVE_FOLDER_PROD_FOLDER := $(K8S_PROD_FOLDER)/mh_archive

# ========== Service Name ==========
SERVICE_NAME := catalog-collector


# ========== Monstrino Packages ==========
PACKAGES_DIR := ../../../packages

LOCAL_DEPS := \
    $(PACKAGES_DIR)/monstrino-core \
    $(PACKAGES_DIR)/monstrino-models \
    $(PACKAGES_DIR)/monstrino-repositories \
    $(PACKAGES_DIR)/monstrino-testing \
    $(PACKAGES_DIR)/monstrino-api \
    $(PACKAGES_DIR)/monstrino-infra \
    $(PACKAGES_DIR)/monstrino-contracts \

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


# ==================== Deployment ====================

# ------------------ Source selection ------------------
#use-mh-archive-source:
#	$(eval SOURCE := mh_archive)



# ------------------ Context selection ------------------
use-tc-m70q-context:
	kubectl config use-context tc_m70q

# --------------------- Build section --------------------

build:
	DOCKER_BUILDKIT=1 docker build --ssh default $(SERVER_PLATFORM) -t $(SERVICE_TAG_IMAGE_NAME) .

push-service: build
	@echo "$$REG_PASS" | docker login $(REGISTRY) -u "$$REG_USER" --password-stdin
	docker push $(SERVICE_TAG_IMAGE_NAME)

# --------------------- Deploy section --------------------


#deploy-catalog-collector-test: use-tc-m70q-context push-service
#	kubectl apply -f $(K8S_TEST_FOLDER)/deployment.yaml -n $(NAMESPACE_TEST)
#	kubectl apply -f $(K8S_TEST_FOLDER)/service.yaml    -n $(NAMESPACE_TEST)
#	kubectl set image deployment/monstrino-catalog-collector -n $(NAMESPACE_TEST) monstrino-catalog-collector=$(SERVICE_TAG_IMAGE_NAME)
#
#deploy-catalog-collector-prod: use-tc-m70q-context push-service
#	kubectl apply -f $(K8S_PROD_FOLDER)/deployment.yaml -n $(NAMESPACE_PROD)
#	kubectl apply -f $(K8S_PROD_FOLDER)/service.yaml    -n $(NAMESPACE_PROD)
#	kubectl set image deployment/monstrino-catalog-collector -n $(NAMESPACE_PROD) monstrino-catalog-collector=$(SERVICE_TAG_IMAGE_NAME)


deploy-catalog-collector-mh-archive-test: use-tc-m70q-context push-service
	kubectl apply -f $(MH_ARCHIVE_FOLDER_TEST_FOLDER)/deployment.yaml -n $(NAMESPACE_TEST)
	kubectl apply -f $(MH_ARCHIVE_FOLDER_TEST_FOLDER)/service.yaml    -n $(NAMESPACE_TEST)
	kubectl set image deployment/monstrino-catalog-collector-mh-archive -n $(NAMESPACE_TEST) monstrino-catalog-collector-mh-archive=$(SERVICE_TAG_IMAGE_NAME)


deploy-catalog-collector-mh-archive-prod: use-tc-m70q-context push-service
	kubectl apply -f $(MH_ARCHIVE_FOLDER_PROD_FOLDER)/deployment.yaml -n $(NAMESPACE_PROD)
	kubectl apply -f $(MH_ARCHIVE_FOLDER_PROD_FOLDER)/service.yaml    -n $(NAMESPACE_PROD)
	kubectl set image deployment/monstrino-catalog-collector-mh-archive -n $(NAMESPACE_PROD) monstrino-catalog-collector-mh-archive=$(SERVICE_TAG_IMAGE_NAME)