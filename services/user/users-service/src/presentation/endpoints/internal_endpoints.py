from fastapi import APIRouter, Response, BackgroundTasks, FastAPI
from fastapi.params import Depends
import logging

from application.services.core_service import CoreService
from presentation.deps import get_core_service
from presentation.responces.templates import get_success_json_response
# from application.services.scheduler_service import SchedulerService

router = APIRouter()

system_logger = logging.getLogger('system_logger')

def config(app: FastAPI):
    app.include_router(router)

@router.post("/restartDB", tags=["Iternal"])
async def set_db(response: Response, background_tasks: BackgroundTasks,
                 core_service: CoreService = Depends(get_core_service)
                 ):
    await core_service.restart_db()
    return await get_success_json_response(data={'message': "DB is restarted"})
