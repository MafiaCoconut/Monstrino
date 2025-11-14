import React, { useState } from 'react';
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Stack,
  Avatar
} from '@mui/material';
import Close from '@mui/icons-material/Close';
import Person from '@mui/icons-material/Person';
import CloudUpload from '@mui/icons-material/CloudUpload';

const EditUserProfileModal = ({ isOpen, onClose, userData, onSubmit }) => {
  const [formData, setFormData] = useState({
    username: userData?.username || '',
    bio: userData?.bio || '',
    avatar: userData?.avatar || ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
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
          <Person sx={{ color: 'primary.main' }} />
          <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 800 }}>
            Edit Profile
          </Typography>
        </Stack>
        <IconButton onClick={onClose} sx={{ color: 'text.secondary' }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ bgcolor: 'background.default' }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          {/* Avatar Preview */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Avatar
              src={formData.avatar}
              sx={{
                width: 80,
                height: 80,
                bgcolor: 'primary.main',
                fontSize: '2rem',
                fontWeight: 'bold',
                color: 'black'
              }}
            >
              {!formData.avatar && formData.username.charAt(0).toUpperCase()}
            </Avatar>
          </Box>

          <TextField
            name="username"
            label="Username"
            value={formData.username}
            onChange={handleInputChange}
            fullWidth
            required
            sx={{ mb: 3 }}
            InputLabelProps={{
              sx: { 
                color: 'text.secondary',
                fontFamily: '"Fira Code", monospace',
                textTransform: 'uppercase',
                fontSize: '0.75rem'
              }
            }}
          />

          <TextField
            name="bio"
            label="Bio"
            value={formData.bio}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={3}
            sx={{ mb: 3 }}
            InputLabelProps={{
              sx: { 
                color: 'text.secondary',
                fontFamily: '"Fira Code", monospace',
                textTransform: 'uppercase',
                fontSize: '0.75rem'
              }
            }}
            placeholder="Tell us about yourself..."
          />

          <TextField
            name="avatar"
            label="Avatar URL (Optional)"
            value={formData.avatar}
            onChange={handleInputChange}
            fullWidth
            InputProps={{
              startAdornment: <CloudUpload sx={{ color: 'secondary.main', mr: 1 }} />,
            }}
            InputLabelProps={{
              sx: { 
                color: 'text.secondary',
                fontFamily: '"Fira Code", monospace',
                textTransform: 'uppercase',
                fontSize: '0.75rem'
              }
            }}
            placeholder="https://example.com/avatar.jpg"
          />
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
          variant="outlined"
          sx={{ 
            borderColor: 'rgba(255, 255, 255, 0.3)',
            color: 'white'
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit}
          variant="contained"
          sx={{ 
            bgcolor: 'primary.main',
            color: 'black'
          }}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserProfileModal;