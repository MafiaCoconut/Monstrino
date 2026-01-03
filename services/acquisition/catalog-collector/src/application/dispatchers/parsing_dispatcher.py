import logging
from dataclasses import dataclass
from typing import Any

from icecream import ic
from monstrino_api.v1.shared.errors import UnsupportedSelectorTypeError, UnsupportedContractKindError, \
    UnsupportedContractValueError

from bootstrap.container_components import ParseJobs
from domain.enums import ParseKindEnum
from ..commands import ParseCommand
from ..interfaces import DomainDispatcherInterface

logger = logging.getLogger(__name__)


class ParsingDispatcher:
    def __init__(
            self,
            _parse_jobs: ParseJobs,
            _handlers: dict[ParseKindEnum, DomainDispatcherInterface]
    ):
        self.parse_jobs = _parse_jobs
        self.handlers = _handlers

    async def dispatch(self, kind: ParseKindEnum, command: ParseCommand) -> None:
        handler = self.handlers.get(kind)
        if handler is None:
            raise ValueError(f'No dispatcher registered kind={kind}')
        try:
            await handler.dispatch(command)
        except Exception as e:
            logger.error(f"Error during parsing dispatch command={command}: {e}")
