class PortsRegistry:
    def __init__(self):
        self._by_syte_and_port = {}

    def register(self, market_source, port_type, impl):
        self._by_syte_and_port[(market_source, port_type)] = impl

    def get(self, market_source, port_type):
        return self._by_syte_and_port[(market_source, port_type)]
