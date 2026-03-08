
<div align="left">

<h1>Monstrino</h1>

<p>Distributed data platform for collecting, processing and serving structured <strong>Monster High</strong> release data.</p>

[![Python](https://img.shields.io/badge/Python-blue?logo=python&logoColor=white)](https://www.python.org/) [![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/) [![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-D71F00?logo=sqlalchemy&logoColor=white)](https://www.sqlalchemy.org/) [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/) [![MinIO](https://img.shields.io/badge/MinIO-C72E49?logo=minio&logoColor=white)](https://min.io/) [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/) [![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)](https://react.dev/) [![MUI](https://img.shields.io/badge/MUI-007FFF?logo=mui&logoColor=white)](https://mui.com/) [![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)](https://www.docker.com/) [![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?logo=kubernetes&logoColor=white)](https://kubernetes.io/) [![Stackit](https://img.shields.io/badge/STACKIT-009DE0?logo=stackit&logoColor=white)](https://www.stackit.de/)

[![wakatime](https://wakatime.com/badge/user/48c32c80-1ac5-49d5-a08c-e802fc739940/project/dcae8000-f0fa-471f-81d7-ddc589dbf188.svg)](https://wakatime.com/badge/user/48c32c80-1ac5-49d5-a08c-e802fc739940/project/dcae8000-f0fa-471f-81d7-ddc589dbf188)

</div>

---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Architecture](#architecture)
  - [Data Flow](#data-flow)
- [Features](#features)
- [Core Services](#core-services)
  - [Catalog Services](#catalog-services)
  - [Media Services](#media-services)
  - [Market Services](#market-services)
  - [AI Services](#ai-services)
  - [API Layer](#api-layer)
- [Data Platform](#data-platform)
  - [Database Layout](#database-layout)
- [Media Pipeline](#media-pipeline)
- [Technology Stack](#technology-stack)
- [Infrastructure](#infrastructure)
- [Development Principles](#development-principles)
- [Repository Structure](#repository-structure)
- [Example API](#example-api)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Local Setup](#local-setup)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

> [!NOTE]
> Monstrino is a distributed data platform designed to collect, normalize and serve structured data about Monster High releases.

The platform aggregates product data from multiple external sources, processes media assets, enriches metadata using LLM services and exposes a unified API for applications.

The goal is to provide a **high‑quality canonical dataset** for collectors, applications and analytical tools.

---

## Architecture

> [!IMPORTANT]
> Only `public-api-service` is exposed externally.  
> All other services are internal to the cluster.

Monstrino follows a **microservice architecture** with clear service boundaries and domain‑driven design.

Key characteristics:

- Service-to-service communication via REST APIs
- API Gateway for external access
- Internal routing rules for protected services
- Event-driven capabilities (Kafka planned)
- Distributed ingestion pipeline
- Media processing pipeline

### Data Flow

```
External Sources
       │
       ▼
Catalog Collector
       │
       ▼
Catalog Importer
       │
       ▼
Data Processing / LLM Enrichment
       │
       ▼
Core Data Services
       │
       ▼
Public API Service
       │
       ▼
UI Applications
```

---

## Features

- Distributed data ingestion
- Canonical release database
- Media processing pipeline
- AI assisted metadata enrichment
- Microservice architecture
- Kubernetes native deployment
- API driven service communication

---

## Core Services

### Catalog Services

| Service | Description | Status |
|---|---|---|
| `catalog-collector` | Scrapes product data from external websites | Active |
| `catalog-importer` | Processes raw collected data and prepares it for ingestion | Active |
| `release-catalog-service` | Maintains canonical release data | Active |

### Media Services

| Service | Description | Status |
|---|---|---|
| `media-normalizator` | Image processing pipeline (resize, compression, formats) | Active |
| `media-rehosting-service` | Rehosts media assets to object storage | Active |

### Market Services

| Service | Description | Status |
|---|---|---|
| `market-price-collector` | Collects pricing data from marketplaces | Active |

### AI Services

| Service | Description | Status |
|---|---|---|
| `llm-gateway` | Gateway service for LLM-based enrichment | Planned |

### API Layer

| Service | Description | Status |
|---|---|---|
| `public-api-service` | External gateway used by UI clients | Active |

---

## Data Platform

Monstrino uses **PostgreSQL** with several schemas separating different pipelines.

### Database Layout

| Schema | Purpose |
|------|------|
| core | Canonical domain data |
| catalog | Structured catalog data |
| ingest | Raw ingestion pipeline |
| media | Media assets and variants |
| market | Marketplace price data |

This separation allows independent data pipelines while maintaining a clean domain model.

---

## Media Pipeline

Media assets go through several processing stages:

1. Media ingestion
2. Image normalization
3. Variant generation
4. Storage in object storage
5. Attachment to domain entities

Supported processing:

- Image resizing
- Format conversion
- Quality optimization
- Variant generation
- Metadata extraction

---

## Technology Stack

| Category | Technology |
|---|---|
| Backend | Python 3.12 / FastAPI |
| Data | PostgreSQL 16 |
| Messaging | Kafka *(planned)* |
| Infrastructure | Kubernetes |
| Storage | S3-compatible object storage |
| Containers | Docker |
| API Contracts | OpenAPI / Pydantic |
| Package Management | Poetry |
| Build | GNU Make |

---

## Infrastructure

Monstrino is designed to run on **Kubernetes**.

```
UI
 │
 ▼
Public API Service
 │
 ├── Catalog Services
 ├── Media Services
 ├── Market Services
 └── LLM Services
```

All internal services are accessible only inside the cluster.

---

## Development Principles

The project follows several engineering principles:

- Domain Driven Design (DDD)
- Microservice architecture
- Strong API contracts
- Event-driven communication
- Idempotent processing pipelines
- Schema separation for data pipelines

---

## Repository Structure

```
monstrino/
│
├── services/                   # Independently deployable microservices
│   ├── acquisition/            # Data acquisition services
│   ├── catalog/                # Catalog pipeline services
│   ├── media/                  # Media processing services
│   ├── market/                 # Market data services
│   ├── auth/                   # Authentication service
│   ├── platform/               # Platform utilities
│   └── user/                   # User management service
│
├── packages/                   # Shared internal Python packages
│   ├── monstrino-api/          # Shared API utilities
│   ├── monstrino-contracts/    # Pydantic contracts / schemas
│   ├── monstrino-core/         # Core domain logic
│   ├── monstrino-infra/        # Infrastructure helpers
│   ├── monstrino-models/       # Database models
│   ├── monstrino-repositories/ # Repository layer
│   └── monstrino-testing/      # Shared test utilities
│
├── monstrino-configurations/   # Infrastructure configuration
│   ├── db/                     # SQL migration scripts
│   └── kubernetes/             # Kubernetes manifests
│
├── broker/                     # Message broker setup
│   └── docker/
│
├── monstrino-docs/             # Docusaurus documentation site
├── monstrino-ui/               # Frontend application
├── Makefiles/                  # Shared Makefile targets
└── README.md
```

---

## Example API

Example request:

```
GET /releases/{release_slug}
```

Example response:

```json
{
  "name": "Draculaura Creepover Party",
  "year": 2022,
  "series": "Creepover Party"
}
```

---

## Getting Started

### Prerequisites

| Tool | Minimum Version | Notes |
|---|---|---|
| Python | 3.12 | Required for all services |
| Poetry | 1.8+ | Dependency management |
| Docker | 24+ | Container runtime |
| Docker Compose | v2 | Local orchestration |
| Make | 4.0+ | Build automation |
| PostgreSQL | 16 | Can be run via Docker |

### Local Setup

**1. Clone the repository**

```bash
git clone https://github.com/your-org/monstrino.git
cd monstrino
```

**2. Start infrastructure dependencies**

```bash
# Start PostgreSQL and broker
docker compose -f broker/docker/docker-compose.yaml up -d
```

**3. Apply database migrations**

```bash
# Run SQL scripts against your PostgreSQL instance
psql -U postgres -d monstrino -f monstrino-configurations/db/init.sql
```

**4. Install and run a service**

```bash
cd services/catalog/catalog-api-service
make install
make run
```

**5. (Optional) Build documentation locally**

```bash
cd monstrino-docs
make run
```

> [!TIP]
> Each service has its own `Makefile` with `install`, `run`, `test` and `lint` targets. Run `make help` inside any service directory to see all available commands.

---

## Roadmap

- [x] Distributed catalog ingestion pipeline
- [x] Media processing and rehosting pipeline
- [x] Market price collection
- [x] PostgreSQL schema separation per domain
- [x] OpenAPI contracts
- [ ] Kafka event streaming between services
- [ ] LLM gateway for metadata enrichment
- [ ] Automated media segmentation
- [ ] Advanced price analytics dashboard
- [ ] Public developer API portal

---

## Contributing

Contributions are welcome. Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'feat: add my feature'`
4. Push the branch: `git push origin feature/my-feature`
5. Open a Pull Request

Please make sure all tests pass before submitting a PR:

```bash
make test
```

---

## License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for details.