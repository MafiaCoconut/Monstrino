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
SERVICE_NAME := default-data-setter

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

# =========== Setters =============
RUN_PYTEST_WITH_LOGS = poetry run pytest --log-cli-level=INFO -x

CATALOG_PATH = tests/setters/catalog
INGEST_PATH = tests/setters/ingest
MARKET_PATH = tests/setters/market

# ------------ Catalog ------------

set-catalog-exclusive-vendors:
	$(RUN_PYTEST_WITH_LOGS) $(CATALOG_PATH)/test_exclusive_vendor.py

set-catalog-release-type:
	$(RUN_PYTEST_WITH_LOGS) $(CATALOG_PATH)/test_release_type.py

set-catalog-relation-type:
	$(RUN_PYTEST_WITH_LOGS) $(CATALOG_PATH)/test_relation_type.py

set-catalog-character_role:
	$(RUN_PYTEST_WITH_LOGS) $(CATALOG_PATH)/test_character_role.py


set-catalog: set-catalog-exclusive-vendors set-catalog-release-type set-catalog-relation-type set-catalog-character_role

# ------------ Market ------------

set-market-money-currency:
	$(RUN_PYTEST_WITH_LOGS)  $(MARKET_PATH)/test_money_currency.py -x

set-market-geo-countries:
	$(RUN_PYTEST_WITH_LOGS)  $(MARKET_PATH)/test_geo_country.py -x

set-market: set-market-money-currency set-market-geo-countries
# ------------ Ingest ------------

set-ingest-source:
	$(RUN_PYTEST_WITH_LOGS)  $(INGEST_PATH)/test_ingest_source.py -x

set-ingest: set-ingest-source

# ------------ All Setters ------------

make set-all: set-catalog set-market set-ingest

