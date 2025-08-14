run:
SHELL := /bin/bash

DOTENV := .env

.PHONY: run

run:
	cd src && poetry run uvicorn main:app --reload --port 8000 --log-config infrastructure/config/logging_config.json
#	source .venv/bin/activate && cd src/ && uvicorn main:app --reload --port 8000 --log-config infrastructure/config/logging_config.json


run\:ngrok:
	ngrok http --url=accurately-apparent-cobra.ngrok-free.app 8000