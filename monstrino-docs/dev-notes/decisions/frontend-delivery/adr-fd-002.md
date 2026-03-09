---
id: adr-fd-002
title: "ADR-FD-002: Frontend in a Dedicated Repository"
sidebar_label: "FD-002: Separate Frontend Repo"
sidebar_position: 2
tags: [frontend, repository, monorepo, separation]
description: "Moves the frontend into a dedicated separate repository to isolate its build pipeline, tooling, and CI configuration from the backend monorepo."
---

# ADR-FD-002 - Separate Frontend into a Dedicated Repository

| Field      | Value                                                        |
| ---------- | ------------------------------------------------------------ |
| **Status** | Accepted                                                     |
| **Date**   | 2026-02-21                                                   |
| **Author** | @Aleks                                              |
| **Tags**   | `#frontend` `#repository` `#separation`                     |

## Context

The Monstrino frontend was initially co-located in the main backend monorepo. As the frontend grew into a full Next.js application with its own build pipeline, package.json, CI configuration, and development tooling, keeping it in the same repository increased complexity:

- Backend and frontend have different release cadences.
- JavaScript/TypeScript tooling (node_modules, eslint, tsconfig) does not belong in a Python-based backend monorepo.
- Frontend developers work in a different context than backend developers.

## Options Considered

### Option 1: Keep Frontend in the Main Monorepo

Maintain the Next.js app inside the same repository as backend services.

- **Pros:** Single clone, unified CI pipeline.
- **Cons:** Mixed toolchains (Python + Node), bloated main repo, harder to manage independent release cycles.

### Option 2: Dedicated Frontend Repository ✅

Move the frontend into its own repository (`monstrino-ui`), with its own CI, deployment, and development workflow.

- **Pros:** Clean separation of concerns, independent deployment, right-sized CI configuration per repo, no Python/Node toolchain mixing.
- **Cons:** Additional repository to manage, frontend API contracts must be explicitly versioned.

## Decision

> The Monstrino frontend is extracted into a dedicated repository: **`monstrino-ui`**.
>
> The main backend monorepo contains no frontend code. The frontend communicates with backend services via the public API only.

## Consequences

### Positive

- Clean separation between frontend and backend development contexts.
- Independent deployment and release cadence.
- Frontend repository is right-sized with only relevant tooling.

### Negative

- API contract changes must be communicated across repositories.
- Separate repository means separate CI, secrets management, and deployment setup.

## Related Decisions

- [ADR-FD-001](./adr-fd-001.md) - Next.js migration
