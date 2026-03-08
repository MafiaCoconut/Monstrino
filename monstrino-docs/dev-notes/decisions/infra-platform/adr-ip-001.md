---
id: adr-ip-001
title: "ADR-IP-001: Deploy on Single-Node k3s Cluster"
sidebar_label: "IP-001: k3s Deployment"
sidebar_position: 1
tags: [infra, k3s, kubernetes, homelab, deployment]
description: "Deploys Monstrino on a single-node k3s cluster to provide Kubernetes-compatible orchestration in a homelab environment without full cluster overhead."
---

# ADR-IP-001 — Deploy Monstrino on Single-Node k3s Cluster

| Field      | Value                                                       |
| ---------- | ----------------------------------------------------------- |
| **Status** | Accepted                                                    |
| **Date**   | 2025-09-10                                                  |
| **Author** | @Aleks                                             |
| **Tags**   | `#infra` `#k3s` `#kubernetes` `#homelab` `#deployment`     |

## Context

Monstrino runs in a homelab environment on a single physical machine. A deployment platform was needed that:

- Supports multiple services (10+ microservices).
- Provides environment isolation between test and production.
- Runs efficiently on a single node with limited resources.
- Uses Kubernetes-compatible tooling for future portability.

## Options Considered

### Option 1: Docker Compose

Run all services via docker-compose on the host.

- **Pros:** Simple, low overhead, easy to reason about.
- **Cons:** No built-in namespace isolation, no rolling updates, not portable to cloud Kubernetes without rewrite.

### Option 2: Full Kubernetes (k8s)

Run a full Kubernetes cluster.

- **Pros:** Production-grade features.
- **Cons:** Extremely resource-intensive for a single-node homelab, high operational overhead.

### Option 3: k3s (Lightweight Kubernetes) ✅

Run k3s — a lightweight Kubernetes distribution optimized for resource-constrained environments.

- **Pros:** Kubernetes-compatible API, low resource footprint, supports namespaces, scales to multi-node if needed, uses standard Kubernetes tooling.
- **Cons:** Some Kubernetes features are simplified or removed; not stock Kubernetes.

## Decision

> Monstrino is deployed on a **single-node k3s cluster** with two namespaces:
>
> - **`test`** — staging/testing environment
> - **`prod`** — production environment

## Consequences

### Positive

- Environment isolation between test and prod via namespaces.
- Standard Kubernetes manifests can be used.
- Easy migration to multi-node or cloud Kubernetes if needed.

### Negative

- k3s has some differences from stock Kubernetes that may surface edge cases.
- Single-node means no hardware redundancy.

## Related Decisions

- [ADR-IP-002](./adr-ip-002.md) — Cloudflared for external access
- [ADR-MP-002](../media-pipeline/adr-mp-002.md) — S3-compatible storage
