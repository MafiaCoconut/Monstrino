from fastapi import FastAPI

from presentation import cors
from presentation.responces.exceptions import rewrite_http_exception_response
from presentation.api.routes import parser_endpoints


def configure_endpoints(app: FastAPI):
    # users_api.config(app=app)
    # auth_api.config(app=app)
    parser_endpoints.config(app=app)
    pass


def config_exceptions(app: FastAPI):
    rewrite_http_exception_response(app=app)

def config_cors(app: FastAPI):
    cors.config(app=app)

def config(app: FastAPI):
    # config_cors(app=app)
    config_exceptions(app=app)
    configure_endpoints(app=app)
