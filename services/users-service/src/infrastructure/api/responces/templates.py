from infrastructure.api.responces.models import ResponseModel, Meta
from fastapi.responses import JSONResponse
from fastapi import APIRouter

response_router = APIRouter()

async def get_success_json_response(data: dict):
    response = ResponseModel(
        meta=Meta(
            code="200",
            message="OK",
            description="Item fetched successfully"
        ),
        result=data
    )
    return JSONResponse(content=response.model_dump(), status_code=200)


