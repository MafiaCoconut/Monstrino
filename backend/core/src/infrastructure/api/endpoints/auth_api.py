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
from infrastructure.api.responces.auth_responces.responses import RegistrationResponse, LoginResponse
from infrastructure.api.responces.templates import get_success_json_response
from infrastructure.config.jwt_config import REFRESH_TOKE_COOKIE_NAME
from infrastructure.config.logs_config import log_api_decorator
from infrastructure.api.responces.default_codes import responses, raise_validation_error, raise_item_not_found, raise_created, raise_internal_server_error
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
        await set_refresh_token_in_cookie(response=response, refresh_token=result.get('refresh_token'))
        return await get_success_json_response(response=response, data=result)
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
            await set_refresh_token_in_cookie(response=response, refresh_token=result.get('refresh_token'))
            return await get_success_json_response(response=response, data=result)
        else:
            return await raise_validation_error()
    return await raise_validation_error()


@router.post("/refresh")
async def refresh_tokens(
        # TODO Нужно еще передавать access_token если он есть
        request: Request,
        response: Response, background_tasks: BackgroundTasks,
        auth_service: AuthService = Depends(get_auth_service),
        access_token: str | None = None,
):
    refresh_token = request.cookies.get(REFRESH_TOKE_COOKIE_NAME)
    if access_token:
        ic(access_token)
    else:
        ic('there is no access token')
    if refresh_token:
        ic(refresh_token)
    else:
        ic('there is no refresh token')

    # try:
    #     payload = auth.verify_token(token)
    #     return {"user": payload.sub}
    # except Exception as e:
    #     raise raise_validation_error()
    # if refresh_token_cookie:
    #     await auth_service.refresh()
    #     # TODO если refresh токен есть, проверяем что access токен еще валиден или нет, и если нет, то выдаем новый, если рефреш токен еще валиден
    #     pass
    # else:
    #     # TODO так как refresh токен не найден, то ничего не делаем
    #     pass



async def set_refresh_token_in_cookie(response: Response, refresh_token: str):
    _httponly = True
    _secure = False
    _samesite = "lax"
    _path = "/"
    response.set_cookie(
        key=REFRESH_TOKE_COOKIE_NAME,
        value=refresh_token,
        httponly=_httponly, secure=_secure, samesite=_samesite, path=_path
    )

