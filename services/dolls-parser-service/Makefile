run:
SHELL := /bin/bash

DOTENV := .env

.PHONY: run

run:
	cd src && poetry run uvicorn main:app --reload --port 8000 --log-config infrastructure/logging/logging_config.json
#	source .venv/bin/activate && cd src/ && uvicorn main:app --reload --port 8000 --log-config infrastructure/config/logging_config.json


run\:ngrok:
	ngrok http --url=accurately-apparent-cobra.ngrok-free.app 8000

run-chrome:
	google-chrome \
  --remote-debugging-port=9222 \
  --user-data-dir="$HOME/chrome-remote" \
  --profile-directory="Default" \
  --no-first-run --no-default-browser-check