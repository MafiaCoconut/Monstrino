from fastapi import FastAPI

from infrastructure.api.endpoints import auth_endpoints, internal_endpoints
from infrastructure.api import cors
from infrastructure.api.responces.exceptions import rewrite_http_exception_response


def configure_endpoints(app: FastAPI):
    auth_endpoints.config(app=app)
    internal_endpoints.config(app=app)


def config_expectations(app: FastAPI):
    rewrite_http_exception_response(app=app)

def config_cors(app: FastAPI):
    cors.config(app=app)

def config(app: FastAPI):
    # config_cors(app=app)
    config_expectations(app=app)
    configure_endpoints(app=app)
