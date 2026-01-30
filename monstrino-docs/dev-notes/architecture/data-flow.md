---
id: architecture-data-flow
title: Data Flow Overview
sidebar_label: Data Flow
---

:::info
This document describes how data moves through the system at a conceptual level.
It intentionally avoids implementation details.
:::

---

## Primary Data Flow

```text
External Source
      ↓
catalog-collector
      ↓
parsed_* tables
      ↓
catalog-importer
      ↓
canonical domain tables
      ↓
read services / UI
```

---

## Flow Characteristics

- External data enters asynchronously
- Parsed data acts as an inspection and buffering layer
- Importing is batch-oriented and idempotent
- Read services never modify domain data

---

## Consistency Model

- Eventual consistency between ingestion and read layers
- Strong consistency within a single import transaction
- No ordering guarantees across different domains

---

## Failure Handling

- Collector failures do not affect canonical data
- Importer failures leave parsed records unprocessed
- Failures are isolated to individual records or batches

---

:::note
For subsystem-specific details, see the ingestion overview.
:::