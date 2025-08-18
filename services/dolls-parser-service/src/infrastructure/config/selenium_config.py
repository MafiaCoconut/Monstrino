import os
from selenium import webdriver
from selenium.webdriver.chrome.options import Options as ChromeOptions
from selenium.webdriver.chrome.service import Service as ChromeService

from infrastructure.logging.logs_config import log_decorator

@log_decorator(print_args=False, print_kwargs=False)
async def get_selenium_driver() -> webdriver.Chrome:
    """
    Создаёт и настраивает Chrome/Chromium WebDriver.
    Работает на обычном Ubuntu-хосте и на Raspberry Pi.
    Управляется через переменную окружения DEVICE.
    """

    # Базовые аргументы. Безопасные и актуальные для headless/CI.
    CH_ARGS = [
        "--no-sandbox",                 # нужен в контейнерах и CI
        "--disable-dev-shm-usage",     # уменьшает зависания в Docker/малых RAM
        "--ignore-certificate-errors",
        "--log-level=1",
        "--disable-notifications",     # если уведомления не нужны — оставьте
    ]

    # Экспериментальные prefs (аналог Firefox prefs)
    CH_PREFS = {
        # Язык интерфейса/Accept-Language:
        "intl.accept_languages": "en-US",
        # Уведомления: 1 — разрешить, 2 — блокировать
        "profile.default_content_setting_values.notifications": 1,
        # Скачивания/PDF:
        "download.prompt_for_download": False,
        "plugins.always_open_pdf_externally": True,  # открывать PDF во внешнем viewer’e
        # Пример: отключить картинки (если нужно экономить трафик/ускорить парсинг)
        # "profile.managed_default_content_settings.images": 2,
    }

    options = ChromeOptions()

    # Современный способ в Selenium 4: напрямую через options
    options.page_load_strategy = "eager"

    # User-Agent (если нужен спуфинг)
    options.add_argument(
        "--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/139.0.0.0 Safari/537.36"
    )

    for a in CH_ARGS:
        options.add_argument(a)

    options.add_experimental_option("prefs", CH_PREFS)

    # Если работаете с самоподписанными сертификатами:
    # options.set_capability("acceptInsecureCerts", True)

    # Выбор бинарника и chromedriver по DEVICE
    device = os.getenv("DEVICE")
    chromedriver_path = None

    if device == "UBUNTU":
        # Если вы уже скачали chromedriver — укажите путь:
        chromedriver_path = "/usr/local/bin/chromedriver"

        # Графический режим по умолчанию; закомментируйте строку ниже,
        # если хотите видеть окно браузера.
        # options.add_argument("--headless=new")

    elif device in ("Raspberry", "RaspberryTest"):
        # Ваш путь к chromedriver под ARM
        chromedriver_path = "/src/chromedriver"
        # На ARM/headless предпочтительно новое headless API
        options.add_argument("--headless=new")

    else:
        raise ValueError("WRONG ENV DEVICE")

    # Если хотите полностью отключить CORS/политику безопасности для специфичных задач:
    # ВНИМАНИЕ: делайте это только в изолированной среде!
    # options.add_argument("--disable-web-security")
    # options.add_argument("--allow-running-insecure-content")

    # 1) Явный путь к драйверу (то, что вы просили — chromedriver уже скачан)
    service = ChromeService(executable_path=chromedriver_path)
    driver = webdriver.Chrome(service=service, options=options)

    # 2) Альтернатива: положиться на Selenium Manager (если chromedriver не нужен/не указан)
    # driver = webdriver.Chrome(options=options)

    return driver
