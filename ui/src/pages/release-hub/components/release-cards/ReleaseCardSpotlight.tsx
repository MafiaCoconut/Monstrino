import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Typography,
} from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import type { ReleaseSummary } from '../../entities';

const PLACEHOLDER_IMAGE = '/placeholder.svg';

interface ReleaseCardSpotlightProps extends ReleaseSummary {
  cardSx?: SxProps<Theme>;
  mediaSx?: SxProps<Theme>;
  contentSx?: SxProps<Theme>;
}

const ReleaseCardSpotlight = ({
  id,
  name,
  characterName,
  seriesName,
  year,
  imageUrl,
  price,
  isExclusive,
  cardSx,
  mediaSx,
  contentSx,
}: ReleaseCardSpotlightProps) => {
  return (
    <Card
      component={RouterLink}
      to={`/catalog/r/${id}`}
      sx={[{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        textDecoration: 'none',
        position: 'relative',
        overflow: 'visible',
      }, cardSx]}
    >
      <IconButton
        size="small"
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 10,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          color: 'text.secondary',
          '&:hover': {
            backgroundColor: 'rgba(255, 20, 147, 0.2)',
            color: 'primary.main',
          },
        }}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
      >
        <FavoriteBorderIcon fontSize="small" />
      </IconButton>

      {isExclusive && (
        <Chip
          label="Exclusive"
          size="small"
          icon={<LocalOfferIcon sx={{ fontSize: 14 }} />}
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            zIndex: 10,
            backgroundColor: 'secondary.main',
            color: 'secondary.contrastText',
            fontWeight: 600,
            fontSize: '0.7rem',
          }}
        />
      )}

      <CardMedia
        component="div"
        sx={[{
          height: 340,
          backgroundColor: 'background.default',
          backgroundImage: `url(${imageUrl ?? PLACEHOLDER_IMAGE})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '60%',
            background: 'linear-gradient(to top, rgba(20, 20, 32, 0.9) 0%, transparent 100%)',
          },
        }, mediaSx]}
      />

      <CardContent sx={[{ flex: 1, pt: 2 }, contentSx]}>
        <Typography
          variant="body2"
          sx={{
            color: 'primary.main',
            fontWeight: 600,
            fontSize: '0.75rem',
            mb: 0.5,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {characterName}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: 'text.primary',
            mb: 1,
            lineHeight: 1.3,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip
              label={seriesName}
              size="small"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                color: 'text.secondary',
                fontSize: '0.7rem',
              }}
            />
            {year && (
              <Typography variant="caption" color="text.secondary">
                {year}
              </Typography>
            )}
          </Box>
          {price && (
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'secondary.main' }}>
              {price}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ReleaseCardSpotlight;
