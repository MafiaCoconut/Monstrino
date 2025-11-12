from infrastructure.db.base import Base, sync_engine

from infrastructure.db.models.refresh_token_orm import RefreshTokensORM
from infrastructure.db.models.user_orm import UserORM


def create_tables():
    Base.metadata.create_all(sync_engine)


def drop_tables():
    Base.metadata.drop_all(sync_engine)


print(sync_engine.url)
create_tables()
# drop_tables()
