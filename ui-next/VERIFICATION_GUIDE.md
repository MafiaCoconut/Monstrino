# Monstrino UI-Next - Local Verification Guide

Quick guide to verify the SEO & ISR refactor locally.

## Prerequisites

```bash
cd /home/coconut/Projects/monstrino-ui-branch/Monstrino/ui-next
```

## 1. Install Dependencies (if needed)

```bash
npm install
```

## 2. Set Environment Variables

Create `.env.local` (or `.env`) in `ui-next/`:

```bash
# Required for SEO
SITE_URL=http://localhost:3000

# Required for revalidation API
REVALIDATE_SECRET=test-secret-123

# Backend API (if using real data)
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

## 3. Build the Application

```bash
npm run build
```

**Expected:** Build completes successfully with no errors.

**Check for:**
- ✅ No TypeScript errors
- ✅ All pages pre-rendered
- ✅ Build output shows ISR routes with revalidate times

## 4. Start Production Server

```bash
npm run start
```

**Expected:** Server runs on `http://localhost:3000`

## 5. Manual Verification Tests

### Test 1: Detail Page Server HTML

**Release Detail:**
```bash
curl -s http://localhost:3000/catalog/r/1 | grep -A 2 '<h1'
```

**Expected Output:**
- Should see `<h1>` tag with release title
- Should be visible in raw HTML (not just in JS/React)

**Browser Test:**
1. Open: `http://localhost:3000/catalog/r/1`
2. Right-click → "View Page Source" (or Ctrl+U)
3. Search for `<h1>` → should find it in source
4. Search for `<meta name="description"` → should find it
5. Search for `<link rel="canonical"` → should find it with correct URL

### Test 2: Catalog Filter Pages (noindex, follow)

**Without filters (should index):**
```bash
curl -s http://localhost:3000/catalog/r | grep 'robots'
```
Expected: No robots meta tag (default indexable)

**With filters (should noindex, follow):**
```bash
curl -s http://localhost:3000/catalog/r?q=test | grep 'robots'
```
Expected: `<meta name="robots" content="noindex, follow">`

### Test 3: Robots.txt

```bash
curl http://localhost:3000/robots.txt
```

**Expected Output:**
```
User-agent: *
Allow: /
Disallow: /api/

Sitemap: http://localhost:3000/sitemap.xml
Host: http://localhost:3000
```

### Test 4: Sitemap

```bash
curl -s http://localhost:3000/sitemap.xml | head -n 30
```

**Expected:**
- Valid XML
- URLs for catalog pages
- URLs for detail pages (releases, series, characters)

### Test 5: On-Demand Revalidation API

```bash
curl -X POST http://localhost:3000/api/revalidate \
  -H "Authorization: Bearer test-secret-123" \
  -H "Content-Type: application/json" \
  -d '{"type": "release", "id": "1"}'
```

**Expected Response:**
```json
{"revalidated": true, "paths": ["/catalog/r/1"]}
```

**Test all entity types:**
```bash
# Series
curl -X POST http://localhost:3000/api/revalidate \
  -H "Authorization: Bearer test-secret-123" \
  -H "Content-Type: application/json" \
  -d '{"type": "series", "id": "1"}'

# Character
curl -X POST http://localhost:3000/api/revalidate \
  -H "Authorization: Bearer test-secret-123" \
  -H "Content-Type: application/json" \
  -d '{"type": "character", "id": "1"}'

# Pet
curl -X POST http://localhost:3000/api/revalidate \
  -H "Authorization: Bearer test-secret-123" \
  -H "Content-Type: application/json" \
  -d '{"type": "pet", "id": "1"}'
```

**Test with direct path:**
```bash
curl -X POST http://localhost:3000/api/revalidate \
  -H "Authorization: Bearer test-secret-123" \
  -H "Content-Type: application/json" \
  -d '{"path": "/catalog/r/1"}'
```

**Test unauthorized (should fail):**
```bash
curl -X POST http://localhost:3000/api/revalidate \
  -H "Authorization: Bearer wrong-secret" \
  -H "Content-Type: application/json" \
  -d '{"type": "release", "id": "1"}'
```
Expected: `{"revalidated": false, "message": "Unauthorized"}` with 401 status

## 6. Browser DevTools Verification

### Check Server-Rendered Content:

1. Open any detail page (e.g., `/catalog/r/1`)
2. Open DevTools (F12) → Network tab
3. Refresh page
4. Click on the document request (first item)
5. Go to "Response" tab
6. Should see HTML with:
   - `<h1>` with title
   - `<p>` with description
   - Meta tags in `<head>`

### Check ISR Cache Headers:

1. In Network tab, look at the document request headers
2. Check for `X-Nextjs-Cache` header:
   - `HIT` = served from cache
   - `MISS` = newly generated
   - `STALE` = stale, revalidating in background

## 7. Lighthouse SEO Check (Optional)

1. Open Chrome DevTools → Lighthouse tab
2. Select "SEO" only
3. Click "Analyze page load"
4. Should score 90+ with:
   - ✅ Document has a `<title>` element
   - ✅ Document has a meta description
   - ✅ Page has a logical heading structure
   - ✅ Links are crawlable

## Common Issues & Fixes

### Issue: "Missing environment variable"
**Fix:** Create `.env.local` with `SITE_URL=http://localhost:3000`

### Issue: "Module not found: @/shared/seo/DetailHeader"
**Fix:** Run `npm install` and rebuild

### Issue: "H1 not in source view"
**Fix:** Make sure you're viewing the HTML source (Ctrl+U), not just DevTools Elements tab (which shows client-rendered DOM)

### Issue: Revalidate API returns 401
**Fix:** Check `REVALIDATE_SECRET` env var matches your curl Authorization header

### Issue: Build fails with type errors
**Fix:** Check TypeScript version and run `npm run lint` for details

## Success Criteria Checklist

- [ ] Build completes without errors
- [ ] Server starts successfully
- [ ] Detail pages show H1 in HTML source
- [ ] Detail pages have meta description in source
- [ ] Detail pages have canonical link in source
- [ ] Catalog pages without query params are indexable
- [ ] Catalog pages with query params have `noindex, follow`
- [ ] `/robots.txt` is accessible and includes sitemap URL
- [ ] `/sitemap.xml` is accessible and contains entity URLs
- [ ] Revalidate API works for all entity types
- [ ] Revalidate API rejects unauthorized requests

## Next: Staging/Production Deployment

When deploying to staging or production:

1. Set `SITE_URL` to actual domain (e.g., `https://monstrino.com`)
2. Set `REVALIDATE_SECRET` to a secure random token
3. Configure backend webhooks to call revalidate API on content updates
4. Monitor ISR cache performance and adjust revalidate time if needed

---

For detailed changes, see [CHANGELOG_SEO_ISR.md](./CHANGELOG_SEO_ISR.md)
