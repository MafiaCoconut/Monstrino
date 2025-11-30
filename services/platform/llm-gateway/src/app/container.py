from dataclasses import dataclass

from app.container_components import UseCases, Models


@dataclass
class AppContainer:
    use_cases: UseCases
    models: Models

