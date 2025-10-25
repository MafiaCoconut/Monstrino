from fastapi import APIRouter, Response, BackgroundTasks, FastAPI
from fastapi.params import Depends
import logging

from fastapi.security import HTTPBearer

from app.dependencies.services import get_db_internal_service
from application.services.core_service import CoreService
from application.services.db_internal_service import DBInternalService
from application.use_cases.auth.verify_token_use_case import VerifyToken
from presentation.responces.templates import get_success_json_response
# from application.services.scheduler_service import SchedulerService


system_logger = logging.getLogger('system_logger')
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


