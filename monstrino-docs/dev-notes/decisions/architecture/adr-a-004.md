---
id: adr-a-004
title: "ADR-A-004: Organize Services by Domain Capabilities"
sidebar_label: "A-004: Domain-Based Service Layout"
sidebar_position: 4
tags: [architecture, services, domain, structure]
---

# ADR-A-004 — Organize Services by Domain Capabilities

| Field      | Value                                                          |
| ---------- | -------------------------------------------------------------- |
| **Status** | Accepted                                                       |
| **Date**   | 2025-06-10                                                     |
| **Author** | @monstrino-team                                                |
| **Tags**   | `#architecture` `#services` `#domain` `#structure`            |

## Context

As the number of services grew, keeping all services flat in a single directory made navigation difficult, ownership unclear, and architectural intent invisible.

## Options Considered

### Option 1: Flat Service Directory

All services in one top-level `services/` folder regardless of domain.

- **Pros:** Simple, no nesting.
- **Cons:** Poor discoverability as the number of services grows, no visible grouping by capability.

### Option 2: Domain-Based Grouping ✅

Services are grouped into subdirectories representing high-level product capabilities.

- **Pros:** Domain boundaries visible in directory structure, easier onboarding, aligns with architecture diagrams.
- **Cons:** One additional level of nesting.

## Decision

> Services are organized under domain capability groups:
>
> ```
> services/
>   acquisition/
>   catalog/
>   media/
>   platform/
>   support/
>   ui/
> ```

## Consequences

### Positive

- Architecture intent is visible in the repo layout.
- New services are placed in the correct context from the start.
- Easier to reason about service ownership and coupling.

### Negative

- Services that span domains require a placement decision.

## Related Decisions

- [ADR-A-001](./adr-a-001.md) — Shared packages organization
- [ADR-DM-001](../domain-model/adr-dm-001.md) — Database domain schema structure
