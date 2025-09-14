import React from 'react';
import { 
  Drawer,
  Box,
  Typography,
  IconButton,
  Stack,
  Avatar,
  Paper,
  Chip
} from '@mui/material';
import { Close, Add, Favorite, Comment } from '@mui/icons-material';

const ActivityFeed = ({ open, onClose, activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'doll_added': return <Add sx={{ color: 'success.main' }} />;
      case 'collection_created': return <Add sx={{ color: 'primary.main' }} />;
      case 'post_liked': return <Favorite sx={{ color: 'error.main' }} />;
      case 'comment_added': return <Comment sx={{ color: 'info.main' }} />;
      default: return <Add sx={{ color: 'secondary.main' }} />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'doll_added': return 'success.main';
      case 'collection_created': return 'primary.main';
      case 'post_liked': return 'error.main';
      case 'comment_added': return 'info.main';
      default: return 'secondary.main';
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffMs = now - time;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: 400 },
          bgcolor: 'background.default',
          borderLeft: 1,
          borderColor: 'rgba(139, 95, 191, 0.2)',
        },
      }}
    >
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'rgba(139, 95, 191, 0.2)' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 800 }}>
            Activity Feed
          </Typography>
          <IconButton onClick={onClose} sx={{ color: 'text.secondary' }}>
            <Close />
          </IconButton>
        </Stack>
      </Box>

      <Box sx={{ p: 2, height: '100%', overflowY: 'auto' }}>
        <Stack spacing={2}>
          {activities.map((activity) => (
            <Paper 
              key={activity.id}
              sx={{ 
                p: 2, 
                bgcolor: 'rgba(255, 255, 255, 0.05)',
                border: 1,
                borderColor: 'rgba(139, 95, 191, 0.1)'
              }}
            >
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Avatar
                  src={activity.userAvatar}
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: 'primary.main',
                    color: 'black',
                    fontSize: '0.875rem'
                  }}
                >
                  {!activity.userAvatar && activity.username.charAt(0).toUpperCase()}
                </Avatar>

                <Box sx={{ flexGrow: 1 }}>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    {getActivityIcon(activity.type)}
                    <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                      {activity.username}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {activity.action}
                    </Typography>
                  </Stack>

                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                    {activity.description}
                  </Typography>

                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Chip 
                      label={activity.category}
                      size="small"
                      sx={{ 
                        bgcolor: getActivityColor(activity.type),
                        color: 'white',
                        fontSize: '0.65rem',
                        height: 20
                      }}
                    />
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {formatTime(activity.timestamp)}
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            </Paper>
          ))}
        </Stack>

        {activities.length === 0 && (
          <Box textAlign="center" sx={{ py: 4 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              No recent activity from your friends
            </Typography>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default ActivityFeed;