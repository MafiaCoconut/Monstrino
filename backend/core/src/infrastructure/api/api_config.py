from fastapi import FastAPI

from infrastructure.api.endpoints import users_api
from infrastructure.api.responces.exceptions import rewrite_http_exception_response


def configure_endpoints(app: FastAPI):
    users_api.config(app=app)

def config_expecions(app: FastAPI):
    rewrite_http_exception_response(app=app)


def config(app: FastAPI):
    configure_endpoints(app=app)
    rewrite_http_exception_response(app=app)