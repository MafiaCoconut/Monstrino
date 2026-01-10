from dataclasses import dataclass
from typing import Optional

from src.domain.enums import OutputFormatEnum


@dataclass(frozen=True)
class OutputSpec:
    format:         OutputFormatEnum    = OutputFormatEnum.JSON
    schema_version: str                 = "v1.0"

