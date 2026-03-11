---
title: AI Strategy
sidebar_position: 2
description: How AI is used in Monstrino — what it does, where it is used, and why it is designed as an assistive layer rather than a system dependency.
---

# AI Strategy

:::note In plain terms
Product pages on external stores are messy. A description might say
*"includes accessories"* without listing them, or mention three character
names where only one is actually inside the box.

Monstrino uses AI to read those descriptions and convert them into
structured, reliable catalog data — automatically, at scale.

Without AI, this would require hundreds of hand-written parsing rules
that break the moment a source changes its wording. With AI, the platform
can handle thousands of inconsistent product pages and still produce clean,
queryable results.

AI is a **data quality multiplier**. It is not a system dependency —
the platform continues to function without it, just with less complete data.
:::

This document describes how Artificial Intelligence is used within the **Monstrino** platform, the boundaries of its responsibility, and the architectural principles guiding its integration.

Monstrino uses AI as an **assistive intelligence layer** that improves data quality, enriches content, and enables advanced user-facing features. However, the platform is designed so that **AI is not a core dependency** for its fundamental operation.

---

# Role of AI in Monstrino

AI is used to assist the platform in understanding complex contextual information about releases, characters, and images.

Many of the problems Monstrino solves involve **interpreting semi-structured or incomplete data**, which traditionally would require large amounts of custom logic and heuristics.

Instead of building increasingly complex deterministic algorithms, Monstrino uses AI to:

- understand release descriptions
- infer missing metadata
- analyze release images
- classify entities
- enrich catalog data

This approach allows the platform to evolve faster and process more complex inputs.

Typical AI-assisted tasks include:

- extracting structured information from release descriptions
- identifying characters or pets mentioned in a release
- classifying release types (doll, playset, vehicle, etc.)
- identifying items visible in release images
- detecting accessories that are not listed in descriptions

For example, if a release description says that a set contains **four accessories** but does not specify which ones, AI can analyze the release image and identify the objects.

---

# AI Is an Assistive Layer

A core architectural principle of Monstrino is that **AI assists the platform but does not control it**.

The platform is designed so that it can operate **without AI**. In such cases:

- data ingestion still works
- catalog storage still works
- APIs still function
- the website remains operational

However, the data may be **less complete or less enriched**.

AI therefore acts as a **data quality multiplier**, not as a system dependency.

---

# Where AI Is Used

AI is currently used or planned in the following areas:

### Catalog Data Enrichment

The `catalog-data-enricher` service uses AI to infer missing data such as:

- characters appearing in a release
- pets included in a set
- release tiers
- release types
- additional classification tags

This service intentionally relies on AI because its primary purpose is to **interpret incomplete data**.

### Image Understanding

AI is used to analyze release images in order to:

- detect items included in a release
- identify accessories
- count visible objects
- extract individual items from a larger release photo

This capability allows the platform to generate richer structured information from visual sources.

### Future User Features

The same AI infrastructure will enable future features such as:

- identifying a release from a user-uploaded photo
- identifying accessories from a photo
- recognizing multiple releases within one image
- linking detected objects to catalog entries

These features are planned to be implemented through the **AI Orchestrator** service.

---

# Where AI Is NOT Used

Most services in Monstrino are intentionally **AI-agnostic**.

These services must not depend on AI or even be aware of its existence.

Examples include:

- data ingestion pipelines
- catalog storage services
- public APIs
- page generation
- media storage
- data synchronization pipelines

These systems operate only on **deterministic logic and structured data**.

They receive inputs, process them according to predefined rules, and store or return results.

This isolation prevents AI-related instability from affecting the core platform.

---

# AI Responsibility Boundaries

AI is strictly limited to **suggestion and interpretation tasks**.

AI **can**:

- propose enriched data
- classify releases
- interpret text descriptions
- analyze images
- generate structured suggestions

AI **cannot**:

- modify the database directly
- call other services
- execute workflows
- overwrite canonical data
- act autonomously

All AI activity is executed through **controlled scenarios** defined in backend services.

AI never interacts with the system outside these scenarios.

---

# Controlled AI Workflows

AI does not orchestrate system actions itself.

Instead, services send prompts that define **explicit workflows**.

If AI requires additional information, it must respond with a structured command such as:

```json
{
  "command": "get-more-info-about-characters",
  "characters": ["Draculaura"]
}
```

The calling service then:

1. interprets the command  
2. retrieves the requested information  
3. sends the updated context back to the AI model  

This ensures that **all system actions remain deterministic and controlled by the backend**, not by the model.

---

# Source of Truth

AI-generated data is **never considered authoritative**.

The primary source of truth for Monstrino is:

**Official Mattel data.**

If information from other sources conflicts with official Mattel data, the system requires **administrator review**.

AI-generated enrichment is treated as **suggested data** that must pass validation rules.

---

# Validation and Human Review

When AI produces enrichment results, they are verified by the responsible service.

Examples of validation checks include:

- unexpected number of characters
- inconsistent classification
- suspicious or incomplete results

If the system detects anomalies, the data is **flagged for administrator review**.

This prevents incorrect AI outputs from entering the catalog automatically.

---

# Risks of Using AI

AI introduces several known risks that must be managed carefully:

- hallucinated data
- incorrect classifications
- inconsistent outputs
- unpredictable model behavior
- infrastructure availability issues

In addition, the current infrastructure requires manual intervention because the AI models run on a **personal workstation**.

When new data requires AI processing, the administrator receives a notification and may need to activate the AI server.

---

# AI Infrastructure Strategy

Currently, AI models run **locally on dedicated hardware**.

This provides several benefits:

- full control over models
- no external API costs
- no data privacy concerns
- predictable infrastructure behavior

In the future, Monstrino may adopt one of the following approaches:

- dedicated AI server
- cloud-based GPU instances
- hybrid infrastructure combining local and cloud processing

The platform architecture keeps AI services **isolated**, making infrastructure changes easier.

---

# Long-Term Vision

AI will continue to expand its role in Monstrino as the platform grows.

Future AI capabilities may include:

- automatic release identification from images
- accessory recognition
- large-scale image analysis
- automated metadata generation
- enhanced catalog discovery

Despite these capabilities, the core principle will remain unchanged:

**AI assists the platform, but never replaces deterministic system logic.**