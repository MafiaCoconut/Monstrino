# UI Next Architecture

## Goal
This document defines where code lives in `ui-next/src` and how layers can depend on each other.

## Layers
- `src/app`: Next.js routes, layouts, metadata, providers composition.
- `src/widgets`: composed UI blocks for pages (catalog panels, headers, market sections, navigation blocks).
- `src/cards`: reusable card-level UI units (character/pet/release/series cards).
- `src/features`: user actions and interaction logic (search, sorting, favorites, etc.).
- `src/entities`: domain models and domain-focused UI/logic.
- `src/shared`: cross-cutting utilities and primitives (router, api client, theme, base ui helpers).
- `src/release-hub`: legacy domain package; keep domain-specific models/pages here until migrated.

## Import Aliases
- `@/*` -> `src/*`
- `@cards/*` -> `src/cards/*`
- `@widgets/*` -> `src/widgets/*`
- `@features/*` -> `src/features/*`
- `@entities/*` -> `src/entities/*`
- `@shared/*` -> `src/shared/*`

## Dependency Direction
- `app` can import from any lower layer.
- `widgets` can import from `features`, `cards`, `entities`, `shared`.
- `features` can import from `entities`, `shared`.
- `cards` can import from `entities`, `shared`.
- `entities` can import only from `shared`.
- `shared` must not import from upper layers.

## Placement Rules
- Put page-only composition in `app`/route modules.
- Put reusable page sections in `widgets`.
- Put card variants and their local exports in `cards/<card-name>`.
- Put domain types and mapping logic in `entities` (or `release-hub/entities` for legacy domain).
- Put generic ui primitives in `shared/ui`.
- Keep one `index.ts` barrel per public folder; import from barrel when stable API exists.

## File Conventions
- Folder format: `kebab-case`.
- React component: `PascalCase.tsx`.
- Types/constants local to component: `types.ts` / `constants.ts` when needed.
- Public exports:
  - `cards/<name>/index.ts`
  - `widgets/<name>/index.ts`

## Migration Rules for Legacy `release-hub`
- New reusable components must go to `cards`, `widgets`, or `shared`.
- `release-hub` may consume new layers, but new shared code should not be added to `release-hub/components`.
- When moving a component:
  - move file to target layer,
  - update imports to alias paths,
  - expose through target `index.ts`.
