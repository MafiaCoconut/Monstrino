from monstrino_contracts.v1.domains.catalog.release_catalog_service.contracts import GetReleaseByIdRequest
from monstrino_contracts.v1.domains.catalog.release_catalog_service.contracts.release_search import ReleaseSearchRequest

from application.queries.get_release_by_id import GetReleaseByIdQuery
from application.queries.release_search import ReleaseSearchQuery


class ReleaseSearchMapper:
    @staticmethod
    def map(data: ReleaseSearchRequest) -> ReleaseSearchQuery:
        return ReleaseSearchQuery(
            query=data.query,
            output=data.output,
            context=data.context,
        )

