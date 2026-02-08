import { lazy, Suspense, ComponentType } from 'react';
import { Box, CircularProgress } from '@mui/material';

/**
 * Default loading fallback component
 */
export const DefaultLoadingFallback = () => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '400px',
      width: '100%',
    }}
  >
    <CircularProgress />
  </Box>
);

/**
 * HOC for lazy loading components with custom loading fallback
 * @param importFunc - Dynamic import function
 * @param fallback - Optional custom loading component
 * @returns Lazy loaded component wrapped in Suspense
 */
export function lazyLoad<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback: React.ReactNode = <DefaultLoadingFallback />
) {
  const LazyComponent = lazy(importFunc);

  return (props: React.ComponentProps<T>) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
}

/**
 * Preload a lazy component for better UX
 * Usage: Call this function on hover or focus to preload the component
 */
export function preloadComponent<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
) {
  return importFunc();
}
