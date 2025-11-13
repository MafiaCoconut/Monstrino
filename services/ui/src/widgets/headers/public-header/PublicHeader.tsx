import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import {
    AppBar,
    Toolbar,
    Container,
    Box,
    Typography,
    Stack,
    Button,
    IconButton,
    Collapse,
    Divider,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { AuthLoginModal, AuthRegisterModal } from '../../auth';

export const PublicHeader = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const theme = useTheme();

    const [isAuthRegisterModalOpen, setIsAuthRegisterModalOpen] = useState(false);
    const [isAuthLoginModalOpen,    setIsAuthLoginModalOpen]    = useState(false);

    const linkSX = {
        color: theme.palette.monstrino.pink,
        fontFamily: 'Inter, sans-serif',
        textTransform: 'none',
        fontSize: 14,
        '&:hover': { color: theme.palette.monstrino.white, backgroundColor: 'transparent' },
    };

    const ctaSX = {
        borderRadius: 999,
        px: 3,
        py: 1,
        fontFamily: 'Fira Code, monospace',
        fontSize: 12,
        letterSpacing: '0.09em',
        textTransform: 'uppercase',
        bgcolor: theme.palette.monstrino.purple,
        color: theme.palette.monstrino.white,
        border: `1px solid ${theme.palette.monstrino.purple}`,
        '&:hover': { bgcolor: alpha(theme.palette.monstrino.purple, 0.9), borderColor: theme.palette.monstrino.purple },
    };

    return (
        <AppBar
        position="fixed"
        elevation={0}
        sx={{
            top: 0,
            bgcolor: alpha(theme.palette.monstrino.black, 0.9),
            color: theme.palette.monstrino.white,
            backdropFilter: 'blur(8px)',
            borderBottom: `1px solid ${alpha(theme.palette.monstrino.purple, 0.2)}`,
            zIndex: (t) => t.zIndex.appBar,
        }}
        >
            <Container maxWidth="lg">
                <Toolbar sx={{ height: { xs: 64, lg: 80 }, px: { xs: 0 } }}>
                {/* Logo */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography
                    onClick={() => {navigate('/')}}
                    
                    sx={{
                        fontFamily: 'Inter, Helvetica Neue, Arial, sans-serif',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '-0.02em',
                        color: theme.palette.monstrino.pink,
                        fontSize: { xs: '1.25rem', lg: '1.5rem' },
                        lineHeight: 1,
                        cursor: 'pointer'
                    }}
                    >
                    MONSTRINO
                    </Typography>
                    <Typography
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        fontFamily: 'Fira Code, monospace',
                        color: theme.palette.monstrino.purple,
                        letterSpacing: '0.1em',
                        fontSize: 12,
                    }}
                    >
                    MONSTER HIGH SOCIAL
                    </Typography>
                </Box>

                <Box sx={{ flex: 1 }} />

                {/* Desktop Navigation */}
                <Stack
                    direction="row"
                    spacing={3}
                    alignItems="center"
                    sx={{ display: { xs: 'none', md: 'flex' } }}
                >
                    <Button disabled={true} component="a" href="#features" sx={linkSX}>
                    Features
                    </Button>
                    <Button disabled={true} component="a" href="#community" sx={linkSX}>
                    Community
                    </Button>
                    <Button disabled={true} component="a" href="#about" sx={linkSX}>
                    About
                    </Button>
                </Stack>

                {/* Desktop Auth Buttons */}
                <Stack
                    direction="row"
                    spacing={1.5}
                    alignItems="center"
                    sx={{ display: { xs: 'none', md: 'flex' }, ml: 3 }}
                >
                    <Button
                        disabled={import.meta.env.VITE_LOGIN_DISABLED}
                        onClick={() =>setIsAuthLoginModalOpen(true)}
                        sx={linkSX}
                    >
                        Login
                    </Button>
                    <Button
                        disabled={import.meta.env.VITE_REGISTRATION_DISABLED}
                        onClick={() =>setIsAuthRegisterModalOpen(true)}
                        sx={ctaSX}
                    >
                        Join Now
                    </Button>
                </Stack>

                {/* Mobile Menu Button */}
                <IconButton
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    sx={{
                    display: { xs: 'inline-flex', md: 'none' },
                    ml: 1,
                    color: theme.palette.monstrino.pink,
                    '&:hover': { color: theme.palette.monstrino.white },
                    }}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </IconButton>
                </Toolbar>
            </Container>

            {/* Mobile Menu */}
            <Collapse in={isMobileMenuOpen} unmountOnExit timeout={200}>
                <Container maxWidth="lg" sx={{ display: { md: 'none' } }}>
                <Box
                    sx={{
                    borderTop: `1px solid ${alpha(theme.palette.monstrino.purple, 0.2)}`,
                    py: 2,
                    }}
                >
                    <Stack component="nav" spacing={1.5}>
                    <Button disabled={true} component="a" href="#features" sx={{ ...linkSX, justifyContent: 'flex-start' }}>
                        Features
                    </Button>
                    <Button disabled={true} component="a" href="#community" sx={{ ...linkSX, justifyContent: 'flex-start' }}>
                        Community
                    </Button>
                    <Button disabled={true} component="a" href="#about" sx={{ ...linkSX, justifyContent: 'flex-start' }}>
                        About
                    </Button>

                    <Divider sx={{ my: 1.5, borderColor: alpha(theme.palette.monstrino.purple, 0.2) }} />

                    <Button
                        onAbort={() =>setIsAuthLoginModalOpen(true)}
                        // onClick={() => onOpenAuth && onOpenAuth('login')}
                        sx={{ ...linkSX, justifyContent: 'flex-start' }}
                    >
                        Login
                    </Button>
                    <Button
                        onClick={() =>setIsAuthRegisterModalOpen(true)}
                        sx={{ ...ctaSX, alignSelf: 'flex-start' }}
                    >
                        Join Now
                    </Button>
                    </Stack>
                </Box>
                </Container>
            </Collapse>

            <AuthRegisterModal isOpen={isAuthRegisterModalOpen} onClose={() => setIsAuthRegisterModalOpen(false)} />
            <AuthLoginModal isOpen={isAuthLoginModalOpen} onClose={() => setIsAuthLoginModalOpen(false)} />        

        </AppBar>
    );
};