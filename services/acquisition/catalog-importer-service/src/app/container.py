from dataclasses import dataclass

from app.dependencies.container_components.adapters import Adapters
from app.dependencies.container_components.repositories import Repositories
from app.dependencies.container_components.services import Services

@dataclass
class AppContainer:
    adapters: Adapters
    services: Services
    repositories: Repositories

