from fastapi import Request

from application.services.db_internal_service import DBInternalService


def get_db_internal_service(request: Request) -> DBInternalService:
    return request.app.state.container.services.db_internal
