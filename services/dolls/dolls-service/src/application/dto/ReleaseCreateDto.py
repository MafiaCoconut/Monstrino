from typing import Optional, List

from pydantic import BaseModel

from domain.entities.dolls.release_image import ReceiveReleaseImage
from domain.entities.dolls.release_character import ReceiveReleaseCharacter


class ReleaseCreateDto(BaseModel):
    type: str                                  # Later it will check name and save by id
    name: str
    mpn: str
    series: str                                # Later it will check name and save by id
    year: int
    description: Optional[str]
    link: str
    exclusive_of: Optional[str]                # Later it will check name and save by id
    characters: List[ReceiveReleaseCharacter]
    images: List[ReceiveReleaseImage]
