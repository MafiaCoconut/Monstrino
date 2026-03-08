# Monstrino

## Packages

### monstrino-core

Holds domain-level building blocks shared across services:

- Domain dataclasses and value objects
- Enums and constants
- Domain exceptions
- Abstract interfaces (ports)

### monstrino-models

Contains data persistence models:

- SQLAlchemy ORM models
- Database-related mappings and constraints
- Pydantic models of ORM models

### monstrino-repositories

Provides data access implementations:

- Base and CRUD repository implementations
- Repositories Interfaces
- Concrete repository classes
- Transaction and unit-of-work helpers

### monstrino-infra

Contains shared infrastructure components:

- HTTP, logging, and configuration utilities
- External service adapters
- Cross-service infrastructure helpers

### monstrino-contracts

Defines inter-service and API contracts:

- Versioned request/response schemas
- Command and event models
- Public data structures for service communication

### monstrino-api

Provides shared API-layer utilities:

- Common router helpers and middleware
- API error handling and response formats
- Authentication and request-scoped helpers

### monstrino-testing

Contains shared testing infrastructure:

- Common pytest fixtures
- Test utilities and helpers
- Shared test data builders
