import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Stack
} from '@mui/material';
import FolderOpen from '@mui/icons-material/FolderOpen';
import CalendarToday from '@mui/icons-material/CalendarToday';

type CollectionCardProps = {
  navigateUrl: string,
  collection: {name: string, dollsCount: number, description: string, createdAt: string},
  size?: 'small' | 'medium'
}

export const CollectionCard = ({ navigateUrl, collection, size = 'medium' }: CollectionCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(navigateUrl);
  };

  const formatDate = (dateString: any) => {
    return new Date(dateString).toLocaleDateString('en-DE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };


  return (
    <Card
      // onClick={handleClick}
      sx={{
        // height: getCardHeight(),
        bgcolor: 'rgba(139, 95, 191, 0.1)',
        width: '100%',
        height: '100%',
        border: 1,
        borderColor: 'rgba(139, 95, 191, 0.3)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 8px 24px rgba(139, 95, 191, 0.2)',
        },
      }}
    >
      {/* <CardMedia
        component="img"
        height={getImageHeight()}
        image={collection.coverImage || 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop'}
        alt={collection.name}
        sx={{ 
          objectFit: 'cover',
          bgcolor: 'rgba(0, 0, 0, 0.5)'
        }}
      />
       */}
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography 
          variant={size === 'small' ? 'subtitle2' : 'h6'} 
          sx={{ 
            color: 'white',
            fontWeight: 600,
            mb: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {collection.name}
        </Typography>
        
        <Typography 
          variant="body2" 
          sx={{ 
            color: 'text.secondary',
            mb: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: size === 'small' ? 1 : 2,
            WebkitBoxOrient: 'vertical',
            flexGrow: 1
          }}
        >
          {collection.description}
        </Typography>

        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <FolderOpen sx={{ fontSize: 14, color: 'primary.main' }} />
            <Typography variant="caption" sx={{ color: 'primary.main' }}>
              {collection.dollsCount} {collection.dollsCount === 1 ? 'Doll' : 'Dolls'}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <CalendarToday sx={{ fontSize: 12, color: 'text.secondary' }} />
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {formatDate(collection.createdAt)}
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Chip
            label="Collection"
            size="small"
            sx={{
              bgcolor: 'rgba(139, 95, 191, 0.5)',
              color: 'white',
              fontSize: '0.65rem',
            }}
          />
          {collection.dollsCount > 10 && (
            <Chip
              label="Popular"
              size="small"
              sx={{
                bgcolor: 'rgba(255, 105, 180, 0.5)',
                color: 'white',
                fontSize: '0.65rem',
              }}
            />
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};