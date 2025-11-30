from dataclasses import dataclass

from app.container_components.adapters import Adapters
from app.container_components.repositories import Repositories
from app.container_components.services import Services

@dataclass
class AppContainer:
    adapters: Adapters
    services: Services
    repositories: Repositories

