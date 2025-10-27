from dataclasses import dataclass

from app.container_components.adapters import Adapters
from app.container_components.repositories import Repositories
from app.container_components.services import Services
from application.registries.ports_registry import PortsRegistry

@dataclass
class AppContainer:
    registry: PortsRegistry
    adapters: Adapters
    services: Services
    repositories: Repositories
