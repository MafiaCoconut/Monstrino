---
title: System Context
sidebar_position: 2
description: External system context and boundaries of the Monstrino platform.
---

# System Context

## Overview

This document describes how **Monstrino** interacts with the external world.

The goal of the system context view is to clearly show:

- which actors interact with the system
- which external systems provide data
- what boundaries exist between Monstrino and the outside world
- where the frontend and APIs fit into the architecture

This corresponds to **C4 Model – Level 1 (System Context)**.

Monstrino sits between external data sources and collectors who want structured information about Monster High releases.

---

## Primary Actor

### Collectors and Fans

The primary users of the platform are **Monster High collectors and fans** who want reliable information about:

- doll releases
- characters and pets
- release series
- historical prices
- current market offers
- official product metadata
- release images

Users interact with the system **only through the frontend application**, which communicates with the backend via the public API.

---

## External Systems

Monstrino collects information from multiple external sources.

| External System | Type | Purpose |
|---|---|---|
| Mattel retail websites | Web pages / structured data | Official product information and release data |
| Shopify XML feeds | Structured XML feeds | Official retailer catalog data |
| Monster High Fandom API | API | Character, series, and lore information |
| Second‑hand marketplaces | Web sources (planned) | Market pricing and resale information |

These sources provide **raw information** that Monstrino collects and transforms into normalized domain data.

---

## System Boundary

Monstrino exposes a **single external access point** to the outside world.

Only one service is reachable from outside the system:

**public-api-service**

This service acts as:

- API gateway
- request validation layer
- orchestration layer for internal services
- transformation layer for UI-ready responses

All other services operate **only inside the cluster** and cannot be accessed directly.

---

## System Context Diagram

![Architecture](/img/architecture/system-context-diagram.jpg)

---

## Data Responsibility Boundary

Monstrino does **not generate primary data** about releases.

Instead it:

1. Collects data from multiple sources
2. Normalizes it into a structured domain model
3. Aggregates price observations
4. Stores media assets
5. Exposes the combined information through APIs

This makes Monstrino a **data aggregation and normalization platform**, not a source-of-truth provider.

---

## Out of Scope

The system intentionally avoids responsibilities that belong to other platforms.

Monstrino:

- does **not sell products**
- does **not process payments**
- does **not manage marketplace listings**
- does **not host user-generated content (currently)**

The system's purpose is **information aggregation and presentation**, not commerce.

---

## Relationship to Internal Architecture

The system context view intentionally hides internal implementation details.

Internal components such as:

- collectors
- import pipelines
- media processing services
- storage layers

are described in later architecture documents:

- `container-architecture.md`
- `catalog-ingestion-pipeline.md`
- `media-pipeline.md`
- `storage-architecture.md`