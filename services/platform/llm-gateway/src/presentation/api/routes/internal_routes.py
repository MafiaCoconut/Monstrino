from monstrino_api.requests.models import GenerateTextRequest

from application.use_cases.ollama import RequestLLMTextUseCase
from fastapi import APIRouter, Response, BackgroundTasks, FastAPI, Request
from fastapi.params import Depends

from fastapi.security import HTTPBearer

# from application.services.processing_service import ProcessingService
from application.use_cases.auth.verify_token_use_case import VerifyToken
from presentation.api.deps import get_request_llm_text_uc
from presentation.api.responces.default_codes import responses
from presentation.api.responces.templates import get_success_json_response

# from presentation.deps import get_processing_service
#
router = APIRouter()
auth_scheme = HTTPBearer()
private = APIRouter(prefix='/api/v1/internal',
                    tags=["Private"], dependencies=[Depends(VerifyToken())])
public = APIRouter(prefix='/api/v1', tags=["Public"])


def config_routes(app: FastAPI):
    app.include_router(private)
    app.include_router(public)

@public.get("/")
async def root():
    return await get_success_json_response(data={"message": "LLM Gateway is running"})

@private.post('/generate_text')
async def generate_text(
        request: GenerateTextRequest,
        request_llm_text_uc: RequestLLMTextUseCase = Depends(get_request_llm_text_uc)
):
    return await request_llm_text_uc.execute(
        prompt=request.prompt,
        system=request.system,
        response_format=request.response_format
    )



# @router.post('/parse')
# async def parse(
#         response: Response, background_tasks: BackgroundTasks,
#         processing_service: ProcessingService = Depends(get_processing_service)
# ):
#     await processing_service.parse()
#
#
# @private.post('/process_characters')
# async def process_characters(
#         request: Request,
#         response: Response, background_tasks: BackgroundTasks,
#         processing_service: ProcessingService = Depends(get_processing_service)
# ):
#     # payload = json.loads(payload.value.decode('utf-8'))
#     await processing_service.process_characters()
#
#
# @private.post('/process_pets')
# async def process_pets(
#         request: Request,
#         response: Response, background_tasks: BackgroundTasks,
#         processing_service: ProcessingService = Depends(get_processing_service)
# ):
#     # payload = json.loads(payload.value.decode('utf-8'))
#     await processing_service.process_pets()
#
#
# @private.post('/process_series')
# async def process_series(
#         request: Request,
#         response: Response, background_tasks: BackgroundTasks,
#         processing_service: ProcessingService = Depends(get_processing_service)
# ):
#     # payload = json.loads(payload.value.decode('utf-8'))
#     await processing_service.process_series()
#
#
# @private.post('/process_release')
# async def process_release(
#         request: Request,
#         response: Response, background_tasks: BackgroundTasks,
#         processing_service: ProcessingService = Depends(get_processing_service)
# ):
#     # payload = json.loads(payload.value.decode('utf-8'))
#     await processing_service.process_release()
