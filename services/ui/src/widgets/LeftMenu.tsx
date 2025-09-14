import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  Box,
  Divider,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import Person from '@mui/icons-material/Person';
import FolderOpen from '@mui/icons-material/FolderOpen';
import People from '@mui/icons-material/People';
import Forum from '@mui/icons-material/Forum';
import Settings from '@mui/icons-material/Settings';
import Article from '@mui/icons-material/Article';
import EmojiEvents from '@mui/icons-material/EmojiEvents';
import FavoriteOutlined from '@mui/icons-material/FavoriteOutlined';

const LeftMenu = ({ mobileOpen, onMobileClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const defaultUserPath = '/users/:id'
  const menuItems = [
    { path: defaultUserPath, label: 'My Page', icon: Person },
    { path: '/friends-posts', label: 'Friends Posts', icon: Article },
    { path: `${defaultUserPath}/collections`, label: 'My Collections', icon: FolderOpen },
    { path: `${defaultUserPath}/wishlist`, label: 'Wishlist', icon: FavoriteOutlined },
    { path: `${defaultUserPath}/friends`, label: 'My Friends', icon: People },
    { path: `${defaultUserPath}/groups`, label: 'My Groups', icon: Forum },
    { path: `${defaultUserPath}/achievements`, label: 'Achievements', icon: EmojiEvents },
  ];

  const settingsItems = [
    { path: '/settings', label: 'Settings', icon: Settings }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile && onMobileClose) {
      onMobileClose();
    }
  };

  const drawerContent = (
    <Box sx={{ p: { xs: 1, md: 2 } }}>
      {isMobile && (
        <Box sx={{ 
          textAlign: 'center', 
          mb: 2, 
          pb: 2, 
          borderBottom: 1, 
          borderColor: 'rgba(139, 95, 191, 0.2)' 
        }}>
          <Typography 
            variant="h5"
            sx={{ 
              color: 'primary.main',
              fontWeight: 800,
              fontFamily: '"Creepster", "Griffy", cursive',
              fontSize: '1.5rem',
              textShadow: '2px 2px 4px rgba(255, 105, 180, 0.3)',
            }}
          >
            MONSTRINO
          </Typography>
          <Typography 
            variant="caption" 
            sx={{ 
              color: 'secondary.main',
              fontFamily: '"Fira Code", monospace',
              fontSize: '0.65rem',
              display: 'block',
              mt: 0.5
            }}
          >
            MONSTER HIGH SOCIAL
          </Typography>
        </Box>
      )}
      <List>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  bgcolor: isActive ? 'secondary.main' : 'transparent',
                  color: isActive ? 'white' : 'primary.main',
                  minHeight: { xs: 40, md: 48 },
                  px: { xs: 1, md: 2 },
                  '&:hover': {
                    bgcolor: isActive ? 'secondary.main' : 'rgba(139, 95, 191, 0.2)',
                    color: 'white',
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: { xs: 32, md: 36 } }}>
                  <Icon fontSize={isMobile ? "small" : "medium"} />
                </ListItemIcon>
                <ListItemText 
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: { xs: '0.7rem', md: '0.75rem' },
                    fontFamily: '"Fira Code", monospace',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ my: 2, borderColor: 'rgba(139, 95, 191, 0.2)' }} />

      <List>
        {settingsItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  bgcolor: isActive ? 'warning.main' : 'transparent',
                  color: isActive ? 'black' : 'warning.main',
                  minHeight: { xs: 40, md: 48 },
                  px: { xs: 1, md: 2 },
                  '&:hover': {
                    bgcolor: isActive ? 'warning.main' : 'rgba(255, 211, 61, 0.2)',
                    color: isActive ? 'black' : 'white',
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: { xs: 32, md: 36 } }}>
                  <Icon fontSize={isMobile ? "small" : "medium"} />
                </ListItemIcon>
                <ListItemText 
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: { xs: '0.7rem', md: '0.75rem' },
                    fontFamily: '"Fira Code", monospace',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            bgcolor: 'background.default',
            borderRight: 1,
            borderColor: 'rgba(139, 95, 191, 0.2)',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: { md: 200, lg: 220 },
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: { md: 200, lg: 220 },
          boxSizing: 'border-box',
          bgcolor: 'background.default',
          borderRight: 1,
          borderColor: 'rgba(139, 95, 191, 0.2)',
          mt: 8, // Account for AppBar height
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default LeftMenu;