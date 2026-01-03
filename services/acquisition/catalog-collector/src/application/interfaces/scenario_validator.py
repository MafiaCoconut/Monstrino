from typing import Protocol

class ScenarioValidator(Protocol):
    def validate(self, contract) -> None: ...
