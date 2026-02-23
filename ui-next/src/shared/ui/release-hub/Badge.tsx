import type { ReactNode } from 'react';
import { Chip } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import { mergeSx } from '@/shared/ui/mergeSx';

export type BadgeVariant = 'default' | 'secondary' | 'outline';

interface BadgeProps {
  variant?: BadgeVariant;
  children?: ReactNode;
  variantSx: Record<BadgeVariant, SxProps<Theme>>;
  baseSx?: SxProps<Theme>;
  sx?: SxProps<Theme>;
}

const Badge = ({ variant = 'default', children, variantSx, baseSx, sx }: BadgeProps) => (
  <Chip
    label={children}
    sx={mergeSx(baseSx, variantSx[variant], sx)}
  />
);

export default Badge;
