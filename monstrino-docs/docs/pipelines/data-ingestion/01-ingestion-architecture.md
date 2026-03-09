---
title: Ingestion Architecture
sidebar_position: 1
description: Overview of the Monstrino ingestion system that processes external data into normalized catalog and media assets.
---

# Ingestion Architecture

:::info
The ingestion layer is responsible for transforming **external unstructured data** into **normalized domain entities and media assets** used by the Monstrino platform.
:::

The ingestion system is composed of two main pipelines:

- **Catalog ingestion pipeline** - processes product and release data
- **Media ingestion pipeline** - processes and normalizes images

These pipelines share a common goal but operate independently to maintain **clear responsibilities and scalability**.

---

## Ingestion Responsibilities

The ingestion system performs the following responsibilities:

- collecting data from external sources
- parsing and storing structured representations
- enriching or correcting parsed data
- converting parsed data into canonical domain entities
- triggering media processing when images are discovered

This layered design ensures that each stage of processing can evolve independently.

---

## High-Level Ingestion Flow

![Ingestion pipeline](/img/pipelines/ingestion-pipeline.jpg)

---

## Catalog Ingestion Pipeline

The catalog ingestion pipeline processes **release and product data**.

Main stages:

1. **Collection**  
   `catalog-collector` retrieves release data from external sources.

2. **Parsed Storage**  
   Raw content is converted into structured parsed records and stored in the `ingest` schema.

3. **Enrichment (optional)**  
   `catalog-data-enricher` may improve parsed attributes using heuristics or LLM inference.

4. **Import**  
   `catalog-importer` converts parsed records into canonical domain entities such as:

   - Release
   - Character
   - Pet
   - Series
   - ReleaseItem

For detailed documentation see:

➡️ `catalog-ingestion-pipeline.md`

---

## Media Ingestion Pipeline

The media ingestion pipeline processes **images discovered during catalog ingestion**.

Main stages:

1. **Event Trigger**  
   When the importer discovers images it emits an event.

2. **Rehosting**  
   `media-rehosting-service` downloads the original image and stores it in object storage.

3. **Normalization**  
   `media-normalizator` generates optimized image variants and optionally improves image quality.

The media pipeline is designed as a reusable subsystem that can later support:

- user-generated content
- additional image sources
- automated image processing workflows

For detailed documentation see:

➡️ `media-pipeline.md`

---

## Design Principles

### Separation of Responsibilities

Catalog ingestion and media ingestion are independent pipelines.

This prevents image processing from slowing down domain data processing.

### Replayable Processing

Parsed data is stored before normalization, allowing the importer to be rerun if parsing or enrichment logic changes.

### Incremental Processing

Each stage of the pipeline operates independently and may be re-executed without repeating earlier stages.

### Event-Driven Expansion

The architecture supports asynchronous processing via Kafka for operations such as media ingestion.

---

## Relationship to Other Architecture Documents

| Document | Description |
|--------|-------------|
| `architecture-overview.md` | High-level system architecture |
| `system-context.md` | External system context |
| `container-architecture.md` | Container-level architecture |
| `catalog-ingestion-pipeline.md` | Detailed catalog ingestion workflow |
| `media-pipeline.md` | Detailed media processing pipeline |