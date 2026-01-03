from typing import Any

from monstrino_contracts.v1.domains.acquisition.catalog_collector.contracts import RunParseContract
from monstrino_contracts.v1.domains.acquisition.catalog_collector.enums import SelectorTypeEnum

from application.interfaces import ScenarioValidator


class PetValidator:
    def __init__(self, registry: dict[str, ScenarioValidator]):
        self.registry = registry

    def validate(self, contract: RunParseContract) -> None:
        match contract.selector.type:
            case SelectorTypeEnum.ALL:
                "Doesn't have any validations"
            case SelectorTypeEnum.EXTERNAL_REF:
                self.registry.get(SelectorTypeEnum.EXTERNAL_REF).validate(contract.selector.external_ref)


