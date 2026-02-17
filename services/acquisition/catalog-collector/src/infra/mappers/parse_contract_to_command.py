import logging
from typing import Literal, Optional

from monstrino_api.v1.shared.errors import SelectorValidationError, UnsupportedContractKindError, \
    UnsupportedSelectorTypeError, UnsupportedContractValueError
from monstrino_contracts.v1.domains.acquisition.catalog_collector.contracts import RunParseContract
from monstrino_contracts.v1.domains.acquisition.catalog_collector.enums import SelectorTypeEnum, ParseKindEnum

from app.commands.parse_command import ParseCommand
from app.interfaces import ParseCommandInterface
from domain.enums import SourceKey
from domain.enums.parse_selector_type_enum import ParseSelectorTypeEnum

logger = logging.getLogger(__name__)

class ParseContractToCommandMapper:
    @staticmethod
    def map(contract: RunParseContract):
        """
        Maps a RunParseContract and return ParseKind and ParseDomainCommand.
        """
        selector = contract.selector
        parse_command: Optional[ParseCommand] = None
        match selector.type:
            case SelectorTypeEnum.ALL:
                parse_command = ParseCommand(
                    source=SourceKey(contract.system),
                    scope=contract.scope,
                    selector_type=ParseSelectorTypeEnum.ALL,
                )
            case SelectorTypeEnum.EXTERNAL_REF:
                parse_command =  ParseCommand(
                    source=SourceKey(contract.system),
                    scope=contract.scope,
                    selector_type=ParseSelectorTypeEnum.EXTERNAL_REF,
                    external_ref=selector.external_ref,
                )

        parse_kind = ParseKindEnum(contract.kind)

        return parse_kind, parse_command