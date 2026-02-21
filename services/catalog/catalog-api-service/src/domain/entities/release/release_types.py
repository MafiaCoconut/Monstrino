from pydantic import BaseModel

class ReleaseType(BaseModel):
    code:       str
    title:      str
    category:   str
    
    
