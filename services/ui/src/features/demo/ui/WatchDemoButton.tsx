import { useTheme } from "@mui/material";
import Button from "@mui/material/Button"
import { useNavigate } from "react-router-dom";

export const WatchDemoButton = () => {
    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <Button
            onClick={ () => {navigate("/users/-1")}}
            sx={{
            px: 4,
            py: 1.25,
            borderRadius: 999,
            bgcolor: theme.palette.monstrino.pink,
            color: theme.palette.monstrino.black,
            fontFamily: 'Fira Code, monospace',
            fontSize: 12,
            letterSpacing: '0.09em',
            textTransform: 'uppercase',
            transition: 'all .3s ease',
            '&:hover': {
                bgcolor: theme.palette.monstrino.pink,
                transform: 'scale(1.03)',
                boxShadow: `0 16px 32px ${theme.palette.monstrino.pink}`,
            },
            }}
        >
            Watch Demo
        </Button>
)
}