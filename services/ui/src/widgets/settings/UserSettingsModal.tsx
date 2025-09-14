import React, { useState } from 'react';
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton,
  Stack,
  Switch,
  FormControlLabel,
  Divider,
  Alert
} from '@mui/material';
import { Close, Settings, Security, Notifications, Palette } from '@mui/icons-material';

const UserSettingsModal = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState({
    notifications: true,
    privacy: false,
    darkMode: true,
    emailUpdates: true,
    friendRequests: true
  });

  const handleSettingChange = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: 'background.default',
          border: 1,
          borderColor: 'rgba(139, 95, 191, 0.3)',
        }
      }}
    >
      <DialogTitle sx={{ 
        bgcolor: 'background.default',
        borderBottom: 1,
        borderColor: 'rgba(139, 95, 191, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Settings sx={{ color: 'primary.main' }} />
          <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 800 }}>
            User Settings
          </Typography>
        </Stack>
        <IconButton onClick={onClose} sx={{ color: 'text.secondary' }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ bgcolor: 'background.default' }}>
        <Box sx={{ mt: 2 }}>
          {/* Notifications Section */}
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <Notifications sx={{ color: 'primary.main' }} />
            <Typography variant="h6" sx={{ color: 'primary.main' }}>Notifications</Typography>
          </Stack>
          
          <Stack spacing={1} sx={{ ml: 4, mb: 3 }}>
            <FormControlLabel
              control={
                <Switch 
                  checked={settings.notifications}
                  onChange={() => handleSettingChange('notifications')}
                  sx={{ '& .MuiSwitch-thumb': { bgcolor: 'primary.main' } }}
                />
              }
              label={<Typography sx={{ color: 'text.secondary' }}>Push Notifications</Typography>}
            />
            <FormControlLabel
              control={
                <Switch 
                  checked={settings.emailUpdates}
                  onChange={() => handleSettingChange('emailUpdates')}
                  sx={{ '& .MuiSwitch-thumb': { bgcolor: 'primary.main' } }}
                />
              }
              label={<Typography sx={{ color: 'text.secondary' }}>Email Updates</Typography>}
            />
            <FormControlLabel
              control={
                <Switch 
                  checked={settings.friendRequests}
                  onChange={() => handleSettingChange('friendRequests')}
                  sx={{ '& .MuiSwitch-thumb': { bgcolor: 'primary.main' } }}
                />
              }
              label={<Typography sx={{ color: 'text.secondary' }}>Friend Request Notifications</Typography>}
            />
          </Stack>

          <Divider sx={{ borderColor: 'rgba(139, 95, 191, 0.2)', mb: 3 }} />

          {/* Privacy Section */}
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <Security sx={{ color: 'primary.main' }} />
            <Typography variant="h6" sx={{ color: 'primary.main' }}>Privacy</Typography>
          </Stack>
          
          <Stack spacing={1} sx={{ ml: 4, mb: 3 }}>
            <FormControlLabel
              control={
                <Switch 
                  checked={settings.privacy}
                  onChange={() => handleSettingChange('privacy')}
                  sx={{ '& .MuiSwitch-thumb': { bgcolor: 'primary.main' } }}
                />
              }
              label={<Typography sx={{ color: 'text.secondary' }}>Private Profile</Typography>}
            />
          </Stack>

          <Divider sx={{ borderColor: 'rgba(139, 95, 191, 0.2)', mb: 3 }} />

          {/* Appearance Section */}
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <Palette sx={{ color: 'primary.main' }} />
            <Typography variant="h6" sx={{ color: 'primary.main' }}>Appearance</Typography>
          </Stack>
          
          <Stack spacing={1} sx={{ ml: 4 }}>
            <FormControlLabel
              control={
                <Switch 
                  checked={settings.darkMode}
                  onChange={() => handleSettingChange('darkMode')}
                  sx={{ '& .MuiSwitch-thumb': { bgcolor: 'primary.main' } }}
                />
              }
              label={<Typography sx={{ color: 'text.secondary' }}>Dark Mode</Typography>}
            />
          </Stack>

          <Alert severity="info" sx={{ mt: 3, bgcolor: 'rgba(139, 95, 191, 0.1)' }}>
            <Typography variant="body2">
              Changes are saved automatically. Some settings may require a page refresh to take effect.
            </Typography>
          </Alert>
        </Box>
      </DialogContent>

      <DialogActions sx={{ 
        bgcolor: 'background.default',
        borderTop: 1,
        borderColor: 'rgba(139, 95, 191, 0.2)',
        p: 2
      }}>
        <Button 
          onClick={onClose}
          variant="contained"
          sx={{ 
            bgcolor: 'primary.main',
            color: 'black'
          }}
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserSettingsModal;