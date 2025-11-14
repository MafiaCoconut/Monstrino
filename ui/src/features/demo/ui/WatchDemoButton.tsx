import { useTheme } from "@mui/material";
import Button from "@mui/material/Button"
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Context } from "@/main";

export const WatchDemoButton = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const { userStore } = useContext(Context);
    

    const onClick = async () => {
        // let success = await userStore.login("demouser@monstrino.com", "DemoUserPassword123")
        // if (success) {
        navigate(`/users/${userStore.user.username}`);
        // } else {
        //     alert("Failed to login as demo user. Please try again later.");
        // }
    }
    return (
        <Button
            onClick={onClick}
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
                transition: 'all 0.3s ease',
                boxShadow: '0 0 0 transparent',
                transform: 'scale(1)',
                '&:hover': {
                    transform: 'scale(1.08)',
                    boxShadow: '0 6px 14px rgba(0,0,0,0.15)',
                    bgcolor: theme.palette.monstrino.pink,  
                },
                '&:active': {
                    transform: 'scale(0.98)',
                },
            }}
        >
            Watch Demo
        </Button>
)
}