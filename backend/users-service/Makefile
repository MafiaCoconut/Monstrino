SHELL := /bin/bash

.PHONY: run

run:
	source .venv/bin/activate && cd src/ && uvicorn main:app --reload --port 8002 --log-config infrastructure/config/logging_config.json

run\:ngrok:
	ngrok http --url=accurately-apparent-cobra.ngrok-free.app 8000