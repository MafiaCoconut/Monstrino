import type { ReactNode } from 'react';
import { Chip } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';

export type BadgeVariant = 'default' | 'secondary' | 'outline';

interface BadgeProps {
  variant?: BadgeVariant;
  children?: ReactNode;
  variantSx: Record<BadgeVariant, SxProps<Theme>>;
  baseSx?: SxProps<Theme>;
  sx?: SxProps<Theme>;
}

const mergeSx = (...items: Array<SxProps<Theme> | undefined>): SxProps<Theme> => {
  const resolved: SxProps<Theme>[] = [];
  items.forEach((item) => {
    if (!item) return;
    if (Array.isArray(item)) {
      resolved.push(...item);
    } else {
      resolved.push(item);
    }
  });
  if (resolved.length === 0) return {};
  return resolved.length === 1 ? resolved[0] : resolved;
};

const Badge = ({ variant = 'default', children, variantSx, baseSx, sx }: BadgeProps) => (
  <Chip
    label={children}
    sx={mergeSx(baseSx, variantSx[variant], sx)}
  />
);

export default Badge;
