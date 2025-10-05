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

type DollFormData = {
  name: string;
  character: string;
  series: string;
  year: number;
  images: string[];
  description: string;
};


const AddDollModal = ({ isOpen, onClose, onSubmit }) => {

    const [mode, setMode] = useState<'official' | 'custom'>('official');
    const [formData, setFormData] = useState<DollFormData>({
        name: '',
        character: '',
        series: '',
        year: 2025,
        images: [],
        description: ''
    });

    const handleDollNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setFormData(prev => ({
            ...prev,
            name: e.target.value
        }));
    }
    
    const handleDollCharacterChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setFormData(prev => ({
            ...prev,
            character: e.target.value
        }));
    }

    const handleDollSeriesChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setFormData(prev => ({
            ...prev,
            series: e.target.value
        }));
    }
    
    const handleDollYearChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setFormData(prev => ({
            ...prev,
            year: Number(e.target.value)
        }));
    }

    const handleAddDollImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        // читаем все файлы и конвертируем в base64
        const readers = files.map(file => {
        return new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
        });
        });

        Promise.all(readers).then((newImages) => {
            setFormData(prev => ({
                ...prev,
                images: [...prev.images, ...newImages]
            }));
        });
    };

    const handleRemoveImage = (index: number) => {
        setFormData(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleReorderImages = (newOrder: string[]) => {
      setFormData(prev => ({
        ...prev,
        images: newOrder,
      }))
    }


    const handleDollDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setFormData(prev => ({
            ...prev,
            description: e.target.value
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

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>

            <AddDollTextField name={'name'} label={'Doll Name'} value={formData.name} onChange={handleDollNameChange} placeholder={'e.g., Draculaura, Clawdeen Wolf'} />
            <AddDollTextField name={'character'} label={'Character Type'} value={formData.character} onChange={handleDollCharacterChange} placeholder={'e.g., Vampire, Werewolf, Zombie'} />
            
            <Stack direction="row" spacing={1} width="100%">
                <AddDollTextField sx={{width: "50%"}} name={'series'} label={'Series'} value={formData.series} onChange={handleDollSeriesChange} placeholder={'e.g., Original, G3'} />
                <AddDollTextField sx={{width: "50%"}} name={'year'} label={'Year'} value={formData.year} onChange={handleDollYearChange} placeholder={'e.g., 2020'} />
            </Stack>

            <AddDollImageField images={formData.images} handleAddImages={handleAddDollImageChange} handleRemoveImage={handleRemoveImage} handleReorderImages={handleReorderImages}/>
            <AddDollTextField name={'description'} label={'Description'} value={formData.description} onChange={handleDollDescriptionChange} placeholder={'Special details about this doll...'} multiline rows={3} />

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

  export default AddDollModal;