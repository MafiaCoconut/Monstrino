---
id: failures
title: Failures & Architectural Pressure Points
sidebar_label: Failures
---

:::info
This document captures moments where **system reality pushed back** against initial assumptions.
Failures here are treated as signals that shaped the current architecture.
:::

---

## ParsedRelease Schema Evolution (v1 → v3)

### Symptoms
- Parsed data worked for a single source but broke for others
- Fields were either too specific or too weakly typed
- Import logic became cluttered with conditional handling

### Root Cause
Early parsed schemas encoded assumptions about one external source.
As additional sources were added, these assumptions no longer held.

### Resolution
- Multiple iterations of the ParsedRelease schema
- Shift toward more flexible, source-agnostic fields
- Clear separation between raw source fields and normalized data

### Architectural Impact
- Reinforced the need for parsed tables as a buffer
- Validated the collector/importer boundary
- Reduced blast radius of future schema changes

---

## Image Uniqueness and Constraint Violations

### Symptoms
- Import failures due to duplicate image records
- Conflicts between primary images and image lists

### Root Cause
Image uniqueness rules were underspecified relative to real-world data.
Multiple logical images could map to the same physical resource.

### Resolution
- Redefined uniqueness constraints
- Introduced explicit image origin references
- Adjusted importer logic to normalize image ownership

### Architectural Impact
- Stronger invariants at the domain boundary
- Clearer responsibility for media-related consistency

---

## Repository and Session Management Revisions

### Symptoms
- Unclear transaction boundaries
- Inconsistent rollback behavior
- Difficult-to-reason-about async session handling

### Root Cause
Early repository versions tied session lifecycle too closely to individual operations.

### Resolution
- Introduction of Unit of Work
- Consolidation of persistence behavior in BaseRepo and CrudRepo

### Architectural Impact
- Explicit transaction scopes
- Improved failure isolation
- Easier reasoning about persistence correctness

---

:::note
These failures did not invalidate the system.
They shaped it.
:::