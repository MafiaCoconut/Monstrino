from monstrino_contracts.v1.domains.catalog.release_catalog_service.contracts import GetReleaseByIdRequest

from application.queries.get_release_by_id import GetReleaseByIdQuery


class GetByReleaseIdMapper:
    @staticmethod
    def map(data: GetReleaseByIdRequest) -> GetReleaseByIdQuery:
        return GetReleaseByIdQuery(
            release_id=data.release_id,
            include=data.include,
            # fields=data.fields,
            context=data.context
        )

