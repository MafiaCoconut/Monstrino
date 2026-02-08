import React from 'react';
import { Outlet, useLocation, useSearchParams, Link } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  CssBaseline,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { Footer } from '../Layout/Footer';

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
// NAVIGATION ITEMS
// ============================================

const NAV_ITEMS = [
  { label: 'Releases', path: '/catalog/r' },
  { label: 'Characters', path: '/catalog/c' },
  { label: 'Pets', path: '/catalog/p' },
  { label: 'Series', path: '/catalog/s' },
];

// ============================================
// CATALOG HEADER COMPONENT
// ============================================

interface CatalogHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const CatalogHeader: React.FC<CatalogHeaderProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  const location = useLocation();
  
  // Determine active catalog for placeholder text
  const getSearchPlaceholder = () => {
    if (location.pathname.startsWith('/catalog/c')) return 'Search characters...';
    if (location.pathname.startsWith('/catalog/p')) return 'Search pets...';
    if (location.pathname.startsWith('/catalog/s')) return 'Search series...';
    return 'Search releases...';
  };

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <Box
      sx={{
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        backgroundColor: 'background.default',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <Box
        sx={{
          maxWidth: 1600,
          mx: 'auto',
          px: { xs: 2, md: 4 },
          py: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 3,
        }}
      >
        {/* Logo / Brand */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'text.primary',
              display: { xs: 'none', sm: 'block' },
              '&:hover': { color: 'text.primary' },
            }}
          >
            Monstrino
          </Typography>
        </Link>

        {/* Navigation */}
        <Box
          sx={{
            display: 'flex',
            gap: { xs: 1.5, md: 3 },
            flex: 1,
            justifyContent: { xs: 'flex-start', md: 'center' },
          }}
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{ textDecoration: 'none' }}
            >
              <Box
                sx={{
                  position: 'relative',
                  pb: 0.5,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: isActive(item.path) ? 'text.primary' : 'text.secondary',
                    fontWeight: isActive(item.path) ? 600 : 400,
                    fontSize: '0.9rem',
                    transition: 'color 0.2s ease',
                    '&:hover': {
                      color: 'text.primary',
                    },
                  }}
                >
                  {item.label}
                </Typography>
                {isActive(item.path) && (
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: -8,
                      left: 0,
                      right: 0,
                      height: 2,
                      backgroundColor: 'primary.main',
                      borderRadius: 1,
                    }}
                  />
                )}
              </Box>
            </Link>
          ))}
        </Box>

        {/* Search */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextField
            placeholder={getSearchPlaceholder()}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            size="small"
            sx={{
              width: { xs: 160, sm: 220, md: 280 },
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255,255,255,0.03)',
                '& fieldset': {
                  borderColor: 'rgba(255,255,255,0.08)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255,255,255,0.15)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary', fontSize: 18 }} />
                </InputAdornment>
              ),
            }}
          />
          {/* FUTURE: Scope toggle button will go here
          <Button size="small" disabled sx={{ minWidth: 'auto', px: 1 }}>
            Current
          </Button>
          */}
        </Box>
      </Box>
    </Box>
  );
};

// ============================================
// CATALOG LAYOUT (WRAPPER)
// ============================================

const CatalogLayout: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  const handleSearchChange = (value: string) => {
    if (value) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: 'background.default',
          color: 'text.primary',
        }}
      >
        <CatalogHeader
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
        <Outlet />
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default CatalogLayout;
