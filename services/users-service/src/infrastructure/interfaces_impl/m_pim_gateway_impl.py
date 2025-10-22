class MPimGatewayImpl(MPimGateway):
    @abstractmethod
    async def send_message(self, message: str):
        pass