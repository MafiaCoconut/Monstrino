'use client';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { makeTheme } from '@/shared/theme/theme';
import { GlobalStyles } from '@/shared/theme/GlobalStyles';

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem('themeMode') as 'light' | 'dark' | null;
    if (stored) {
      setMode(stored);
    }
  }, []);

  const theme = useMemo(() => makeTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
}
