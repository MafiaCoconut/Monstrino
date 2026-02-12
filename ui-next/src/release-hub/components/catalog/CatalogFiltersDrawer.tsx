import React from 'react';
import { Drawer } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import { mergeSx } from '@/shared/ui/mergeSx';

interface CatalogFiltersDrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: { xs?: number | string; sm?: number | string };
  sx?: SxProps<Theme>;
}

export const CatalogFiltersDrawer: React.FC<CatalogFiltersDrawerProps> = ({
  open,
  onClose,
  children,
  width = { xs: '90%', sm: 380 },
  sx,
}) => (
  <Drawer
    anchor="left"
    open={open}
    onClose={onClose}
    sx={mergeSx(
      {
        display: { xs: 'block', md: 'none' },
        '& .MuiDrawer-paper': {
          width,
          maxWidth: '100%',
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
        },
        '& .MuiBackdrop-root': {
          backdropFilter: 'blur(4px)',
        },
      },
      sx
    )}
  >
    {children}
  </Drawer>
);
