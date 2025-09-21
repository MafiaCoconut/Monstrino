import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container,
  Paper,
  Stack,
  Switch,
  FormControlLabel,
  Divider,
  Button,
  TextField,
  Alert,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  useMediaQuery,
  useTheme
} from '@mui/material';
import Security from '@mui/icons-material/Security';
import Notifications from '@mui/icons-material/Notifications'
import Palette from '@mui/icons-material/Palette'
import Person from '@mui/icons-material/Person'
import Shield from '@mui/icons-material/Shield'
import Delete from '@mui/icons-material/Delete'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import MenuOpen from '@mui/icons-material/MenuOpen'

import { mockUserData } from '@/data/mocAppData';
import { UserHeader } from '@/widgets/headers';

export const SettingsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [tabValue, setTabValue] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settings, setSettings] = useState({
    notifications: true,
    privacy: false,
    darkMode: true,
    emailUpdates: true,
    friendRequests: true,
    profileVisibility: 'public',
    showEmail: false,
    showStats: true
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [saveAlert, setSaveAlert] = useState(false);

  const handleToggleSetting = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswords(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveSettings = () => {
    setSaveAlert(true);
    setTimeout(() => setSaveAlert(false), 3000);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>      
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          ml: { xs: 0, md: '200px', lg: '220px' },
          mt: 8,
          minHeight: 'calc(100vh - 64px)',
          width: 'auto',
          overflowX: 'hidden'
        }}
      >
        <UserHeader userData={mockUserData.currentUser} onEditProfile={undefined} />
        
        <Container 
          maxWidth={false}
          sx={{ 
            py: { xs: 2, md: 4 },
            px: { xs: 1, md: 3 },
            maxWidth: 'none',
            width: '100%'
          }}
        >
          <Typography 
            variant="h4" 
            sx={{ 
              color: 'primary.main', 
              mb: { xs: 2, md: 4 },
              fontSize: { xs: '1.8rem', md: '2.125rem' },
              textAlign: { xs: 'center', md: 'left' }
            }}
          >
            Settings
          </Typography>

          {saveAlert && (
            <Alert 
              severity="success" 
              sx={{ 
                mb: 3,
                mx: { xs: 0, md: 0 }
              }}
            >
              Settings saved successfully!
            </Alert>
          )}

          <Paper 
            sx={{ 
              bgcolor: 'rgba(255, 255, 255, 0.05)',
              width: '100%',
              overflowX: 'hidden'
            }}
          >
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange}
              variant={isMobile ? "scrollable" : "fullWidth"}
              scrollButtons={isMobile ? "auto" : false}
              sx={{
                borderBottom: 1,
                borderColor: 'rgba(139, 95, 191, 0.2)',
                '& .MuiTab-root': {
                  color: 'text.secondary',
                  fontSize: { xs: '0.8rem', md: '0.875rem' },
                  minWidth: { xs: 'auto', md: 120 },
                  '&.Mui-selected': { color: 'primary.main' }
                },
                '& .MuiTabs-indicator': { bgcolor: 'primary.main' }
              }}
            >
              <Tab icon={<Person />} label="Profile" />
              <Tab icon={<Security />} label="Security" />
              <Tab icon={<Notifications />} label="Notifications" />
              <Tab icon={<Palette />} label="Appearance" />
              <Tab icon={<Shield />} label="Privacy" />
            </Tabs>

            {/* Profile Settings */}
            <TabPanel value={tabValue} index={0}>
              <Box sx={{ p: { xs: 2, md: 3 } }}>
                <Typography variant="h6" sx={{ color: 'primary.main', mb: 3 }}>
                  Profile Information
                </Typography>
                
                <Stack spacing={3}>
                  <TextField
                    label="Display Name"
                    defaultValue={mockUserData.currentUser.username}
                    fullWidth
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'white',
                        '& fieldset': { borderColor: 'rgba(139, 95, 191, 0.3)' },
                        '&:hover fieldset': { borderColor: 'primary.main' },
                        '&.Mui-focused fieldset': { borderColor: 'primary.main' }
                      },
                      '& .MuiInputLabel-root': { color: 'text.secondary' }
                    }}
                  />
                  
                  <TextField
                    label="Email"
                    defaultValue={mockUserData.currentUser.email}
                    fullWidth
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'white',
                        '& fieldset': { borderColor: 'rgba(139, 95, 191, 0.3)' },
                        '&:hover fieldset': { borderColor: 'primary.main' },
                        '&.Mui-focused fieldset': { borderColor: 'primary.main' }
                      },
                      '& .MuiInputLabel-root': { color: 'text.secondary' }
                    }}
                  />
                  
                  <TextField
                    label="Bio"
                    defaultValue={mockUserData.currentUser.bio}
                    fullWidth
                    multiline
                    rows={3}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'white',
                        '& fieldset': { borderColor: 'rgba(139, 95, 191, 0.3)' },
                        '&:hover fieldset': { borderColor: 'primary.main' },
                        '&.Mui-focused fieldset': { borderColor: 'primary.main' }
                      },
                      '& .MuiInputLabel-root': { color: 'text.secondary' }
                    }}
                  />
                </Stack>
              </Box>
            </TabPanel>

            {/* Security Settings */}
            <TabPanel value={tabValue} index={1}>
              <Box sx={{ p: { xs: 2, md: 3 } }}>
                <Typography variant="h6" sx={{ color: 'primary.main', mb: 3 }}>
                  Change Password
                </Typography>
                
                <Stack spacing={3}>
                  <TextField
                    label="Current Password"
                    type={showPassword ? 'text' : 'password'}
                    value={passwords.current}
                    onChange={(e) => handlePasswordChange('current', e.target.value)}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          sx={{ color: 'text.secondary' }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      )
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'white',
                        '& fieldset': { borderColor: 'rgba(139, 95, 191, 0.3)' },
                        '&:hover fieldset': { borderColor: 'primary.main' },
                        '&.Mui-focused fieldset': { borderColor: 'primary.main' }
                      },
                      '& .MuiInputLabel-root': { color: 'text.secondary' }
                    }}
                  />
                  
                  <TextField
                    label="New Password"
                    type={showPassword ? 'text' : 'password'}
                    value={passwords.new}
                    onChange={(e) => handlePasswordChange('new', e.target.value)}
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'white',
                        '& fieldset': { borderColor: 'rgba(139, 95, 191, 0.3)' },
                        '&:hover fieldset': { borderColor: 'primary.main' },
                        '&.Mui-focused fieldset': { borderColor: 'primary.main' }
                      },
                      '& .MuiInputLabel-root': { color: 'text.secondary' }
                    }}
                  />
                  
                  <TextField
                    label="Confirm New Password"
                    type={showPassword ? 'text' : 'password'}
                    value={passwords.confirm}
                    onChange={(e) => handlePasswordChange('confirm', e.target.value)}
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'white',
                        '& fieldset': { borderColor: 'rgba(139, 95, 191, 0.3)' },
                        '&:hover fieldset': { borderColor: 'primary.main' },
                        '&.Mui-focused fieldset': { borderColor: 'primary.main' }
                      },
                      '& .MuiInputLabel-root': { color: 'text.secondary' }
                    }}
                  />
                </Stack>
              </Box>
            </TabPanel>

            {/* Notification Settings */}
            <TabPanel value={tabValue} index={2}>
              <Box sx={{ p: { xs: 2, md: 3 } }}>
                <Typography variant="h6" sx={{ color: 'primary.main', mb: 3 }}>
                  Notification Preferences
                </Typography>
                
                <List sx={{ width: '100%' }}>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText 
                      primary="Email Notifications" 
                      secondary="Receive updates via email"
                      primaryTypographyProps={{ color: 'white' }}
                      secondaryTypographyProps={{ color: 'text.secondary' }}
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={settings.emailUpdates}
                        onChange={() => handleToggleSetting('emailUpdates')}
                        color="primary"
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  
                  <Divider sx={{ borderColor: 'rgba(139, 95, 191, 0.2)' }} />
                  
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText 
                      primary="Friend Requests" 
                      secondary="Get notified of new friend requests"
                      primaryTypographyProps={{ color: 'white' }}
                      secondaryTypographyProps={{ color: 'text.secondary' }}
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={settings.friendRequests}
                        onChange={() => handleToggleSetting('friendRequests')}
                        color="primary"
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  
                  <Divider sx={{ borderColor: 'rgba(139, 95, 191, 0.2)' }} />
                  
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText 
                      primary="Push Notifications" 
                      secondary="Browser notifications for activity"
                      primaryTypographyProps={{ color: 'white' }}
                      secondaryTypographyProps={{ color: 'text.secondary' }}
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={settings.notifications}
                        onChange={() => handleToggleSetting('notifications')}
                        color="primary"
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </Box>
            </TabPanel>

            {/* Appearance Settings */}
            <TabPanel value={tabValue} index={3}>
              <Box sx={{ p: { xs: 2, md: 3 } }}>
                <Typography variant="h6" sx={{ color: 'primary.main', mb: 3 }}>
                  Appearance & Theme
                </Typography>
                
                <List sx={{ width: '100%' }}>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText 
                      primary="Dark Mode" 
                      secondary="Use dark theme (Monster High style)"
                      primaryTypographyProps={{ color: 'white' }}
                      secondaryTypographyProps={{ color: 'text.secondary' }}
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={settings.darkMode}
                        onChange={() => handleToggleSetting('darkMode')}
                        color="primary"
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </Box>
            </TabPanel>

            {/* Privacy Settings */}
            <TabPanel value={tabValue} index={4}>
              <Box sx={{ p: { xs: 2, md: 3 } }}>
                <Typography variant="h6" sx={{ color: 'primary.main', mb: 3 }}>
                  Privacy & Security
                </Typography>
                
                <List sx={{ width: '100%' }}>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText 
                      primary="Profile Visibility" 
                      secondary="Who can see your profile"
                      primaryTypographyProps={{ color: 'white' }}
                      secondaryTypographyProps={{ color: 'text.secondary' }}
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={settings.privacy}
                        onChange={() => handleToggleSetting('privacy')}
                        color="primary"
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  
                  <Divider sx={{ borderColor: 'rgba(139, 95, 191, 0.2)' }} />
                  
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText 
                      primary="Show Email" 
                      secondary="Display email on profile"
                      primaryTypographyProps={{ color: 'white' }}
                      secondaryTypographyProps={{ color: 'text.secondary' }}
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={settings.showEmail}
                        onChange={() => handleToggleSetting('showEmail')}
                        color="primary"
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  
                  <Divider sx={{ borderColor: 'rgba(139, 95, 191, 0.2)' }} />
                  
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText 
                      primary="Show Stats" 
                      secondary="Display collection stats publicly"
                      primaryTypographyProps={{ color: 'white' }}
                      secondaryTypographyProps={{ color: 'text.secondary' }}
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={settings.showStats}
                        onChange={() => handleToggleSetting('showStats')}
                        color="primary"
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </Box>
            </TabPanel>

            {/* Save Button */}
            <Box sx={{ p: 3, borderTop: 1, borderColor: 'rgba(139, 95, 191, 0.2)' }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  sx={{ 
                    color: 'text.secondary', 
                    borderColor: 'text.secondary',
                    minWidth: { xs: '100%', sm: 'auto' }
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSaveSettings}
                  sx={{ 
                    bgcolor: 'primary.main', 
                    color: 'black',
                    minWidth: { xs: '100%', sm: 'auto' },
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-1px)',
                      boxShadow: '0 4px 12px rgba(255, 105, 180, 0.3)'
                    }
                  }}
                >
                  Save Settings
                </Button>
              </Stack>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};