from monstrino_contracts.v1.domains.acquisition.catalog_collector.contracts import RunParseContract
from monstrino_contracts.v1.domains.acquisition.catalog_collector.enums import SelectorTypeEnum

from application.interfaces import ScenarioValidator
from domain.enums import ParseKindEnum


class ParsingRequestValidator:
    def __init__(
            self,
            domain_validators: dict[ParseKindEnum, ScenarioValidator]
    ):
        self.domain_validators = domain_validators

    def validate(self, contract: RunParseContract) -> None:
        kind = contract.kind

        domain_validator = self.domain_validators.get(kind)
        if domain_validator is None:
            raise ValueError(f"Domain validator is missing for kind={kind}")
        domain_validator.validate(contract)
