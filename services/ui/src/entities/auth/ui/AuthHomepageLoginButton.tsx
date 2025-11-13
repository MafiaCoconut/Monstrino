import { Button, useTheme } from "@mui/material"
import { alpha } from "@mui/material/styles";
import { ArrowRight } from "lucide-react";

type AuthHomepageLoginButtonProps = {
    title: string,
    onClick: () => void,

}
export const AuthHomepageLoginButton = ({ title, onClick }: AuthHomepageLoginButtonProps) => {
    const theme = useTheme();
    return(
        <Button
            size="large"
            variant="outlined"
            disabled={import.meta.env.VITE_REGISTRATION_DISABLED}
            onClick={onClick}
            sx={{
            px: 4,
            py: 1.5,
            borderRadius: 999,
            color: theme.palette.monstrino.white,
            borderColor: theme.palette.monstrino.white,
            fontFamily: "Fira Code, monospace",
            fontSize: 12,
            letterSpacing: "0.09em",
            textTransform: "uppercase",
            bgcolor: "transparent",
            transition: "all .3s ease",
            "&:hover": { bgcolor: alpha(theme.palette.monstrino.white, 0.1), borderColor: theme.palette.monstrino.white, transform: "scale(1.03)" },
            }}
        >
            {title}
        </Button>
    )
}