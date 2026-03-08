---
title: Introduction
sidebar_position: 1
description: > 
    A high-level overview of the Monstrino ecosystem: models, services, pipelines, and UI architecture.
---

import DocCard from '@site/src/components/DocCard/DocCard';
import useBaseUrl from '@docusaurus/useBaseUrl';

# 👋 Welcome to **Monstrino Documentation**

Monstrino is a modular, scalable ecosystem designed to structure, understand, and process complex collectible-oriented data.

It includes:

- 📦 **Releases** — items, variants, editions, reissues  
- 🎭 **Characters** — individuals, variants, roles  
- 🏛 **Series & Subseries** — hierarchical collection metadata  
- 🖼 **Images** — primary/secondary assets and processing pipelines  
- ⚙ **Services** — parsing, importing, sandboxing, enrichment  
- 🎨 **Frontend UI (FSD)** — clean, modular, feature-oriented React architecture  

This documentation will guide you through all layers of the system.

---

# 🚀 Quick Start

Three essential entry points into the Monstrino ecosystem:

<DocCard title="1. Explore the Architecture" href={useBaseUrl('docs/architecture/architecture-overview')}>
  High-level structure, data flow, domain boundaries, and ecosystem overview.
</DocCard>

<DocCard title="2. Explore Core Models">
  Learn the main domain models: Release, Character, Series, Image.
</DocCard>

<DocCard title="3. Understand the Services">
  Importer, Parser, Image Service, Sandbox — how they cooperate and transform data.
</DocCard>

---

# 🧩 Architecture Overview

<img
  src={useBaseUrl('img/architecture/monstrino-architecture.svg')}
  alt="Monstrino Architecture"
  style={{borderRadius: '12px', marginTop: '1rem'}}
/>

The architecture is built around:

- A **strict domain model**
- A **repository and Unit-of-Work pattern**
- Modular **microservices and pipelines**
- A **feature-sliced frontend UI**

---

# 📚 Documentation Structure

This documentation is divided into the following sections:

### **Architecture**
High-level structure, data flow, and ecosystem overview.

### **Models**
Releases, Characters, Series, Images — schemas, relations, ORM.

### **Services**
Importer, Parser, Image Service, Sandbox — processing flows.

### **Pipelines**
Normalization, enrichment, linking, image pipelines.

### **UI (FSD)**
Entities → Features → Widgets → Pages (React + Vite).

### **API**
Endpoints, contracts, usage examples.

### **Guides**
Practical workflows and tutorials.

---

# 🖤 Welcome to the Monsterverse

Monstrino is a living, evolving knowledge system.  
Let’s explore it together.  
