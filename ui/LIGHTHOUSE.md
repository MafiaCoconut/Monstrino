# Lighthouse CI Configuration

Lighthouse CI is configured to automatically audit performance on every build.

## Running Lighthouse CI Locally

### Step 1: Build the project

```bash
npm run build
```

### Step 2: Run Lighthouse CI

```bash
npx lhci autorun
```

This will:
1. Start a preview server
2. Run Lighthouse audits 3 times
3. Assert performance thresholds
4. Generate a report

## Performance Thresholds

Current thresholds (can be adjusted in `lighthouserc.json`):

- **Performance**: ≥ 85% (warning)
- **Accessibility**: ≥ 90% (error)
- **Best Practices**: ≥ 90% (warning)
- **SEO**: ≥ 90% (warning)

### Core Web Vitals

- **First Contentful Paint (FCP)**: ≤ 2s
- **Largest Contentful Paint (LCP)**: ≤ 2.5s
- **Cumulative Layout Shift (CLS)**: ≤ 0.1
- **Total Blocking Time (TBT)**: ≤ 300ms

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Lighthouse CI
on: [push, pull_request]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Build project
        run: npm run build

      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli
          lhci autorun
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

### GitLab CI Example

```yaml
lighthouse:
  stage: test
  image: node:20
  script:
    - npm ci
    - npm run build
    - npm install -g @lhci/cli
    - lhci autorun
  artifacts:
    paths:
      - .lighthouseci/
```

## Viewing Reports

After running LHCI, reports are saved to:
- `.lighthouseci/` directory (local)
- Temporary public storage (if configured)
- Lighthouse CI Server (if self-hosted)

## Custom Configuration

Edit `lighthouserc.json` to:

1. **Change URLs to audit**:
```json
"url": [
  "http://localhost:4173/",
  "http://localhost:4173/catalog/r",
  "http://localhost:4173/catalog/c"
]
```

2. **Adjust thresholds**:
```json
"assertions": {
  "categories:performance": ["warn", { "minScore": 0.90 }]
}
```

3. **Change device preset**:
```json
"settings": {
  "preset": "mobile"  // or "desktop"
}
```

4. **Custom throttling** (for slower networks):
```json
"throttling": {
  "rttMs": 150,
  "throughputKbps": 1638,
  "cpuSlowdownMultiplier": 4
}
```

## Recommended Scripts

Add to `package.json`:

```json
{
  "scripts": {
    "lighthouse": "lhci autorun",
    "lighthouse:mobile": "lhci autorun --preset=mobile"
  }
}
```

## Tips for Better Scores

1. **Performance**:
   - Use lazy loading for routes and images
   - Enable code splitting (already configured)
   - Minimize JavaScript bundle size
   - Use PWA features for caching

2. **Accessibility**:
   - Use semantic HTML
   - Add alt text to images
   - Ensure sufficient color contrast
   - Make interactive elements keyboard accessible

3. **Best Practices**:
   - Use HTTPS in production
   - Avoid console errors
   - Use modern image formats (WebP)
   - Implement CSP headers

4. **SEO**:
   - Add meta descriptions
   - Use descriptive page titles
   - Implement structured data
   - Ensure mobile-friendly design

## Monitoring Over Time

Consider setting up a Lighthouse Server for historical tracking:
- https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/server.md
