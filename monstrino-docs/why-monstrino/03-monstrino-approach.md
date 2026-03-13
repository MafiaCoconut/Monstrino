---
description: >
  Architectural approach used by Monstrino to build a canonical
  collectible catalog from fragmented ecosystem data.
sidebar_position: 3
title: Monstrino Approach
---

# Monstrino Approach

:::info Core Idea
Monstrino treats collectible catalogs as a **data ingestion and
normalization problem** — not as a manually curated database.
:::

Collectible data is fragmented, inconsistent, and constantly evolving.
Manual catalog maintenance doesn't scale.
Monstrino solves this by operating as a **data ingestion platform**
that continuously collects, enriches, and normalizes external data.

---

## Platform Architecture Overview

```mermaid
flowchart TB
    Sources["External Data Sources"]

    Sources --> Discovery["Source Discovery"]
    Discovery --> Collector["Content Collector"]
    Collector --> Enricher["Data Enrichment"]
    Enricher --> Importer["Canonical Import"]
    Importer --> Catalog["Canonical Catalog"]
```

| Stage               | Purpose                                         |
| ------------------- | ----------------------------------------------- |
| Source discovery    | Identify new data sources and releases          |
| Content collection  | Retrieve raw product information                |
| Data enrichment     | Extract additional attributes and metadata      |
| Canonical import    | Transform data into the canonical catalog model |

---

## Canonical Catalog Model

External sources describe the same product in different ways.
Monstrino separates **source data** from **canonical entities**.

| Source       | Title                                |
| ------------ | ------------------------------------ |
| Mattel Store | Draculaura Doll                      |
| Amazon       | Monster High Draculaura Fashion Doll |
| eBay         | MH Draculaura 2022                   |

All three rows are the **same underlying product**.

```mermaid
flowchart TB
    A["Mattel: Draculaura Doll"]
    B["Amazon: Monster High Draculaura Fashion Doll"]
    C["eBay: MH Draculaura 2022"]

    A --> Canonical
    B --> Canonical
    C --> Canonical

    Canonical["Canonical Product Entity"]
```

---

## Pipeline Stages in Detail

```mermaid
flowchart TB
    Sources["External Sources"]

    Sources --> Collect["Collect Data"]
    Collect --> Parse["Parse Content"]
    Parse --> Enrich["Enrich Attributes"]
    Enrich --> Normalize["Normalize Data"]
    Normalize --> Import["Import to Catalog"]
    Import --> Catalog["Canonical Catalog"]
```

**🔍 Collection** — retrieves product pages from retailers,
marketplaces, wikis, and collector databases.

**📐 Parsing** — converts raw content into structured data models.

**✨ Enrichment** — extracts and infers additional attributes
from descriptions, images, community sources, and AI analysis.

**🔧 Normalization** — transforms everything into a consistent
canonical structure.

**📥 Import** — stores the normalized entity in the canonical catalog.

---

## Franchise Knowledge Graph

Unlike simple catalog websites, Monstrino represents the franchise
as a connected data graph — enabling exploration no traditional
catalog supports:

```mermaid
flowchart LR
    Character["Character"]
    Release["Release"]
    Pet["Pet"]
    Series["Series"]

    Character --> Release
    Release --> Pet
    Release --> Series
```

- all releases belonging to a character
- pets associated with specific characters
- releases grouped by series or generation

---

## How It Addresses Each Problem

| Ecosystem Problem              | Monstrino Solution                      |
| ------------------------------ | --------------------------------------- |
| Fragmented sources             | Automated ingestion pipelines           |
| Inconsistent product names     | Normalization into canonical entities   |
| Incomplete metadata            | Enrichment from multiple sources        |
| Evolving information           | Continuous pipeline updates             |

---

## Summary

Monstrino is a **data platform** that:

- ingests data from multiple heterogeneous sources
- enriches incomplete product attributes
- normalizes inconsistent information
- constructs a canonical, relationship-aware catalog model

The result: fragmented ecosystem data becomes a structured,
continuously evolving collectible catalog.
