---
id: container-architecture
title: Container Architecture
sidebar_label: Container Architecture
sidebar_position: 2
description: How Monstrino services are packaged as containers and deployed on Kubernetes.
---

# Container Architecture

:::info
This document describes how Monstrino services are packaged and deployed as containers within the Kubernetes cluster.
:::

---

## Overview

The platform follows a **container-based architecture** where each service runs independently, is packaged as a Docker image, and is deployed inside Kubernetes.

This means:

- services are isolated from each other at the process and filesystem level,
- each service can be built, versioned, and deployed independently,
- the cluster manages scheduling, restarts, and scaling.

---

## Service Containers

Services are grouped by domain responsibility:

| Domain | Service Type |
|---|---|
| **Catalog ingestion** | collector, parser, importer services |
| **Media ingestion** | subscriber, processor, storage services |
| **Market data** | discovery collector, price collector |
| **API** | public-facing catalog and query APIs |
| **AI** | orchestrator and enrichment services |

Each of these runs in its own container with its own lifecycle.

---

## Deployment Pattern

Every service follows the standard Kubernetes deployment chain:

```
Deployment
    → ReplicaSet
        → Pod
            → Container (Docker image)
```

This pattern provides:

- **self-healing** — failed pods are replaced automatically,
- **rolling updates** — new versions are deployed without downtime,
- **independent scaling** — replicas per service are configured separately.

---

## Image Strategy

Each service is packaged as a single Docker image that contains:

- the application code,
- the runtime (Python interpreter, dependencies),
- configuration loaded at startup via environment variables.

Images are built per service and versioned independently.

---

## Related Documents

- [Kubernetes Cluster Architecture](../infrastructure/kubernetes-cluster-architecture) — the cluster these containers run on,
- [Service Boundaries](./service-boundaries) — domain ownership per service,
- [System Context](./system-context) — what the system as a whole does.
