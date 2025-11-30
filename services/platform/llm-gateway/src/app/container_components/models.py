from dataclasses import dataclass
from application.interfaces import TextOllamaModelInterface, ImageOllamaModelInterface

@dataclass
class Models:
    mistral: TextOllamaModelInterface
    # llava: ImageOllamaModelInterface