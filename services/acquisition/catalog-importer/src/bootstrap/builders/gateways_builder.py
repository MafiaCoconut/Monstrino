from monstrino_infra.gateways import LLMGateway

from app.container_components import Gateways


def build_gateways():
    return Gateways(
        llm_gateway=LLMGateway()
    )