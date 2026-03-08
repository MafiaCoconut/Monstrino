---
id: kubernetes-cluster-architecture
title: Kubernetes Cluster Architecture
sidebar_label: Kubernetes Cluster Architecture
sidebar_position: 1
description: Overview of the Kubernetes cluster architecture used to run the Monstrino platform in a homelab environment.
---

# Kubernetes Cluster Architecture

:::info Engineering Working Notes
This document describes how the Monstrino platform is deployed and orchestrated using Kubernetes in a homelab environment.
:::

---

## Overview

The Monstrino platform runs on a **Kubernetes cluster hosted in a homelab environment**.

All services are deployed as Kubernetes `Deployment` resources and exposed:

- **internally** through `Service` resources via cluster DNS,
- **externally** through an `Ingress` controller.

---

## Goals

| Goal | Notes |
|---|---|
| **Container orchestration** | standardized deployment and lifecycle management |
| **Service isolation** | each service runs independently in its own pods |
| **Horizontal scalability** | replicas can be increased per service without coupling |
| **Reproducible deployments** | declarative manifests define the desired state |

---

## Deployment Model

Each service follows the standard Kubernetes resource chain:

```
Deployment → ReplicaSet → Pod → Container
```

Services are deployed independently. Scaling one service does not affect others.

---

## Networking

Internal service-to-service communication uses **Kubernetes cluster DNS**.

The standard DNS name pattern for a service:

```
<service-name>.<namespace>.svc.cluster.local
```

For external access, see [Ingress and Networking](./ingress-and-networking).

---

## Related Documents

- [Kubernetes Namespace Structure](./kubernetes-namespace-structure) — how environments are isolated within the cluster,
- [Ingress and Networking](./ingress-and-networking) — how external traffic reaches services,
- [Environment Strategy](./environment-strategy) — local, test, and production environments.
