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
  Grid
} from '@mui/material';
import Close from '@mui/icons-material/Close';
import Add from '@mui/icons-material/Add';
import CloudUpload from '@mui/icons-material/CloudUpload';

const AddDollModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    character: '',
    series: '',
    year: new Date().getFullYear(),
    image: '',
    description: ''
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
    if (formData.name.trim() && formData.character.trim()) {
      onSubmit(formData);
      setFormData({
        name: '',
        character: '',
        series: '',
        year: new Date().getFullYear(),
        image: '',
        description: ''
      });
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
          <Add sx={{ color: 'primary.main' }} />
          <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 800 }}>
            Add New Doll
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
            label="Doll Name *"
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
            placeholder="e.g., Draculaura, Clawdeen Wolf"
          />

          <TextField
            name="character"
            label="Character Type *"
            value={formData.character}
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
            placeholder="e.g., Vampire, Werewolf, Zombie"
          />

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid size={{ xs: 6 }}>
              <TextField
                name="series"
                label="Series"
                value={formData.series}
                onChange={handleInputChange}
                fullWidth
                InputLabelProps={{
                  sx: { 
                    color: 'text.secondary',
                    fontFamily: '"Fira Code", monospace',
                    textTransform: 'uppercase',
                    fontSize: '0.75rem'
                  }
                }}
                placeholder="e.g., Original, G3"
              />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <TextField
                name="year"
                label="Year"
                type="number"
                value={formData.year}
                onChange={handleInputChange}
                fullWidth
                inputProps={{
                  min: 2010,
                  max: new Date().getFullYear()
                }}
                InputLabelProps={{
                  sx: { 
                    color: 'text.secondary',
                    fontFamily: '"Fira Code", monospace',
                    textTransform: 'uppercase',
                    fontSize: '0.75rem'
                  }
                }}
              />
            </Grid>
          </Grid>

          <TextField
            name="image"
            label="Image URL (Optional)"
            value={formData.image}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 3 }}
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
            placeholder="https://example.com/doll-image.jpg"
          />

          <TextField
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={3}
            InputLabelProps={{
              sx: { 
                color: 'text.secondary',
                fontFamily: '"Fira Code", monospace',
                textTransform: 'uppercase',
                fontSize: '0.75rem'
              }
            }}
            placeholder="Special details about this doll..."
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
          Add Doll
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDollModal;