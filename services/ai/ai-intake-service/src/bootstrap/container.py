from dataclasses import dataclass
from typing import Any

from monstrino_core.interfaces import UnitOfWorkFactoryInterface

from app.ports import Repositories
from bootstrap.container_components import Adapters, Gateways, Services


@dataclass
class AppContainer:
    adapters: Adapters
    services: Services
    uow_factory: UnitOfWorkFactoryInterface[Any, Repositories]

