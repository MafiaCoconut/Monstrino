import React from 'react';
import {
  Box,
  Button,
  Chip,
  IconButton,
  Typography,
} from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';

interface CatalogFiltersShellProps {
  activeFilterCount: number;
  onClearAll?: () => void;
  children: React.ReactNode;
  height?: number | null;
  isMobile?: boolean;
  onClose?: () => void;
  title?: string;
  clearLabelDesktop?: string;
  clearLabelMobile?: string;
  width?: number | { md: number; lg: number };
  sx?: SxProps<Theme>;
}

export const CatalogFiltersShell: React.FC<CatalogFiltersShellProps> = ({
  activeFilterCount,
  onClearAll,
  children,
  height,
  isMobile = false,
  onClose,
  title = 'Filters',
  clearLabelDesktop = 'Clear All',
  clearLabelMobile = 'Clear all filters',
  width = { md: 240, lg: 260 },
  sx,
}) => {
  const showClear = Boolean(onClearAll && activeFilterCount > 0);

  return (
    <Box
      sx={[
        {
          width: isMobile ? '100%' : width,
          flexShrink: 0,
          borderRight: isMobile ? 'none' : '1px solid rgba(255,255,255,0.06)',
          p: isMobile ? 0 : { md: 2, lg: 3 },
          display: isMobile ? 'block' : { xs: 'none', md: 'block' },
          height: isMobile ? '100%' : height ? `${height}px` : 'auto',
          maxHeight: isMobile ? '100vh' : height ? `${height}px` : 'none',
          overflowY: 'auto',
          overflowX: 'hidden',
          backgroundColor: isMobile ? 'background.paper' : 'transparent',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'rgba(255,255,255,0.02)',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(255,255,255,0.15)',
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.25)',
            },
          },
        },
        sx,
      ]}
    >
      {isMobile ? (
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            backgroundColor: 'background.paper',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            px: 3,
            py: 2.5,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <FilterListIcon sx={{ color: 'primary.main', fontSize: '1.25rem' }} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontSize: '1.125rem',
                  letterSpacing: '-0.01em',
                }}
              >
                {title}
              </Typography>
              {activeFilterCount > 0 && (
                <Chip
                  label={activeFilterCount}
                  size="small"
                  sx={{
                    height: 22,
                    backgroundColor: 'primary.main',
                    color: 'white',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    px: 0.5,
                  }}
                />
              )}
            </Box>
            <IconButton
              onClick={onClose}
              size="small"
              sx={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
          {showClear && (
            <Button
              onClick={onClearAll}
              size="small"
              sx={{
                mt: 1.5,
                fontSize: '0.8125rem',
                color: 'text.secondary',
                textTransform: 'none',
                fontWeight: 500,
                px: 0,
                minWidth: 'auto',
                '&:hover': {
                  color: 'primary.main',
                  backgroundColor: 'transparent',
                },
              }}
            >
              {clearLabelMobile}
            </Button>
          )}
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: { md: 2, lg: 3 },
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              fontSize: { md: '0.8125rem', lg: '0.875rem' },
            }}
          >
            {title}
            {activeFilterCount > 0 && (
              <Chip
                label={activeFilterCount}
                size="small"
                sx={{
                  ml: 1,
                  height: { md: 18, lg: 20 },
                  backgroundColor: 'primary.main',
                  color: 'white',
                  fontSize: { md: '0.65rem', lg: '0.7rem' },
                }}
              />
            )}
          </Typography>
          {showClear && (
            <Button
              onClick={onClearAll}
              size="small"
              sx={{
                fontSize: { md: '0.65rem', lg: '0.7rem' },
                color: 'text.secondary',
                textTransform: 'none',
                p: { md: '2px 6px', lg: '4px 8px' },
                minWidth: 'auto',
                '&:hover': { color: 'primary.main' },
              }}
            >
              {clearLabelDesktop}
            </Button>
          )}
        </Box>
      )}

      <Box sx={{ px: isMobile ? 3 : 0, py: isMobile ? 2 : 0 }}>
        {children}
        {isMobile && <Box sx={{ height: 24 }} />}
      </Box>
    </Box>
  );
};
