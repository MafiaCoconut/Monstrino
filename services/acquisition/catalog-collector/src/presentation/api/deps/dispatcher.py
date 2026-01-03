from fastapi import Request, Depends
from app.container import AppContainer
from app.container_components import Dispatchers
from application.dispatchers import ParsingDispatcher
from presentation.api.deps.container import get_container


# ------------------------------ Parse Characters Jobs Dependencies ------------------------ #
def get_dispatchers(container: AppContainer = Depends(get_container)) -> Dispatchers:
    return container.dispatchers

def get_main_dispatcher(dispatchers: Dispatchers = Depends(get_dispatchers)) -> ParsingDispatcher:
    return dispatchers.main