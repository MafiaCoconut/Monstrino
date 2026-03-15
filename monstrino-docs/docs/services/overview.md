---
title: Services Overview
sidebar_position: 1
description: >
  Overview of Monstrino service domains and their responsibilities, with links
  to detailed service documentation for each domain.
---

# Services Overview

This section documents Monstrino services by domain.
Each domain has its own overview page and dedicated service pages that define
responsibilities, boundaries, and integration points.

---

## Domain Map

| Domain | Purpose |
| --- | --- |
| Catalog | source discovery, payload collection, enrichment, canonical import, and catalog read APIs |
| Media | image rehosting, normalization, and file lifecycle operations via media APIs |
| Market | market link discovery, recurring price observations, MSRP handling, and market read APIs |
| AI | AI request intake, scenario execution, and outbound result dispatch |
| Admin | admin workflows for alerts, reviews, and operator-facing actions |

---

## Domain Overviews

| Domain | Overview |
| --- | --- |
| Catalog | [Catalog Services Overview](./catalog/00-overview.md) |
| Media | [Media Services Overview](./media/00-overview.md) |
| Market | [Market Services Overview](./market/00-overview.md) |
| AI | [AI Services Overview](./ai/00-overview.md) |
| Admin | [Admin Services Overview](./admin/00-overview.md) |

---

## Cross-Domain Rules

- services own data in their domain boundary
- cross-domain data access goes through the owning domain API service
- async pipelines use durable state and events to decouple processing phases
- service pages in this section describe ownership and integration details

---

## Related Documentation

- [Architecture Overview](../architecture/00-overview.md)
- [Container Architecture](../architecture/03-container-architecture.md)
- [Pipelines Overview](../pipelines/overview.md)
- [Data Ownership Principles](../principles/03-data-ownership.md)
