from pydantic import BaseModel


class IngestItemStepInputRefData(BaseModel):
    attribute:  str
    value:      str

class IngestItemStepInputRef(BaseModel):
    kind:       str
    entity:     str
    data: list[IngestItemStepInputRefData]
