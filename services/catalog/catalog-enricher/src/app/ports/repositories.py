from dataclasses import dataclass

from monstrino_repositories.repositories_interfaces import *
@dataclass
class Repositories:

    source: SourceRepoInterface
    source_type: SourceTypeRepoInterface
    source_tech_type: SourceTechTypeRepoInterface
    source_country: SourceCountryRepoInterface

    source_discovery_entry: SourceDiscoveredEntryRepoInterface
    source_payload_snapshot: SourcePayloadSnapshotRepoInterface
    ingest_item: IngestItemRepoInterface
    ingest_item_step: IngestItemStepRepoInterface
