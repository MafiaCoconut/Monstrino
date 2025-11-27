---
title: Release Model
description: Canonical definition of the Release domain model in the Monstrino ecosystem.
---

# Release Model

A **Release** represents a single collectible item (doll, figure, multipack item).  
It is the central entity in the Monstrino ecosystem, linking characters, series, images, exclusives, and metadata.

This page describes:

- Full canonical schema  
- Field-by-field breakdown  
- Relations  
- Lifecycle  
- Processing logic across services  

---

# 📦 Summary

**Purpose:**  
Represents a collectible item with structured metadata and relations.

**Used by:**  
Parser → Importer → Resolver → Image Service → UI

**Stored in:**  
`release.releases` table (PostgreSQL)

---

# 🧬 Schema

```ts
type Release = {
  id: number;
  name: string;
  displayName?: string;

  mpn?: string;
  typeIds?: number[];
  exclusiveIds?: number[];

  year?: number;
  seriesId?: number;
  description?: string;
  fromTheBox?: string;

  link?: string;

  createdAt: string;
  updatedAt: string;
};
