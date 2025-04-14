from infrastructure.api.api import ResponseModel, Meta
from fastapi.responses import JSONResponse
from fastapi import HTTPException

from infrastructure.config.fastapi_app_config import app


async def get_success_json_response(data: dict):
    response = ResponseModel(
        meta=Meta(
            code="200",
            message="OK",
            description="Item fetched successfully"
        ),
        result=data
    )
    return JSONResponse(content=response.model_dump(), status_code=200)


@app.exception_handler(HTTPException)
async def custom_http_exception_handler(request, exc: HTTPException):
    response = ResponseModel(
        meta=Meta(
            code=str(exc.status_code),
            message="ERROR",
            description=exc.detail
        ),
        result={}
    )
    return JSONResponse(content=response.model_dump(), status_code=exc.status_code)
