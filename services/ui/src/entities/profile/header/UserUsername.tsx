import { 
  Typography, IconButton
} from '@mui/material';
import Edit from '@mui/icons-material/Edit';

type UserUsernameProps = {
    username: string;
    onEditProfile?: () => void;
}

export const UserUsername = ({username, onEditProfile}: UserUsernameProps) => {
    return (
        <>
            <Typography variant="h5" sx={{ color: 'white', mb: 0.5 }}>
                {username}
            </Typography>
            {onEditProfile && (
                <IconButton onClick={onEditProfile} size="small" sx={{ color: 'primary.main' }}>
                <Edit fontSize="small" />
                </IconButton>
            )}
        </>
    )
}