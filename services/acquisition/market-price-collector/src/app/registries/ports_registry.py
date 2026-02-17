class PortsRegistry:
    def __init__(self):
        self._by_syte_and_port = {}

    def register(self, site, port_type, impl):
        self._by_syte_and_port[(site, port_type)] = impl

    def get(self, site, port_type):
        return self._by_syte_and_port[(site, port_type)]
