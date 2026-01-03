from monstrino_contracts.v1.domains.acquisition.catalog_collector.enums import SelectorTypeEnum

from app.container_components import Validators
from domain.enums import ParseKindEnum
from presentation.api.validators.parsing_contract.characters import CharacterValidator, CharacterExternalRefValidator
from presentation.api.validators.parsing_contract.parsing_request_validator import ParsingRequestValidator
from presentation.api.validators.parsing_contract.pets import PetValidator, PetExternalRefValidator
from presentation.api.validators.parsing_contract.releases import ReleaseExternalRefValidator, ReleaseValidator
from presentation.api.validators.parsing_contract.series import SeriesExternalRefValidator, SeriesValidator


def build_validators():
    return Validators(
        parsing_requests=ParsingRequestValidator(
            domain_validators={
                ParseKindEnum.CHARACTER: CharacterValidator(
                    registry={
                        SelectorTypeEnum.EXTERNAL_REF: CharacterExternalRefValidator()
                    }
                ),
                ParseKindEnum.PET: PetValidator(
                    registry={
                        SelectorTypeEnum.EXTERNAL_REF: PetExternalRefValidator()
                    }
                ),
                ParseKindEnum.SERIES: SeriesValidator(
                    registry={
                        SelectorTypeEnum.EXTERNAL_REF: SeriesExternalRefValidator()
                    }
                ),
                ParseKindEnum.RELEASE: ReleaseValidator(
                    registry={
                        SelectorTypeEnum.EXTERNAL_REF: ReleaseExternalRefValidator()
                    }
                )
            }
        )
    )