---
title: Design Principles
sidebar_position: 1
description: Core engineering and architectural principles that guide the design of the Monstrino platform.
---

# Design Principles

This document describes the core design principles that guide the architecture and development of the Monstrino platform.

Monstrino is designed as a long-lived data platform whose primary goal is to collect, normalize, and store the most complete and accurate information about Monster High releases and related entities.

The system architecture prioritizes:

- structured data
- long-term maintainability
- independence from external sources
- scalability of ingestion pipelines
- clear boundaries between system components

These principles guide how new services, pipelines, and data models are designed.

---

# Core Objective

The primary objective of Monstrino is to maintain the **most structured, accurate, and comprehensive catalog of Monster High data in a single system**.

This includes:

- release information
- characters
- series
- pets
- media assets
- market data
- additional metadata discovered from external sources

The architecture is designed so that **new types of information can be integrated without breaking existing data structures**.

---

# Core Principles

## Structured Information First

Monstrino prioritizes **structured and well-organized data**.

Information is intentionally split into multiple tables and domains so that:

- new data types can be introduced safely
- existing data structures remain stable
- relationships between entities remain clear

The platform avoids storing loosely structured information when a normalized structure is possible.

---

## Data Model Stability

The catalog data model is designed to remain stable even when:

- new releases appear
- new data sources are introduced
- new metadata types are discovered

This is achieved by separating different domains of information and avoiding tightly coupled schemas.

---

## API-First Service Communication

Services never interact with each other by directly accessing internal logic.

All cross-service communication must happen through **API interfaces**.

Example:

If a pipeline service requires catalog data, it must request that data through the appropriate API service rather than querying the catalog domain directly.

This keeps service boundaries clear and prevents hidden dependencies between components.

---

## Shared Contracts

All services rely on shared API definitions stored in the **`monstrino-contracts`** package.

This package defines:

- request models
- response models
- API contracts between services

Using shared contracts ensures that services always follow the same interface definitions.

It also prevents duplicated model definitions across multiple services.

---

## Centralized API Infrastructure

Communication logic between services is centralized in shared infrastructure packages.

The Monstrino architecture separates responsibilities between three core packages:

### monstrino-contracts

Defines the API communication models and contracts used by services.

### monstrino-api

Defines the unified response structure used by all APIs.

### monstrino-infra

Contains reusable infrastructure components such as:

- API client implementations
- parsing adapters
- source-specific utilities

This architecture ensures that when communication rules change, they only need to be updated in a single place.

---

## Raw Data Preservation

All external data collected from third-party sources is preserved in its original form before normalization.

Raw ingestion data is stored so that:

- processing errors can be investigated
- parsing logic can be improved
- historical ingestion data can be reprocessed if necessary

This makes ingestion pipelines easier to debug and improves long-term data reliability.

---

## Internal Ownership of Media

All images discovered by ingestion pipelines are rehosted and stored inside the Monstrino platform.

This ensures that the platform does not depend on the availability of external websites.

If an external source becomes unavailable, the platform can continue serving the stored media assets.

Media ownership is therefore considered a core architectural requirement.

---

## Pipeline-Driven Processing

Data processing is separated into specialized pipelines that handle specific stages of the data lifecycle.

Examples include:

- ingestion pipelines
- media processing pipelines
- data enrichment pipelines

Pipelines allow the system to process large amounts of data without blocking API requests.

They also allow new processing stages to be added without rewriting existing services.

---

## Separation of Public and Internal Interfaces

External clients never interact directly with internal services.

All public access to the system goes through a dedicated entry point.

This ensures that:

- internal services remain protected
- the public API remains stable
- internal architecture can evolve without affecting external clients

---

## Scoped Data Access

Services are intentionally restricted to accessing only the database schemas that are relevant to their domain.

For example:

- ingestion services may operate on ingestion schemas
- catalog services manage normalized catalog data
- market services operate on market data

Limiting database access reduces accidental coupling between domains and improves system reliability.

---

## Independent Data Pipelines

When new data sources are added, the system does not require architectural changes.

Instead:

- a new parser can be added
- pipeline configuration can be extended
- existing processing components can be reused

This design allows the platform to scale horizontally as new sources of information appear.

---

# Practical Interpretation

In practice, these principles mean that:

- new data sources should be integrated through pipelines rather than modifying core catalog logic
- services should expose functionality through APIs instead of direct database access
- raw ingestion data should always be preserved
- images should always be stored internally
- new data types should be introduced by extending the system rather than rewriting existing components

---

# Architectural Intent

The purpose of these principles is to ensure that Monstrino remains:

- maintainable over long periods of time
- resilient to changes in external data sources
- capable of storing new types of information
- scalable as the catalog grows

By following these principles, the platform can continue evolving without requiring large architectural rewrites.