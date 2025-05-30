import os

from icecream import ic
from selenium.webdriver.firefox.options import Options as FirefoxOptions
from selenium.webdriver.firefox.service import Service
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.firefox_binary import FirefoxBinary

from infrastructure.config.logs_config import log_decorator

# Было добавлено только что
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

@log_decorator(print_args=False, print_kwargs=False)
async def get_selenium_driver() -> webdriver.Firefox:
    """
    Это функция настройки драйвера браузера для обычного устройства и для сервера в зависимости от
    DEVICE в котором была запущена программа
    """
    FF_OPTIONS = [
        # '--headless',         # удалить чтобы появилась картинка
        '--no-sandbox',
        '--accept-cookies'
        '--disable-xss-auditor',
        '--disable-endpoints-security',
        '--ignore-certificate-errors',
        '--log-level=1',
        '--disable-notifications'
    ]

    SET_PREF = {
        'general.useragent.override': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
        'permissions.default.desktop-notification': 1,
        'dom.webnotifications.enabled': 1,
        'dom.push.enabled': 1,
        'intl.accept_languages': 'en-US',
        # "permissions.default.image": 2,  # Отключение загрузки изображений
        "dom.disable_open_during_load": True, # Было добавлено только что
        "browser.helperApps.neverAsk.saveToDisk": "application/pdf", # Было добавлено только что
    }
    # Было добавлено только что
    caps = DesiredCapabilities().FIREFOX
    caps["pageLoadStrategy"] = "eager"  # Ждать только загрузки DOM, не ресурсов

    options = FirefoxOptions()
    if os.getenv("DEVICE") == "Ubuntu":
        options.binary_location = "/usr/bin/firefox"
        geckodriver_path = "/usr/local/bin/geckodriver"

    elif os.getenv("DEVICE") == "Raspberry" or os.getenv("DEVICE") == "RaspberryTest":
        geckodriver_path = "/src/geckodriver"
        FF_OPTIONS.append('--headless')

    else:
        raise ValueError("WRONG ENV DEVICE")

    [options.add_argument(opt) for opt in FF_OPTIONS]
    [options.set_preference(key, value) for key, value in SET_PREF.items()]

    driver = webdriver.Firefox(
        service=Service(geckodriver_path),
        options=options
    )
    return driver

# if __name__ == '__main__':
#     driver = get_selenium_driver()
#     driver.get('http://www.python.org')