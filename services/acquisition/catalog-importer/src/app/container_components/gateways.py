from dataclasses import dataclass

from application.interfaces import LLMGatewayInterface

@dataclass
class Gateways:
    llm_gateway: LLMGatewayInterface
