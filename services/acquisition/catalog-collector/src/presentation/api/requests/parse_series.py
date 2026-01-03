from pydantic import BaseModel, Field

class ParseSeriesRequest(BaseModel):
    batch_size: int = Field(default=10)
    limit:      int = Field(default=9999999)

class ParseSeriesByExternalIdRequest(BaseModel):
    external_id:        str = Field()
