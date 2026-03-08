from dataclasses import dataclass


@dataclass(frozen=True)
class ProcessCharactersConfig:
    batch_size: int = 150
    max_concurrency: int = 1  # start safe; raise if image queue is slow
    delete_character_on_image_error: bool = False  # safer default: keep, пометить parsed как error