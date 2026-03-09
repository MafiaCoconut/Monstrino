---
id: data-flow-ui
title: "Data Flow: UI Access"
sidebar_label: "Data Flow: UI Access"
sidebar_position: 5
description: How frontend applications access catalog data through the Monstrino API layer.
---

# Data Flow: UI Access

:::info
This document describes how frontend applications consume catalog data and why they do not communicate directly with all backend services.
:::

---

## Overview

Frontend applications interact with the platform through a **centralized API layer**, not by calling individual backend services directly.

This is a deliberate design choice that keeps the frontend isolated from internal service topology.

---

## Request Flow

```
UI (browser / mobile app)
    → API Gateway
        → Backend Services
            → Database
```

The frontend never reaches backend services or databases directly.

---

## Why a Centralized API Layer

| Benefit | Notes |
|---|---|
| **Simplified frontend architecture** | the frontend has a single stable endpoint to talk to |
| **Centralized authentication** | auth is enforced at one point, not per-service |
| **Response aggregation** | the API layer can combine data from multiple services |
| **Internal topology is hidden** | backend services can be split, merged, or renamed without affecting the frontend |

---

## What the API Layer Does Not Do

:::note
The API layer is a **read-facing consumption layer**. It does not:

- trigger ingestion pipelines,
- perform data normalization,
- write to canonical catalog tables directly.

Those concerns belong to the ingestion architecture, described in [Data Flow: Ingestion](./data-flow-ingestion).
:::

---

## Related Documents

- [API Gateway Architecture](./api-gateway-architecture) - the specific design of the API gateway,
- [Data Flow: Ingestion](./data-flow-ingestion) - how data gets into the system before UI access,
- [Service Boundaries](./service-boundaries) - why services don't share data directly.
