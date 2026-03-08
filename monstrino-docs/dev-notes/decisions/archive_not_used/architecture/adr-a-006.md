---
id: adr-a-006
title: "ADR-A-006: Organize Services by Domain Capability"
sidebar_label: "A-006: Domain-Based Service Layout"
sidebar_position: 6
tags: [architecture, organization, domain-driven-design, services]
---

# ADR-A-006 — Organize Services by Domain Capability

| Field     | Value                                                  |
| --------- | ------------------------------------------------------ |
| **Status**  | Accepted                                               |
| **Date**    | 2025-07-15                                             |
| **Author**  | @monstrino-team                                        |
| **Tags**    | `#architecture` `#organization` `#domain-structure`    |

## Context

As Monstrino's service count grew, the initial flat `services/` directory became increasingly difficult to navigate. Services with different responsibilities (data collection, catalog management, media processing, user-facing APIs) were mixed together without clear grouping.

This caused:

- **Poor discoverability** — new team members couldn't quickly understand which services belonged to which domain.
- **Unclear ownership** — no structural hint about which services collaborate and which are independent.
- **Scaling confusion** — adding a new service required deciding on a name without any organizational guidance.

## Options Considered

### Option 1: Flat Service Layout

All services live directly under `services/` with no grouping.

- **Pros:** Simple, no hierarchy to maintain.
- **Cons:** Doesn't scale, no domain visibility, naming collisions, poor navigation.

### Option 2: Alphabetical Grouping with Prefixes

Services are named with domain prefixes (e.g., `catalog-collector`, `media-processor`) but remain flat.

- **Pros:** Some grouping via naming convention, no structural changes.
- **Cons:** Naming conventions are fragile, no enforced boundary, inconsistent adoption.

### Option 3: Domain Capability Folders ✅

Services are grouped into capability-area folders that reflect high-level business domains.

- **Pros:** Clear domain boundaries, self-documenting structure, scales with service count, aligns with architecture diagrams.
- **Cons:** Requires periodic review as domains evolve, adds one level of nesting.

## Decision

> Services must be grouped by **high-level capability areas** under structured domain folders.

```
services/
├── acquisition/        # Data collection, parsing, scraping
│   ├── catalog-collector/
│   ├── catalog-importer/
│   └── price-collector/
├── catalog/            # Canonical catalog management
│   ├── catalog-api/
│   └── catalog-admin/
├── media/              # Image/media pipeline
│   ├── media-subscriber/
│   └── media-processor/
├── platform/           # Cross-cutting platform services
│   ├── auth/
│   └── gateway/
├── support/            # Operational tooling
│   └── scheduler/
└── community/          # Future user/social features
    └── user-service/
```

### Naming Guidelines

| Guideline                        | Example                                 |
| -------------------------------- | --------------------------------------- |
| Folder = capability area         | `acquisition/`, `catalog/`, `media/`    |
| Service name = specific function | `catalog-collector`, `media-processor`  |
| Avoid generic names              | ~~`service-1`~~, ~~`worker`~~           |
| Align with architecture docs     | Folder names match domain diagrams      |

## Consequences

### Positive

- **Self-documenting** — the repository structure communicates system architecture at a glance.
- **Improved onboarding** — new developers can orient themselves by browsing folder names.
- **Domain alignment** — folder boundaries encourage thinking in terms of capabilities, not implementation.
- **Scale-ready** — adding a new service to an existing domain is intuitive.

### Negative

- **Migration effort** — existing services need to be moved into the new structure (one-time cost).
- **Path changes** — CI/CD pipelines, Makefiles, and scripts must be updated to reflect new paths.
- **Depth** — one additional directory level in imports and file paths.

### Risks

- Domain boundaries may shift as the product evolves — periodic review and refactoring of the folder structure should be expected.
- Avoid over-nesting: two levels (`services/<domain>/<service>`) is sufficient; deeper nesting adds complexity without value.

## Related Decisions

- [ADR-A-003](./adr-a-003.md) — Shared packages (packages vs services boundary)
- [ADR-A-009](./adr-a-009.md) — Database schemas by domain (mirrors this structure at the data layer)
