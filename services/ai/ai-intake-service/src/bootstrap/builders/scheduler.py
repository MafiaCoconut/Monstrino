from apscheduler.schedulers.asyncio import AsyncIOScheduler
from pytz import timezone

def build_apscheduler():
    return AsyncIOScheduler(timezone=timezone("Europe/Berlin"))