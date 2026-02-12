'use client';

import React from 'react';
import { useLocation, useSearchParams } from '@/shared/router';
import {
  Box,
  CssBaseline,
  useMediaQuery,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from './Header';
import { Footer } from './Footer';

// ============================================
// SOURCE OF TRUTH - THEME
// ============================================

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0D0D0F',
      paper: '#16161A',
    },
    primary: {
      main: '#8B5CF6',
    },
    secondary: {
      main: '#D946EF',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#9CA3AF',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#6B7280',
          '&.Mui-checked': {
            color: '#8B5CF6',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
        },
      },
    },
  },
});

// ============================================
// SOURCE OF TRUTH - SHARED CONSTANTS
// ============================================

export const GENERATIONS = ['G1', 'G2', 'G3'] as const;
export type Generation = typeof GENERATIONS[number];

export const RELEASE_TYPES = [
  'Basic',
  'Signature',
  'Collector',
  'Skullector',
  'Playset',
  'Multipack',
  'Fashion Pack',
  'Vehicle',
  'SDCC Exclusive',
  'Creeproduction',
] as const;
export type ReleaseType = typeof RELEASE_TYPES[number];

export const SERIES_TYPES = [
  'Mainline',
  'Special',
  'Convention',
  'Reboot',
  'Collector',
] as const;
export type SeriesType = typeof SERIES_TYPES[number];

// ============================================
// CATALOG LAYOUT (WRAPPER)
// ============================================

const CatalogLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const isMobile = useMediaQuery(darkTheme.breakpoints.down('sm'));

  const handleSearchChange = (value: string) => {
    if (value) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  };

  const getSearchPlaceholder = () => {
    if (location.pathname.startsWith('/catalog/c')) return isMobile ? 'Characters...' : 'Search characters...';
    if (location.pathname.startsWith('/catalog/p')) return isMobile ? 'Pets...' : 'Search pets...';
    if (location.pathname.startsWith('/catalog/s')) return isMobile ? 'Series...' : 'Search series...';
    return isMobile ? 'Releases...' : 'Search releases...';
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: 'background.default',
          color: 'text.primary',
          width: '100%',
          overflowX: 'clip',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Header
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          searchPlaceholder={getSearchPlaceholder()}
        />
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
          }}
        >
          {children}
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default CatalogLayout;
