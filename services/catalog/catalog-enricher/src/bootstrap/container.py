from dataclasses import dataclass
from typing import Any

from monstrino_core.kernel import UnitOfWorkFactoryInterface

from app.ports.repositories import Repositories
from bootstrap.container_components.services import Services
from monstrino_core.kernel import PortsRegistry

@dataclass
class AppContainer:
    registry: PortsRegistry
    services: Services
    uow_factory: UnitOfWorkFactoryInterface[Any, Repositories]
