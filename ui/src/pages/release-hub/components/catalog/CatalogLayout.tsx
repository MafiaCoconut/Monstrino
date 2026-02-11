import React from 'react';
import { Box } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';

interface CatalogLayoutProps {
  sidebar?: React.ReactNode;
  children: React.ReactNode;
  containerSx?: SxProps<Theme>;
}

export const CatalogLayout: React.FC<CatalogLayoutProps> = ({
  sidebar,
  children,
  containerSx,
}) => (
  <Box
    sx={[
      {
        display: 'flex',
        maxWidth: 1600,
        mx: 'auto',
        px: { xs: 1.5, sm: 2, md: 4 },
        pt: { xs: 1, sm: 1.5, md: 2 },
      },
      containerSx,
    ]}
  >
    {sidebar}
    {children}
  </Box>
);
