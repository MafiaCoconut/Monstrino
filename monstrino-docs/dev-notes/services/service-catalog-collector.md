---
id: service-catalog-collector
title: Service — catalog-collector
sidebar_label: catalog-collector
---

> **Type:** Backend service  
> **Domain:** External data acquisition (parsing)  
> **Audience:** Engineering / Architecture review

---

## Responsibility

The **catalog-collector** service is responsible for acquiring structured data from external sources
and persisting it into the ingestion buffer (parsed tables).

It acts as the system’s **external boundary** for catalog data:
- connects to external websites or APIs,
- extracts and normalizes source data into a stable internal parsed format,
- stores results in parsed tables for downstream processing.

The service does **not** write to canonical domain tables.

---

## Non-Goals

This service explicitly does **not**:

- enforce domain invariants for canonical entities,
- transform parsed records into final domain models,
- provide user-facing features,
- guarantee real-time freshness of the catalog,
- resolve complex cross-entity relations beyond what is required for parsing.

---

## Processing Model

The service operates through **scheduled jobs** and **on-demand API triggers**.

### Scheduled Execution

- Runs automatically on a schedule (daily)
- Executes independent parsing jobs per domain:
  - characters
  - series
  - pets
  - releases

Jobs are designed to be resilient: failures in one domain do not block others.

---

### Manual Triggering

Parsing can be triggered on demand via API to support:

- immediate refresh after changes or fixes,
- targeted re-parsing of a specific record.

---

## API Boundary and Dispatching

Incoming requests follow a strict boundary pattern:

```text
HTTP Request
  ↓
RunParse Contract (DTO)
  ↓
Contract to Command Mapper
  ↓
Parse Command (application boundary)
  ↓
Dispatcher
  ↓
Parse Job
  ↓
Use Case Execution
```

This separation ensures that transport-layer DTOs do not leak into application logic.

---

## Data Flow

```text
External Source
      ↓
Parser / Extractor
      ↓
Parsed Tables (parsed_*)
      ↓
Downstream: catalog-importer
```

The parsed tables are the only durable output of this service.

---

## Parsed Data Storage

The service persists records into parsed tables, typically including:

- source identity (which external source produced the record),
- external identifiers and URLs,
- raw and normalized fields required for later transformation,
- fields that may vary across sources (nullable and flexible).

---

## Guarantees

- Parsed tables reflect the latest successfully fetched data for processed targets
- Parsed records are stored in a format intended for downstream transformation
- On-demand parsing supports both:
  - full runs (parse all)
  - targeted runs (parse by external reference / external id)
- Failures during parsing do not corrupt canonical domain tables

---

## Non-Guarantees

- No guarantee that external sources are stable or available
- No guarantee of completeness for missing data in source systems
- No guarantee of ordering across different parsed domains
- No guarantee that a parsed record is immediately importable without errors

---

## Dependencies

- External sources (websites / endpoints) with unstable schemas
- Shared domain packages:
  - monstrino-core (commands, shared primitives)
  - monstrino-contracts (API contracts)
  - monstrino-infra (HTTP clients, logging, configuration)
- Database for parsed tables
- Scheduler infrastructure

---

## Failure Modes

- External source changes can break parsing logic and reduce data completeness
- Rate limiting or downtime can delay updates
- Individual parse failures are isolated:
  - a single record failure should not stop the whole job
  - a single job failure should not block other domain jobs
- If the database is unavailable, parsing results are not persisted and must be retried

---

## Operational Notes

:::note
The service is intentionally designed to make ingestion observable and controllable.

Operators can:
- re-run scheduled jobs on demand,
- parse a specific entity by external reference,
- inspect parsed records before import.
:::
