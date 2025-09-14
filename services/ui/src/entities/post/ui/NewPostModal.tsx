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
  Stack
} from '@mui/material';
import Close from '@mui/icons-material/Close';
import Edit from '@mui/icons-material/Edit';

export const NewPostModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    text: ''
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
    if (formData.text.trim()) {
      onSubmit(formData);
      setFormData({ title: '', text: '' });
    }
  };

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose}
      maxWidth="md"
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
          <Edit sx={{ color: 'primary.main' }} />
          <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 800 }}>
            Write Post
          </Typography>
        </Stack>
        <IconButton onClick={onClose} sx={{ color: 'text.secondary' }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ bgcolor: 'background.default' }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            name="title"
            label="Title (Optional)"
            value={formData.title}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 3 }}
            InputLabelProps={{
              sx: { 
                color: 'text.secondary',
                fontFamily: '"Fira Code", monospace',
                textTransform: 'uppercase',
                fontSize: '0.75rem'
              }
            }}
            placeholder="What's this post about?"
          />

          <TextField
            name="text"
            label="What's on your mind? *"
            value={formData.text}
            onChange={handleInputChange}
            fullWidth
            required
            multiline
            rows={6}
            sx={{ mb: 1 }}
            InputLabelProps={{
              sx: { 
                color: 'text.secondary',
                fontFamily: '"Fira Code", monospace',
                textTransform: 'uppercase',
                fontSize: '0.75rem'
              }
            }}
            placeholder="Share your thoughts with the monster community..."
            inputProps={{ maxLength: 500 }}
          />
          
          <Typography 
            variant="caption" 
            sx={{ 
              color: 'text.secondary',
              fontFamily: '"Fira Code", monospace',
              textAlign: 'right',
              display: 'block'
            }}
          >
            {formData.text.length}/500
          </Typography>
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
          Post
        </Button>
      </DialogActions>
    </Dialog>
  );
};