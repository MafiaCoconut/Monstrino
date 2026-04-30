from dataclasses import dataclass

from monstrino_repositories.repositories_interfaces import *
@dataclass
class Repositories:
    ai_job: AIJobRepoInterface
    ai_job_intake_log: AIJobIntakeLogRepoInterface

    ai_text_job: AITextJobRepoInterface
    ai_image_job: AIImageJobRepoInterface

