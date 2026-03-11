---
title: Introduction
sidebar_position: 1
description: Overview of the Monstrino platform - architecture, AI features, custom packages, patterns, pipelines, and principles.
---

import DocCard from '@site/src/components/DocCard/DocCard';

# Monstrino Documentation

Monstrino is a data platform for Monster High collectors. It resolves release, character, pet, media, and pricing data from uncontrolled, heterogeneous sources into a canonical domain model with stable product identities and source provenance, and exposes it through a single public API.

The system is built as a service-oriented architecture with explicit responsibility boundaries, designed for long-term maintainability and incremental evolution on self-hosted infrastructure.

---

## Platform Scope

| Domain | Responsibility |
|---|---|
| **Catalog** | Structured releases, characters, pets, series, and their relationships |
| **Acquisition** | Automated data collection from official retailers and community sources |
| **AI Enrichment** | LLM-assisted attribute inference via the `ai-orchestrator` service |
| **Media** | Image rehosting, storage, normalization, and variant generation |
| **Market** | MSRP tracking and pricing observations over time |
| **APIs** | Internal domain APIs aggregated behind a single public entry point |

---

## Start Here

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem'}}>

<DocCard title="Architecture Overview" href="/docs/architecture/architecture-overview/">
  System purpose, design priorities, high-level data flow, and service map.
</DocCard>

<DocCard title="AI Features" href="/docs/ai-features/ai-strategy/">
  How Monstrino uses AI for catalog enrichment - strategy and orchestration.
</DocCard>

<DocCard title="Custom Packages" href="/docs/architecture/custom-packages/overview/">
  The 7 internal Python packages - architectural layers and dependency rules.
</DocCard>

<DocCard title="Architecture Patterns" href="/docs/architecture/patterns/overview/">
  Clean Architecture, Unit of Work, dependency inversion, service and repository structure.
</DocCard>

<DocCard title="Pipelines" href="/docs/pipelines/overview/">
  End-to-end ingestion pipelines - catalog collection, parsing and more.
</DocCard>

<DocCard title="Design Principles" href="/docs/principles/design-principles/">
  Core engineering principles that guide service design and platform evolution.
</DocCard>

<DocCard title="Domain Models" href="/docs/models/overview/">
  Catalog, releases, series, characters, market, media, and ingest - the full domain model.
</DocCard>

<DocCard title="The Catalog as a Master Data Problem" href="/docs/architecture/catalog-as-master-data/">
  Canonical identity, source reconciliation, controlled vocabulary, and resolver-based normalization under uncontrolled upstream data.
</DocCard>

</div>

---

## Documentation Sections

### Architecture

C4-style system documentation covering system context, container architecture, storage design, service communication, security boundaries, scalability strategy, deployment model, and observability.

Two embedded subsections:

- **Custom Packages** - the 7 internal Python packages (`monstrino-core` through `monstrino-testing`) with full dependency graph, structure, and responsibility breakdown
- **Architecture Patterns** - Clean Architecture, Unit of Work, dependency rules, service and repository structure with real code examples

### AI Features

How Monstrino integrates LLMs without losing operational control:

- AI strategy and where AI is and is not used
- `ai-orchestrator` service - scenario-based execution, multi-step command loop, model abstraction
- Step-by-step enrichment walkthrough using a real release payload with full JSON examples

### Pipelines

End-to-end ingestion architecture, catalog ingestion stages (collection → parsing → enrichment → import), and the media ingestion and normalization flow.

### Domain Models

Structured documentation of the Monstrino domain model across all bounded areas:

- **Catalog** - canonical entities: `Release`, `Series`, `Character`, `Pet`, and their reference data
- **Release & Series** - release versioning, series hierarchy, and release-to-series associations
- **Character & Pet** - character roles, pet types, and relationships to releases
- **Release Relationships** - cross-release links: recolors, repacks, exclusives
- **Market** - store listings, pricing observations, and vendor tracking
- **Media** - image assets, storage variants, and normalization metadata
- **Ingest** - raw parsed payloads and import tracking records
- **Reference Data** - shared lookup tables used across the domain
- **Value Objects & Enums** - shared primitives, enums, and typed identifiers
- **Processing & Scheduling** - task scheduling and pipeline execution state

### Principles

Design principles, service boundary rules, data ownership model, and API design conventions applied consistently across the platform.
