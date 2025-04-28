from fastapi import APIRouter, Response, BackgroundTasks, FastAPI
from fastapi.params import Depends
import logging

from icecream import ic

from application.services.auth_service import AuthService
from application.services.core_service import CoreService
from application.services.users_service import UsersService
from domain.user import UserRegistration
from infrastructure.api.responces.auth_responces.responses import RegistrationResponse
from infrastructure.api.responces.templates import get_success_json_response
# from application.services.scheduler_service import SchedulerService
from infrastructure.config.logs_config import log_api_decorator
from infrastructure.api.responces.default_codes import responses, raise_validation_error, raise_item_not_found, raise_created, raise_internal_server_error
from infrastructure.config.services_config import get_auth_service


router = APIRouter()

system_logger = logging.getLogger('system_logger')

def config(app: FastAPI):
    app.include_router(router)

@router.post("/api/v1/auth/registration",
             # responses=responses,
             response_model=RegistrationResponse)
@log_api_decorator()
async def registration(
        user_credentials: UserRegistration,
        response: Response, background_tasks: BackgroundTasks,
        auth_service: AuthService = Depends(get_auth_service)
    ):
    system_logger.info(f"credentials: {user_credentials}")
    if user_credentials:
        result = await auth_service.registration(user=user_credentials)
        return await get_success_json_response(data=result)
    else:
        return await get_success_json_response(data={"data": "It was called successfully"})