from fastapi import APIRouter, Response, BackgroundTasks, FastAPI, Request
from fastapi.params import Depends
from fastapi.security import HTTPBearer

import logging
from pydantic import BaseModel


from app.dependencies.services import get_db_internal_service
from application.services.core_service import CoreService
from application.services.db_internal_service import DBInternalService
from application.services.tables_data_manager_service import TablesDataManagerService
from application.use_cases.auth.verify_token_use_case import VerifyToken
from presentation.responces.default_codes import return_internal_server_error_status_code
from presentation.responces.templates import get_success_json_response
# from application.services.scheduler_service import SchedulerService

logger = logging.getLogger(__name__)

auth_scheme = HTTPBearer()
private = APIRouter(prefix='/api/v1/internal', tags=["Private"], dependencies=[Depends(VerifyToken())])
public = APIRouter(prefix='/api/v1', tags=["Public"])

def config(app: FastAPI):
    app.include_router(private)

@private.post('/restartDB', tags=['Internal'], )
async def restart_database(
        response: Response, background_tasks: BackgroundTasks,
        db_service: DBInternalService = Depends(get_db_internal_service)
):
    await db_service.restart_db()


class TypeRequest(BaseModel):
    type_id: int

@private.get('/get_dolls_type')
async def get_dolls_type(
        body: TypeRequest,
        response: Response, background_tasks: BackgroundTasks, request: Request,
):
    container = request.app.state.container
    tables_data_manager: TablesDataManagerService = container.services.tables_data_manager
    type_id = body.type_id
    try:
        result = await tables_data_manager.get_dolls_type(body.type_id)
        return await get_success_json_response(data=result)
    except Exception as e:
        logger.error(e)
        return await return_internal_server_error_status_code()

@private.get('/get_dolls_series')
async def get_dolls_series(
        body: TypeRequest,
        response: Response, background_tasks: BackgroundTasks, request: Request,
):
    container = request.app.state.container
    tables_data_manager: TablesDataManagerService = container.services.tables_data_manager
    type_id = body.type_id
    try:
        result = await tables_data_manager.get_dolls_series(body.type_id)
        return await get_success_json_response(data=result)
    except Exception as e:
        logger.error(e)
        return await return_internal_server_error_status_code()

@private.get('/get_original_character')
async def get_original_character(
        body: TypeRequest,
        response: Response, background_tasks: BackgroundTasks, request: Request,
):
    container = request.app.state.container
    tables_data_manager: TablesDataManagerService = container.services.tables_data_manager
    type_id = body.type_id
    try:
        result = await tables_data_manager.get_original_character(body.type_id)
        return await get_success_json_response(data=result)
    except Exception as e:
        logger.error(e)
        return await return_internal_server_error_status_code()

