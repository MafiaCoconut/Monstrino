from fastapi import FastAPI

from presentation import cors
from presentation.responces.exceptions import rewrite_http_exception_response
from presentation.endpoints import internal_endpoints as internal_api
# from presentation.endpoints import release_endpoints as release_api


def configure_endpoints(app: FastAPI):
    internal_api.config(app=app)
    # release_api.config(app=app)


def config_exceptions(app: FastAPI):
    rewrite_http_exception_response(app=app)


def config_cors(app: FastAPI):
    cors.config(app=app)


def config(app: FastAPI):
    config_exceptions(app=app)
    configure_endpoints(app=app)
