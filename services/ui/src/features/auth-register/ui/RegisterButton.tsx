import { Button, useTheme } from "@mui/material"

type RegisterButtonProps = {
    disabled?: boolean;
}

export const RegisterButton = ({ disabled=false }: RegisterButtonProps) => {
    const theme = useTheme();
    
    return (
        <Button
            type="submit"
            fullWidth
            disabled={disabled}
            sx={{
                mt: 1,
                borderRadius: 999,
                px: 3,
                py: 1.5,
                bgcolor: theme.palette.monstrino.pink,
                color: '#0a0a0a',
                fontFamily: 'Fira Code, monospace',
                fontSize: 12,
                letterSpacing: '0.09em',
                textTransform: 'uppercase',
                transition: 'all .3s ease',
                '&:hover': {
                    bgcolor: theme.palette.monstrino.pink,
                    transform: 'scale(1.02)',
                    boxShadow: `0 10px 24px ${theme.palette.monstrino.pink}`,
                },
            }}
        >
            Create Account
        </Button>
    )
}