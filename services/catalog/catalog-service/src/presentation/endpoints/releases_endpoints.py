from fastapi import APIRouter, Response, BackgroundTasks, FastAPI, Request
from fastapi.params import Depends
from fastapi.security import HTTPBearer

import logging
from pydantic import BaseModel
from pygments.lexer import default

from app.dependencies.services import get_db_internal_service
from application.dto.ReleaseCreateDto import ReleaseCreateDto
from application.services.core_service import CoreService
from application.services.db_internal_service import DBInternalService
from application.services.scenarios_service import ScenariosService
from application.services.tables_data_manager_service import TablesDataManagerService
from application.use_cases.auth.verify_token_use_case import VerifyToken
from presentation.responces.default_codes import return_internal_server_error_status_code
from presentation.responces.templates import get_success_json_response
# from application.services.scheduler_service import SchedulerService

logger = logging.getLogger(__name__)

auth_scheme = HTTPBearer()
private = APIRouter(prefix='/api/v1/release',
                    tags=["Private"], dependencies=[Depends(VerifyToken())])
public = APIRouter(prefix='/api/v1', tags=["Public"])


def config(app: FastAPI):
    app.include_router(private)


@private.post('/create_release')
async def create_release(
        body: ReleaseCreateDto,
        response: Response, background_tasks: BackgroundTasks, request: Request,
):
    container = request.app.state.container
    scenarios_service: ScenariosService = container.services.scenarios

    try:
        result = await scenarios_service.create_release(body)
        return await get_success_json_response(data=result)
    except Exception as e:
        logger.error(e)
        return await return_internal_server_error_status_code()
