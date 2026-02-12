import type { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import { mergeSx } from '@/shared/ui/mergeSx';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  sx?: SxProps<Theme>;
  titleSx?: SxProps<Theme>;
  subtitleSx?: SxProps<Theme>;
  endSlot?: ReactNode;
}

const SectionTitle = ({ title, subtitle, sx, titleSx, subtitleSx, endSlot }: SectionTitleProps) => (
  <Box
    sx={mergeSx(
      {
        display: 'flex',
        alignItems: { xs: 'flex-start', sm: 'center' },
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: { xs: 0.75, sm: 1 },
        mb: 2,
      },
      sx
    )}
  >
    <Typography
      sx={mergeSx(
        {
          fontWeight: 700,
          fontSize: { xs: '1.2rem', md: '1.35rem' },
        },
        titleSx
      )}
    >
      {title}
    </Typography>
    {subtitle ? (
      <Typography
        sx={mergeSx(
          {
            color: 'text.secondary',
            fontSize: '0.9rem',
          },
          subtitleSx
        )}
      >
        {subtitle}
      </Typography>
    ) : null}
    {endSlot}
  </Box>
);

export default SectionTitle;
