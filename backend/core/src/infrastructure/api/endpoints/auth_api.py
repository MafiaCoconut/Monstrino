from fastapi import APIRouter, Response, BackgroundTasks, FastAPI
from fastapi.params import Depends
import logging

from icecream import ic

from application.services.auth_service import AuthService
from application.services.core_service import CoreService
from application.services.users_service import UsersService
from domain.user import UserRegistration, UserLogin
from infrastructure.api.responces.auth_responces.responses import RegistrationResponse, LoginResponse
from infrastructure.api.responces.templates import get_success_json_response
# from application.services.scheduler_service import SchedulerService
from infrastructure.config.logs_config import log_api_decorator
from infrastructure.api.responces.default_codes import responses, raise_validation_error, raise_item_not_found, raise_created, raise_internal_server_error
from infrastructure.config.services_config import get_auth_service
from infrastructure.config.auth_config import auth, config as auth_config_class

router = APIRouter()

logger = logging.getLogger(__name__)

def config(app: FastAPI):
    app.include_router(router)

@router.post("/api/v1/auth/registration", response_model=RegistrationResponse)
async def registration(
        user_credentials: UserRegistration,
        response: Response, background_tasks: BackgroundTasks,
        auth_service: AuthService = Depends(get_auth_service)
    ):
    logger.info(f"credentials: {user_credentials}")
    if user_credentials:
        result = await auth_service.registration(user=user_credentials)
        logger.info(auth_config_class.JWT_ACCESS_COOKIE_NAME)
        response.set_cookie(
            key=auth_config_class.JWT_ACCESS_COOKIE_NAME,
            value=result.get('access_token'),
            httponly=True, secure=False, samesite="lax", path="/"
        )
        return await get_success_json_response(response=response, data=result)
    else:
        return await raise_validation_error()


@router.post("/api/v1/auth/login", response_model=LoginResponse)
async def login(
        user_credentials: UserLogin,
        response: Response, background_tasks: BackgroundTasks,
        auth_service: AuthService = Depends(get_auth_service)
    ):
    logger.info(f"credentials: {user_credentials}")
    if user_credentials:
        result = await auth_service.login(user=user_credentials)
        return await get_success_json_response(response=response, data=result)
    return await raise_validation_error()