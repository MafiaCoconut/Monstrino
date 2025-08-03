SHELL := /bin/bash

.PHONY: run

run:
	cd src/ && poetry run uvicorn main:app --reload --port 8002 --log-config infrastructure/config/logging_config.json

run\:ngrok:
	ngrok http --url=accurately-apparent-cobra.ngrok-free.app 8000