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
import { UserAvatar, UserCollectionsButton, UserDollsButton, UserFriendsButton, UserStatus, UserUsername } from '@/entities/profile';

type UserHeaderProps = {
  userData: {stats: {collections: string, dolls: string, friends: string}, avatar: string, username: string, bio: string};
  onEditProfile?: () => void;
  showStats?: boolean;
}

export const UserHeader = ({ userData, onEditProfile, showStats=false }: UserHeaderProps) => {

  return (
    <Paper
      data-component="UserProfile"
      data-section="UserHeader"

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
          <UserAvatar avatar={userData.avatar} />
        </Grid>

        {/* User Info */}
        <Grid>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ width: '100%', 'minWidth': 0}}>
            <UserUsername username={userData.username} onEditProfile={onEditProfile}/>
          </Stack>
          <UserStatus bio={userData.bio}/>
        </Grid>

        {/* Stats */}
        { showStats &&
          <Grid sx={{ display: { xs: 'none', md: 'block' } }}>
            <Stack direction="row" spacing={4}>
              <Box textAlign="center">
                <UserCollectionsButton value={userData.stats.collections} />
              </Box>  
              <Box textAlign="center">
                <UserDollsButton value={userData.stats.dolls} />
              </Box>
              <Box textAlign="center">
                <UserFriendsButton value={userData.stats.friends}/>
              </Box>
            </Stack>
          </Grid>
        }
      </Grid>
    </Paper>
    
  );
};