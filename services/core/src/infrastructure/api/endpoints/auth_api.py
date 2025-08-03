from typing import Annotated

from fastapi import APIRouter, Response, BackgroundTasks, FastAPI, Cookie, Request
from fastapi.params import Depends
import logging

from fastapi.security import OAuth2PasswordBearer
from icecream import ic

from application.services.auth_service import AuthService
from application.services.core_service import CoreService
from application.services.users_service import UsersService
from domain.user import UserRegistration, UserLogin
from infrastructure.api.responces.auth_responces.responses import RegistrationResponse, LoginResponse, RefreshResponse, \
    StatusResponse
from infrastructure.api.responces.templates import get_success_json_response
from infrastructure.config.jwt_config import REFRESH_TOKEN_COOKIE_NAME
from infrastructure.config.logs_config import log_api_decorator
from infrastructure.api.responces.default_codes import responses, raise_validation_error, raise_item_not_found, \
    raise_created, raise_internal_server_error, raise_unauthorized
from infrastructure.config.services_config import get_auth_service


router = APIRouter(prefix='/api/v1/auth', tags=["Auth"])

logger = logging.getLogger(__name__)

def config(app: FastAPI):
    app.include_router(router)

@router.post("/registration", response_model=RegistrationResponse)
async def registration(
        user_credentials: UserRegistration,
        response: Response, background_tasks: BackgroundTasks,
        auth_service: AuthService = Depends(get_auth_service)
    ):
    logger.info(f"credentials: {user_credentials}")
    if user_credentials:
        result = await auth_service.registration(user=user_credentials)
        return await get_success_json_response(data=result.get('access_token'), cookies=[{'key': REFRESH_TOKEN_COOKIE_NAME, "value": result.get('refresh_token')}])
    else:
        return await raise_validation_error()


@router.post("/login", response_model=LoginResponse)
async def login(
        user_credentials: UserLogin,
        response: Response, background_tasks: BackgroundTasks,
        auth_service: AuthService = Depends(get_auth_service)
    ):
    logger.info(f"credentials: {user_credentials}")
    if user_credentials:
        result = await auth_service.login(user=user_credentials)
        if result:
            return await get_success_json_response(
                data={
                    "access_token": result.get('access_token'),
                    "user": result.get('user')
                },
               cookies=[{'key': REFRESH_TOKEN_COOKIE_NAME, "value": result.get('refresh_token')}]
            )
        else:
            return await raise_unauthorized()
    return await raise_unauthorized()


@router.post("/refresh", response_model=RefreshResponse)
async def refresh_tokens(
        request: Request,
        response: Response, background_tasks: BackgroundTasks,
        auth_service: AuthService = Depends(get_auth_service),
        access_token: str | bytes | None = None,
    ):
    refresh_token = request.cookies.get(REFRESH_TOKEN_COOKIE_NAME)
    if refresh_token:
        result = await auth_service.refresh(refresh_token=refresh_token, access_token=access_token)
        match (result.get('code')):
            case 200:
                # await set_refresh_token_in_cookie(response=response, refresh_token=result.get('refresh_token'))
                return await get_success_json_response(data=result.get('access_token'), cookies=[{'key': REFRESH_TOKEN_COOKIE_NAME, "value": result.get('refresh_token')}])

            case 401:
                return await raise_unauthorized()
    else:
        return await raise_unauthorized()

@router.get("/status", response_model=StatusResponse)
async def status(
        request: Request,
        response: Response, background_tasks: BackgroundTasks,
        auth_service: AuthService = Depends(get_auth_service),
        access_token: str | bytes | None = None,
    ):
    if access_token:
        result = await auth_service.status(access_token=access_token)
        if result:
            return await get_success_json_response(data={"result": result})
        else:
            return await raise_unauthorized()
    else:
        return await raise_unauthorized()



