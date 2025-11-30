from dataclasses import dataclass

from app.container_components import Adapters, Gateways, Repositories, Services

@dataclass
class AppContainer:
    adapters: Adapters
    services: Services
    repositories: Repositories
    gateways: Gateways

