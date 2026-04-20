from pydantic import BaseModel

class OllamaModelDetails(BaseModel):
    parent_model: str
    format: str
    family: str
    families: list[str]
    parameter_size: str
    quantization_level: str

class OllamaModel(BaseModel):
    name: str
    model: str
    modified_at: str
    size: int
    digest: str
    details: dict



class OllamaClientResponseTags(BaseModel):
    models: list[OllamaModel]