from pydantic import BaseModel, Field


class ReleaseExportSpec(BaseModel):
    ...
    # query: ReleaseQuery = Field()
    # output: OutputSpec = Field()
    # context: RequestContext = Field()