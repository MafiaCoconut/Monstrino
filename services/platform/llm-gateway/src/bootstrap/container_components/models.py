from dataclasses import dataclass
from app.interfaces import TextOllamaModelInterface, ImageOllamaModelInterface

@dataclass
class Models:
    mistral: TextOllamaModelInterface
    # llava: ImageOllamaModelInterface