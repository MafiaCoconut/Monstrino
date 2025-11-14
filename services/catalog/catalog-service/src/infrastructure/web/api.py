# import logging
# from typing import Any
# from fastapi import Depends, Response, BackgroundTasks, HTTPException
# from fastapi.responses import JSONResponse
# from pydantic import BaseModel
#
# from application.services.core_service import CoreService
# from domain.entities.new_doll import NewDoll
# from infrastructure.logging.logs_config import log_api_decorator
# # from application.services.scheduler_service import SchedulerService
# from infrastructure.web.response_models import responsesCodes
# from presentation.app_config import app
#
# # from infrastructure.web.setup import setup
# #
# # setup()
# system_logger = logging.getLogger("system_logger")
# # router = APIRouter()
#
# class Meta(BaseModel):
#     code: str
#     message: str
#     description: str
#
# class ResponseModel(BaseModel):
#     meta: Meta
#     result: Any
#
# async def get_success_json_response(data: dict):
#     response = ResponseModel(
#         meta=Meta(
#             code="200",
#             message="OK",
#             description="Item fetched successfully"
#         ),
#         result=data
#     )
#     return JSONResponse(content=response.model_dump(), status_code=200)
#
#
# @app.exception_handler(HTTPException)
# async def custom_http_exception_handler(request, exc: HTTPException):
#     # Формирование стандартного ответа при ошибке
#     response = ResponseModel(
#         meta=Meta(
#             code=str(exc.status_code),
#             message="Error",
#             description=exc.detail
#         ),
#         result={}
#     )
#     return JSONResponse(content=response.model_dump(), status_code=exc.status_code)
#
# @app.get("/")
# @log_api_decorator()
# async def empty(response: Response, background_tasks: BackgroundTasks):
#     return await get_success_json_response(data={'message': "API is working"})
#
#
# @log_api_decorator()
# @app.get('/createDB')
# async def create_db(response: Response, background_tasks: BackgroundTasks,
#                     core_service: CoreService = Depends(get_core_service)):
#     await core_service.create_db()
#
# @log_api_decorator()
# @app.post('/dolls/registerNewDoll', tags=["Dolls"], responses=responsesCodes)
# async def register_new_doll(
#         new_doll: NewDoll,
#         response: Response, background_tasks: BackgroundTasks,
#         core_service: CoreService = Depends(get_core_service),
#
# ):
#     await core_service.register_new_doll(new_doll=new_doll)
#
#
# @log_api_decorator()
# @app.get('/dolls/{doll_id}/getData', tags=["Dolls"], responses=responsesCodes)
# async def register_new_doll(
#         doll_id: int,
#         response: Response, background_tasks: BackgroundTasks,
#         core_service: CoreService = Depends(get_core_service),
#
# ):
#     return await core_service.get_doll(doll_id=doll_id)
#
#
#
#
# async def raise_internal_server_error() -> None:
#     raise HTTPException(
#         status_code=500,
#         detail="Internal server error"
#     )
#
# async def raise_item_not_found() -> None:
#     raise HTTPException(
#         status_code=404,
#         detail="Item not found"
#     )
#
# async def raise_validation_error(detail: str = "") -> None:
#     raise HTTPException(
#         status_code=422,
#         detail="Validation error" + ("" if detail == "" else f": {detail}")
#     )
#
