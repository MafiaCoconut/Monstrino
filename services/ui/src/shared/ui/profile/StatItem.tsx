import { Box, Typography, ButtonBase } from '@mui/material';

type StatItemProps = {
  value: number | string;
  label: string;
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
  'aria-label'?: string;
};

export const StatItem = ({
  value,
  label,
  onClick,
  selected = false,
  disabled,
  ...rest
}: StatItemProps) => (
  <ButtonBase
    focusRipple
    onClick={onClick}
    disabled={disabled}
    {...rest}
    sx={{
      width: '100%',
      display: 'block',
      borderRadius: 2,
      p: 1.5,
      textAlign: 'center',
      transition: (theme) =>
        theme.transitions.create(['box-shadow', 'transform'], { duration: 150 }),
      boxShadow: selected ? '0 0 0 3px rgba(25,118,210,0.35)' : 'none',
      '&:hover':{
        transform: 'translateY(-1px)',
        boxShadow: '0 0 12px 2px rgba(25,118,210,0.25)',
      },
      '&.Mui-focusVisible': {
        boxShadow: '0 0 0 3px rgba(25,118,210,0.6)',
      },
      '&:active': { transform: 'translateY(0)' },
      '@keyframes glow': {
        '0%': { boxShadow: '0 0 0 0 rgba(25,118,210,0.0)' },
        '50%': { boxShadow: '0 0 14px 3px rgba(25,118,210,0.45)' },
        '100%': { boxShadow: '0 0 0 0 rgba(25,118,210,0.0)' },
      },
      ...(selected && { animation: 'glow 1.2s ease-in-out infinite' }),
    }}
  >
    <Box>
      <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
        {value}
      </Typography>
      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        {label}
      </Typography>
    </Box>
  </ButtonBase>
);
