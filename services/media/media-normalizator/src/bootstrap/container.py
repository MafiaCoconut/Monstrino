from dataclasses import dataclass
from typing import Any

from monstrino_core.interfaces.uow.unit_of_work_factory_interface import UnitOfWorkFactoryInterface

from application.ports import Repositories
from .container_components.use_cases import UseCases


@dataclass
class AppContainer:
    use_cases: UseCases
    uow_factory: UnitOfWorkFactoryInterface[Any, Repositories]


