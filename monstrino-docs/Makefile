# Makefile for Docusaurus
# - Works with npm / yarn / pnpm (auto-detect)
# - Adds common tasks: install, dev, build, serve, lint, format, typecheck, clean
# - Usage: make help

SHELL := /usr/bin/env bash
.DEFAULT_GOAL := help

# --- Project meta ---
PROJECT_NAME ?= docusaurus
NODE_ENV ?= development

# --- Detect package manager ---
# Priority: pnpm > yarn > npm, but respects lockfiles first.
PKG_MANAGER :=
ifeq ($(wildcard pnpm-lock.yaml),pnpm-lock.yaml)
	PKG_MANAGER := pnpm
else ifeq ($(wildcard yarn.lock),yarn.lock)
	PKG_MANAGER := yarn
else ifeq ($(wildcard package-lock.json),package-lock.json)
	PKG_MANAGER := npm
else ifeq ($(shell command -v pnpm >/dev/null 2>&1; echo $$?),0)
	PKG_MANAGER := pnpm
else ifeq ($(shell command -v yarn >/dev/null 2>&1; echo $$?),0)
	PKG_MANAGER := yarn
else
	PKG_MANAGER := npm
endif

ifeq ($(PKG_MANAGER),pnpm)
	PM_RUN := pnpm
	PM_EXEC := pnpm exec
	PM_INSTALL := pnpm install --frozen-lockfile
	PM_INSTALL_RELAXED := pnpm install
	PM_UPDATE := pnpm update
else ifeq ($(PKG_MANAGER),yarn)
	PM_RUN := yarn
	PM_EXEC := yarn
	PM_INSTALL := yarn install --frozen-lockfile
	PM_INSTALL_RELAXED := yarn install
	PM_UPDATE := yarn up
else
	PM_RUN := npm
	PM_EXEC := npx
	PM_INSTALL := npm ci
	PM_INSTALL_RELAXED := npm install
	PM_UPDATE := npm update
endif

# --- Commands / defaults ---
PORT ?= 3000
HOST ?= localhost

# Docusaurus cli: prefer local binary in node_modules via package manager
DOCUSAURUS ?= $(PM_EXEC) docusaurus

# --- Helpers ---
define print_header
	@printf "\n\033[1m%s\033[0m\n" "$(1)"
endef

.PHONY: help
help: ## Show this help
	@echo "Project: $(PROJECT_NAME)"
	@echo "Package manager: $(PKG_MANAGER)"
	@echo
	@echo "Usage:"
	@echo "  make <target>"
	@echo
	@echo "Targets:"
	@awk 'BEGIN {FS = ":.*##"; printf ""} /^[a-zA-Z0-9_.-]+:.*##/ { printf "  \033[36m%-22s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

# --- Setup ---
.PHONY: install
install: ## Install dependencies (lockfile-respecting)
	$(call print_header,Installing dependencies)
	$(PM_INSTALL)

.PHONY: install-relaxed
install-relaxed: ## Install dependencies (non-frozen; useful after dependency changes)
	$(call print_header,Installing dependencies (relaxed))
	$(PM_INSTALL_RELAXED)

.PHONY: doctor
doctor: ## Print environment diagnostics
	$(call print_header,Environment)
	@node -v
	@$(PM_RUN) -v || true
	@echo "PKG_MANAGER=$(PKG_MANAGER)"
	@echo "PORT=$(PORT) HOST=$(HOST)"

# --- Dev / Build ---
.PHONY: dev
dev: ## Start dev server
	$(call print_header,Starting dev server)
	NODE_ENV=development $(DOCUSAURUS) start --host $(HOST) --port $(PORT)

.PHONY: dev-open
dev-open: ## Start dev server and open browser
	$(call print_header,Starting dev server (open))
	NODE_ENV=development $(DOCUSAURUS) start --host $(HOST) --port $(PORT) --open

.PHONY: build
build: ## Build static site
	$(call print_header,Building site)
	NODE_ENV=production $(DOCUSAURUS) build

.PHONY: serve
serve: ## Serve built site locally
	$(call print_header,Serving build)
	NODE_ENV=production $(DOCUSAURUS) serve --host $(HOST) --port $(PORT)

.PHONY: serve-build
serve-build: build serve ## Build then serve

# --- Quality ---
# These targets assume you have corresponding scripts in package.json:
# "lint", "format", "format:check", "typecheck", "test" (optional)

.PHONY: lint
lint: ## Run linter (if configured in package.json)
	$(call print_header,Running lint)
	$(PM_RUN) run -s lint

.PHONY: format
format: ## Format code (prettier) (if configured)
	$(call print_header,Formatting)
	$(PM_RUN) run -s format

.PHONY: format-check
format-check: ## Check formatting (if configured)
	$(call print_header,Checking format)
	$(PM_RUN) run -s format:check

.PHONY: typecheck
typecheck: ## Typecheck (TS) (if configured)
	$(call print_header,Typecheck)
	$(PM_RUN) run -s typecheck

.PHONY: test
test: ## Run tests (if configured)
	$(call print_header,Running tests)
	$(PM_RUN) run -s test

.PHONY: ci
ci: install build lint format-check typecheck test ## Typical CI pipeline

# --- Docusaurus extras ---
.PHONY: swizzle
swizzle: ## Docusaurus swizzle (interactive)
	$(call print_header,Docusaurus swizzle)
	$(DOCUSAURUS) swizzle

.PHONY: write-translations
write-translations: ## Extract translations
	$(call print_header,Writing translations)
	$(DOCUSAURUS) write-translations

.PHONY: write-heading-ids
write-heading-ids: ## Write heading IDs in markdown
	$(call print_header,Writing heading IDs)
	$(DOCUSAURUS) write-heading-ids

# --- Maintenance ---
.PHONY: clean
clean: ## Remove build artifacts and caches
	$(call print_header,Cleaning)
	rm -rf build .docusaurus
	rm -rf node_modules/.cache || true

.PHONY: clean-all
clean-all: clean ## Clean + remove node_modules
	$(call print_header,Cleaning all)
	rm -rf node_modules

.PHONY: update
update: ## Update dependencies (package manager specific)
	$(call print_header,Updating dependencies)
	$(PM_UPDATE)

.PHONY: reset
reset: clean-all install ## Full reset (clean-all + install)
# ======== Include Makefiles ==========
include ../Makefiles/common.mk
include $(ROOT_DIR)/Makefiles/monstrino-packages.mk
include $(ROOT_DIR)/Makefiles/run.mk
include $(ROOT_DIR)/Makefiles/pytest.mk

# ========== Kubernetes ==========
NAMESPACE := ""
NAMESPACE_TEST := "monstrino-test"
NAMESPACE_PROD := "monstrino-prod"

REGISTRY := registry.monstrino.com
SERVER_PLATFORM := --platform linux/amd64

SERVICE_NAME := monstrino-docs
SERVICE_IMAGE_NAME := $(REGISTRY)/monstrino/monstrino-docs
GIT_SHA1 := $(shell git rev-parse --short=10 --verify HEAD)
SERVICE_TAG_IMAGE_NAME := $(SERVICE_IMAGE_NAME):$(GIT_SHA1)

# ==================== Deployment ====================
KUBERNETES_FOLDER := $(ROOT_DIR)/monstrino-configurations/kubernetes
K8S_TEST_FOLDER := $(KUBERNETES_FOLDER)/.test/monstrino-docs
K8S_PROD_FOLDER := $(KUBERNETES_FOLDER)/.prod/monstrino-docs

# ------------------ Context selection ------------------
use-tc-m70q-context:
	kubectl config use-context tc_m70q

# --------------------- Build section --------------------

build-test:
	DOCKER_BUILDKIT=1 docker build --build-arg SITE_ENV=test --ssh default $(SERVER_PLATFORM) -t $(SERVICE_TAG_IMAGE_NAME) .

build-prod:
	DOCKER_BUILDKIT=1 docker build --build-arg SITE_ENV=prod --ssh default $(SERVER_PLATFORM) -t $(SERVICE_TAG_IMAGE_NAME) .

push-service-test: build-test
	@echo "$$REG_PASS" | docker login $(REGISTRY) -u "$$REG_USER" --password-stdin
	docker push $(SERVICE_TAG_IMAGE_NAME)

push-service-prod: build-prod
	@echo "$$REG_PASS" | docker login $(REGISTRY) -u "$$REG_USER" --password-stdin
	docker push $(SERVICE_TAG_IMAGE_NAME)

# --------------------- Deploy section --------------------

deploy-test: use-tc-m70q-context push-service-test
	kubectl apply -f $(K8S_TEST_FOLDER)/deployment.yaml -n $(NAMESPACE_TEST)
	kubectl apply -f $(K8S_TEST_FOLDER)/service.yaml    -n $(NAMESPACE_TEST)
	kubectl set image deployment/$(SERVICE_NAME) -n $(NAMESPACE_TEST) $(SERVICE_NAME)=$(SERVICE_TAG_IMAGE_NAME)

deploy-prod: use-tc-m70q-context push-service-prod
	kubectl apply -f $(K8S_PROD_FOLDER)/deployment.yaml -n $(NAMESPACE_PROD)
	kubectl apply -f $(K8S_PROD_FOLDER)/service.yaml    -n $(NAMESPACE_PROD)
	kubectl set image deployment/$(SERVICE_NAME) -n $(NAMESPACE_PROD) $(SERVICE_NAME)=$(SERVICE_TAG_IMAGE_NAME)



