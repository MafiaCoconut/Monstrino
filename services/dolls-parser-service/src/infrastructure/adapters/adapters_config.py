from app.container import Adapters
from infrastructure.adapters.mh_archive_adapter import MHArchiveAdapter
from infrastructure.logging.logger_adapter import LoggerAdapter


def build_adapters(logger: LoggerAdapter) -> Adapters:
    return Adapters(
        MHArchive=MHArchiveAdapter(),
        logger=logger
    )