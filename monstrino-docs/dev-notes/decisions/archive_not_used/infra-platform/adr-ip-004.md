---
id: adr-ip-004
title: "ADR-IP-004: Standardize Python Tooling on uv"
sidebar_label: "IP-004: Python Tooling (uv)"
sidebar_position: 4
tags: [infra, tooling, python, uv, developer-experience]
---

# ADR-IP-004 — Standardize Python Tooling on `uv`

| Field     | Value                                                       |
| --------- | ----------------------------------------------------------- |
| **Status**  | Accepted                                                    |
| **Date**    | 2025-10-15                                                  |
| **Author**  | @monstrino-team                                             |
| **Tags**    | `#infra` `#tooling` `#python` `#developer-experience`     |

## Context

As Monstrino grew to 6+ shared packages and 10+ services, Python environment and dependency management became a recurring friction point:

- **Multiple tools in play** — Poetry was used for some packages, pip + venv for others, with occasional conda usage in experiments.
- **Slow dependency resolution** — Poetry's resolver was noticeably slow for projects with many internal dependencies.
- **Lock file inconsistencies** — different tools produce different lock file formats, complicating CI.
- **Onboarding friction** — new contributors had to install and configure multiple tools before writing code.

A unified tool was needed that handles virtual environments, dependency resolution, package building, and script execution in a single, fast binary.

:::info Why Now
The `uv` project (by Astral, creators of `ruff`) reached stability milestones that made it suitable for production use, offering 10-100x speed improvements over pip and Poetry.
:::

## Options Considered

### Option 1: Standardize on Poetry

Use Poetry consistently across all packages and services.

- **Pros:** Mature, well-documented, good monorepo plugin support.
- **Cons:** Slow dependency resolution (minutes for large dependency trees), heavy Python dependency itself, some compatibility issues with editable installs.

### Option 2: pip + pip-tools + venv

Manual virtual environment management with pip-compile for lock files.

- **Pros:** Standard Python tooling, no additional dependencies.
- **Cons:** No unified workflow, requires multiple tools, manual env creation, verbose commands.

### Option 3: PDM

Python Dependency Manager with PEP 582 support.

- **Pros:** Modern, PEP-compliant, fast.
- **Cons:** Smaller community, less ecosystem support than alternatives.

### Option 4: uv ✅

Rust-based Python package and project manager from Astral. Handles venvs, dependency resolution, installation, lock files, and script execution.

- **Pros:** 10-100x faster than pip, single binary, handles env + deps + build, PEP-compliant, growing rapidly, same team as `ruff`.
- **Cons:** Newer project (some edge cases), Rust-based (can't inspect source in Python), rapid development pace means occasional breaking changes.

## Decision

> Python package and environment management across all Monstrino services and packages must standardize on **`uv`**.

### Workflow Standardization

| Task                      | Command                                  |
| ------------------------- | ---------------------------------------- |
| Create virtual environment | `uv venv`                               |
| Install dependencies      | `uv sync`                               |
| Add a dependency          | `uv add <package>`                      |
| Add dev dependency        | `uv add --dev <package>`                |
| Lock dependencies         | `uv lock`                               |
| Run a script              | `uv run <script.py>`                    |
| Build a package           | `uv build`                              |
| Install editable package  | `uv pip install -e ../monstrino-core`   |

### Migration Path from Poetry

| Poetry Artifact       | uv Equivalent           |
| --------------------- | ----------------------- |
| `pyproject.toml`      | `pyproject.toml` (same) |
| `poetry.lock`         | `uv.lock`               |
| `poetry install`      | `uv sync`               |
| `poetry add`          | `uv add`                |
| `poetry run`          | `uv run`                |

### CI Integration

```yaml
# Example CI step
- name: Install uv
  run: curl -LsSf https://astral.sh/uv/install.sh | sh

- name: Install dependencies
  run: uv sync --frozen

- name: Run tests
  run: uv run pytest
```

## Consequences

### Positive

- **Speed** — dependency resolution and installation are 10-100x faster, significantly improving CI times and developer iteration.
- **Single tool** — one binary handles environments, dependencies, building, and execution.
- **Standard compliance** — fully PEP-compliant (`pyproject.toml`, standard wheel/sdist builds).
- **Consistency** — every package and service follows the same workflow.
- **Low resource usage** — Rust binary is faster and uses less memory than Python-based tools.

### Negative

- **Migration effort** — existing Poetry configurations need updating (one-time cost).
- **Learning curve** — team must learn new commands (mitigated by CLI similarity to pip/Poetry).
- **Ecosystem maturity** — some edge cases or integrations may not be fully supported yet.

### Risks

- Rapid development pace of `uv` means occasional breaking changes — pin `uv` version in CI and document upgrade procedures.
- If `uv` project is abandoned, `pyproject.toml` compatibility ensures easy migration to alternatives.

## Related Decisions

- [ADR-A-003](../architecture/adr-a-003.md) — Shared packages (packages are built and installed via `uv`)
- [ADR-IP-005](./adr-ip-005.md) — Docusaurus for documentation (part of the developer tooling)
