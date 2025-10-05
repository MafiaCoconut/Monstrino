import { Typography, useTheme } from "@mui/material"

type AuthTitleTextFieldProps = {
    text: string;
}

export const AuthTitleTextField = ({text}: AuthTitleTextFieldProps) => {
    const theme = useTheme();
    return (
        <Typography
            sx={{
            fontFamily: 'Fira Code, monospace',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontSize: 12,
            // mb: 1,
            color: theme.palette.monstrino.white,
            }}
        >
            {text}
        </Typography>
    )
}