import { alpha, Button, Stack, TextField, useTheme } from "@mui/material"
import { useState } from "react"

export const EmailSubscribeWidget = () => {
    const [email, setEmail] = useState("")
    const [isSubscribed, setIsSubscribed] = useState(false)
    const theme = useTheme()
    const disabled = true;
    const handleSubscribe = (email: any) => {
        console.log('Subscribed:', email);
        setIsSubscribed(true);
        setTimeout(() => setIsSubscribed(false), 3000); // Reset after 3 seconds
    };

    const onClick = (e: any) => {
        e.preventDefault();
        if (email.trim()) {
            handleSubscribe(email.trim());
            setEmail("");
        }
    }

    return (
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            <TextField
                fullWidth
                type="email"
                required
                value={email}
                disabled={disabled}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email for monster updates"
                variant="outlined"
                InputProps={{
                    sx: {
                    bgcolor: alpha(theme.palette.monstrino.white, 0.1),
                    borderRadius: 999,
                    color: theme.palette.monstrino.white,
                    backdropFilter: "blur(4px)",
                    "& fieldset": { borderColor: alpha(theme.palette.monstrino.purple, 0.3) },
                    "&:hover fieldset": { borderColor: alpha(theme.palette.monstrino.purple, 0.5) },
                    "&.Mui-focused fieldset": { borderColor: theme.palette.monstrino.pink },
                    "::placeholder": { color: alpha(theme.palette.monstrino.white, 0.6) },
                    },
                }}
            />
            <Button
                type="submit"
                disabled={disabled}
                onClick={onClick}
                sx={{
                    px: 3,
                    py: 1.5,
                    borderRadius: 999,
                    fontFamily: "Fira Code, monospace",
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.09em",
                    whiteSpace: "nowrap",
                    bgcolor: isSubscribed ? theme.palette.monstrino.green : theme.palette.monstrino.purple,
                    color: theme.palette.monstrino.white,
                    "&:hover": { bgcolor: isSubscribed ? theme.palette.monstrino.green : alpha(theme.palette.monstrino.purple, 0.9) },
                }}
            >
                {isSubscribed ? "Subscribed!" : "Get Updates"}
            </Button>
        </Stack>
    )
}