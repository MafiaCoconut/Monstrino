'use client';

import React from 'react';
import { Link as RouterLink } from '@/shared/router';
import { Box, Typography, Chip } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import { mergeSx } from '@/shared/ui/mergeSx';
import { type Release } from '@/release-hub/entities';

interface ReleaseCardCatalogProps {
  release: Release;
  cardSx?: SxProps<Theme>;
  imageSx?: SxProps<Theme>;
  contentSx?: SxProps<Theme>;
}

const ReleaseCardCatalog: React.FC<ReleaseCardCatalogProps> = ({
  release,
  cardSx,
  imageSx,
  contentSx,
}) => {
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'Unknown';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const packSize = release.packSize ?? 1;
  const packLabel = packSize > 1 ? `${packSize}-Pack` : 'Single';
  const releaseTypes = release.releaseTypes ?? [];
  const releaseTags = release.tags ?? [];

  return (
    <Box
      component={RouterLink}
      to={`/catalog/r/${release.id}`}
      aria-label={`${release.characterName} release`}
      sx={mergeSx(
        {
          backgroundColor: 'background.paper',
          borderRadius: { xs: 1.5, sm: 2 },
          overflow: 'hidden',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          textDecoration: 'none',
          color: 'inherit',
          height: { xs: 360, sm: 480, md: 580, lg: 630 },
          display: 'block',
          cursor: 'pointer',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 40px rgba(139, 92, 246, 0.15)',
          },
        },
        cardSx
      )}
    >
      {/* Portrait Image Container - ~1:1.5 aspect ratio */}
      <Box
        sx={mergeSx(
          {
            position: 'relative',
            width: '100%',
            paddingTop: { xs: '140%', sm: '145%', md: '150%' }, // Creates adaptive aspect ratio
            backgroundColor: '#FFFFFF',
            overflow: 'hidden',
          },
          imageSx
        )}
      >
        <Box
          component="img"
          src={release.imageUrl}
          alt={release.characterName}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'center',
          }}
        />
      </Box>

      {/* Card Content */}
      <Box sx={mergeSx({ p: { xs: 1, sm: 1.5, md: 2 } }, contentSx)}>
        {/* Character Name */}
        <Typography
          variant="h6"
          sx={{
            color: 'text.primary',
            fontWeight: 700,
            fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.9375rem', lg: '1rem' },
            lineHeight: 1.3,
            mb: { xs: 0.25, sm: 0.5 },
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {release.characterName}
        </Typography>

        {/* Series */}
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8125rem', lg: '0.85rem' },
            mb: { xs: 0.75, sm: 1, md: 1.5 },
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {release.seriesName}
        </Typography>

        {/* Generation + Pack Size */}
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            display: 'block',
            mb: { xs: 0.25, sm: 0.5 },
            fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
          }}
        >
          {release.generation} • {packLabel}
        </Typography>

        {/* Release Date */}
        <Typography
          variant="caption"
          sx={{
            color: '#6B7280',
            display: 'block',
            mb: { xs: 0.75, sm: 1, md: 1.5 },
            fontSize: { xs: '0.625rem', sm: '0.6875rem', md: '0.75rem' },
          }}
        >
          {formatDate(release.releaseDate)}
        </Typography>

        {/* Type Tags */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 0.4, sm: 0.5 } }}>
          {releaseTypes.slice(0, 2).map((type) => (
            <Chip
              key={type}
              label={type}
              size="small"
              sx={{
                backgroundColor: 'rgba(139, 92, 246, 0.15)',
                color: '#A78BFA',
                fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' },
                height: { xs: '18px', sm: '20px', md: '22px' },
                fontWeight: 500,
                '& .MuiChip-label': {
                  px: { xs: 0.5, sm: 0.75, md: 1 },
                },
              }}
            />
          ))}
          {releaseTags.includes('SDCC') && (
            <Chip
              label="SDCC"
              size="small"
              sx={{
                backgroundColor: 'rgba(217, 70, 239, 0.15)',
                color: '#E879F9',
                fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' },
                height: { xs: '18px', sm: '20px', md: '22px' },
                fontWeight: 500,
                '& .MuiChip-label': {
                  px: { xs: 0.5, sm: 0.75, md: 1 },
                },
              }}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ReleaseCardCatalog;
