import logging
from typing import Any, Dict
import re
from fastapi import Depends, APIRouter, Path, Response, status, BackgroundTasks, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from sqlalchemy.orm import Session

from application.services.core_service import CoreService
from domain.new_user import NewUser
from domain.user import User
# from application.services.scheduler_service import SchedulerService
from infrastructure.config.logs_config import log_api_decorator
from infrastructure.config.services_config import get_core_service
from infrastructure.config.fastapi_app_config import app
from infrastructure.web.response_models import responsesCodes
# from infrastructure.web.setup import setup
#
# setup()
system_logger = logging.getLogger("system_logger")
# router = APIRouter()

class Meta(BaseModel):
    code: str
    message: str
    description: str

class ResponseModel(BaseModel):
    meta: Meta
    result: Any

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
    # Формирование стандартного ответа при ошибке
    response = ResponseModel(
        meta=Meta(
            code=str(exc.status_code),
            message="Error",
            description=exc.detail
        ),
        result={}
    )
    return JSONResponse(content=response.model_dump(), status_code=exc.status_code)

@app.get("/")
@log_api_decorator()
async def empty(response: Response, background_tasks: BackgroundTasks):
    return await get_success_json_response(data={'message': "API is working"})


async def raise_internal_server_error() -> None:
    raise HTTPException(
        status_code=500,
        detail="Internal server error"
    )

async def raise_item_not_found() -> None:
    raise HTTPException(
        status_code=404,
        detail="Item not found"
    )

async def raise_validation_error(detail: str = "") -> None:
    raise HTTPException(
        status_code=422,
        detail="Validation error" + ("" if detail == "" else f": {detail}")
    )

