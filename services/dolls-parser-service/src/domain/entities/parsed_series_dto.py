from typing import Optional

from pydantic import BaseModel


class ParsedSeriesDTO(BaseModel):
    name: str
    display_name: str
    description: Optional[str] = None
    series_type: Optional[str] = None
    primary_image: str
    link: str
    count_of_releases: int
    original_html_content: str
