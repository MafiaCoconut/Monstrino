import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Chip } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import type { CharacterIndexRelease } from '../../entities/character-index';

// Gothic theme colors matching CharacterIndex
const cssVariables = {
  gothicPurple: 'hsl(270, 30%, 60%)',
  gothicPurpleMuted: 'hsl(270, 20%, 40%)',
  gothicWarmGray: 'hsl(40, 10%, 60%)',
  card: 'hsl(240, 6%, 11%)',
  border: 'hsl(270, 10%, 20%)',
  muted: 'hsl(240, 5%, 18%)',
  foreground: 'hsl(40, 20%, 95%)',
  mutedForeground: 'hsl(40, 10%, 60%)',
};

const hslAlpha = (value: string, alpha: number) => {
  const match = value.match(/hsl\(([^)]+)\)/);
  if (match) {
    return `hsl(${match[1]} / ${alpha})`;
  }
  return value;
};

interface ReleaseCardCharacterProps {
  release: CharacterIndexRelease;
  cardSx?: SxProps<Theme>;
  imageSx?: SxProps<Theme>;
  contentSx?: SxProps<Theme>;
}

const ReleaseCardCharacter: React.FC<ReleaseCardCharacterProps> = ({
  release,
  cardSx,
  imageSx,
  contentSx,
}) => {
  return (
    <Box
      component={RouterLink}
      to={`/catalog/r/${release.id}`}
      sx={[{
        display: 'flex',
        height: '100%',
        textDecoration: 'none',
        color: 'inherit',
        overflow: 'hidden',
        borderRadius: '0.5rem',
        border: `1px solid ${hslAlpha(cssVariables.gothicPurple, 0.2)}`,
        backgroundColor: cssVariables.card,
        transition: 'border-color 0.3s, transform 0.2s',
        cursor: 'pointer',
        flexDirection: 'column',
        '&:hover': {
          borderColor: hslAlpha(cssVariables.gothicPurple, 0.4),
          transform: 'translateY(-2px)',
          '& img': {
            transform: 'scale(1.05)',
          },
        },
      }, cardSx]}
    >
      {/* Image Container */}
      <Box
        sx={[{
          aspectRatio: '5/7',
          overflow: 'hidden',
          backgroundColor: '#FFFFFF',
          position: 'relative',
        }, imageSx]}
      >
        <Box
          component="img"
          src={release.image}
          alt={release.name}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'center',
            transition: 'transform 0.5s ease',
          }}
        />
      </Box>

      {/* Content */}
      <Box
        sx={[{
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }, contentSx]}
      >
        {/* Release Name */}
        <Typography
          variant="h6"
          sx={{
            fontFamily: "'Crimson Text', Georgia, serif",
            fontSize: '0.875rem',
            fontWeight: 600,
            marginBottom: '0.25rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            color: cssVariables.foreground,
          }}
        >
          {release.name}
        </Typography>

        {/* Series */}
        <Typography
          sx={{
            fontSize: '0.75rem',
            color: cssVariables.mutedForeground,
            marginBottom: '0.5rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {release.series}
        </Typography>

        {/* Footer: Year and Edition Badge */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 'auto',
            minHeight: '1.25rem',
          }}
        >
          <Typography
            component="span"
            sx={{
              fontSize: '0.75rem',
              color: cssVariables.gothicWarmGray,
            }}
          >
            {release.year}
          </Typography>

          <Box sx={{ minHeight: '1.25rem', display: 'inline-flex', alignItems: 'center' }}>
            {release.edition === 'special' && (
              <Chip
                label="Special"
                size="small"
                sx={{
                  fontSize: '0.625rem',
                  height: '1.25rem',
                  padding: '0 0.5rem',
                  backgroundColor: hslAlpha(cssVariables.gothicPurple, 0.2),
                  color: cssVariables.gothicPurple,
                  border: 'none',
                  fontWeight: 500,
                }}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ReleaseCardCharacter;
