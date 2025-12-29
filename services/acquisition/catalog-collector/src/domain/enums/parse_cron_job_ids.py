from enum import StrEnum


class ParseCronJobIDs(StrEnum):
    # MH Archive jobs
    MHARCHIVE_CHARACTER   = "mharchive_parse_characters_cron_job"
    MHARCHIVE_SERIES      = "mharchive_parse_series_cron_job"
    MHARCHIVE_PET         = "mharchive_parse_pets_cron_job"
    MHARCHIVE_RELEASE     = "mharchive_parse_releases_cron_job"