from datetime import datetime
from pydantic import BaseModel, Field


class UsersCollection(BaseModel):
    id: int
    ownerId: int

    updatedAt: datetime
    createdAt: datetime