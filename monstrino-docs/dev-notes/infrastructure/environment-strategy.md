---
id: environment-strategy
title: Environment Strategy
sidebar_label: Environment Strategy
sidebar_position: 2
description: How the Monstrino platform manages local, test, and production runtime environments.
---

# Environment Strategy

:::info
This document describes how Monstrino separates runtime environments and what each environment is expected to provide.
:::

---

## Environments

The system currently supports three runtime environments:

| Environment | Purpose |
|---|---|
| `local` | development and experimentation |
| `test` | integration validation and staging |
| `production` | live platform and collectors |

---

## Local

Used for **development and experimentation** on a developer machine.

Characteristics:

- reduced infrastructure footprint,
- local datasets — no access to production data,
- developer tools enabled (debug logging, relaxed auth, etc.),
- services may be run partially or individually.

---

## Test

Used for **validating new deployments and integration testing** before production rollout.

Characteristics:

- realistic configuration mirroring production,
- isolated namespace — changes do not affect production,
- staging datasets — realistic but not live data,
- used to verify that services work together as expected.

---

## Production

Runs the **live public platform and all active collectors**.

Characteristics:

- production data — real catalog, media, and market records,
- stable configuration — changes require deliberate deployment,
- restricted access — not accessible for ad hoc experimentation.

:::warning
Production should never be used for testing new behavior. All testing must pass through `local` and `test` first.
:::

---

## Environment Isolation

Each environment maps to a dedicated **Kubernetes namespace**, ensuring workloads are isolated at the cluster level.

See [Kubernetes Namespace Structure](./kubernetes-namespace-structure) for details.

---

## Related Documents

- [Kubernetes Cluster Architecture](./kubernetes-cluster-architecture) — the cluster that runs these environments,
- [Kubernetes Namespace Structure](./kubernetes-namespace-structure) — namespace-level isolation per environment.
