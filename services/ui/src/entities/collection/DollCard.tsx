import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip,
  Stack
} from '@mui/material';
import { Delete, Visibility, Favorite } from '@mui/icons-material';

const DollCard = ({ doll, onRemove, size = 'medium' }) => {
  const navigate = useNavigate();
  
  const handleRemoveClick = (e) => {
    e.stopPropagation();
    onRemove(doll.id);
  };

  const handleViewDoll = () => {
    navigate(`/doll/${doll.id}`);
  };

  const getCardHeight = () => {
    switch (size) {
      case 'small': return 200;
      case 'medium': return 280;
      case 'large': return 320;
      default: return 280;
    }
  };

  const getImageHeight = () => {
    switch (size) {
      case 'small': return 120;
      case 'medium': return 180;
      case 'large': return 220;
      default: return 180;
    }
  };

  return (
    <Card
      onClick={handleViewDoll}
      sx={{
        height: getCardHeight(),
        bgcolor: 'rgba(255, 105, 180, 0.1)',
        border: 1,
        borderColor: 'rgba(255, 105, 180, 0.3)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        position: 'relative',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 8px 24px rgba(255, 105, 180, 0.2)',
          '& .doll-actions': {
            opacity: 1,
          },
          '& .remove-btn': {
            opacity: 1,
          },
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height={getImageHeight()}
          image={doll.image || 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=200&fit=crop'}
          alt={doll.name}
          sx={{ 
            objectFit: 'cover',
            bgcolor: 'rgba(0, 0, 0, 0.5)'
          }}
        />
        
        {/* Remove Button */}
        <IconButton
          className="remove-btn"
          onClick={handleRemoveClick}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            bgcolor: 'error.main',
            color: 'white',
            opacity: 0,
            transition: 'opacity 0.3s ease',
            '&:hover': {
              bgcolor: 'error.dark',
            },
          }}
          size="small"
        >
          <Delete fontSize="small" />
        </IconButton>

        {/* Overlay Actions */}
        <Box
          className="doll-actions"
          sx={{
            position: 'absolute',
            inset: 0,
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0,
            transition: 'opacity 0.3s ease',
            gap: 1,
          }}
        >
          <IconButton
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.3)',
              },
            }}
            size="small"
          >
            <Visibility />
          </IconButton>
          <IconButton
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.3)',
              },
            }}
            size="small"
          >
            <Favorite />
          </IconButton>
        </Box>
      </Box>

      <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
        <Typography 
          variant={size === 'small' ? 'caption' : 'subtitle2'}
          sx={{ 
            color: 'white',
            fontWeight: 600,
            mb: 0.5,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {doll.name}
        </Typography>
        
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
          <Typography 
            variant="caption" 
            sx={{ 
              color: 'primary.main',
              fontFamily: '"Fira Code", monospace',
              textTransform: 'uppercase',
              fontSize: size === 'small' ? '0.6rem' : '0.75rem'
            }}
          >
            {doll.character}
          </Typography>
          <Typography 
            variant="caption" 
            sx={{ 
              color: 'text.secondary',
              fontFamily: '"Fira Code", monospace',
              fontSize: size === 'small' ? '0.6rem' : '0.75rem'
            }}
          >
            {doll.year}
          </Typography>
        </Stack>

        <Chip
          label={doll.series}
          size="small"
          sx={{
            bgcolor: 'rgba(139, 95, 191, 0.5)',
            color: 'white',
            fontSize: size === 'small' ? '0.6rem' : '0.65rem',
            height: size === 'small' ? 18 : 20,
          }}
        />
      </CardContent>
    </Card>
  );
};

export default DollCard;