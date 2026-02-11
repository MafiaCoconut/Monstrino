import type { ReactNode } from 'react';
import { Box } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';

interface SurfaceCardProps {
  children: ReactNode;
  borderColor?: string;
  sx?: SxProps<Theme>;
}

const DEFAULT_BORDER_COLOR = 'rgba(255,255,255,0.08)';

const mergeSx = (base: SxProps<Theme>, extra?: SxProps<Theme>): SxProps<Theme> => {
  if (!extra) return base;
  return Array.isArray(extra) ? [base, ...extra] : [base, extra];
};

const SurfaceCard = ({ children, borderColor = DEFAULT_BORDER_COLOR, sx }: SurfaceCardProps) => (
  <Box
    sx={mergeSx(
      {
        backgroundColor: 'background.paper',
        borderRadius: 2,
        border: `1px solid ${borderColor}`,
        p: { xs: 2, md: 3 },
      },
      sx
    )}
  >
    {children}
  </Box>
);

export default SurfaceCard;
