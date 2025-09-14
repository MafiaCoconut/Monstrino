import React from 'react';
import { 
  Box, 
  Avatar, 
  Typography, 
  Paper,
  Grid,
  Stack,
  IconButton
} from '@mui/material';
import Edit from '@mui/icons-material/Edit';

const UserHeader = ({ userData, onEditProfile }) => {

  return (
    <Paper 
      sx={{ 
        bgcolor: 'rgba(139, 95, 191, 0.1)',
        borderBottom: 1,
        borderColor: 'rgba(139, 95, 191, 0.2)',
        borderRadius: 0,
        p: 3
      }}
    >
      <Grid container spacing={3} alignItems="center">
        {/* Avatar */}
        <Grid>
          <Avatar
            src={userData.avatar}
            sx={{
              width: 64,
              height: 64,
              bgcolor: 'primary.main',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'black'
            }}
          >
            {!userData.avatar && userData.username.charAt(0).toUpperCase()}
          </Avatar>
        </Grid>

        {/* User Info */}
        <Grid>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h5" sx={{ color: 'white', mb: 0.5 }}>
              {userData.username}
            </Typography>
            {onEditProfile && (
              <IconButton onClick={onEditProfile} size="small" sx={{ color: 'primary.main' }}>
                <Edit fontSize="small" />
              </IconButton>
            )}
          </Stack>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {userData.bio}
          </Typography>
        </Grid>

        {/* Stats */}
        <Grid sx={{ display: { xs: 'none', md: 'block' } }}>
          <Stack direction="row" spacing={4}>
            <Box textAlign="center">
              <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                {userData.stats.collections}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Collections
              </Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                {userData.stats.dolls}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Dolls
              </Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                {userData.stats.friends}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Friends
              </Typography>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UserHeader;