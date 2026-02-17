from dataclasses import dataclass
from typing import Any

from monstrino_core.interfaces.uow.unit_of_work_factory_interface import UnitOfWorkFactoryInterface

from bootstrap.container_components import Validators
from domain.entities import ParseJobs
from bootstrap.container_components.adapters import Adapters
from bootstrap.container_components.dispatchers import Dispatchers
from application.ports.repositories import Repositories
from bootstrap.container_components.services import Services
from application.registries.ports_registry import PortsRegistry

@dataclass
class AppContainer:
    registry: PortsRegistry
    adapters: Adapters
    services: Services
    validators: Validators
    dispatchers: Dispatchers
    uow_factory: UnitOfWorkFactoryInterface[Any, Repositories]
    parse_jobs: ParseJobs
