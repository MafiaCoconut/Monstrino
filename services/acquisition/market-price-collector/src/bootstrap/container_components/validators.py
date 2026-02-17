from dataclasses import dataclass

from presentation.api.validators.parsing_contract.parsing_request_validator import ParsingRequestValidator


@dataclass(frozen=True)
class Validators:
    parsing_requests: ParsingRequestValidator