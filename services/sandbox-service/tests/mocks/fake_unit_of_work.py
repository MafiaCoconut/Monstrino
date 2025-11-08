from interfaces.unit_of_work_interface import UnitOfWorkInterface


class FakeUnitOfWork(UnitOfWorkInterface):
    def __init__(self):
        # self.batches = FakeBatchRepository([])
        self.committed = False
    def __enter__(self): return self
    def __exit__(self): self.rollback()
    def commit(self): self.committed = True
    def rollback(self): pass