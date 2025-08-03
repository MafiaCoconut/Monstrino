from fastapi import APIRouter, Response, BackgroundTasks, FastAPI
from fastapi.params import Depends
import logging

from icecream import ic

from application.services.core_service import CoreService
from domain.user import UserRegistration
from infrastructure.api.responces.templates import get_success_json_response
# from application.services.scheduler_service import SchedulerService
from infrastructure.config.logs_config import log_api_decorator
from infrastructure.api.responces.default_codes import responses, return_validation_error_status_code, return_item_not_found_status_code, return_created_status_code, return_internal_server_error_status_code
from infrastructure.config.services_config import get_core_service

router = APIRouter()

system_logger = logging.getLogger('system_logger')

def config(app: FastAPI):
    app.include_router(router)

@router.post("/restartDB", tags=["Iternal"])
async def set_db(response: Response, background_tasks: BackgroundTasks,
                 core_service: CoreService = Depends(get_core_service)
                 ):
    await core_service.restart_db()
    return await get_success_json_response(data={'message': "DB is restarted"})
