---
title: Overview
sidebar_position: 1
description: What this section covers and how to navigate the raw-to-catalog documentation.
---

# Raw to Catalog

This section demonstrates how Monstrino transforms real external product data into a structured,
normalized catalog — end to end, using a concrete example.

---

## What is covered

| Document | Purpose |
|---|---|
| [Before and After](./01-before-after.md) | Side-by-side comparison of a release before and after the pipeline |
| [From Raw Data to Structured Catalog](./02-raw-to-catalog.md) | Full pipeline walkthrough — step-by-step, with real data at each stage |

---

## Why this section exists

The ingestion pipeline can look complex from the outside.
This section exists to show the concrete reason for that complexity:
the input data is incomplete, inconsistent, and cannot be reliably parsed with rule-based logic alone.

The documents here are not abstract — they use a real product page from the Mattel store
and trace it through every transformation until it becomes a canonical domain entry.

---

## Where to start

If you are reading for the first time, start with
[From Raw Data to Structured Catalog](./02-raw-to-catalog.md).

If you just want to see the result, go to [Before and After](./01-before-after.md).
