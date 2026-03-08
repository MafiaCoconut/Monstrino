from fastapi import FastAPI

from presentation.api import cors
# from presentation.api.responces import rewrite_http_exception_response
from presentation.api.routes import internal_routes as internal_api


# from presentation.endpoints import release_endpoints as release_api


def configure_endpoints(app: FastAPI):
    internal_api.config_routes(app=app)
    # release_api.config(app=app)


def config_exceptions(app: FastAPI):
    ...
    # rewrite_http_exception_response(app=app)


def config_cors(app: FastAPI):
    cors.config(app=app)


def config(app: FastAPI):
    config_exceptions(app=app)
    configure_endpoints(app=app)
