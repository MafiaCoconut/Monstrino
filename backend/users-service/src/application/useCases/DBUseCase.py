from infrastructure.db.base import Base, async_engine

from infrastructure.db.models.UserORM import UserORM
from infrastructure.db.models.DollsCollectionORM import DollsCollectionORM

class DBUseCase:
    def __init__(self):
        pass

    def restartDB(self):
        self.deleteDB()
        self.startDB()

    @staticmethod
    def deleteDB():
        Base.metadata.drop_all(bind=async_engine)

    @staticmethod
    def startDB():
        Base.metadata.create_all(bind=async_engine)

