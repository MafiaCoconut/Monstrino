from dataclasses import dataclass
from typing import Any

from monstrino_core.interfaces.uow.unit_of_work_factory_interface import UnitOfWorkFactoryInterface

from application.ports import Repositories
from bootstrap.container_components import Adapters, Gateways, Services
from domain.entities import ProcessJobs


@dataclass
class AppContainer:
    adapters: Adapters
    services: Services
    gateways: Gateways
    uow_factory: UnitOfWorkFactoryInterface[Any, Repositories]
    process_jobs: ProcessJobs

