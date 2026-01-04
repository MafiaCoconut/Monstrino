from fastapi import FastAPI
from icecream import ic
from monstrino_api.v1.shared.exceptions import register_exception_handlers
from monstrino_api.v1.shared.responces import ResponseFactory
from presentation import cors

from presentation.api.routes import parser_endpoints

rf = ResponseFactory(
    service="catalog-collector",
    version="v1"
)
def config_cors(app: FastAPI):
    cors.config(app=app)

def config_exceptions(app: FastAPI):
    register_exception_handlers(app, rf)

def configure_endpoints(app: FastAPI):
    parser_endpoints.config_routes(app=app, _rf=rf)


def config(app: FastAPI):
    config_cors(app=app)
    configure_endpoints(app=app)
    config_exceptions(app=app)
