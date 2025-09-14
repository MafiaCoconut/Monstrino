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
import { Close, FolderOpen, CloudUpload } from '@mui/icons-material';

const CreateCollectionModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    coverImage: ''
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
    if (formData.name.trim()) {
      onSubmit(formData);
      setFormData({ name: '', description: '', coverImage: '' });
    }
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
          <FolderOpen sx={{ color: 'primary.main' }} />
          <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 800 }}>
            Create Collection
          </Typography>
        </Stack>
        <IconButton onClick={onClose} sx={{ color: 'text.secondary' }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ bgcolor: 'background.default' }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            name="name"
            label="Collection Name"
            value={formData.name}
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
            placeholder="Enter collection name"
          />

          <TextField
            name="description"
            label="Description"
            value={formData.description}
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
            placeholder="Describe your collection..."
          />

          <TextField
            name="coverImage"
            label="Cover Image URL (Optional)"
            value={formData.coverImage}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
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
            placeholder="https://example.com/image.jpg"
          />

          {formData.coverImage && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
                Preview
              </Typography>
              <Box 
                component="img"
                src={formData.coverImage}
                alt="Cover preview"
                sx={{
                  width: '100%',
                  height: 150,
                  objectFit: 'cover',
                  borderRadius: 1,
                  bgcolor: 'rgba(0, 0, 0, 0.5)'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </Box>
          )}
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
          Create Collection
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateCollectionModal;