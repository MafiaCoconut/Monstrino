# Release Hub Design Guide

This is a single-page guide derived from the current Release Hub pages and components.
Primary sources include `CharacterIndex.tsx`, `SeriesIndex.tsx`, `PetIndex.tsx`, `ReleaseIndex.tsx`, `ReleaseCatalog.tsx`, and reusable UI blocks in `src/cards`, `src/widgets`, and `src/shared/ui/release-hub`.

## 1) Theme Summary

- Mood: dark archive / collector catalog with subtle neon highlights.
- Contrast: high, with white text on near-black surfaces.
- Surfaces: soft borders, low-contrast fills, and gentle glow on hover.
- Imagery: clean white image wells on dark cards.

## 2) Source of Truth

Canonical tokens live in `src/pages/release-hub/designTokens.ts`.
Use `releaseHubTokens` as the single source of truth for palette, typography, spacing, radius, and shadows.

## 3) Color System

### Base and Surfaces

| Token | Value | Usage |
| --- | --- | --- |
| `colors.bg` | `#0B0D11` | Main page background base. |
| `colors.bgAlt` | `#121622` | Lower gradient stop. |
| `colors.bgDeep` | `#0A0A0A` | Dense sections (ReleaseIndex). |
| `colors.bgLight` | `#111111` | Raised dark panels. |
| `colors.surface` | `hsl(240, 5%, 8%)` | Cards, compact blocks. |
| `colors.surfaceAlt` | `hsl(240, 4%, 14%)` | Secondary surfaces. |
| `colors.surfaceMuted` | `rgba(255,255,255,0.03)` | Subtle fill for chips/sections. |
| `colors.borderSoft` | `rgba(255,255,255,0.08)` | Hairline borders. |
| `colors.border` | `hsl(240, 4%, 18%)` | Card borders. |

### Text

| Token | Value | Usage |
| --- | --- | --- |
| `colors.textPrimary` | `#FFFFFF` | Primary headings and key labels. |
| `colors.textSecondary` | `#9CA3AF` | Secondary text and captions. |
| `colors.textMuted` | `#6B7280` | Subtle metadata and separators. |
| `colors.textMutedAlt` | `hsl(240, 5%, 58%)` | Body text in cards and lists. |

### Accents

| Token | Value | Usage |
| --- | --- | --- |
| `colors.accentPink` | `#EC4899` | Primary highlight, rarity, hover glow. |
| `colors.accentPinkDark` | `#BE185D` | Hover/darker pink. |
| `colors.accentMagenta` | `#FF1493` | Brand punch accents. |
| `colors.accentPurple` | `#8B5CF6` | Primary secondary highlight. |
| `colors.accentViolet` | `#A855F7` | Alternative highlight. |
| `colors.accentLavender` | `#A78BFA` | Soft chip text. |
| `colors.accentCyan` | `#22D3EE` | Cool accent and badges. |
| `colors.accentCyanDeep` | `#06B6D4` | Deeper cyan highlight. |
| `colors.accentBlue` | `#3B82F6` | Status and info accents. |
| `colors.accentOrange` | `#F97316` | Rarity and warning accents. |
| `colors.accentGreen` | `#22C55E` | Positive statuses and demand. |

### Transparency Helpers

| Token | Value | Usage |
| --- | --- | --- |
| `transparency.white03` | `rgba(255,255,255,0.03)` | Soft fills. |
| `transparency.white06` | `rgba(255,255,255,0.06)` | Outline chips and chips background. |
| `transparency.white08` | `rgba(255,255,255,0.08)` | Hairline borders. |
| `transparency.pink20` | `rgba(236, 72, 153, 0.2)` | Pink pill backgrounds. |
| `transparency.purple20` | `rgba(139, 92, 246, 0.15)` | Purple tag backgrounds. |
| `transparency.cyan20` | `rgba(0, 212, 255, 0.2)` | Cyan badge fills. |

## 4) Backgrounds and Gradients

Main page background (used across CharacterIndex, SeriesIndex, PetIndex, ReleaseCatalog, ReleaseIndex):

```css
background-color: #0B0D11;
background-image: radial-gradient(900px 600px at 15% 0%, rgba(64, 160, 255, 0.16), transparent 60%),
  radial-gradient(900px 700px at 90% 10%, rgba(255, 120, 200, 0.12), transparent 65%),
  linear-gradient(180deg, #0B0D11 0%, #121622 100%);
```

Card glow presets:

- `shadows.hoverPink`: `0 8px 24px rgba(236, 72, 153, 0.15)`
- `shadows.hoverPurple`: `0 12px 40px rgba(139, 92, 246, 0.15)`

Brand gradients:

- Header wordmark: `linear-gradient(90deg, #ff7edb 0%, #9d4edd 100%)`
- Footer logo: `linear-gradient(135deg, #FF1493 0%, #00D4FF 100%)`

## 5) Typography

Primary stack:

- `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`

System fallback stack (used in PetIndex and SeriesIndex):

- `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`

Accent serif (used in ReleaseCardCharacter):

- `"Crimson Text", Georgia, serif`

Scale:

| Token | Size |
| --- | --- |
| `sizes.xs` | `0.75rem` |
| `sizes.sm` | `0.875rem` |
| `sizes.base` | `1rem` |
| `sizes.lg` | `1.125rem` |
| `sizes.xl` | `1.25rem` |
| `sizes.2xl` | `1.5rem` |
| `sizes.4xl` | `2.25rem` |
| `sizes.5xl` | `3rem` |
| `sizes.6xl` | `3.75rem` |

Weights:

| Token | Weight |
| --- | --- |
| `weights.normal` | `400` |
| `weights.medium` | `500` |
| `weights.semibold` | `600` |
| `weights.bold` | `700` |
| `weights.extrabold` | `800` |

Line heights:

| Token | Value |
| --- | --- |
| `lineHeights.tight` | `1.1` |
| `lineHeights.snug` | `1.375` |
| `lineHeights.normal` | `1.5` |
| `lineHeights.relaxed` | `1.625` |

## 6) Spacing and Radius

Spacing scale:

| Token | Value |
| --- | --- |
| `spacing.1` | `0.25rem` |
| `spacing.2` | `0.5rem` |
| `spacing.3` | `0.75rem` |
| `spacing.4` | `1rem` |
| `spacing.5` | `1.25rem` |
| `spacing.6` | `1.5rem` |
| `spacing.8` | `2rem` |
| `spacing.12` | `3rem` |
| `spacing.16` | `4rem` |
| `spacing.24` | `6rem` |

Radius:

| Token | Value |
| --- | --- |
| `radius.sm` | `0.375rem` |
| `radius.md` | `0.5rem` |
| `radius.lg` | `0.75rem` |
| `radius.xl` | `1rem` |
| `radius.pill` | `9999px` |

## 7) Motion and Interaction

- Hover lift: `translateY(-4px)` on cards.
- Transition duration: `0.2s` for transform, box-shadow, and border-color.
- Borders lighten or accent colors on hover (pink or purple).

## 8) Component Patterns

### Cards

- Dark surface with soft border (`borderSoft` or `border`).
- White image well for product shots.
- Optional top accent strip with gradient.
- Hover lift and glow (pink or purple shadow).

### Chips and Badges

- Use transparent or 20% accent fills with colored text.
- Keep heights compact (18px to 22px).

### Breadcrumbs

- Minimal chevrons, muted text for non-active items.
- Active item uses `textPrimary`.

### Filters (Catalog)

- Uppercase labels with letter spacing.
- Low-contrast hover fills (white 3%).

## 9) Example Usage

```ts
import { releaseHubTokens as t } from "./designTokens";

const cardStyle = {
  backgroundColor: t.colors.surface,
  border: `1px solid ${t.colors.border}`,
  borderRadius: t.radius.md,
  color: t.colors.textPrimary,
  boxShadow: t.shadows.card,
  transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: t.shadows.hoverPink,
    borderColor: `${t.colors.accentPink}80`,
  },
};
```

```ts
const pageStyle = {
  minHeight: "100vh",
  backgroundColor: t.colors.bg,
  backgroundImage: t.gradients.pageBg,
  color: t.colors.textPrimary,
  fontFamily: t.typography.fontFamily.primary,
};
```

## 10) Conventions

- Prefer consistent tokens over ad-hoc values.
- Keep imagery on white surfaces to maintain product clarity.
- Limit accent colors per view to 1 to 2 primary accents plus neutrals.
