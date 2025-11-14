from presentation.responces.models import ResponseModel, Meta
from fastapi.responses import JSONResponse
from fastapi import APIRouter

response_router = APIRouter()

async def get_success_json_response(data: dict | str, cookies: list[dict] | None = None):
    body = ResponseModel(
        meta=Meta(
            code=200,
            message="OK",
            description="Item fetched successfully"
        ),
        result=data
    )
    response = JSONResponse(content=body.model_dump(), status_code=200, )
    if cookies:
        await set_cookies(response=response, cookies=cookies)
    response.headers["Content-Type"] = "application/json"
    return response



async def set_cookies(response: JSONResponse, cookies: list[dict]):
        _httponly = True
        _secure = False
        _samesite = "lax"
        _path = "/"

        for cookie in cookies:

            response.set_cookie(
                key=cookie.get("key"),
                value=cookie.get("value"),
                httponly=_httponly, secure=_secure, samesite=_samesite, path=_path
            )


async def get_json_response(status_code: int, message: str, description: str, data: dict | str):
    response = ResponseModel(
        meta=Meta(
            code=status_code,
            message=message,
            description=description
        ),
        result=data
    )
    response = JSONResponse(content=response.model_dump(), status_code=status_code)
    response.headers["Content-Type"] = "application/json"
    return response

