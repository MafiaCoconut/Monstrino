import { Dialog } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AuthModalTitle } from '@/entities/auth';
import { AuthLoginBody } from './AuthLoginBody';

type AuthLoginModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

export const AuthLoginModal = ({ isOpen, onClose }: AuthLoginModalProps) => {
    const theme = useTheme();
    
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
            <AuthModalTitle text="Log In" onClose={onClose} />
            <AuthLoginBody onClose={onClose}/>
        </Dialog>
    )}