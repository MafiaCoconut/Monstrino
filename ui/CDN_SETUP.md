# CDN Configuration Guide

This guide explains how to configure a CDN for serving static assets from your Monstrino application.

## Why Use a CDN?

1. **Faster Load Times**: Assets delivered from edge locations closer to users
2. **Reduced Server Load**: Static assets offloaded from your main server
3. **Better Caching**: CDN provides robust caching infrastructure
4. **Bandwidth Savings**: Reduced bandwidth costs on your origin server
5. **Global Distribution**: Better performance for international users

## Popular CDN Options

### 1. Cloudflare (Recommended)

**Pros**: Free tier, easy setup, great performance
**Setup**: Point your domain to Cloudflare DNS

```yaml
# No vite.config changes needed - Cloudflare automatically caches static assets
```

### 2. AWS CloudFront

**Setup in vite.config.mts**:
```typescript
export default defineConfig({
  base: 'https://d1234567890abc.cloudfront.net/',
  build: {
    // ... other config
  },
});
```

### 3. Vercel CDN (Automatic)

If deploying to Vercel, CDN is automatically configured.

### 4. Custom CDN Setup

For custom CDN providers:

```typescript
// vite.config.mts
export default defineConfig({
  base: process.env.VITE_CDN_URL || '/',
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
});
```

## Deployment Strategy

### Option 1: Separate CDN Deployment

1. Build your project:
```bash
npm run build
```

2. Upload `dist/assets/` to CDN:
```bash
aws s3 sync dist/assets/ s3://your-cdn-bucket/assets/ --cache-control "max-age=31536000,immutable"
```

3. Upload `dist/index.html` and other files to your web server:
```bash
rsync -avz dist/ server:/var/www/monstrino/
```

### Option 2: CDN Pull (Easier)

1. Deploy entire `dist/` to your web server
2. Configure CDN to pull from your origin server
3. CDN automatically caches assets on first request

## nginx Configuration for CDN

```nginx
server {
    listen 80;
    server_name monstrino.com;

    root /var/www/monstrino;
    index index.html;

    # Cache headers for assets (CDN will respect these)
    location /assets/ {
        add_header Cache-Control "public, max-age=31536000, immutable";
        add_header Access-Control-Allow-Origin "*";
    }

    # No cache for HTML
    location ~* \.html$ {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Environment Variables

Add to `.env`:
```bash
# CDN Configuration
VITE_CDN_URL=https://cdn.monstrino.com

# Or use CloudFront
VITE_CDN_URL=https://d1234567890abc.cloudfront.net
```

Update `vite.config.mts`:
```typescript
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: env.VITE_CDN_URL || '/',
    // ... rest of config
  };
});
```

## Docker Build with CDN

Update your `Dockerfile`:
```dockerfile
# Build stage
FROM node:24-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Build with CDN URL from build arg
ARG CDN_URL
ENV VITE_CDN_URL=${CDN_URL}
RUN npm run build

# Production stage
FROM nginx:1.29-alpine
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
```

Build with CDN:
```bash
docker build --build-arg CDN_URL=https://cdn.monstrino.com -t monstrino-ui .
```

## Cloudflare Setup (Step by Step)

1. **Add your domain to Cloudflare**:
   - Sign up at cloudflare.com
   - Add your domain
   - Update nameservers at your registrar

2. **Enable caching**:
   - Go to Caching → Configuration
   - Set "Browser Cache TTL" to "Respect Existing Headers"

3. **Cache Rules** (Page Rules):
   ```
   URL: *monstrino.com/assets/*
   Cache Level: Cache Everything
   Edge Cache TTL: 1 month
   ```

4. **Purge cache** when deploying:
   ```bash
   curl -X POST "https://api.cloudflare.com/client/v4/zones/{zone_id}/purge_cache" \
     -H "Authorization: Bearer {api_token}" \
     -H "Content-Type: application/json" \
     --data '{"purge_everything":true}'
   ```

## Verifying CDN Works

### Check Response Headers

```bash
curl -I https://monstrino.com/assets/index-abc123.js
```

Look for CDN-specific headers:
- `CF-Cache-Status` (Cloudflare)
- `X-Cache` (CloudFront, Fastly)
- `Server: cloudflare` (Cloudflare)

### Performance Testing

Use webpagetest.org to test:
- Time to First Byte (TTFB)
- Asset load times from different locations

## Best Practices

1. **Use Versioned URLs**: Vite automatically adds hashes to filenames
2. **Immutable Assets**: Set `Cache-Control: immutable` for hashed assets
3. **Purge on Deploy**: Clear CDN cache when deploying new versions
4. **Monitor Costs**: Track CDN bandwidth usage
5. **Security**: Enable HTTPS-only, configure CORS properly
6. **Test Globally**: Use CDN testing tools to verify edge performance

## Cost Estimates (Monthly)

- **Cloudflare**: Free for basic, $20+ for Pro
- **AWS CloudFront**: ~$0.085/GB (first 10TB)
- **Fastly**: ~$0.12/GB
- **Bunny CDN**: ~$0.01/GB (cheapest)

## Recommended: Start with Cloudflare

1. Free tier is generous
2. Easy DNS setup
3. Automatic HTTPS
4. Great dashboard and analytics
5. Works out of the box with your existing deployment
