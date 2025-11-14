from dataclasses import dataclass

from application.repositories.parsed_images_repository import ParsedImagesRepository


@dataclass
class Repositories:
    parsed_images: ParsedImagesRepository