SHELL := /bin/bash
.PHONY: run, build

REGISTRY := registry.monstrino.com
MONSTRINO_UI_IMAGE_NAME := $(REGISTRY)/monstrino/monstrino-ui


GIT_SHA1 := $(shell git rev-parse --short=10 --verify HEAD)


SERVER_PLATFORM := --platform linux/amd64

NAMESPACE := ""
NAMESPACE_TEST := "monstrino-test"
NAMESPACE_PROD := "monstrino-prod"

# ------------------ Context selection ------------------
use-tc-m70q-context:
	kubectl config use-context tc_m70q

# --------------------- Build section --------------------

build:
	docker build $(SERVER_PLATFORM) -t $(MONSTRINO_UI_IMAGE_NAME):latest -t $(MONSTRINO_UI_IMAGE_NAME):$(GIT_SHA1) .

push-ui: build
	@echo "$$REG_PASS" | docker login $(REGISTRY) -u "$$REG_USER" --password-stdin
	docker push $(MONSTRINO_UI_IMAGE_NAME):latest
	docker push $(MONSTRINO_UI_IMAGE_NAME):$(GIT_SHA1)

# --------------------- Deploy section --------------------

#deploy-ui-test: use-tc-m70q-context push-ui
deploy-ui-test: use-tc-m70q-context
	kubectl apply -f ../../monstrino-configurations/kubernetes/.test/ui/deployment.yaml -n $(NAMESPACE_TEST)
	kubectl apply -f ../../monstrino-configurations/kubernetes/.test/ui/service.yaml    -n $(NAMESPACE_TEST)

deploy-ui-prod: use-tc-m70q-context
# deploy-ui-prod: use-tc-m70q-context push-ui
	kubectl apply -f ../../monstrino-configurations/kubernetes/.prod/ui/deployment.yaml -n $(NAMESPACE_PROD)
	kubectl apply -f ../../monstrino-configurations/kubernetes/.prod/ui/service.yaml    -n $(NAMESPACE_PROD)

# --------------------- Local run section --------------------

run:
	npm run dev


# use-test-namespace:
