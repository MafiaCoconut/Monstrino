import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Chip } from '@mui/material';
import { type Release } from '../../entities';

interface ReleaseCardProps {
  release: Release;
}

const ReleaseCard: React.FC<ReleaseCardProps> = ({ release }) => {
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
      sx={{
        backgroundColor: 'background.paper',
        borderRadius: 2,
        overflow: 'hidden',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        textDecoration: 'none',
        color: 'inherit',
        height: 630,
        display: 'block',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 40px rgba(139, 92, 246, 0.15)',
        },
      }}
    >
      {/* Portrait Image Container - ~1:1.5 aspect ratio */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          paddingTop: '150%', // Creates ~1:1.5 aspect ratio (smaller image)
          backgroundColor: '#FFFFFF',
          overflow: 'hidden',
        }}
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
      <Box sx={{ p: 2 }}>
        {/* Character Name */}
        <Typography
          variant="h6"
          sx={{
            color: 'text.primary',
            fontWeight: 700,
            fontSize: '1rem',
            lineHeight: 1.3,
            mb: 0.5,
          }}
        >
          {release.characterName}
        </Typography>

        {/* Series */}
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            fontSize: '0.85rem',
            mb: 1.5,
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
            mb: 0.5,
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
            mb: 1.5,
            fontSize: '0.75rem',
          }}
        >
          {formatDate(release.releaseDate)}
        </Typography>

        {/* Type Tags */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {releaseTypes.slice(0, 3).map((type) => (
            <Chip
              key={type}
              label={type}
              size="small"
              sx={{
                backgroundColor: 'rgba(139, 92, 246, 0.15)',
                color: '#A78BFA',
                fontSize: '0.65rem',
                height: '22px',
                fontWeight: 500,
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
                fontSize: '0.65rem',
                height: '22px',
                fontWeight: 500,
              }}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ReleaseCard;
