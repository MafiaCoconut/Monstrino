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
import { AddDollButton } from '@/entities/doll/ui/AddDollButton';
import { AddDollImageField, AddDollTextField, DollsSourceModeButton } from '@/shared/ui/dolls';
import { ChangeEvent } from 'react';
import { AddDollCustomBody } from './AddDollCustomBody';

export type DollFormData = {
  name: string;
  character: string;
  series: string;
  year: number;
  images: string[];
  description: string;
};

type AddDollModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: DollFormData) => void;
}


export const AddDollModal = ({ isOpen, onClose, onSubmit }: AddDollModalProps) => {

    const [mode, setMode] = useState<'official' | 'custom'>('official');
    const [formData, setFormData] = useState<DollFormData>({
        name: '',
        character: '',
        series: '',
        year: 2025,
        images: [],
        description: ''
    });



  const handleSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (formData.name.trim() && formData.character.trim()) {
      onSubmit(formData);
      setFormData({
        name: '',
        character: '',
        series: '',
        year: new Date().getFullYear(),
        images: [],
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

        <Stack direction="row" spacing={1} sx={{ py: 2 }}>
          <DollsSourceModeButton mode={"official"} setMode={setMode} text={"Official"} variant={mode === 'official' ? 'contained' : 'outlined'}/>
          <DollsSourceModeButton mode={"custom"} setMode={setMode} text={"Custom"} variant={mode === 'custom' ? 'contained' : 'outlined'}/>
        </Stack>

        <AddDollCustomBody />
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
          disabled={true}
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