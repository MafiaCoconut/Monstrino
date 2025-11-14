import React from 'react';
import { 
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Stack,
  Divider
} from '@mui/material';
import Favorite from '@mui/icons-material/Favorite';
import ChatBubbleOutline from '@mui/icons-material/ChatBubbleOutline';
import CalendarToday from '@mui/icons-material/CalendarToday';

export const PostCard = ({ post }) => {
  const formatDate = (dateString: any) => {
    const date: any = new Date(dateString);
    const now: any = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card
      sx={{
        bgcolor: 'rgba(255, 255, 255, 0.05)',
        border: 1,
        borderColor: 'rgba(139, 95, 191, 0.2)',
        transition: 'all 0.3s ease',
        '&:hover': {
          bgcolor: 'rgba(255, 255, 255, 0.1)',
        },
      }}
    >
      <CardContent>
        {/* Post Header */}
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          <CalendarToday sx={{ fontSize: 16, color: 'secondary.main' }} />
          <Typography 
            variant="caption" 
            sx={{ 
              color: 'text.secondary',
              fontFamily: '"Fira Code", monospace'
            }}
          >
            {formatDate(post.date)}
          </Typography>
        </Stack>

        {/* Post Content */}
        <Box sx={{ mb: 2 }}>
          {post.title && (
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'white',
                fontWeight: 600,
                mb: 1
              }}
            >
              {post.title}
            </Typography>
          )}
          
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.8)',
              lineHeight: 1.6
            }}
          >
            {post.text}
          </Typography>
        </Box>

        <Divider sx={{ borderColor: 'rgba(139, 95, 191, 0.2)', mb: 2 }} />

        {/* Post Actions */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <IconButton 
                size="small" 
                sx={{ 
                  color: 'primary.main',
                  '&:hover': { color: 'white' }
                }}
              >
                <Favorite fontSize="small" />
              </IconButton>
              <Typography 
                variant="caption" 
                sx={{ 
                  fontFamily: '"Fira Code", monospace',
                  color: 'primary.main'
                }}
              >
                {post.likes}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <IconButton 
                size="small" 
                sx={{ 
                  color: 'info.main',
                  '&:hover': { color: 'white' }
                }}
              >
                <ChatBubbleOutline fontSize="small" />
              </IconButton>
              <Typography 
                variant="caption" 
                sx={{ 
                  fontFamily: '"Fira Code", monospace',
                  color: 'info.main'
                }}
              >
                {post.comments}
              </Typography>
            </Box>
          </Stack>

          <Typography
            variant="caption"
            sx={{
              color: 'secondary.main',
              fontFamily: '"Fira Code", monospace',
              textTransform: 'uppercase',
              cursor: 'pointer',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            View Post
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};