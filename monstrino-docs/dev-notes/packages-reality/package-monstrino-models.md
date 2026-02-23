---
id: package-monstrino-models
title: Package — monstrino-models
sidebar_label: monstrino-models
---

> **Type:** Shared persistence models package  
> **Audience:** Engineering / Architecture review

---

## Purpose

The **monstrino-models** package contains persistence-focused models shared across services.

It exists to provide a single source of truth for:
- SQLAlchemy ORM mappings and constraints
- Pydantic models mirroring ORM structures

---

## What This Package Contains

- ORM models aligned to database tables and constraints
- Database-related mappings and indexes
- Pydantic DTOs corresponding to ORM entities

---

## Boundaries

- This package is **persistence-focused** and should not contain business logic
- ORM models are intended to be used inside repository implementations
- Use-case and application layers should depend on DTOs and repository interfaces, not ORM

---

## Notes

:::note
This package is intentionally kept simple: it is a schema representation, not an active component.
Behavior and guarantees are documented in repositories and services that use these models.
:::
