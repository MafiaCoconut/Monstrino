import { Button, useTheme } from "@mui/material"
import { alpha } from "@mui/material/styles";
import { ArrowRight } from "lucide-react";

type AuthHomepageRegisterButtonProps = {
    title: string,
    onClick: () => void,

}
export const AuthHomepageRegisterButton = ({ title, onClick }: AuthHomepageRegisterButtonProps) => {
    const theme = useTheme();
    return(
        <Button
            size="large"
            onClick={onClick}
            endIcon={<ArrowRight size={16} />}
            disabled={import.meta.env.VITE_REGISTRATION_DISABLED}
            sx={{
            px: 4,
            py: 1.5,
            borderRadius: 999,
            bgcolor: theme.palette.monstrino.pink,
            color: theme.palette.monstrino.black,
            border: `1px solid ${theme.palette.monstrino.pink}`,
            fontFamily: "Fira Code, monospace",
            fontSize: 12,
            letterSpacing: "0.09em",
            textTransform: "uppercase",
            transition: "all .3s ease",
            "&:hover": {
                bgcolor: alpha(theme.palette.monstrino.pink, 0.9),
                boxShadow: `0 8px 24px ${alpha(theme.palette.monstrino.pink, 0.25)}`,
                transform: "scale(1.03)",
            },
            }}
        >
            {title}
        </Button>
    )
}