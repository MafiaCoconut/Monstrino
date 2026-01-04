import logging

from bootstrap.builders import build_apscheduler, build_services, build_uow_factory, build_gateways
from bootstrap.builders.process_jobs import build_process_jobs
from bootstrap.configs import scheduler_config
from bootstrap.container import AppContainer
from infra.adapters.adapters_config import build_adapters

logger = logging.getLogger(__name__)


def build_app():
    logger.debug("Processing wiring")

    logger.debug("Processing scheduler building")
    aps = build_apscheduler()

    logger.debug("Starting adapters building")
    adapters = build_adapters(aps)

    logger.debug("Processing services building")
    services = build_services()

    logger.debug("Starting uow_factory building")
    uow_factory = build_uow_factory()

    logger.debug("Starting process jobs building")
    process_jobs = build_process_jobs(uow_factory=uow_factory, services=services)

    logger.debug("Processing gateways building")
    gateways = build_gateways()

    logger.debug("Processing scheduler configuration")
    scheduler_config(scheduler=adapters.scheduler, process_jobs=process_jobs)

    return AppContainer(
        services=services,
        adapters=adapters,
        gateways=gateways,
        uow_factory=uow_factory,
        process_jobs=process_jobs
    )

