from fastapi import APIRouter, Response, BackgroundTasks, FastAPI, Request
from fastapi.params import Depends
import logging

from fastapi.security import HTTPBearer
from icecream import ic
from monstrino_api.v1.shared.errors import UnsupportedQualifierError, UnsupportedValueInsideExternalRefError
from monstrino_api.v1.shared.responces import return_conflict_error_status_code, return_accepted_status_code, \
    return_item_not_found_status_code, return_internal_server_error_status_code
from monstrino_api.v1.shared.responces.default_codes import return_bad_request_found_status_code
from monstrino_api.v1.shared.validation import PydanticValidation
from monstrino_contracts.v1.domains.acquisition.catalog_collector.contracts import RunParseContract
from monstrino_contracts.v1.domains.acquisition.catalog_collector.enums import RunScopeEnum
from pydantic import ValidationError

from application.dispatchers import ParsingDispatcher
from application.ports.scheduler_port import SchedulerPort
from application.use_cases.auth.verify_token_use_case import VerifyToken
from domain.enums.source_key import SourceKey
from infrastructure.mappers.parse_contract_to_command import ParseContractToCommandMapper
from infrastructure.parse_jobs import ParseCharactersJob
from infrastructure.parse_jobs.characters.parse_by_external_id_job import ParseCharacterByExternalIdJob
from presentation.api.deps import get_parsing_request_validator
from presentation.api.deps.dispatcher import get_main_dispatcher
from presentation.api.deps.parse_jobs import get_parse_character_by_external_id_job
from presentation.api.deps.scheduler import get_scheduler
from presentation.api.requests import ParseCharacterByExternalIdRequest
from presentation.api.validators.parsing_contract.parsing_request_validator import ParsingRequestValidator

logger = logging.getLogger(__name__)

router = APIRouter()
auth_scheme = HTTPBearer()
private = APIRouter(prefix='/api/v1/internal',
                    tags=["Private"], dependencies=[Depends(VerifyToken())])
public = APIRouter(prefix='/api/v1', tags=["Public"])

contract_mapper = ParseContractToCommandMapper()

def config(app: FastAPI):
    app.include_router(private)



# @router.post('/parse')
# async def parse(
#         response: Response, background_tasks: BackgroundTasks,
#         parser_service: ParserService = Depends(get_parser_service)
# ):
#     await parser_service.parse()
#
#
# class Payload(BaseModel):
#     dict: dict


# @private.post('/kafka_publish_message')
# async def parse(
#         request: Request,
#         response: Response, background_tasks: BackgroundTasks,
#         parser_service: ParserService = Depends(get_parser_service)
# ):
#     # payload = json.loads(payload.value.decode('utf-8'))
#     await parser_service.publish_message(await request.json())
#
#
# @private.post('/parse_characters')
# async def parse_characters(
#         request: Request,
#         response: Response, background_tasks: BackgroundTasks,
#         parser_service: ParserService = Depends(get_parser_service)
# ):
#     # payload = json.loads(payload.value.decode('utf-8'))
#     await parser_service.parse_characters()
#
#
# @private.post('/parse_pets')
# async def parse_pets(
#         request: Request,
#         response: Response, background_tasks: BackgroundTasks,
#         parser_service: ParserService = Depends(get_parser_service)
# ):
#     # payload = json.loads(payload.value.decode('utf-8'))
#     await parser_service.parse_pets()
#
#
# @private.post('/parse_series')
# async def parse_series(
#         request: Request,
#         response: Response, background_tasks: BackgroundTasks,
#         parser_service: ParserService = Depends(get_parser_service)
# ):
#     # payload = json.loads(payload.value.decode('utf-8'))
#     await parser_service.parse_series()
#
#
# @private.post('/parse_release')
# async def parse_release(
#         request: Request,
#         response: Response, background_tasks: BackgroundTasks,
#         parser_service: ParserService = Depends(get_parser_service),
#         scheduler: SchedulerPort = Depends(get_scheduler)
# ):
    ...
    # payload = json.loads(payload.value.decode('utf-8'))
    # scheduler.
    # await parser_service.parse_release()
@private.post('/sources/{source}/parsing-runs')
async def parsing_runs(
        source: SourceKey,
# request: Request,
        contract: RunParseContract,
        response: Response, background_tasks: BackgroundTasks,
        main_dispatcher: ParsingDispatcher = Depends(get_main_dispatcher),
        parse_validator: ParsingRequestValidator = Depends(get_parsing_request_validator)
):
    """
    FLOW
    1. Get contract
    2. Map contract to command
    3. Send command to dispatcher
    4. From dispatcher call parse job
    """
    try:
        if contract.scope == RunScopeEnum.JOB:
            await return_bad_request_found_status_code(message="Parsing runs with scope 'job' are not supported yet")

        parse_validator.validate(contract)

        kind, command = contract_mapper.map(contract)
        if not (kind and command):
            return await return_item_not_found_status_code()
        ic(kind, command)
        background_tasks.add_task(
            main_dispatcher.dispatch,
            kind=kind, command=command
        )
        return await return_accepted_status_code()
    except ValidationError as e:
        return await return_bad_request_found_status_code(message=PydanticValidation.get_validation_short_exc_info(e))
    except UnsupportedValueInsideExternalRefError as e:
        logger.error(e)
        return await return_bad_request_found_status_code(message=f"Unsupported value inside external ref")
    except UnsupportedQualifierError as e:
        logger.error(e)
        return await return_bad_request_found_status_code(message=f"Unsupported qualifier")
    except Exception as e:
        logger.error(f"Failed to start parse characters job for source {source} e: {e}")
        return await return_internal_server_error_status_code()



# @private.post('/sources/{source}/parse/characters')
# async def parse_characters(
#         source: SourceKey,
#         body: ParseCharactersRequest,
#         response: Response, background_tasks: BackgroundTasks,
#         parse_characters_job: ParseCharactersJob = Depends(get_parse_characters_job)
# ):
#     try:
#         background_tasks.add_task(
#             parse_characters_job.execute,
#             source=source, batch_size=body.batch_size, limit=body.limit
#         )
#         return await return_accepted_status_code()
#     except Exception as e:
#         logger.error(f"Failed to start parse characters job for source {source} e: {e}")
#         return await return_conflict_error_status_code()


@private.post('/sources/{source}/parse/characters_by_external_id')
async def parse_character_by_external_id(
        source: SourceKey,
        body: ParseCharacterByExternalIdRequest,
        response: Response, background_tasks: BackgroundTasks,
        parse_characters_job: ParseCharacterByExternalIdJob = Depends(get_parse_character_by_external_id_job)
):
    try:
        background_tasks.add_task(
            parse_characters_job.execute,
            source=source, external_id=body.external_id, gender=body.gender
        )
        return await return_accepted_status_code()
    except Exception as e:
        logger.error(f"Failed to start parse characters job for source {source} e: {e}")
        return await return_conflict_error_status_code()


@private.post('/jobs/{job_id}/resume')
async def resume_job(
        job_id: str,
        request: Request,
        response: Response, background_tasks: BackgroundTasks,
        scheduler: SchedulerPort = Depends(get_scheduler)
):
    job = scheduler.get_job(job_id)
    if not job:
        return await return_item_not_found_status_code()
    try:
        scheduler.trigger_job(job_id=job_id)
    except Exception as e:
        logging.exception(f"Failed to resume job {job_id} e: {e}")
        return await return_conflict_error_status_code()
