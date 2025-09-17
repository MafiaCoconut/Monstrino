import { 
  Typography, 
} from '@mui/material';

type UserStatusProps = {
    bio: string
}

export const UserStatus = ({bio}: UserStatusProps) => {
    return (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {bio}
        </Typography>
    )
}