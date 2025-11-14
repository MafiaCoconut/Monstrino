import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  TextField,
  InputAdornment,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material';
import Home from '@mui/icons-material/Home';
import Logout from '@mui/icons-material/Logout';
import Search from '@mui/icons-material/Search';
import Notifications from '@mui/icons-material/Notifications';
import Person from '@mui/icons-material/Person';
import Settings from '@mui/icons-material/Settings';
import Dashboard from '@mui/icons-material/Dashboard';
// import NotificationsModal from '../modals/NotificationsModal';
import { mockUserData } from '../../data/mocAppData';

export const AppHeader = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleLogout = () => {
    navigate('/');
  };

  const handleUserMenuClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuAction = (action: any) => {
    handleUserMenuClose();
    switch (action) {
      case 'profile':
        navigate('/user');
        break;
      case 'settings':
        navigate('/settings');
        break;
      case 'dashboard':
        navigate('/dashboard');
        break;
      case 'logout':
        handleLogout();
        break;
      default:
        break;
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: 'background.default',
          borderBottom: 1,
          borderColor: 'rgba(139, 95, 191, 0.2)',
          boxShadow: 'none'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', gap: { xs: 1, md: 2 }, px: { xs: 1, md: 2 } }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 2 }, minWidth: 0 }}>
            <Typography
              variant={isMobile ? "h5" : "h4"}
              onClick={() => navigate('/')}
              sx={{
                color: 'primary.main',
                fontWeight: 800,
                fontFamily: '"Creepster", "Griffy", cursive',
                cursor: 'pointer',
                fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' },
                textShadow: '2px 2px 4px rgba(255, 105, 180, 0.3)',
                '&:hover': {
                  textShadow: '2px 2px 8px rgba(255, 105, 180, 0.6)',
                  transform: 'scale(1.05)'
                },
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap'
              }}
            >
              MONSTRINO
            </Typography>
            {!isMobile && (
              <Typography
                variant="caption"
                sx={{
                  color: 'secondary.main',
                  display: { xs: 'none', sm: 'block' },
                  fontFamily: '"Fira Code", monospace',
                  fontSize: '0.7rem'
                }}
              >
                MONSTER HIGH SOCIAL
              </Typography>
            )}
          </Box>

          {/* Search Bar */}
          <Box sx={{
            flexGrow: 1,
            maxWidth: { xs: 150, sm: 300, md: 400 },
            mx: { xs: 1, md: 2 },
            minWidth: 0
          }}>
            <TextField
              fullWidth
              size="small"
              placeholder={isMobile ? "Search..." : "Search monsters, collections, posts..."}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: 'secondary.main', fontSize: { xs: '1rem', md: '1.2rem' } }} />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: 3,
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  fontSize: { xs: '0.8rem', md: '1rem' },
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.15)',
                  }
                }
              }}
            />
          </Box>

          {/* Right Side Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, md: 1 } }}>
            {/* Notifications */}
            <IconButton
              sx={{ color: 'primary.main', p: { xs: 0.5, md: 1 } }}
              onClick={() => setNotificationsOpen(true)}
            >
              <Badge badgeContent={3} color="error">
                <Notifications sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' } }} />
              </Badge>
            </IconButton>

            {/* Home Button */}
            {!isMobile && (
              <IconButton
                onClick={() => navigate('/')}
                sx={{ color: 'primary.main', display: { xs: 'none', sm: 'flex' } }}
              >
                <Home />
              </IconButton>
            )}

            {/* User Avatar Menu */}
            <IconButton onClick={handleUserMenuClick} sx={{ p: { xs: 0.5, md: 1 } }}>
              <Avatar
                src={mockUserData.currentUser.avatar}
                sx={{
                  width: { xs: 32, md: 40 },
                  height: { xs: 32, md: 40 },
                  bgcolor: 'primary.main',
                  color: 'black',
                  border: 2,
                  borderColor: 'primary.main',
                  fontSize: { xs: '0.8rem', md: '1rem' }
                }}
              >
                {!mockUserData.currentUser.avatar && mockUserData.currentUser.username.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleUserMenuClose}
              PaperProps={{
                sx: {
                  bgcolor: 'background.paper',
                  border: 1,
                  borderColor: 'rgba(139, 95, 191, 0.3)',
                  minWidth: { xs: 180, md: 200 }
                }
              }}
            >
              <Box sx={{ p: 2, borderBottom: 1, borderColor: 'rgba(139, 95, 191, 0.2)' }}>
                <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600, fontSize: { xs: '0.9rem', md: '1rem' } }}>
                  {mockUserData.currentUser.username}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: { xs: '0.7rem', md: '0.8rem' } }}>
                  {mockUserData.currentUser.email}
                </Typography>
              </Box>

              <MenuItem onClick={() => handleMenuAction('profile')}>
                <Person sx={{ mr: 2, color: 'primary.main' }} />
                My Profile
              </MenuItem>
              {/* <MenuItem onClick={() => handleMenuAction('dashboard')}>
                <Dashboard sx={{ mr: 2, color: 'secondary.main' }} />
                Dashboard
              </MenuItem> */}
              <MenuItem onClick={() => handleMenuAction('settings')}>
                <Settings sx={{ mr: 2, color: 'info.main' }} />
                Settings
              </MenuItem>
              <Divider sx={{ borderColor: 'rgba(139, 95, 191, 0.2)' }} />
              <MenuItem onClick={() => handleMenuAction('logout')}>
                <Logout sx={{ mr: 2, color: 'error.main' }} />
                Log Out
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* <NotificationsModal 
        open={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      /> */}
    </>
  );
};