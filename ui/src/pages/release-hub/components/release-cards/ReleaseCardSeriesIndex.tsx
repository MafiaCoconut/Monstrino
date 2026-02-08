import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Chip } from '@mui/material';

// Design tokens matching SeriesIndex theme
const tokens = {
  colors: {
    background: 'hsl(240, 6%, 5%)',
    foreground: 'hsl(0, 0%, 98%)',
    card: 'hsl(240, 5%, 8%)',
    primary: 'hsl(270, 25%, 60%)',
    secondary: 'hsl(240, 4%, 14%)',
    mutedForeground: 'hsl(240, 5%, 58%)',
    border: 'hsl(240, 4%, 18%)',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
  },
  fontWeights: {
    semibold: 600,
  },
};

interface DollRelease {
  id: string | number;
  releaseId?: string | number;
  character: string;
  variant?: string;
  imageUrl?: string;
  rarity?: string;
  msrp?: string;
}

interface ReleaseCardSeriesIndexProps {
  doll: DollRelease;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

// Rarity badge styling helper
const getRarityStyle = (rarity: string): React.CSSProperties => {
  switch (rarity) {
    case 'Ultra Rare':
      return { backgroundColor: tokens.colors.primary, color: tokens.colors.foreground };
    case 'Rare':
      return { backgroundColor: `${tokens.colors.primary}33`, color: tokens.colors.primary };
    default:
      return { backgroundColor: tokens.colors.secondary, color: tokens.colors.foreground };
  }
};

const ReleaseCardSeriesIndex: React.FC<ReleaseCardSeriesIndexProps> = ({
  doll,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}) => {
  const rarity = doll.rarity ?? 'Common';
  const releaseHref = `/catalog/r/${doll.releaseId ?? doll.id}`;

  return (
    <Box
      component={RouterLink}
      to={releaseHref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      sx={{
        textDecoration: 'none',
        color: 'inherit',
        display: 'block',
      }}
    >
      <Box
        sx={{
          borderRadius: '0.5rem',
          border: `1px solid ${isHovered ? `${tokens.colors.primary}80` : tokens.colors.border}`,
          backgroundColor: tokens.colors.card,
          cursor: 'pointer',
          transition: 'border-color 0.3s',
          width: '220px',
          height: '420px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Image Container */}
        <Box
          sx={{
            height: '280px',
            width: '100%',
            backgroundColor: '#FFFFFF',
            borderRadius: '0.375rem 0.375rem 0 0',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.15s',
            flexShrink: 0,
          }}
        >
          {doll.imageUrl ? (
            <Box
              component="img"
              src={doll.imageUrl}
              alt={doll.variant ?? doll.character}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'center',
              }}
            />
          ) : (
            <svg
              viewBox="0 0 120 180"
              style={{ width: '60%', height: '60%' }}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse cx="60" cy="30" rx="22" ry="26" fill={tokens.colors.secondary} />
              <path
                d="M38 56 C38 56 35 80 38 100 L44 140 L40 175 L50 178 L55 145 L60 178 L65 145 L70 178 L80 175 L76 140 L82 100 C85 80 82 56 82 56 Z"
                fill={tokens.colors.secondary}
              />
              <path d="M38 60 L25 90 L30 92 L40 70" fill={tokens.colors.secondary} />
              <path d="M82 60 L95 90 L90 92 L80 70" fill={tokens.colors.secondary} />
            </svg>
          )}
        </Box>

        {/* Content */}
        <Box sx={{ p: '1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
          {/* Character Name */}
          <Typography
            variant="h3"
            sx={{
              fontWeight: tokens.fontWeights.semibold,
              color: tokens.colors.foreground,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              fontSize: '1rem',
            }}
          >
            {doll.character}
          </Typography>

          {/* Variant */}
          <Typography
            sx={{
              fontSize: tokens.fontSizes.xs,
              color: tokens.colors.mutedForeground,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {doll.variant}
          </Typography>

          {/* Footer: Rarity and MSRP */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '0.5rem',
              marginTop: 'auto',
            }}
          >
            <Chip
              label={rarity}
              size="small"
              sx={{
                fontSize: '10px',
                height: '20px',
                padding: '0 0.375rem',
                ...getRarityStyle(rarity),
                border: 'none',
              }}
            />
            <Typography
              component="span"
              sx={{
                fontSize: tokens.fontSizes.sm,
                color: tokens.colors.mutedForeground,
              }}
            >
              {doll.msrp}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ReleaseCardSeriesIndex;
