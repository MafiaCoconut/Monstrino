from fastapi import FastAPI

from infrastructure.api.endpoints import users_api, auth_api
from infrastructure.api import cors
from infrastructure.api.responces.exceptions import rewrite_http_exception_response


def configure_endpoints(app: FastAPI):
    users_api.config(app=app)
    auth_api.config(app=app)


def config_expecions(app: FastAPI):
    rewrite_http_exception_response(app=app)

def config_cors(app: FastAPI):
    cors.config(app=app)

def config(app: FastAPI):
    # config_cors(app=app)
    configure_endpoints(app=app)
    config_expecions(app=app)