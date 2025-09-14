import React from 'react';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  Box,
  Typography,
  Paper,
  Divider
} from '@mui/material';
import { Palette, Add, CreateNewFolder } from '@mui/icons-material';

const RightMenu = ({ onAddDoll }) => {
  const menuItems = [
    { 
      icon: Palette, 
      label: 'Change Colors', 
      action: () => console.log('Change colors clicked'),
      color: 'secondary.main'
    },
    { 
      icon: Add, 
      label: 'Add Item', 
      action: onAddDoll,
      color: 'primary.main'
    },
    { 
      icon: CreateNewFolder, 
      label: 'Create Collection', 
      action: () => console.log('Create collection clicked'),
      color: 'warning.main'
    },
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="right"
      sx={{
        width: 200,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 200,
          boxSizing: 'border-box',
          bgcolor: 'background.default',
          borderLeft: 1,
          borderColor: 'rgba(139, 95, 191, 0.2)',
          mt: 8, // Account for AppBar height
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography 
          variant="caption" 
          sx={{ 
            color: 'primary.main',
            fontFamily: '"Fira Code", monospace',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            mb: 2,
            display: 'block'
          }}
        >
          Quick Actions
        </Typography>
        
        <List>
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            
            return (
              <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  onClick={item.action}
                  sx={{
                    borderRadius: 1,
                    bgcolor: `${item.color.replace('.main', '')}.main`,
                    color: 'white',
                    opacity: 0.8,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      opacity: 1,
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: 'inherit', minWidth: 36 }}>
                    <Icon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: '0.75rem',
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

        <Divider sx={{ my: 3, borderColor: 'rgba(139, 95, 191, 0.2)' }} />

        {/* Collection Info */}
        <Paper sx={{ 
          p: 2, 
          bgcolor: 'rgba(255, 255, 255, 0.05)',
          border: 1,
          borderColor: 'rgba(139, 95, 191, 0.2)'
        }}>
          <Typography 
            variant="caption" 
            sx={{ 
              color: 'primary.main',
              fontFamily: '"Fira Code", monospace',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              mb: 1,
              display: 'block'
            }}
          >
            Collection Info
          </Typography>
          <Box sx={{ space: 1 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
              Created: Today
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
              Last Updated: Just now
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
              Visibility: Private
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Drawer>
  );
};

export default RightMenu;