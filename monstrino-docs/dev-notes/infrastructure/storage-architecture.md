---
id: storage-architecture
title: Storage Architecture
sidebar_label: Storage Architecture
sidebar_position: 4
description: How media and object storage is structured in the Monstrino platform using MinIO.
---

# Storage Architecture

:::info
This document describes the object storage strategy used for media assets in the Monstrino platform.
:::

---

## Media Storage

Media assets such as product images are stored in **object storage**.

The platform uses **MinIO**, which provides an S3-compatible API, allowing the storage layer to be replaced with AWS S3 or another provider without changing application code.

---

## Why MinIO

| Reason | Notes |
|---|---|
| **Self-hosted** | runs inside the homelab cluster - no external dependency |
| **S3 compatibility** | standard API, well-supported by client libraries |
| **Performance** | performant for large binary files such as images |
| **Portability** | same API as AWS S3 means production migration is low-friction |

---

## Storage Key Structure

Objects are stored using a deterministic path structure:

```
<bucket>/<media-kind>/<identifier-or-hash>
```

Example:

```
monstrino-media/images/a3f7c2d1e9b04f6a8c2d5e7f1b3a9c0d
```

This allows:

- **deterministic lookup** - given a known key, the object is always at the same path,
- **deduplication** - content hash as the key prevents storing the same file twice,
- **predictable structure** - no ambiguity about where a given asset lives.

---

## Integration with the Media Pipeline

MinIO is the upload target for the [media rehosting pipeline](../pipelines/media-rehosting-pipeline).

After a file is downloaded and validated, it is uploaded to MinIO and the resulting storage key is stored alongside the media record in the database.

---

## Operational Notes

:::note
MinIO should be treated as append-mostly storage. Objects representing processed and linked media assets should **not** be deleted unless the associated database record is also removed.
:::

---

## Related Documents

- [Media Rehosting Pipeline](../pipelines/media-rehosting-pipeline) - the pipeline that uploads files into this storage,
- [Kubernetes Cluster Architecture](./kubernetes-cluster-architecture) - the cluster MinIO runs in.
