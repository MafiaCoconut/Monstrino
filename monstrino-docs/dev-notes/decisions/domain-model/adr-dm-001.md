---
id: adr-dm-001
title: "ADR-DM-001: Structure Database by Domain Schemas"
sidebar_label: "DM-001: Domain DB Schemas"
sidebar_position: 1
tags: [domain-model, database, schemas, organization]
description: "Structures the PostgreSQL database into domain-scoped schemas to reduce namespace pollution and clarify which tables belong to which part of the system."
---

# ADR-DM-001 - Structure Database by Domain Schemas

| Field      | Value                                                        |
| ---------- | ------------------------------------------------------------ |
| **Status** | Accepted                                                     |
| **Date**   | 2025-10-18                                                   |
| **Author** | @Aleks                                              |
| **Tags**   | `#domain-model` `#database` `#schemas` `#organization`      |

## Context

As the number of tables grew, keeping everything in the `public` PostgreSQL schema created namespace pollution and made it harder to understand which tables belonged to which part of the system.

## Options Considered

### Option 1: All Tables in `public` Schema

Keep everything flat in the default PostgreSQL schema.

- **Pros:** No schema management overhead.
- **Cons:** No logical grouping, all tables look equivalent, no access control granularity.

### Option 2: Domain-Based PostgreSQL Schemas ✅

Organize tables into named PostgreSQL schemas that correspond to system domains.

- **Pros:** Clear ownership per domain, access control per schema, navigability, mirrors service architecture.
- **Cons:** Requires schema-qualified table names and migration tooling support.

## Decision

> The database is organized into PostgreSQL schemas by domain:
>
> - `catalog` - canonical release, character, series data
> - `ingest` - parsed tables and ingestion workflow state
> - `media` - media asset jobs and references
> - `core` - cross-domain tables (lookups, configuration, audit)

## Consequences

### Positive

- Table ownership is immediately clear from schema name.
- Access control can be scoped per schema.
- Mirrors the service domain structure for easier reasoning.

### Negative

- All queries and migrations must use schema-qualified table names.
- Additional configuration in SQLAlchemy and migration tools.

## Related Decisions

- [ADR-A-004](../architecture/adr-a-004.md) - Services organized by domain capability
- [ADR-DI-001](../data-ingestion/adr-di-001.md) - Parsed tables as ingestion boundary
