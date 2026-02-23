import React from 'react';
import { Box } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import { mergeSx } from '@/shared/ui/mergeSx';

interface CatalogPageProps {
  children: React.ReactNode;
  minHeight?: number | string;
  sx?: SxProps<Theme>;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  children,
  minHeight,
  sx,
}) => (
  <Box
    sx={mergeSx(
      {
        backgroundColor: '#0B0D11',
        backgroundImage:
          'radial-gradient(900px 600px at 15% 0%, rgba(64, 160, 255, 0.16), transparent 60%), radial-gradient(900px 700px at 90% 10%, rgba(255, 120, 200, 0.12), transparent 65%), linear-gradient(180deg, #0B0D11 0%, #121622 100%)',
        ...(minHeight ? { minHeight } : {}),
      },
      sx
    )}
  >
    {children}
  </Box>
);
