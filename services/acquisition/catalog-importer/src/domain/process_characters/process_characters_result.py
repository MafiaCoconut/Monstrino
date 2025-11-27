from dataclasses import dataclass


@dataclass
class ProcessCharactersResult:
    fetched: int = 0
    processed: int = 0
    skipped: int = 0
    failed: int = 0
    notes: list[str] = None

    def __post_init__(self):
        if self.notes is None:
            self.notes = []