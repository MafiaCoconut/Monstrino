from typing import Optional

from pydantic import BaseModel


class ParsedReleaseDTO(BaseModel):
    name: Optional[str] = None
    characters: Optional[str] = None
    series_name: Optional[str] = None
    type_name: Optional[str] = None
    gender: Optional[str] = None
    multi_pack: Optional[str] = None
    year: Optional[str] = None
    exclusive_of_names: Optional[str] = None
    reissue_of: Optional[str] = None
    mpn: Optional[str] = None
    pet_names: Optional[str] = None
    description: Optional[str] = None
    from_the_box_text: Optional[str] = None
    primary_image: Optional[str] = None
    images: Optional[str] = None
    images_link: Optional[str] = None
    link: Optional[str] = None
    original_html_content: Optional[str] = None
    extra: Optional[str] = ""

