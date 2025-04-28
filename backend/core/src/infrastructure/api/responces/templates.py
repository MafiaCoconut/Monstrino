from infrastructure.api.responces.models import ResponseModel, Meta
from fastapi.responses import JSONResponse
from fastapi import APIRouter, Response

response_router = APIRouter()

async def get_success_json_response(response: Response, data: dict):
    body = ResponseModel(
        meta=Meta(
            code=200,
            message="OK",
            description="Item fetched successfully"
        ),
        result=data
    )
    response.body = body.model_dump_json().encode('utf-8')
    response.media_type = "application/json"
    response.status_code = 200
    return response


