from dataclasses import dataclass

from app.interfaces import LLMGatewayInterface

@dataclass
class Gateways:
    llm_gateway: LLMGatewayInterface
