import logging
import os

from bootstrap.builders import build_apscheduler, build_adapters, build_services, \
    uow_factory_config, build_parse_jobs, build_dispatchers
from bootstrap.configs import scheduler_config, registry_config
from bootstrap.configs.registry import registry
from bootstrap.builders.validators_builder import build_validators
from bootstrap.container import AppContainer
from domain.enums import SourceKey

logger = logging.getLogger(__name__)


def build_app():
    logger.debug("Processing wiring")

    logger.debug("Starting source configuration")
    source = os.getenv("SOURCE")
    try:
        source = SourceKey(source)
    except Exception as e:
        logger.error(f"Invalid SOURCE environment variable: {source}")
        raise e
    logger.info("Source configured as %s", source)

    logger.debug("Starting scheduler configuration")
    aps = build_apscheduler()

    logger.debug("Starting adapters configuration")
    adapters = build_adapters(aps)

    logger.debug("Starting registry configuration")
    registry_config(adapters)

    logger.debug("Starting  services configuration")
    services = build_services(adapters=adapters)

    logger.debug("Starting uow_factory configuration")
    uow_factory = uow_factory_config()

    logger.debug("Start parse jobs setup")
    parse_jobs = build_parse_jobs(uow_factory=uow_factory, registry=registry)

    logger.debug("Start scheduler cron jobs setup")
    scheduler_config(source=source, scheduler=adapters.scheduler, parse_jobs=parse_jobs)

    logger.debug("Starting dispatchers configuration")
    dispatchers = build_dispatchers(parse_jobs=parse_jobs)

    logger.debug("Starting validators configuration")
    validators = build_validators()

    return AppContainer(
        services=services,
        adapters=adapters,
        dispatchers=dispatchers,
        validators=validators,
        registry=registry,
        uow_factory=uow_factory,
        parse_jobs=parse_jobs
    )

