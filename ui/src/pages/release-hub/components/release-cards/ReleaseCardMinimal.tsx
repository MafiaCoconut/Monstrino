import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Chip } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';

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
  year?: string | number;
}

interface ReleaseCardMinimalProps {
  doll: DollRelease;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  size?: 'compact' | 'full' | 'reduced';
  enableHoverLift?: boolean;
  containerSx?: SxProps<Theme>;
  cardSx?: SxProps<Theme>;
  imageSx?: SxProps<Theme>;
  contentSx?: SxProps<Theme>;
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

const ReleaseCardMinimal: React.FC<ReleaseCardMinimalProps> = ({
  doll,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  size = 'compact',
  enableHoverLift = false,
  containerSx,
  cardSx,
  imageSx,
  contentSx,
}) => {
  const isFull = size === 'full';
  const isReduced = size === 'reduced';
  const cardMaxWidth = isFull ? '100%' : isReduced ? '220px' : '180px';
  const cardMinWidth = isFull ? 0 : isReduced ? '160px' : '140px';
  const rarity = doll.rarity ?? 'Common';
  const releaseHref = `/catalog/r/${doll.releaseId ?? doll.id}`;

  return (
    <Box
      component={RouterLink}
      to={releaseHref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      sx={[{
        textDecoration: 'none',
        color: 'inherit',
        display: isReduced ? 'flex' : 'block',
        justifyContent: isReduced ? 'center' : 'flex-start',
        height: isFull ? '100%' : 'auto',
        width: '100%',
      }, containerSx]}
    >
      <Box
        sx={[{
          borderRadius: '0.5rem',
          border: `1px solid ${isHovered ? `${tokens.colors.primary}80` : tokens.colors.border}`,
          backgroundColor: tokens.colors.card,
          cursor: 'pointer',
          transition: enableHoverLift
            ? 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.3s'
            : 'border-color 0.3s',
          width: '100%',
          maxWidth: cardMaxWidth,
          minWidth: cardMinWidth,
          height: isFull ? '100%' : 'auto',
          display: 'flex',
          flexDirection: 'column',
          ...(enableHoverLift
            ? {
                '&:hover': {
                  transform: { xs: 'none', md: 'translateY(-4px)' },
                  boxShadow: { xs: 'none', md: '0 8px 24px rgba(236, 72, 153, 0.15)' },
                },
              }
            : {}),
        }, cardSx]}
      >
        {/* Image Container */}
        <Box
          sx={[{
            height: '0',
            paddingTop: '140%', // Aspect ratio для изображения
            width: '100%',
            backgroundColor: '#FFFFFF',
            borderRadius: '0.375rem 0.375rem 0 0',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.15s',
            position: 'relative',
            flexShrink: 0,
          }, imageSx]}
        >
          <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
        </Box>

        {/* Content */}
        <Box sx={[{ p: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }, contentSx]}>
          {/* Character Name */}
          <Typography
            variant="h3"
            sx={{
              fontWeight: tokens.fontWeights.semibold,
              color: tokens.colors.foreground,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              fontSize: '0.875rem',
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

          {/* Footer: Rarity and Year */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '0.375rem',
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
              {doll.year}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ReleaseCardMinimal;
