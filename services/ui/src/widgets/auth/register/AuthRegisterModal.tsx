import { Box, Dialog, DialogContent, InputAdornment, Stack } from '@mui/material';
import React, { useState } from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import { AuthModalTitle } from '@/entities/auth';
import { AuthDataField } from '@/entities/auth/ui/AuthDataField';
import { User } from 'lucide-react';

type AuthRegisterModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

export const AuthRegisterModal = ({ isOpen, onClose }: AuthRegisterModalProps) => {
    const theme = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    agreeToTerms: false
    });

    const C = {
        black: '#0a0a0a',
        white: '#ffffff',
        purple: '#8b5fbf',
        pink: '#ff69b4',
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(`Registration attempt:`, formData);

        setTimeout(() => {
        alert('Registration successful! Welcome to Monstrino!');
        onClose && onClose();
        setFormData({
            email: '',
            password: '',
            confirmPassword: '',
            username: '',
            agreeToTerms: false
        });
        }, 1000);
    };

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            slotProps={{
            backdrop: {
                sx: {
                backgroundColor: 'rgba(0,0,0,.8)',
                backdropFilter: 'blur(4px)',
                },
            },
            }}
            PaperProps={{
            sx: {
                bgcolor: theme.palette.monstrino.black,
                color: theme.palette.monstrino.white,
                border: '1px',
                borderRadius: 2,
                maxHeight: '90vh',
            },
            }}
        >
            <AuthModalTitle text="Create an Account" onClose={onClose} />
            <DialogContent>
                <Box component="form" onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        <AuthDataField 
                            titleText={'Monster Name'} 
                            data={formData.username} 
                            onChange={handleInputChange} 
                            placeholder={'Enter your monster name'} 
                            name={'username'} 
                            inputAdornment={
                                <InputAdornment position="start">
                                    <User size={18} color={C.purple} />
                                </InputAdornment>
                            } 
                        />
                    </Stack>
                </Box>
            </DialogContent>
        </Dialog>
    )
}