from datetime import datetime
from pydantic import BaseModel, Field


class DollsCollection(BaseModel):
    id: int
    ownerId: int

    updatedAt: datetime
    createdAt: datetime