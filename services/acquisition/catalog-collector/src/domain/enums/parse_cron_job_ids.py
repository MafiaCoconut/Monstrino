from enum import StrEnum


class ParseCronJobIDs(StrEnum):
    # MH Archive jobs
    PARSE_CHARACTER   = "parse_characters_cron_job"
    PARSE_SERIES      = "parse_series_cron_job"
    PARSE_PET         = "parse_pets_cron_job"
    PARSE_RELEASE     = "parse_releases_cron_job"