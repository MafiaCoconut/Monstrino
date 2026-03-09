# Monstrino Project Technical Context Dump

> This document is a consolidated technical summary of the Monstrino project based on the currently available project context, architectural discussions, remembered design decisions, and previously described implementation details.
> It is intended for consumption by another model or engineer and prioritizes breadth, architecture, and system behavior over polished product documentation.

---

# 1. Project Overview

**Monstrino** is a Monster High–focused collector and catalog platform designed to collect, normalize, enrich, store, and serve highly structured data about releases, characters, pets, series, media assets, and market prices.

The platform is not intended to be a simple scraper or a static catalog. It is being designed as a long-lived, scalable, service-oriented data platform with the following core goals:

- store the most accurate and diverse Monster High data in one place
- preserve internal ownership of critical data such as media assets
- support new data sources without rewriting the architecture
- normalize heterogeneous source data into a stable structured model
- support long-term growth in releases, sources, images, and price data
- isolate domains, services, and environments to avoid coupling
- provide a clean public API while keeping internal processing private

The project is heavily architecture-driven and aims to reflect production-grade system design rather than a one-off hobby scraper.

---

# 2. Core Product / Platform Goals

The main product and engineering goals repeatedly emphasized across the project are:

- **single source of structured truth** for Monster High release information
- **scalable and extensible storage model** that survives new release types and new source data
- **data model stability** even when source formats evolve unexpectedly
- **clear separation between raw data, enriched data, and normalized catalog data**
- **long-term independence from external platforms**, especially for media
- **reusable architecture for multiple data domains** such as catalog, media, and market
- **architectural observability**, not just infrastructure-level monitoring

Monstrino is therefore designed more like a small data platform than a conventional CRUD app.

---

# 3. High-Level System Style

Monstrino is built as a **service-oriented, Kubernetes-native, fully containerized platform**.

Key high-level traits:

- multiple specialized backend services
- domain-based ownership of data
- shared infrastructure packages for contracts and clients
- asynchronous background processing pipelines
- internal and public API separation
- object storage for media
- relational storage for structured data
- Kubernetes deployment with environment isolation
- homelab-first deployment, but with future migration paths to more robust production hosting

The current architecture is not a monolith with some helper workers. It is closer to a microservice-oriented modular platform with strongly defined boundaries.

---

# 4. Main Domains

The platform is structured around the following core domains:

- `catalog`
- `ingest`
- `media`
- `market`
- `core`

These are logical domains, not just database buckets.

## 4.1 catalog

The catalog domain contains the normalized structured model of Monster High entities.

Typical catalog-owned concepts include:

- releases
- characters
- pets
- series
- relationships between releases and series
- relationships between releases and characters
- relationships between releases and related releases
- normalized identifiers and canonical catalog references

The catalog domain is the central reference layer for the platform.

## 4.2 ingest

The ingest domain contains raw and intermediate data collected from external sources.

Typical ingest-owned concepts:

- raw source responses
- parsed source-specific content
- enrichment-stage inputs and outputs
- transitional processing data before import into the catalog domain

The ingest domain is intentionally retained for traceability and reprocessing.

## 4.3 media

The media domain owns all internally hosted image data and image metadata.

Typical media-owned concepts:

- original externally discovered images
- rehosted image assets
- normalized media variants
- resized/optimized versions
- media metadata and relations

The media domain exists to prevent dependency on external hosting.

## 4.4 market

The market domain owns price and marketplace-related information.

Typical market-owned concepts:

- marketplace item discovery
- observed price history
- source-specific price records
- release-price mapping
- market observations over time

## 4.5 core

The core domain contains shared reference data used by multiple domains.

Typical core-owned concepts:

- source types
- source technologies
- countries
- currencies
- common system reference values

Core is shared reference infrastructure, not a free-for-all shared database.

---

# 5. Data Ownership Model

Monstrino follows a strict domain ownership model.

Core rule:

**Only services inside a domain may directly read or write the tables belonging to that domain.**

Cross-domain access must happen through the responsible API service.

Examples:

- if a market service needs release identity, it must call `catalog-api-service`
- if a media service needs release relation information, it must call `catalog-api-service`
- if a catalog-facing service needs image lists, it must call `media-api-service`
- if a catalog-facing service needs price information, it must call a market API service

Forbidden patterns:

- direct write to foreign domain tables
- direct read from foreign domain tables
- depending on foreign domain schema internals

This is one of the main architectural safeguards against “shared-database monolith” drift.

---

# 6. Main Service Inventory Mentioned So Far

Below is the set of explicitly mentioned services or service categories from the available context.

## 6.1 API / public access services

### `public-api-service`
The only public API entry point used by the UI and future public API consumers.

Responsibilities:

- expose public-facing API routes
- aggregate data from internal `<>-api-service` services
- isolate UI and external clients from internal service changes
- potentially act as BFF/aggregator style layer

### `catalog-api-service`
Official API boundary and entry point for the catalog domain.

Responsibilities:

- expose catalog data to other services
- resolve catalog identities (e.g. release lookup by source identifiers such as MPN)
- serve normalized catalog entities

### `media-api-service`
Read-oriented API boundary for the media domain.

Responsibilities:

- provide access to image lists and related media metadata
- read media domain data
- not responsible for media writes

### `market-api-service`
Mentioned conceptually in interactions where catalog services ask for price information.
Represents the official API boundary into the market domain.

---

## 6.2 catalog and ingest services

### `catalog-collector`
Collector service for release/source data.

Responsibilities:

- collect raw release data from external sources
- run source-specific parsers
- store raw/parsed results in ingest-related storage
- operate per source configuration

### `catalog-data-enrichter`
Enrichment stage service.

Responsibilities:

- add missing information to release data
- handle enrichment decisions
- may need admin intervention on ambiguous cases
- should pause problematic records and continue processing others

This stage is architecturally important because it can reach states where human decisions are required.

### `catalog-importer`
Importer / normalization service.

Responsibilities:

- take processed/enriched ingest data
- transform into normalized catalog records
- import data into catalog-owned tables
- serve as one of the owners of the catalog domain

---

## 6.3 media services

### `media-rehosting-subscriber`
Event-aware or pipeline-aware service involved in media ingestion.
Subscribes to new media-related work and creates media ingestion jobs.

Earlier described stage behavior:
- subscribes to Kafka topic
- when new image-related data appears, creates `MediaIngestionJob`
- persists job into media-related storage

### `media-rehosting-processor`
Scheduled processor that takes media ingestion jobs and performs external image download/rehosting.

Earlier described behavior:
- runs on scheduler
- invokes `IngestExternalMediaUseCase`
- picks jobs with `processing_state = init`
- downloads external image through internal downloader
- downloader returns something like:

```python
class DownloadedFile:
    content: bytes
```

### `media-normalizator`
Dedicated service for media transformation and processing.

Planned/desired responsibilities include:
- compress image size without visible quality loss
- generate multiple image sizes
- generate alternative output formats if needed
- upscale images without significant quality loss
- add watermark
- adapt image dimensions for different aspect targets
- produce web-optimized outputs
- create multiple variants tied back to the same `media_asset.id`

---

## 6.4 market services

### `market-release-discovery`
Market domain service responsible for discovering release-related market items.

### `market-price-collector`
Market domain service for collecting price data over time.

Behavioral pattern explicitly stated:
- may read its own market data directly from DB
- if it needs catalog identity such as `release_id` from an MPN, it must call `catalog-api-service`

---

## 6.5 LLM / AI services

### `llm-gateway`
A service that orchestrates LLM-related tasks and can use Ollama for text and visual tasks.

It appears to function as a centralized AI/LLM access service rather than embedding model-specific logic into many services.

### AI / local processing context
The user has also discussed:
- local AI models
- image understanding / visual models
- local homelab execution
- LLM tasks that may require manually starting a local AI server/computer
- future observability/alerting based on accumulated AI jobs

This suggests Monstrino includes or will include AI-assisted processing flows that are operationally distinct from normal always-on services.

---

## 6.6 broader service ecosystem from remembered project context

The user has also described a larger Monstrino ecosystem including services such as:

- `catalog-collector`
- `catalog-importer`
- `release-catalog-service`
- `media-normalizator`
- `media-rehosting-service`
- `market-price-collector`
- `llm-gateway`
- possible supporting services for import, contracts, repositories, and shared infra

Earlier project summaries also referenced packages or components like:

- `Monstrino-core`
- `Monstrino-models`
- `Monstrino-contracts`
- `Monstrino-repositories`
- `Monstrino-infra`

These names strongly suggest a broader shared-code ecosystem across multiple services.

---

# 7. Shared Packages / Cross-Service Code Architecture

Monstrino deliberately centralizes shared API and infra behavior into dedicated packages.

## 7.1 `monstrino-contracts`

Purpose:
- centralized definitions for request models
- centralized definitions for response models
- shared API contracts between services

Problem it solves:
Without centralized contracts, changing service B’s API would force repeated manual updates inside service A, service C, service D, etc.

Principle:
Services should not invent local copies of request/response contracts if a shared contract exists.

---

## 7.2 `monstrino-api`

Purpose:
- define unified API response behavior
- define shared envelope model
- define common error model
- define validation and API-level rules
- define response factory / response builder style behavior
- define exception handling and request context conventions

The user explicitly described a universal response model used by all endpoints.

Example success envelope:

```json
{
  "status": "success",
  "request_id": "req_cee2f468f547",
  "correlation_id": "req_cee2f468f547",
  "trace_id": null,
  "data": {
    "items": [],
    "total": 0,
    "page": 1,
    "page_size": 10
  },
  "error": null,
  "meta": {
    "service": "catalog-api-service",
    "version": "v1",
    "timestamp": "2026-03-07T16:14:36.875306Z"
  }
}
```

Example error envelope:

```json
{
  "status": "error",
  "request_id": "req_518a4716dc52",
  "correlation_id": "req_518a4716dc52",
  "trace_id": null,
  "data": null,
  "error": {
    "code": "Internal Error",
    "message": "Internal server error",
    "retryable": true,
    "details": null
  },
  "meta": {
    "service": "catalog-api-service",
    "version": "v1",
    "timestamp": "2026-03-07T16:13:53.096787Z"
  }
}
```

Important characteristics of this API model:
- all services use the same response envelope
- all endpoints follow the same response rules
- error structures are predefined in `monstrino-api`
- services trigger standard errors rather than inventing local error formats
- response completeness is encouraged whenever possible

---

## 7.3 `monstrino-infra`

Purpose:
- hold infrastructure adapters
- hold API client implementations
- hold token verification and setup rules
- hold reusable source-specific parser implementations
- hold adapters for ports inside services
- avoid duplicated API client classes across services

Examples of things explicitly described:
- API clients for service-to-service communication
- token setup and token verification
- parser implementations for different sources
- registration of parsers under `ReleaseParserPort` or `PriceParserPort`
- shared adapters used in multiple services

This package is a major architectural leverage point: add/change in one place, reuse everywhere.

---

# 8. API Design Rules

Monstrino has strong API design principles.

Main rules:

- all API paths across the platform must follow the same rules
- all endpoints use the same response envelope
- all internal APIs use bearer token auth
- each domain has one official API entry point
- cross-domain access always goes through the owning domain’s API
- shared contracts define request/response structures
- service communication logic is centralized
- small changes update contracts + API clients
- large changes that affect many consumers should introduce a new version

API philosophy emphasized by the user:
- universality
- unification
- avoiding duplicated change work
- keeping services independent even when APIs evolve

---

# 9. Service Communication Model

The platform uses both synchronous and asynchronous communication.

## 9.1 synchronous communication

Used for:
- service-to-service data requests
- triggering actions in another service
- domain lookups
- API aggregation

Mechanism:
- HTTP APIs
- shared contracts
- centralized API clients
- JWT bearer tokens

## 9.2 asynchronous communication

Used for:
- pipeline progression
- media ingestion handoff
- background processing coordination

Mechanisms:
- Kafka
- database-based `processing_state`
- scheduler-driven worker loops

## 9.3 communication rules

- if a service needs data from its own domain, it may read it directly from DB
- if a service needs data from another domain, it must use that domain’s API
- services should not require unrelated services to change when one service changes
- internal APIs are protected and not public
- UI talks only to `public-api-service`

---

# 10. Authentication / Internal Security Model

Internal service communication is protected by JWT using a shared secret model.

Behavior described:
- each service configures its unique auth token at startup via shared infra component
- incoming requests validate `Authorization: Bearer <token>`
- internal APIs should only accept requests from trusted services or valid admin secret token
- authentication rules are centralized to avoid duplicating auth logic across services

Security boundary principles:
- public and internal access are separated
- internal services are not public
- only specific public endpoints exist
- services only access their own DB zones directly
- only media services may write media assets
- public image access is separated via media domain

---

# 11. Database Architecture

Monstrino uses PostgreSQL.

## 11.1 instance layout

Current structure:
- one PostgreSQL instance for test environment
- one PostgreSQL instance for production environment
- both deployed inside Kubernetes

## 11.2 schema organization

All tables are organized into multiple schemas inside the database.

Known high-level schemas:
- `catalog`
- `core`
- `ingest`
- `market`
- `media`

This schema-based partitioning aligns with domain separation and helps enforce bounded access.

## 11.3 data philosophy

The user’s goals for DB modeling include:
- universal but correct decomposition into tables
- stable storage even when new data fields appear unexpectedly
- ability to add information without breaking old data
- preservation of raw data for debugging and reprocessing
- careful normalization

## 11.4 remembered ORM/table modeling context

The user previously provided extensive ORM descriptions for tables such as:
- `releases`
- `series`
- `release_series_link`
- `release_character_link`
- `release_relation_link`
- `release_images`
- `release_exclusives`
- `release_types`
- `release_character_roles`

Plus many other supporting ORM tables.

These ORM models use SQLAlchemy and typically include:
- `id`
- `created_at`
- `updated_at`
- timezone-aware defaults via `TIMEZONE('utc', now())`
- many-to-many link tables
- foreign keys and structured relationships

Earlier memory also references a broader data model including:
- `ReleaseORM`
- `SeriesORM`
- `CharacterORM`
- `PetORM`
- `MediaAssetORM`
- `MediaAssetVariantORM`
- `ReleaseMsrpORM`
- `GeoCountryORM`
- `MoneyCurrencyORM`
- `SourceTypeORM`
- `SourceTechTypeORM`

There is strong evidence the database design is detailed, normalized, and domain-rich.

---

# 12. Object Storage / Media Storage

Monstrino stores images outside the relational DB.

Environment split:
- local/test: MinIO
- production: Stackit S3 (cloud object storage)

Design rule:
- images should never depend on external origin hosting
- all collected images must be stored internally
- media variants are stored as multiple processed versions of a base asset
- variants are tied back to the same `media_asset.id`

Media storage contains:
- original downloaded images
- normalized images
- resized versions
- potentially optimized web formats
- future image derivatives such as cropped/background-removed/watermarked outputs if implemented

Public access:
- images are currently publicly accessible
- served via `media.monstrino.com`

Write permissions:
- media services can write
- media API is read-only
- public consumers read through media domain

---

# 13. Event and Queueing / State Progression

Monstrino uses a combination of Kafka and DB state to manage processing.

## 13.1 Kafka

Currently used especially for media ingestion handoff.

Examples:
- catalog ingestion pipeline discovers new image-related data
- Kafka communicates that there is new image work
- media ingestion pipeline picks it up

Kafka runs inside Kubernetes.

## 13.2 DB processing_state

A major architectural feature is use of `processing_state` across pipelines.

Known states:
- `init`
- `claimed`
- `ready-to-import`
- `failed`
- `required-admin`
- `imported`

This state system is used across all major pipelines.

It serves multiple roles:
- coordination of workers
- idempotency / duplicate avoidance
- visibility into system health
- support for SQL-based observability
- workflow pause/resume semantics

Special pattern explicitly described:
- worker picks one record
- marks it as `claimed`
- other replicas will not take it
- service processes one record at a time

This is one of the key scalability and observability design choices.

---

# 14. Pipeline Architecture

Monstrino is heavily pipeline-driven.

## 14.1 why pipelines exist

Reasons described or implied:
- background processing without blocking APIs
- separate data collection from normalization
- support heterogeneous source formats
- handle media and price data differently
- scale work independently by domain
- preserve intermediate states
- support human intervention where needed

## 14.2 catalog ingestion pipeline

Approximate stages from context:
1. external source collection via `catalog-collector`
2. raw storage in ingest schema
3. parsed data storage
4. enrichment via `catalog-data-enrichter`
5. ready-to-import state
6. normalization/import via `catalog-importer`
7. structured catalog availability through `catalog-api-service`

## 14.3 media ingestion pipeline

Approximate stages:
1. image references discovered during catalog-related processing
2. event / DB job creation for media ingestion
3. `media-rehosting-subscriber` creates media job
4. `media-rehosting-processor` scheduler claims jobs
5. downloader fetches image bytes
6. image stored in internal object storage
7. `media-normalizator` creates processed variants
8. metadata and relations stored in media schema
9. image lists available through `media-api-service`

## 14.4 market ingestion pipeline

Approximate stages:
1. source-specific price discovery / collection
2. parser execution for price source
3. use `PriceParserPort` implementations
4. store raw/parsed price data
5. if needed, resolve catalog identities through `catalog-api-service`
6. persist observed prices and history into market domain
7. expose pricing information through market API layer

---

# 15. Parser Architecture / Source Extension Model

Monstrino was explicitly designed to make adding new sources cheap and non-destructive.

When adding a new release source:
- add parser to `monstrino-infra`
- parser inherits from `ReleaseParserPort`
- register source in appropriate registry
- configure scheduler
- attach to `catalog-collector`

When adding a new price source:
- add parser to `monstrino-infra`
- parser inherits from `PriceParserPort`
- register source
- configure scheduler
- attach to `market-price-collector`

This means:
- new source integration should not require architectural redesign
- collectors use generic source-processing use cases
- parsers are extension points rather than bespoke logic per service

This is a central scalability feature.

---

# 16. Data Evolution / New Field Evolution Strategy

The user described a concrete pattern for new data fields:

If a new type of information appears from a source:
1. extend `ReleaseParseContentRef` with a new nullable field
2. update mapping from `ReleaseParseContentRef` to table data
3. update handling in:
   - `catalog-data-enrichter`
   - `catalog-importer`

This is important because it shows the platform prefers:
- incremental schema/model evolution
- backwards compatibility through nullable extension
- explicit downstream adaptation
- avoiding full rewrites for new attributes

---

# 17. Scalability Strategy

Monstrino’s scalability model is not generic “just add more pods.” It has concrete design principles.

Primary expected growth:
- number of releases
- total structured data volume
- number of supported external sources
- number of observed prices over time
- amount of background processing

Most important growth today:
- more data
- more background processing

Independent scaling areas explicitly identified:
- media processing
- catalog ingestion
- market ingestion
- API services

Main scalability principles:
- system growth should be handled by extension, not rewrite
- heavy workloads should scale independently
- use one-record-per-use-case processing
- claimed record model prevents duplicate work
- new sources are integrated by parser addition, not collector rewrites
- new data types are integrated by incremental extension
- API traffic should scale separately from background processing

Especially strong rule:
**Major processing use cases should handle one record at a time.**

Benefits:
- safer concurrency
- clearer retries
- easier horizontal worker scaling
- explicit state management
- easier observability

---

# 18. Deployment Architecture

## 18.1 environments

Known environments:
- `local` - development
- `test` - test environment on server with test data
- `prod` / production - production environment on server with real production data

## 18.2 current infra layout

Current deployment runs on:
- one Kubernetes cluster
- one physical server
- homelab environment
- separate namespaces for test and prod

## 18.3 future infra direction

Planned future direction:
- move production cluster to a dedicated server
- isolate production from test more strongly
- replicate/copy real data between multiple servers
- improve resilience if one server fails

## 18.4 deployment model

All backend services run as Kubernetes Deployments.
Services are containerized and exposed through Kubernetes Services / ingress as needed.

Notable rule:
- one data source -> at least one dedicated pod configured for that source

This “source-oriented deployment model” means operational isolation by source.

## 18.5 scheduler model

Instead of Kubernetes CronJobs, many workers use **Python APScheduler** embedded in the service process.

This means:
- pod starts
- internal scheduler runs
- service periodically executes its work loop

## 18.6 ingress / public routing

Public traffic path:
- Cloudflare Tunnel
- Traefik ingress inside Kubernetes
- route to public-facing services

Public entry points:
- UI
- `public-api-service`
- `media.monstrino.com`

Internal services:
- reachable only inside cluster/environment
- not public

## 18.7 infra dependencies

Inside Kubernetes:
- PostgreSQL
- Redis
- Kafka
- MinIO (test/local)

Cloud:
- Stackit S3 for production object storage

---

# 19. Observability Strategy

The project has a particularly strong observability concept.

## 19.1 current / planned tooling

Planned:
- Prometheus
- Grafana

Current:
- no full production metrics pipeline yet
- local/test use plain-text logging
- production intended to use structured JSON logs

## 19.2 logging

Local/test:
- plain text
- configured through special log config

Production:
- JSON structured logs

Important for:
- autonomous background stages
- enrichment
- pipeline troubleshooting
- error context
- admin intervention

## 19.3 enrichment observability

Enrichment is a critical stage because:
- it may need to make decisions
- it may encounter ambiguous cases
- it may need human/admin intervention
- problematic record should pause while others continue

Therefore logs and processing state are especially important there.

## 19.4 processing_state as observable signal

This is arguably the strongest architectural observability feature of Monstrino.

Why it matters:
- pipeline health can be inspected directly with SQL
- visible counts of `init`, `claimed`, `ready-to-import`, `failed`, etc.
- observability is embedded into workflow state itself
- no need to wait for external dashboards to understand health

This was explicitly highlighted as a strong interview-level architectural point.

## 19.5 useful metrics

Metrics explicitly mentioned or implied:
- pipeline throughput
- enrichment success rate
- LLM latency
- media processing lag
- count of new releases over time
- amount of info added via enricher
- number of new images
- count of records by processing_state
- failed jobs by pipeline
- time spent in claimed
- number of required-admin records
- source-specific parser failures
- LLM task backlog

## 19.6 alerting ideas

Things that should alert:
- jobs stuck in `claimed`
- media processing failures
- non-standard/unexpected errors
- records entering `required-admin`
- LLM gateway / AI execution issues
- AI backlog reaches threshold and operator needs to start local AI machine

Things that should not necessarily alert:
- expected slow operations if progress continues

---

# 20. Security Boundaries

Publicly exposed:
- UI
- `public-api-service`
- `media.monstrino.com`

Internal:
- most services only available within Kubernetes cluster/environment

Data/storage constraints:
- services only access the schemas/tables relevant to their own domain
- writing into foreign domain tables is prohibited
- media writes restricted to media services
- internal APIs protected by JWT bearer auth

Collectors are a special boundary-crossing category because they interact with external, untrusted systems.

---

# 21. Storage Architecture Summary

Storage types used:
- PostgreSQL for structured data
- S3-compatible object storage for media
- Kafka for pipeline handoff/events
- Redis for caching

Rules:
- binary files should not live in DB
- raw external data should be preserved
- media should be internally owned
- schemas represent domains
- object storage environment differs between test and prod
- media variants remain tied to same logical asset

---

# 22. Current Sources Mentioned

External data sources explicitly mentioned:
- official Mattel websites
- Monster High Fandom wiki

Also broader remembered context includes:
- Mattel Shop
- Shopify JSON endpoints
- sitemaps
- possibly other market sources

The project is clearly designed to integrate multiple heterogeneous source technologies.

---

# 23. Frontend / UI Context

The UI exists as one of the public entry points.

Important backend relationship:
- UI talks only to `public-api-service`
- UI should not be affected by internal service changes
- public API acts as stable boundary

Broader remembered Monstrino context also includes:
- Monster High themed UI/UX direction
- docs in Docusaurus
- possible Next.js or frontend documentation efforts
- FSD structure preferences for frontend architecture in unrelated codebase contexts, though not necessarily directly tied to Monstrino UI unless reused

---

# 24. Design Principles Repeatedly Established

Strong recurring architectural principles across the project:

1. **Structured information first**
2. **Data model stability**
3. **API-first service communication**
4. **Shared contracts**
5. **Centralized API infrastructure**
6. **Raw data preservation**
7. **Internal ownership of media**
8. **Pipeline-driven processing**
9. **Separation of public and internal interfaces**
10. **Scoped data access**
11. **Independent pipelines**
12. **Changes in one service should not require unrelated services to change**
13. **Major processing use cases handle one record at a time**
14. **One source should be isolatable in at least one dedicated pod**

These are not generic platitudes; they are tied to concrete implementation patterns already described.

---

# 25. Example Cross-Domain Flows

## 25.1 market -> catalog identity resolution
A market service needs to connect a price observation to a catalog release.

Correct flow:
- market service receives source identifier / MPN
- market service calls `catalog-api-service`
- catalog service resolves release identity
- market domain stores price using resolved release reference

## 25.2 media -> catalog relation resolution
A media service needs relation information for an image/release pair.

Correct flow:
- media service calls `catalog-api-service`
- media service receives necessary catalog relation data
- media pipeline continues processing

## 25.3 catalog -> media images
A catalog-facing service wants all images for a release.

Correct flow:
- service calls `media-api-service`
- service receives media list
- no direct query to media tables

## 25.4 catalog -> market prices
A catalog-facing service wants price information from a given source.

Correct flow:
- service calls market API service
- market service returns source-specific pricing data

---

# 26. Reliability / Failure Handling Philosophy

If an external source breaks:
- investigate what broke
- try to work around it or repair parser
- if not possible, search for a new source

This suggests source failure is considered operationally normal and the system is expected to adapt.

If enrichment cannot decide:
- do not silently continue with bad assumption
- raise admin-needed condition
- pause record
- continue others

If worker picks a record:
- mark `claimed`
- prevent duplicate work from parallel replicas

This shows Monstrino prioritizes correctness and controlled progression over blind throughput.

---

# 27. AI / Model Execution Context

Additional AI-related context from other discussions:

- user has interest in local vision/text models
- there is an `llm-gateway`
- AI may be used for text and image-related tasks
- user has discussed local Ollama-based tasks and visual handling
- some AI work depends on manually starting a local computer/server
- observability/alerting should account for backlog that requires manual AI runtime availability

There is also broader homelab and Raspberry Pi experience in the user profile, though that is not necessarily directly part of Monstrino production deployment.

---

# 28. Broader Technical Direction and Quality Level

Across all discussions, Monstrino is being approached with:

- enterprise-grade thinking
- DDD-style domain separation
- API consistency emphasis
- database normalization
- controlled bounded-context ownership
- reusable shared packages
- future-proof source extension strategy
- Kubernetes-native deployment assumptions
- explicit documentation of architecture, principles, deployment, scalability, security, and observability

This is unusual for a collector platform and is a major part of the project identity.

---

# 29. Likely Documentation Structure Already Emerging

From recent documentation generation work, Monstrino is building or planning a documentation structure along these lines:

## architecture
- storage architecture
- service communication
- security boundaries
- deployment architecture
- scalability strategy
- observability
- likely architecture overview / data flow

## principles
- design principles
- service boundaries
- data ownership
- API design principles
- likely storage principles, security principles, etc.

This matters because another model reading this file should understand the project already has an intentional architecture-doc mindset.

---

# 30. Short “How Monstrino Works” Narrative

A compact end-to-end system narrative:

1. External sources such as Mattel or Monster High Fandom are polled or collected by source-specific collectors.
2. Raw source data is stored in the ingest domain.
3. Source-specific parsers convert raw material into structured parsed content.
4. Enrichment services add or refine information and may pause records requiring admin decisions.
5. Importers normalize enriched data into catalog-owned entities such as releases, characters, pets, and series.
6. Image references discovered along the way are handed off into the media pipeline, where they are rehosted, normalized, and stored internally.
7. Market services independently collect and persist price observations, resolving catalog identities through catalog APIs when necessary.
8. Internal API services expose domain data in a consistent envelope format.
9. `public-api-service` aggregates selected internal data and serves the UI or public consumers.
10. Observability is supported through logs, future metrics, and especially `processing_state`, which embeds workflow visibility directly into the data model.

---

# 31. If Another Model Needs to Reason About Monstrino

The most important mental model is:

**Monstrino is a domain-separated, pipeline-driven, Kubernetes-deployed data platform for Monster High data, with strict API boundaries, raw-data preservation, internal media ownership, and `processing_state` as both workflow control and observability signal.**

If more detailed work is needed, the next most important assumptions are:

- services own domains, not tables globally
- cross-domain reads go through API services
- new sources are integrated by adding parsers, not rewriting collectors
- images must be internally hosted
- one-record-at-a-time processing is a key scaling/reliability principle
- the platform is intentionally designed to survive source changes and future growth

---

# 32. Known Gaps / Honest Limits of This Summary

This summary is broad and technically dense, but it is still based on available chat context rather than a checked-out repository snapshot.

That means:
- exact service lists may be incomplete
- exact API paths are not enumerated
- exact table names and schema details are only partially known here
- exact deployment manifests and runtime settings are not included
- exact implementation details of every use case are not known

Still, the architectural and design context captured here is substantial and should be enough for another model to reason effectively about Monstrino’s structure, intent, and major subsystems.
