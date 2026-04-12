# Monstrino — Claude Project Context

## Project Overview

**Monstrino** is a production-grade automated collector platform for the Monster High universe.
It continuously discovers, parses, enriches, and stores structured data about Monster High releases
from multiple external sources (Mattel, Shopify, Fandom Wiki, etc.).

Platform concerns: Catalog Acquisition → AI Enrichment → Import → Media Processing → API Delivery

Official site: <https://monstrino.com> | Docs: <https://documentation.monstrino.com>

---

## Monorepo Structure

```text
Monstrino/
├── services/                    # Microservices grouped by domain
│   ├── catalog/
│   │   ├── catalog-api-service/     # REST API for release catalog (port 8003)
│   │   └── catalog-importer/
│   ├── media/
│   │   ├── media-normalization/
│   │   └── media-rehosting-service/
│   ├── platform/
│   │   ├── ai-orchestrator/
│   │   ├── backgroud-removal-service/
│   │   └── public-api-service/
│   ├── monstrino-acquisition/
│   │   ├── catalog-collector/
│   │   └── market-price-collector/
│   ├── support/
│   │   ├── default-data-setter/
│   │   ├── template-service/
│   │   └── testing-service/
│   └── user/
│       └── users-service/
├── packages/                    # Shared internal Python packages (git SSH sources)
│   ├── monstrino-core/          # Domain foundation: value objects, enums, ports, UoW interface
│   ├── monstrino-models/        # SQLAlchemy ORM models + Pydantic DTOs + AutoMapper
│   ├── monstrino-repositories/  # CRUD base, domain repo interfaces/implementations, UoW
│   ├── monstrino-api/           # FastAPI exception handlers, RequestContextMiddleware, ResponseFactory
│   ├── monstrino-contracts/     # Versioned cross-service request/response schemas (v1/)
│   ├── monstrino-infra/         # HttpClient (circuit breaker), DBSettings, SchedulerAdapter, LLM gateway
│   └── monstrino-testing/       # Pytest plugin, fixtures, real DB fixtures, deterministic UUID builder
├── Makefiles/                   # Shared Makefile fragments
│   ├── common.mk                # ROOT_DIR auto-discovery, shared vars
│   ├── docker.mk
│   ├── monstrino-packages.mk    # dev-mode-on/off, dep management
│   ├── pytest.mk
│   └── run.mk
├── monstrino-docs/              # Docusaurus documentation site
├── monstrino-configurations/    # Kubernetes manifests, registry config
├── monstrino-ui/                # Next.js frontend
└── broker/                      # Kafka broker configuration
```

---

## Package Dependency Hierarchy

Strict layering — each package may only import from packages below it:

```text
monstrino-testing  (cross-cuts, imports all for fixtures — exception to the rule)
      ↑
monstrino-api   monstrino-infra          (leaf packages, import core+models+repos)
      ↑               ↑
monstrino-repositories  monstrino-contracts  (import core+models)
      ↑
monstrino-models                         (imports core)
      ↑
monstrino-core                           (root — no internal imports)
```

Never import a package that is above the current package in the hierarchy.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Python 3.14, FastAPI, SQLAlchemy, Pydantic v2, Alembic |
| Frontend | Next.js, React, TypeScript, MUI |
| Database | PostgreSQL with schema separation (asyncpg + psycopg3) |
| Messaging | Apache Kafka (event-driven pipelines) |
| Storage | MinIO (S3-compatible) |
| AI/ML | HuggingFace, OpenCV, LLM gateway in monstrino-infra |
| Package manager | `uv` (Python), `npm` (JS) |
| Containers | Docker + Kubernetes |
| Registry | registry.monstrino.com |
| Observability | Prometheus, Grafana |
| Proxy | Traefik + Cloudflare ingress |
| Cloud | STACKIT |

---

## Clean Architecture Layers (every Python service)

Each service strictly follows this internal layout:

```text
src/
├── domain/        # Entities, value objects, use case interfaces — NO external deps
├── app/           # Use case implementations — orchestrates domain, calls ports
├── infra/         # DB sessions, Kafka producers/consumers, HTTP clients, schedulers
├── presentation/  # FastAPI routers, request/response schemas, error mapping
├── bootstrap/     # DI container: wires everything together
└── main.py        # Entrypoint — creates app via bootstrap
```

**Dependency rule:** domain ← app ← infra ← presentation ← bootstrap (outer imports inner, never reverse)

---

## Repository Pattern Layers

```text
CrudRepoInterface        (monstrino-core: abstract CRUD contract)
       ↑
Domain Repo Interfaces   (monstrino-core: domain-specific read/write contracts)
       ↑
CrudDelegationMixin      (monstrino-repositories: delegates to CrudRepo)
       ↑
CrudRepo                 (monstrino-repositories: generic typed implementation)
       ↑
SqlAlchemyBaseRepo       (monstrino-repositories: session + model binding)
```

---

## Database Schema Separation

PostgreSQL uses named schemas per domain — services only access their own schema:

| Schema | Owner | Contents |
|--------|-------|---------|
| `catalog` | catalog services | releases, series, characters, pets, reference data |
| `ingest` | acquisition services | raw scraped data, source tracking, claim records |
| `media` | media services | assets, variants, moderation state |
| `market` | market services | listings, prices, platforms |
| `ai` | AI services | ai_jobs, modality tables, processing logs |
| `admin` | admin services | alerts, review queues |
| `core` | shared | users, sessions, shared reference tables |

---

## API Response Envelope

All internal services return a unified envelope:

```json
{
  "success": true,
  "data": { ... },
  "error": null,
  "meta": { "request_id": "...", "version": "v1" }
}
```

Versioned routes: `/api/v1/...` — never break existing response shapes, use new versions for breaking changes.

---

## Pipeline Overview

Monstrino processes data through staged pipelines:

1. **Source Discovery** → finds catalog sources (URLs, shops, listings)
2. **Content Collection** → scrapes raw product data
3. **Data Enrichment** → normalizes + enriches via scripts, AI as fallback
4. **AI Orchestration** → dispatches LLM jobs (characters, pets, series, content-type modalities)
5. **Catalog Import** → validates + inserts canonical releases into catalog schema
6. **Media Ingest** → downloads, normalizes, rehosts media assets
7. **Market Collection** → scrapes prices and listings from secondary market

---

## Common Commands

### Run a service (catalog-api-service example)

```bash
cd services/catalog/catalog-api-service
make run                    # local DB
make run-with-test-bd       # test DB
```

### Dependency management

```bash
make dev-mode-on            # switch to pyproject.dev.toml (local packages)
make dev-mode-off           # restore pyproject.toml
make dev-sync-hard          # full venv rebuild
uv sync                     # sync dependencies
```

### Tests

```bash
make pytest                 # quiet run
make pytest-with-logs       # verbose with logs
```

### Docker / Kubernetes

```bash
make build                  # docker build
make push-service           # build + push to registry
make deploy-*-test          # deploy to monstrino-test namespace
make deploy-*-prod          # deploy to monstrino-prod namespace
```

---

## Monorepo Conventions

- All shared Makefile logic lives in `Makefiles/` and is included via `include ../../../Makefiles/common.mk`
- `ROOT_DIR` is auto-detected by walking up from `SELF_DIR` until `Makefiles/` is found
- Internal packages consumed via `uv` with SSH git sources pinned to git tags (`rev = "v0.1.x"`)
- In dev mode (`pyproject.dev.toml`), packages point to local paths
- K8s namespaces: `monstrino-test`, `monstrino-prod`
- Docker registry: `registry.monstrino.com`
- `pyproject.dev.toml` is locked from git via `make git-lock` — never commit it

---

## Key Design Invariants

- **Scripts first, AI fallback**: enrichment scripts run first; AI kicks in only if scripts return no result
- **AI results always validated**: LLM output must pass validation before insertion
- **Catalog is master data**: canonical identity resolves conflicts from multiple sources
- **Services own their schema**: no cross-schema direct DB access — only through APIs
- **Strict package hierarchy**: never import a higher-level package (see hierarchy above)
- **Kafka contracts are versioned**: all events use `monstrino-contracts` schemas
- **Response shapes are stable**: never remove/rename fields in existing API versions
