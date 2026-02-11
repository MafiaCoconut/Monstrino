import React, { useState } from 'react';
import { Box, Collapse, IconButton, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  children,
  defaultOpen = true,
}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Box sx={{ mb: 2 }}>
      <Box
        onClick={() => setOpen(!open)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          py: 1,
          px: { xs: 0, md: 0 },
          borderRadius: 1,
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: { xs: 'rgba(255,255,255,0.03)', md: 'transparent' },
          },
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            color: 'text.primary',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            fontSize: { xs: '0.75rem', md: '0.65rem', lg: '0.7rem' },
          }}
        >
          {title}
        </Typography>
        <IconButton
          size="small"
          sx={{
            color: 'text.secondary',
            p: 0.5,
            transition: 'transform 0.2s ease',
          }}
        >
          {open ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
        </IconButton>
      </Box>
      <Collapse in={open}>
        <Box sx={{ pt: 1.5, pb: 0.5 }}>{children}</Box>
      </Collapse>
    </Box>
  );
};
