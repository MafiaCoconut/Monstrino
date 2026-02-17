from fastapi import APIRouter, Response, BackgroundTasks, FastAPI, Request
from fastapi.params import Depends
import logging

from fastapi.security import HTTPBearer
from icecream import ic
from monstrino_api.v1.shared.errors import UnsupportedQualifierError, UnsupportedValueInsideExternalRefError
from monstrino_api.v1.shared.exceptions import ApiError, BadRequestError, InternalError, ConflictError, NotFoundError
from monstrino_api.v1.shared.responces import ResponseFactory
from monstrino_api.v1.shared.validation import PydanticValidation
from monstrino_contracts.v1.domains.acquisition.catalog_collector.contracts import RunParseContract
from monstrino_contracts.v1.domains.acquisition.catalog_collector.enums import RunScopeEnum
from monstrino_core.scheduler import SchedulerPort
from pydantic import ValidationError

from app.dispatchers import ParsingDispatcher
from app.use_cases.auth.verify_token_use_case import VerifyToken
from domain.enums.source_key import SourceKey
from infra.mappers.parse_contract_to_command import ParseContractToCommandMapper
from infra.parse_jobs import ParseCharactersJob
from infra.parse_jobs.characters.parse_by_external_id_job import ParseCharacterByExternalIdJob
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

rf: ResponseFactory

contract_mapper = ParseContractToCommandMapper()

def config_routes(app: FastAPI, _rf: ResponseFactory):
    app.include_router(private)

    global rf
    rf = _rf

@private.post('/sources/{source}/parsing-runs')
async def parsing_runs(
        source: SourceKey,
        contract: RunParseContract,
        request: Request,
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
            raise BadRequestError(message="Parsing runs with scope 'job' are not supported yet")
            await return_bad_request_found_status_code(message="Parsing runs with scope 'job' are not supported yet")

        parse_validator.validate(contract)

        kind, command = contract_mapper.map(contract)
        if not (kind and command):
            raise BadRequestError(message="Could not map contract to command")
        background_tasks.add_task(
            main_dispatcher.dispatch,
            kind=kind, command=command
        )
        return rf.accepted(request)
        return await return_accepted_status_code()
    except ValidationError as e:
        raise BadRequestError(message=PydanticValidation.get_validation_short_exc_info(e))
        return await return_bad_request_found_status_code(message=PydanticValidation.get_validation_short_exc_info(e))
    except UnsupportedValueInsideExternalRefError as e:
        logger.error(e)
        raise BadRequestError(message="Unsupported value inside external ref")
        return await return_bad_request_found_status_code(message=f"Unsupported value inside external ref")
    except UnsupportedQualifierError as e:
        logger.error(e)
        raise BadRequestError(code="", message="Unsupported qualifier")
        return await return_bad_request_found_status_code(message=f"Unsupported qualifier")
    except Exception as e:
        logger.error(f"Failed to start parse characters job for source {source} e: {e}")
        raise InternalError(code="INTERNAL_ERROR", message="Failed to start parse characters job")


@private.post('/jobs/{job_id}/resume')
async def resume_job(
        job_id: str,
        request: Request,
        response: Response, background_tasks: BackgroundTasks,
        scheduler: SchedulerPort = Depends(get_scheduler)
):
    job = scheduler.get_job(job_id)
    if not job:
        raise NotFoundError(code="JOB_NOT_FOUND", message="Job not found")
    try:
        scheduler.trigger_job(job_id=job_id)
        return rf.accepted(request)
    except Exception as e:
        logging.exception(f"Failed to resume job {job_id} e: {e}")
        raise ConflictError(code="CONFLICT", message="Failed to resume job")


