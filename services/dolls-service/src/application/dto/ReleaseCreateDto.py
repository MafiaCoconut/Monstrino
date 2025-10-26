from typing import Optional, List

from pydantic import BaseModel

from domain.entities.dolls.dolls_image import ReceiveDollsImage
from domain.entities.dolls.release_character import ReceiveReleaseCharacter


class ReleaseCreateDto(BaseModel):
    type: str
    name: str
    mpn: str
    series: str
    year: int
    description: Optional[str]
    link: str
    characters: List[ReceiveReleaseCharacter]
    images: List[ReceiveDollsImage]
