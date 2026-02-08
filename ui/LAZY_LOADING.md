# Lazy Loading Implementation Guide

This project includes utilities for implementing lazy loading with React Router to improve initial load times and code splitting.

## Usage

### Basic Lazy Loading

Instead of importing components directly:
```typescript
import HomePage from '@pages/home';
```

Use the `lazyLoad` helper:
```typescript
import { lazyLoad } from '@shared/ui/lazy-load';

const HomePage = lazyLoad(() => import('@pages/home'));
```

### Example in App.tsx

```typescript
import { Routes, Route } from 'react-router-dom';
import { lazyLoad } from '@shared/ui/lazy-load';

// Lazy load pages
const HomePage = lazyLoad(() => import('@pages/home'));
const ReleaseCatalog = lazyLoad(() => import('@pages/release-hub/Catalog/ReleaseCatalog'));
const ReleasePage = lazyLoad(() => import('@pages/release-hub/Index/release'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/catalog/r" element={<ReleaseCatalog />} />
      <Route path="/catalog/r/:internal_id" element={<ReleasePage />} />
    </Routes>
  );
}
```

### Custom Loading Fallback

```typescript
import { lazyLoad } from '@shared/ui/lazy-load';
import { Skeleton } from '@mui/material';

const CustomFallback = () => (
  <Skeleton variant="rectangular" width="100%" height={400} />
);

const MyPage = lazyLoad(
  () => import('@pages/my-page'),
  <CustomFallback />
);
```

### Preloading Components

For better UX, preload components on hover or focus:

```typescript
import { preloadComponent, lazyLoad } from '@shared/ui/lazy-load';

const AboutPage = lazyLoad(() => import('@pages/about'));
const aboutPageLoader = () => import('@pages/about');

// In your component
<Link
  to="/about"
  onMouseEnter={() => preloadComponent(aboutPageLoader)}
  onFocus={() => preloadComponent(aboutPageLoader)}
>
  About
</Link>
```

## Benefits

1. **Smaller Initial Bundle**: Only load code that's needed for the current route
2. **Faster Time to Interactive**: Users see content faster
3. **Better Performance**: Especially important for mobile users
4. **Automatic Code Splitting**: Vite automatically creates separate chunks for lazy-loaded components

## Migration Strategy

1. Start with the largest/heaviest pages first
2. Measure the impact using `npm run analyze`
3. Gradually convert other routes
4. Always test that routes still work correctly after conversion

## Bundle Analysis

Run `npm run analyze` to see the impact of lazy loading on your bundle sizes.
