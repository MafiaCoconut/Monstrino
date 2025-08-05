import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

logger = logging.getLogger(__name__)

def config(app: FastAPI):
    logger.info("Setup CORS middleware started")

    origins = [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_credentials=True,
        allow_origin_regex=r"^http://(localhost|127\.0\.0\.1):\d+$",
        allow_methods=["*"],
        allow_headers=["*"],
    )

    logger.info("Setup CORS middleware finished")