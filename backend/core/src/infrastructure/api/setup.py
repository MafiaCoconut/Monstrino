import uvicorn
import logging
import os

from infrastructure.api.endpoints.users_api import UsersApi

from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware

from infrastructure.config.services_config import get_scheduler_service


def endpoints_activate():
    pass



