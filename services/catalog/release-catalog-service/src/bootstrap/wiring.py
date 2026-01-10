import logging

from bootstrap.builders.uow_factory import build_uow_factory
from bootstrap.builders.use_cases import build_use_cases
from bootstrap.container import AppContainer

logger = logging.getLogger(__name__)


def build_app():
    logger.debug("Processing wiring")

    logger.debug("Starting uow_factory building")
    uow_factory = build_uow_factory()

    logger.debug("Starting use cases building")
    use_cases = build_use_cases(uow_factory)

    return AppContainer(
        use_cases=use_cases,
        uow_factory=uow_factory,
    )

