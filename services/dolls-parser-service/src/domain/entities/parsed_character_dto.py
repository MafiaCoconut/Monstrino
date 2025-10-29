from typing import Optional

from pydantic import BaseModel


class ParsedCharacterDTO(BaseModel):
    name: str
    display_name: str
    gender: str
    link: str
    count_of_releases: int
    primary_image: str
    description: Optional[str] = None
    original_html_content: Optional[str] = None
