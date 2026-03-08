# Monstrino

Monstrino is an automated collector platform for the **Monster High
universe**.

The platform continuously discovers, parses, enriches and stores
information about Monster High releases from multiple sources and
exposes this data through a unified API and UI.

The goal of Monstrino is to create the **most complete structured
catalog of Monster High releases** while demonstrating production-grade
software architecture.

------------------------------------------------------------------------

# Project Goals

Monstrino is built to solve several problems that exist in the collector
ecosystem:

-   information about releases is scattered across many sources
-   prices and availability change constantly
-   images are hosted on unstable external sources
-   new releases appear frequently and require constant tracking

Monstrino solves this by building a **fully automated ingestion
platform**.

Key principles:

-   automatic discovery of new releases
-   structured canonical catalog
-   automatic media ingestion and normalization
-   market price tracking
-   scalable architecture

------------------------------------------------------------------------

# Key Features

### Automated Catalog Generation

The system automatically collects information about:

-   releases
-   characters
-   pets
-   series
-   release types
-   images
-   descriptions
-   metadata

Sources include collector sites, official stores and other public data
sources.

------------------------------------------------------------------------

### Media Ingestion Pipeline

External images are automatically:

1.  discovered
2.  downloaded
3.  normalized
4.  re-hosted
5.  stored in object storage

This ensures long-term availability of images even if the original
source disappears.

------------------------------------------------------------------------

### Market Data Collection

Monstrino tracks:

-   original MSRP prices
-   secondary market prices
-   regional availability

This allows collectors to see how the value of releases changes over
time.

------------------------------------------------------------------------

### AI Data Enrichment

AI models are used to:

-   extract structured information from unstructured descriptions
-   detect characters and pets
-   classify releases
-   validate parsed data

------------------------------------------------------------------------

# Architecture Overview

Monstrino follows a **microservice architecture**.

Each domain is isolated into its own services.

Core architectural principles:

-   Domain Driven Design
-   Event-Driven pipelines
-   Clean Architecture
-   CQRS-like separation between ingestion and catalog

------------------------------------------------------------------------

## High Level Architecture

Sources → Market Collectors → Catalog Pipelines → AI Enrichment →
Catalog Storage → API → UI

------------------------------------------------------------------------

# Core Domains

### Catalog

Canonical catalog of Monster High releases.

Stores:

-   releases
-   characters
-   pets
-   series
-   relationships between them

------------------------------------------------------------------------

### Media

Responsible for image ingestion and hosting.

Handles:

-   downloading images
-   metadata extraction
-   storage in object storage
-   media normalization

------------------------------------------------------------------------

### Market

Tracks market data such as:

-   new releases discovered on marketplaces
-   price changes
-   secondary market values

------------------------------------------------------------------------

### AI

AI services that perform:

-   content extraction
-   classification
-   enrichment
-   validation

------------------------------------------------------------------------

# Services

### Catalog

-   catalog-importer
-   catalog-data-enricher
-   release-catalog-service

### Media

-   media-rehosting-subscriber
-   media-rehosting-processor
-   media-normalizator
-   media-rehosting-service

### Market

-   market-release-discovery
-   market-price-collector

### AI

-   llm-gateway
-   ai-orchestrator

### Platform

-   api-gateway
-   auth-service

------------------------------------------------------------------------

# Technology Stack

### Backend

-   Python
-   FastAPI
-   SQLAlchemy
-   PostgreSQL

### Infrastructure

-   Kubernetes
-   Docker
-   Kafka
-   Traefik

### Storage

-   PostgreSQL
-   MinIO / S3

### AI

-   Ollama
-   LLM models
-   vision models

### Observability

-   Prometheus
-   Grafana

------------------------------------------------------------------------

# Repository Structure

monstrino/

docs/ → documentation services/ → microservices libs/ → shared libraries

    monstrino-core
    monstrino-models
    monstrino-contracts
    monstrino-repositories
    monstrino-infra

deploy/ → kubernetes manifests dev-notes/ → architecture notes adr/ →
architectural decisions

------------------------------------------------------------------------

# Development Environment

Typical environments:

-   local
-   test
-   prod

Each environment runs inside a separate Kubernetes namespace.

------------------------------------------------------------------------

# Running the Platform

Prerequisites:

-   Docker
-   Kubernetes
-   Make
-   Python 3.11+

Example workflow:

make build\
make push\
make deploy

------------------------------------------------------------------------

# Documentation

Project documentation is located in:

-   docs/
-   dev-notes/
-   adr/

Documentation includes:

-   architecture diagrams
-   pipelines
-   service documentation
-   design decisions

------------------------------------------------------------------------

# Design Principles

### Automation First

All catalog data should be collected automatically.

Manual work should be minimized.

------------------------------------------------------------------------

### Source Independence

Data from different sources must be normalized into a canonical schema.

------------------------------------------------------------------------

### Event Driven Pipelines

Data ingestion pipelines operate asynchronously using events.

------------------------------------------------------------------------

### Scalable Infrastructure

The platform is designed to scale horizontally.

------------------------------------------------------------------------

# Roadmap

Planned features:

-   full catalog coverage of Monster High releases
-   price history analytics
-   public developer API
-   advanced search
-   collector tools

------------------------------------------------------------------------

# Project Status

Monstrino is currently under active development.

The project serves both as:

-   a collector platform
-   a demonstration of advanced backend architecture