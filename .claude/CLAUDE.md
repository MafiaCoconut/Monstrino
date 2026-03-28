# Monstrino — Claude Project Context

## Project Overview

**Monstrino** is a production-grade automated collector platform for the Monster High universe.
It continuously discovers, parses, enriches, and stores structured data about Monster High releases.

Official site: https://monstrino.com | Docs: https://documentation.monstrino.com

---

## Monorepo Structure

```
Monstrino/
├── services/                    # Microservices grouped by domain
│   ├── catalog/
│   │   ├── catalog-api-service/ # REST API for release catalog (port 8003)
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
├── packages/                    # Shared internal packages (installed via uv/SSH git)
│   ├── monstrino-api/           # API base classes / response schemas
│   ├── monstrino-contracts/     # Kafka event contracts
│   ├── monstrino-core/          # Core utilities, base config
│   ├── monstrino-infra/         # Infrastructure helpers
│   ├── monstrino-models/        # SQLAlchemy models
│   ├── monstrino-repositories/  # Repository pattern implementations
│   └── monstrino-testing/       # Shared test fixtures/helpers
├── Makefiles/                   # Shared Makefile fragments
│   ├── common.mk                # ROOT_DIR discovery, shared vars
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

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Python 3.14, FastAPI, SQLAlchemy, Pydantic v2, Alembic |
| Frontend | Next.js, React, TypeScript, MUI |
| Database | PostgreSQL (asyncpg + psycopg3) |
| Messaging | Apache Kafka |
| Storage | MinIO |
| AI/ML | HuggingFace, OpenCV |
| Package manager | `uv` (Python), `npm` (JS) |
| Containers | Docker + Kubernetes (kubectl, Helm) |
| Registry | registry.monstrino.com |
| Observability | Prometheus, Grafana |
| Proxy | Traefik |
| Cloud | STACKIT |

---

## Service Architecture

Each Python service follows this internal layout:
```
src/
├── app/           # FastAPI app factory, routers
├── bootstrap/     # DI container setup
├── domain/        # Business logic, use cases, entities
├── infra/         # DB, Kafka, external clients
├── presentation/  # API handlers, schemas
└── main.py        # Entrypoint
```

Services depend on shared `packages/` installed as git SSH sources in `pyproject.toml`.

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
make deploy-catalog-importer-test   # deploy to test namespace
make deploy-catalog-importer-prod   # deploy to prod namespace
```

---

## Monorepo Conventions

- All shared Makefile logic lives in `Makefiles/` and is included via `include ../../../Makefiles/common.mk`
- `ROOT_DIR` is auto-detected by walking up from `SELF_DIR` until `Makefiles/` is found
- Internal packages are consumed via `uv` with SSH git sources pinned to git tags (`rev = "v0.1.x"`)
- In dev mode (`pyproject.dev.toml`), packages point to local paths instead of git
- Kubernetes namespaces: `monstrino-test`, `monstrino-prod`
- Docker registry: `registry.monstrino.com`

---

## Key Files

| File | Purpose |
|------|---------|
| `Makefiles/common.mk` | ROOT_DIR, shared vars for all services |
| `Makefiles/monstrino-packages.mk` | dev-mode-on/off, local dep management |
| `packages/*/pyproject.toml` | Package definitions |
| `monstrino-configurations/kubernetes/` | K8s manifests |
| `monstrino-docs/` | Docusaurus docs site |

---

## Development Notes

- Python requires `>=3.14`
- Services use `uv run --no-sync` to avoid auto-syncing during run
- `.env` files are loaded automatically by Makefile via `include .env`
- `ENV ?= dev` — default environment is dev
- Logging config: `src/infra/logging/logging_config.json`
- `pyproject.dev.toml` is git-ignored via `make git-lock` — never commit it directly
