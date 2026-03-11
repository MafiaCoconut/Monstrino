---
title: Catalog Ingestion Pipeline
sidebar_position: 2
description: Data ingestion and normalization pipeline for catalog data in the Monstrino platform.
---

# Catalog Ingestion Pipeline

## Overview

The catalog ingestion pipeline collects external data about Monster High releases
and transforms it into the normalized domain model used by the Monstrino platform.

The pipeline follows a staged processing approach:

1. Data acquisition from external sources
2. Parsing and storage of raw structured data
3. Optional enrichment of parsed attributes
4. Transformation into canonical domain entities

Each stage has clearly defined responsibilities and can evolve independently.

---

## High-Level Catalog Ingestion Flow

![](/img/pipelines/catalog-ingestion-pipeline.jpg)

---

## Pipeline Stages

| Stage | Responsibility |
|------|------|
| Acquisition | Collect raw product and release information |
| Parsing | Convert raw content into structured DTOs |
| Enrichment | Improve or infer missing attributes |
| Import | Transform parsed records into domain entities |

This staged architecture improves reliability and allows partial reprocessing if needed.

---

## Stage 1 - Source Collection

The first stage of the catalog ingestion pipeline is responsible for discovering new releases for a specific external source and collecting detailed parsed data for releases that have not yet been processed.

### Execution Model

Each external source is handled by a dedicated Kubernetes pod configuration.

This allows source-specific runtime settings, such as:

- source-specific environment variables
- parser configuration
- rate limiting behavior
- source-dependent scheduling and resource allocation

This design isolates collectors from each other and allows each source to be tuned independently.

### Trigger

A scheduler starts the collection process once per day for a specific source.

The scheduler invokes the use case responsible for discovering and collecting new releases from that source.

### Processing Flow

The collection stage is executed as follows:

1. The scheduled use case resolves the parser implementation for the selected source through an internal parser registry.
2. The parser performs a lightweight discovery pass and returns the list of all currently available source releases.
3. Each discovered release is represented as a `ParseReleaseRef`, which stores only the source-specific `external_id`.
4. The system checks which `external_id` values for the current source are not yet present in the database.
5. A filtered list of new `ParseReleaseRef` records is created.
6. This list is passed back to the same source parser for detailed collection.
7. The parser collects as much structured release data as possible and produces `ReleaseParsedContentRef` objects.
8. Parsed release content is returned asynchronously in batches.
9. The use case persists each batch to the database as it is produced.

### Data Boundaries

This stage intentionally separates two levels of source data:

- `ParseReleaseRef` - lightweight release discovery records containing only source identity
- `ReleaseParsedContentRef` - detailed parsed release content collected only for new releases

This separation reduces unnecessary heavy parsing and makes the collection stage more efficient.

### Output

The output of this stage is a set of newly persisted parsed release records for the given source.

These records then become the input for downstream enrichment and import stages.

---

## Stage 2 - Parsed Data Enrichment

The second stage of the catalog ingestion pipeline is responsible for improving incomplete parsed release records before they are imported into the normalized domain model.

### Purpose

The goal of this stage is to fill missing or weakly structured attributes in parsed records while preserving the staged boundary between source parsing and domain import.

This allows the importer to work with more complete and more consistent data.

### Trigger

A scheduler starts the enrichment process every *n* minutes.

Each scheduled run invokes the use case responsible for processing parsed records that have not yet completed enrichment.

### Processing State Model

Newly created parsed records enter the database with the `processing_state` value set to `init`.

The enrichment stage uses this field to manage work ownership and lifecycle transitions.

Typical state progression for this stage is:

- `init` - the record has not yet been processed
- `claimed` - the record has been reserved by a worker
- `ready-to-import` - enrichment is complete and the record can move to the import stage

This state-based approach prevents duplicate processing when multiple pods are running at the same time.

### Execution Model

Each enrichment worker reads unprocessed records by filtering for `processing_state = 'init'`.

A single use case execution claims only one record at a time.  
Once the record is selected, its `processing_state` is immediately updated to `claimed`.

This ensures that parallel workers do not start processing the same parsed release.

### Processing Flow

The enrichment stage is executed as follows:

1. The scheduler invokes the use case responsible for processing unprocessed parsed records.
2. The use case selects one parsed record whose `processing_state` is `init`.
3. The record is immediately marked as `claimed`.
4. The use case inspects the parsed record and determines which enrichable attributes are already present and which are still missing.
5. For each missing attribute, the corresponding enrichment use case is executed.

Examples include:

- `ReleaseCharacterEnricherUseCase`
- `ReleasePetEnricherUseCase`
- `ReleaseSeriesEnricherUseCase`
- `ReleaseContentTypeEnricherUseCase`
- `ReleasePackTypeEnricherUseCase`
- `ReleaseTierTypeEnricherUseCase`

6. Attribute-specific enrichment use cases call the shared `ai-orchestrator-api-client` from the `monstrino-infra` package.
7. This client sends a request to the `ai-orchestrator` service using the scenario appropriate for the target field.

    For example:

    - `ReleaseCharactersEnrichment` for characters

8. The `ai-orchestrator` returns inferred values for the requested attribute.
9. After each successful enrichment step, the updated data is persisted to the database.
10. Once all supported enrichment steps have been completed, the record is marked as `ready-to-import`.

### Data Update Strategy

Enrichment results are persisted incrementally after each successful field update.

This approach provides several advantages:

- partial progress is not lost if a later step fails
- intermediate results remain visible for debugging
- enrichment can be resumed without repeating successful steps

### Output

The output of this stage is a parsed release record whose missing attributes have been enriched as far as possible and whose `processing_state` has been updated to `ready-to-import`.

These records become the input for the downstream import stage.

---

## Stage 3 - Catalog Import

The third stage of the catalog ingestion pipeline is responsible for transforming enriched parsed release records into canonical catalog entities and their domain relationships.

### Purpose

The goal of this stage is to convert a parsed release record into a normalized `Release` entity and to resolve all related catalog structures required for downstream read APIs and media processing.

This stage is the main transformation boundary between **parsed source data** and the **canonical catalog model**.

### Trigger

A scheduler starts the import process on a recurring basis.

The scheduler invokes a batch use case that selects parsed records ready for import and processes them through the single-record import workflow.

### Execution Model

The import stage is executed in two layers:

1. **Batch orchestration**  
   `ProcessReleasesBatchUseCase` retrieves a batch of unprocessed parsed release IDs and runs import tasks for them.

2. **Single-record import**  
   `ProcessReleaseSingleUseCase` processes one parsed release at a time and performs the full transformation into the catalog domain model.

The batch use case limits the amount of parallel work and preloads reference data such as sources in order to reduce repeated database queries during concurrent execution.

### Processing State Model

Before transformation starts, the parsed record is moved into the `processing` state.

If the import finishes successfully, the record is marked as `processed`.

If an error occurs, the record enters an error-handling path and may later be marked with an error state.

This state transition model ensures visibility of processing progress and reduces the risk of duplicate work.

### Processing Flow

The import stage is executed as follows:

1. The batch use case requests a set of parsed release IDs that are ready for processing.
2. For each selected ID, the single-record import use case loads the corresponding parsed release from the database.
3. The parsed release is marked as `processing`.
4. A base `Release` entity is constructed from parsed attributes such as:

   - title
   - year
   - mpn
   - raw description
   - raw box text

5. A normalized release code and initial slug are derived from the parsed title.
6. The system checks whether a matching release already exists based on key identifying attributes.
7. If an equivalent release already exists, the parsed record is marked as processed and the import for that record stops.
8. If no existing release is found, a new canonical `Release` record is saved.
9. A final release slug is generated using the persisted release identifier and written back to the release record.
10. The importer then resolves and persists all supported domain relationships and classification data.

### Resolver Architecture

The importer delegates domain-specific logic to focused resolver services.

This avoids a monolithic import implementation and keeps each part of the normalization logic isolated.

The resolver chain currently includes:

- **Character resolver**  
  Links the release to canonical character entities and assigns roles such as main and secondary.

- **Series resolver**  
  Links the release to primary and secondary series and preserves parent-child series relationships where applicable.

- **Content type resolver**  
  Resolves content-type classifications such as doll figure, pet figure, playset, or fashion pack.

- **Pack type resolver**  
  Resolves packaging and pack-count related types such as single pack and multipack.

- **Tier type resolver**  
  Resolves release tier classification using source-aware rules and fallback logic.

- **Exclusive resolver**  
  Links the release to exclusive vendors when exclusivity data is present.

- **Pet resolver**  
  Links the release to canonical pet entities and preserves pet ordering within the release.

- **Reissue relation resolver**  
  Links the release to related releases when the parsed record indicates a reissue relationship.

- **External reference resolver**  
  Persists the source-specific external identifier used to trace the release back to its origin.

- **Image processing service**  
  Registers release image records and prepares image references for downstream media processing.

### Domain Normalization Strategy

This stage does not treat parsed source values as canonical data.

Instead it applies normalization rules such as:

- formatting source strings into canonical codes
- matching parsed values against existing reference entities
- deriving classification types from parsed attributes and contextual metadata
- converting source-specific relationships into explicit domain links

This makes the importer the authoritative boundary for building consistent catalog data from heterogeneous sources.

### Duplicate Handling

Before saving a new release, the importer checks whether an equivalent canonical release already exists.

If a duplicate is detected:

- no new release is created
- the parsed record is marked as processed
- the pipeline avoids creating duplicate catalog entities

This behavior keeps the catalog idempotent across repeated source collection runs.

### Media Trigger

As part of the import stage, image references discovered in the parsed release are registered for downstream processing.

At the current stage of the architecture, release image records are created directly during import.

The long-term target architecture is for image discovery during import to emit image-processing work into the media ingestion pipeline, where rehosting and normalization are handled independently.

This keeps media processing separated from catalog normalization.

### Error Handling

If the importer cannot load the parsed release, detects an invalid domain condition, or encounters an unexpected exception, the record enters the error-handling path.

Typical error cases include:

- missing parsed release record
- duplicate domain conflicts
- missing reference entities such as source data
- invalid relation targets

Error handling is designed to preserve processing visibility and prevent silent failures.

### Output

The output of this stage is a normalized catalog release and its linked domain structures, including:

- canonical `Release`
- release-character relations
- release-pet relations
- release-series relations
- release type links
- exclusivity links
- reissue relations
- source external references
- release image records and downstream media references

After successful completion, the parsed release record is marked as `processed`.

### Architectural Notes

This stage is intentionally designed as a **resolver-based import pipeline** rather than a single monolithic transformation step.

This provides several advantages:

- new normalization rules can be added without rewriting the entire importer
- domain-specific resolution logic stays isolated
- failures are easier to debug at the resolver level
- the importer remains extensible as the catalog model grows
