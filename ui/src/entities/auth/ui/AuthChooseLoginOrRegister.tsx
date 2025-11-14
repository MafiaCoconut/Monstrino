import { Button, Typography, useTheme } from "@mui/material"

type AuthChooseLoginOrRegisterProps = {
    mode: 'login' | 'register';
}

export const AuthChooseLoginOrRegister = ({ mode }: AuthChooseLoginOrRegisterProps) => {
    const theme = useTheme();

    const switchRegisterAndLogin = () => {

    }
    
    return (
        <Typography
              sx={{ textAlign: 'center', color: theme.palette.monstrino.white, fontSize: 14 }}
            >
              {mode === 'login' ? "Don't have an account?" : 'Already a monster?'}
              <Button
                type="button"
                onClick={switchRegisterAndLogin}
                sx={{
                  ml: 1,
                  p: 0,
                  minWidth: 0,
                  color: theme.palette.monstrino.pink,
                  textTransform: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                {mode === 'login' ? 'Join now' : 'Sign in'}
              </Button>
            </Typography>
    )
}