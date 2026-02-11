import React from 'react';
import { Box, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';

interface CatalogHeaderProps {
  title: string;
  subtitle?: React.ReactNode;
  sx?: SxProps<Theme>;
  titleSx?: SxProps<Theme>;
  subtitleSx?: SxProps<Theme>;
}

export const CatalogHeader: React.FC<CatalogHeaderProps> = ({
  title,
  subtitle,
  sx,
  titleSx,
  subtitleSx,
}) => (
  <Box sx={[{ mb: { xs: 2, sm: 2.5, md: 3 } }, sx]}>
    <Typography
      variant="h4"
      sx={[
        {
          fontWeight: 700,
          letterSpacing: '-0.02em',
          mb: subtitle ? 0.5 : 0,
          fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.125rem' },
        },
        titleSx,
      ]}
    >
      {title}
    </Typography>
    {subtitle && (
      <Typography
        variant="body2"
        sx={[
          {
            color: 'text.secondary',
            fontSize: { xs: '0.8125rem', sm: '0.875rem' },
          },
          subtitleSx,
        ]}
      >
        {subtitle}
      </Typography>
    )}
  </Box>
);
