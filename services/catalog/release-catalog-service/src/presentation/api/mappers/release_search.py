from monstrino_contracts.v1.domains.catalog.release_catalog_service.contracts import GetReleaseByIdRequest
from monstrino_contracts.v1.domains.catalog.release_catalog_service.contracts.release_search import ReleaseSearchRequest

from application.queries.get_release_by_id import GetReleaseByIdDTO
from application.queries.release_search import ReleaseSearchDTO


class ReleaseSearchMapper:
    @staticmethod
    def map(data: ReleaseSearchRequest) -> ReleaseSearchDTO:
        return ReleaseSearchDTO(
            query=data.query,
            output=data.output,
            context=data.context,
        )

