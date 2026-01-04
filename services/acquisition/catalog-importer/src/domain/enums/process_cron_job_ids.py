from enum import StrEnum


class ProcessCronJobIDs(StrEnum):
    PROCESS_CHARACTER = "process_characters_cron_job"
    PROCESS_SERIES    = "process_series_cron_job"
    PROCESS_PET       = "process_pets_cron_job"
    PROCESS_RELEASE   = "process_releases_cron_job"