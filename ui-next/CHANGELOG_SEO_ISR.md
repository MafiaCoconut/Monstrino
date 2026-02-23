# Monstrino UI Next.js - SEO & ISR Refactor Changelog

**Date:** February 14, 2026  
**Scope:** `ui-next/` only  
**Objective:** Implement the Monstrino rendering algorithm with proper server-first SEO, ISR, and on-demand revalidation

---

## Summary of Changes

This refactor corrects the Next.js App Router implementation to ensure:
- ✅ Server-rendered H1 + description visible in HTML source
- ✅ ID-only routing (no slugs)
- ✅ Consistent ISR with 12-hour TTL across all detail pages
- ✅ On-demand revalidation support for all entity types
- ✅ Proper `noindex, follow` for catalog filter/search pages
- ✅ Server-first environment variable usage for SEO

---

## Changed Files

### 1. SEO Infrastructure

#### `src/shared/seo/siteUrl.ts`
**What changed:**
- Now prioritizes `SITE_URL` (server-only) over `NEXT_PUBLIC_SITE_URL`
- Added JSDoc comment explaining usage
- Maintains backward compatibility with `NEXT_PUBLIC_SITE_URL`

**Why:**
- Server-side SEO operations (canonical URLs, sitemaps, robots.txt) should use server environment variables
- Avoids exposing internal URLs to client bundles
- Follows Next.js best practices for server/client env separation

---

#### `src/shared/seo/catalogMetadata.ts`
**What changed:**
- Changed robots directive for filtered pages from `follow: false` to `follow: true`

**Why:**
- Query/filter pages should be `noindex, follow` (not `noindex, nofollow`)
- Allows search engines to discover content through filtered pages while not indexing the filter combinations
- Follows SEO best practices for faceted navigation

**Before:**
```typescript
robots: hasQuery ? { index: false, follow: false } : { index: true, follow: true }
```

**After:**
```typescript
robots: hasQuery ? { index: false, follow: true } : { index: true, follow: true }
```

---

#### `src/shared/seo/DetailHeader.tsx` *(NEW)*
**What added:**
- New server component that renders visible H1 + description
- Uses MUI components for consistent styling
- Renders in server HTML (visible in view-source)

**Why:**
- Previous Index components were client-only, preventing server-side content rendering
- Search engines need indexable content in server HTML
- Provides immediate visible content before client hydration
- Avoids deprecated "CSS hidden SEO content" pattern

---

### 2. Detail Pages - ISR Configuration

All detail pages updated with consistent ISR revalidation time:

#### Updated Files:
- `src/app/catalog/r/[internal_id]/page.tsx` (release)
- `src/app/catalog/c/[internal_id]/page.tsx` (character)
- `src/app/catalog/s/[internal_id]/page.tsx` (series)
- `src/app/catalog/p/[internal_id]/page.tsx` (pet)
- `src/app/(hub)/s/[id]/page.tsx` (hub series)
- `src/app/(hub)/p/[id]/page.tsx` (hub pet)

**What changed:**
1. Updated `export const revalidate = 43200` (12 hours, previously 21600 = 6 hours for some)
2. Added `DetailHeader` import and rendering
3. Placed `<DetailHeader>` before client component in JSX

**Why:**
- 12-hour TTL balances freshness vs. build load
- On-demand revalidation provides immediate updates when needed
- Server-rendered H1/description ensures SEO visibility
- Consistent ISR settings across all entity types

**Code pattern:**
```tsx
import { DetailHeader } from '@/shared/seo/DetailHeader';
export const revalidate = 43200;

// In component:
return (
  <>
    <StructuredData ... />
    <DetailDataHydrator ... />
    <DetailHeader title={seo.title} description={description} />
    <ClientComponent />
  </>
);
```

---

### 3. On-Demand Revalidation API

#### `src/app/api/revalidate/route.ts`
**What changed:**
- Added `'pet'` case to `buildPaths()` function

**Why:**
- Pet detail pages were not revalidatable via API
- Completes entity type coverage (release, series, character, pet)

**Added:**
```typescript
case 'pet':
  return [`/catalog/p/${id}`];
```

---

## Unchanged (Verified Correct)

### ✅ Robots & Sitemap
- `src/app/robots.ts` - Already correct, includes sitemap URL
- `src/app/sitemap.ts` - Already dynamic, fetches all entity IDs from API

### ✅ Route Structure
- All routes use ID-only pattern (`/catalog/r/[internal_id]`)
- No slug-based routing introduced
- Existing URL structure preserved

### ✅ Server/Client Boundaries
- `src/app/layout.tsx` - Server component
- `src/app/providers.tsx` - Client component with `'use client'`
- `src/app/ThemeRegistry.tsx` - Proper Emotion SSR setup
- Detail page components remain server components
- Interactive UI components properly marked with `'use client'`

### ✅ Base Catalog Pages
- `src/app/catalog/r/page.tsx` (releases)
- `src/app/catalog/c/page.tsx` (characters)
- `src/app/catalog/s/page.tsx` (series)
- `src/app/catalog/p/page.tsx` (pets)

All use `buildCatalogMetadata()` which now correctly applies `noindex, follow` to filtered pages.

---

## Removed / Deprecated Components

### Not Used (Can be removed in future cleanup)
- `src/shared/seo/SeoHeader.tsx` - Hidden SEO header (deprecated pattern)
- `src/shared/seo/DetailSeoContent.tsx` - Hidden SEO content (deprecated pattern)

**Note:** Only the `DetailSeoLink` type from `DetailSeoContent.tsx` is still imported in:
- `src/shared/seo/StructuredData.tsx`
- Several page.tsx files

**Recommendation:** Extract `DetailSeoLink` type to a shared types file, then remove both deprecated components.

---

## Environment Variables

### Required Server Variables
- `SITE_URL` - Base URL for canonical/sitemap/robots (preferred)
- `NEXT_PUBLIC_SITE_URL` - Fallback for backward compatibility

### Required API Variables (for on-demand revalidation)
- `REVALIDATE_SECRET` - Bearer token for `/api/revalidate` endpoint

### Example `.env.local`:
```bash
# Server-side base URL (preferred for SEO operations)
SITE_URL=https://monstrino.example.com

# Client-side fallback (optional if SITE_URL is set)
NEXT_PUBLIC_SITE_URL=https://monstrino.example.com

# Revalidation API secret
REVALIDATE_SECRET=your-secret-token-here

# Backend API URL (for data fetching)
NEXT_PUBLIC_BACKEND_URL=https://api.monstrino.example.com
```

---

## Verification Steps

### 1. Build Verification
```bash
cd ui-next
npm run build
```
Expected: Successful build with no errors.

### 2. Production Server Test
```bash
npm run start
```

### 3. SEO Verification

**Test a detail page** (e.g., `/catalog/r/123`):

1. **View Source** (Ctrl+U or right-click → View Page Source)
   - ✅ Should see `<title>` with correct title
   - ✅ Should see `<meta name="description">` with description
   - ✅ Should see `<link rel="canonical">` with correct URL
   - ✅ Should see `<h1>` tag with title text
   - ✅ Should see description paragraph text

2. **Check Metadata:**
   ```bash
   curl -s http://localhost:3000/catalog/r/123 | grep -E '<title|<h1|<meta name="description'
   ```

3. **Test Robots:**
   - Visit: `http://localhost:3000/robots.txt`
   - Should see: `Sitemap: https://your-domain/sitemap.xml`

4. **Test Sitemap:**
   - Visit: `http://localhost:3000/sitemap.xml`
   - Should see XML with all entity URLs

5. **Test Catalog Filter Pages:**
   - Visit: `http://localhost:3000/catalog/r?q=test`
   - View source → Should see: `<meta name="robots" content="noindex, follow">`

### 4. Revalidation API Test
```bash
curl -X POST http://localhost:3000/api/revalidate \
  -H "Authorization: Bearer YOUR_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"type": "release", "id": "123"}'
```
Expected response:
```json
{"revalidated": true, "paths": ["/catalog/r/123"]}
```

Test all types: `release`, `series`, `character`, `pet`

---

## Remaining Risks & TODOs

### Low Priority
1. **Type consolidation**: Extract `DetailSeoLink` type to `src/shared/types/seo.ts` and remove deprecated SEO components
2. **Index components refactor**: Consider making Index components server-compatible in future (complex, low priority)
3. **Error pages**: Verify `not-found.tsx` and error boundaries have proper metadata

### Monitor
1. **ISR cache performance**: Monitor 12-hour revalidation performance in production
2. **On-demand revalidation**: Set up backend webhooks to call revalidate API on content updates
3. **Build time**: Watch sitemap generation time as entity count grows (consider pagination or static pre-generation)

### Documentation
1. Add API documentation for `/api/revalidate` endpoint in developer docs
2. Document environment variable requirements in deployment guide

---

## Migration Impact

### Zero Downtime
- All changes are backward compatible
- Existing URLs continue to work
- No database migrations required

### Build Impact
- Initial build time may increase slightly due to ISR pre-rendering
- Subsequent builds benefit from 12-hour cache

### User Impact
- **Positive**: Faster initial page loads (server-rendered content)
- **Positive**: Better SEO visibility
- **Neutral**: Visual appearance unchanged (DetailHeader styled consistently)

---

## Next Steps

1. ✅ **Immediate**: Deploy to staging and verify all tests pass
2. ✅ **Before Production**: Set up `SITE_URL` and `REVALIDATE_SECRET` environment variables
3. ✅ **Post-Deploy**: Monitor ISR cache hit rates and revalidation API usage
4. **Future**: Implement backend webhooks to trigger on-demand revalidation

---

## References

- [Next.js ISR Documentation](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)
- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Faceted Navigation SEO](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)

---

**End of Changelog**
