from app.interfaces import TextOllamaModelInterface
from app.use_cases.ollama import RequestLLMTextUseCase
from bootstrap.container_components import UseCases


def build_use_cases(text_model: TextOllamaModelInterface):
    return UseCases(
        request_llm_text=RequestLLMTextUseCase(
            text_model=text_model
        )

    )