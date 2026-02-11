import React from 'react';
import { Box, Typography } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  link?: string;
}

interface ReleaseBreadcrumbProps {
  items: BreadcrumbItem[];
  colors?: {
    bg?: string;
    textPrimary?: string;
    textSecondary?: string;
    textMuted?: string;
    background?: string;
    foreground?: string;
    mutedForeground?: string;
  };
}

export const ReleaseBreadcrumb: React.FC<ReleaseBreadcrumbProps> = ({ items, colors = {} }) => {
  const navigate = useNavigate();
  const textPrimary = colors.textPrimary || colors.foreground || 'hsl(0, 0%, 100%)';
  const textSecondary = colors.textSecondary || colors.mutedForeground || 'hsl(0, 0%, 65%)';
  const textMuted = colors.textMuted || colors.mutedForeground || 'hsl(0, 0%, 65%)';

  const handleClick = (item: BreadcrumbItem, index: number) => {
    if (item.link && index < items.length - 1) {
      navigate(item.link);
    }
  };

  return (
    <Box
      component="nav"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: { xs: 0.5, md: 1 },
        py: { xs: 0.5, md: 0.75 },
        flexWrap: 'wrap',
        marginBottom: { xs: '0.25rem', md: '0.5rem' },
        fontSize: { xs: '0.875rem', md: '0.875rem' },
        position: colors.bg ? 'sticky' : 'relative',
        top: colors.bg ? { xs: 46, sm: 56 } : 'auto',
        zIndex: colors.bg ? 50 : 'auto',
        backgroundColor: 'transparent',
      }}
    >
      {items.map((item, index, arr) => (
        <React.Fragment key={item.label}>
          <Typography
            onClick={() => handleClick(item, index)}
            sx={{
              fontSize: { xs: 14, md: 14 },
              color: index === arr.length - 1 ? textPrimary : textSecondary,
              cursor: index === arr.length - 1 || !item.link ? 'default' : 'pointer',
              '&:hover': (index !== arr.length - 1 && item.link) ? { color: textPrimary, transition: 'color 0.2s' } : {},
              wordBreak: 'break-word',
            }}
          >
            {item.label}
          </Typography>
          {index < arr.length - 1 && (
            <ChevronRight sx={{ fontSize: { xs: 16, md: 16 }, color: textMuted }} />
          )}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default ReleaseBreadcrumb;
