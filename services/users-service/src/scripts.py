from infrastructure.db.base import Base, sync_engine

from infrastructure.db.models.refresh_tokens_orm import RefreshTokensORM

def create_tables():
    Base.metadata.create_all(sync_engine)


create_tables()