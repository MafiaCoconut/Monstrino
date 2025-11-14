import { Box, Container, Toolbar, Typography, useTheme } from "@mui/material"
import { useNavigate } from "react-router-dom"

export const DesktopPublicHeader = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    return (
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
            onClick={() =>setIsAuthLoginModalOpen(true)}
        sx={linkSX}
        >
        Login
        </Button>
        <Button
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

    )
}