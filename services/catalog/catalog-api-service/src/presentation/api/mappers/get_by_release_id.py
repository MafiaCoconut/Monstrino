from monstrino_contracts.v1.domains.catalog.catalog_api_service.contracts import GetReleaseByIdRequest

from app.queries.get_release_by_id import GetReleaseByIdDTO


class GetByReleaseIdMapper:
    @staticmethod
    def map(data: GetReleaseByIdRequest) -> GetReleaseByIdDTO:
        return GetReleaseByIdDTO(
            release_id=data.release_id,
            include=data.include,
            # fields=data.fields,
            context=data.context
        )

