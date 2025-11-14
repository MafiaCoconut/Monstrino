run:
SHELL := /bin/bash

DOTENV := .env

.PHONY: run

run:
	cd src && poetry run uvicorn main:app --reload --port 8001 --log-config infrastructure/logging/logging_config.json


run\:ngrok:
	ngrok http --url=accurately-apparent-cobra.ngrok-free.app 8000