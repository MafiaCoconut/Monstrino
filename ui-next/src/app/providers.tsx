'use client';

import type { ReactNode } from 'react';
import ThemeRegistry from './ThemeRegistry';
import { QueryProvider } from './providers/QueryProvider';
import { AppThemeProvider } from './providers/ThemeProvider';
import { ErrorBoundary } from '@/shared/ui/error-boundary';
import { DemoBadge } from '@/shared/ui/demo-badge';
import '@/i18n';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeRegistry>
      <ErrorBoundary>
        <QueryProvider>
          <AppThemeProvider>
            {children}
            <DemoBadge />
          </AppThemeProvider>
        </QueryProvider>
      </ErrorBoundary>
    </ThemeRegistry>
  );
}
