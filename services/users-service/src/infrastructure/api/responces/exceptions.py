from fastapi import HTTPException
from infrastructure.api.responces.models import ResponseModel, Meta
from fastapi.responses import JSONResponse


def rewrite_http_exception_response(app):
    @app.exception_handler(HTTPException)
    async def custom_http_exception_handler(request, exc: HTTPException):
        print("!!!!!!!!!!!!!!!!!!!!!!!")

        response = ResponseModel(
            meta=Meta(
                code=str(exc.status_code),
                message="ERROR",
                description=exc.detail
            ),
            result={}
        )
        return JSONResponse(content=response.model_dump(), status_code=exc.status_code)
