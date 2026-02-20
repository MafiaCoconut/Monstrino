from app.container import AppContainer
from app.bootstrap import *
# from infrastructure.adapters.adapters_config import build_adapters
# from infrastructure.logging.logger_adapter import LoggerAdapter


def build_app():

    models = build_models()

    use_cases = build_use_cases(text_model=models.mistral)

    return AppContainer(
        models=models,
        use_cases=use_cases
    )

