import Add from "@mui/icons-material/Add"
import { Button, Typography } from "@mui/material"

type CreateCollectionButtonProps = {
    text: string,
    onClick?: () => void;
}

export const CreateCollectionButton = ({ text, onClick }: CreateCollectionButtonProps) => {
    return (
        <Button
            disabled={true}
            variant="contained"
            startIcon={<Add />}
            onClick={onClick}
            sx={{
                bgcolor: 'secondary.main',
                color: 'white',
                minWidth: { xs: '100%', sm: 'auto' },
                py: { xs: 1.5, md: 1 },
                fontSize: { xs: '0.9rem', md: '0.875rem' },
                transition: 'all 0.2s ease',
                '&:hover': {
                    bgcolor: 'secondary.dark',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(168, 85, 247, 0.3)'
                }
            }}
        >
            {text}
        </Button>

    )
}
