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
import { alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

export const PublicHeader = (props: any) => {
  const { onOpenAuth = "" } = props;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const C = {
    black: '#0a0a0a',
    white: '#ffffff',
    purple: '#8b5fbf',
    pink: '#ff69b4',
  };

  const linkSX = {
    color: C.pink,
    fontFamily: 'Inter, sans-serif',
    textTransform: 'none',
    fontSize: 14,
    '&:hover': { color: C.white, backgroundColor: 'transparent' },
  };

  const ctaSX = {
    borderRadius: 999,
    px: 3,
    py: 1,
    fontFamily: 'Fira Code, monospace',
    fontSize: 12,
    letterSpacing: '0.09em',
    textTransform: 'uppercase',
    bgcolor: C.purple,
    color: C.white,
    border: `1px solid ${C.purple}`,
    '&:hover': { bgcolor: alpha(C.purple, 0.9), borderColor: C.purple },
  };

  return (
    
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        top: 0,
        bgcolor: alpha(C.black, 0.9),
        color: C.white,
        backdropFilter: 'blur(8px)',
        borderBottom: `1px solid ${alpha(C.purple, 0.2)}`,
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
                color: C.pink,
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
                color: C.purple,
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
              disabled={true}
              // onClick={() => onOpenAuth && onOpenAuth('login')}
              sx={linkSX}
            >
              Login
            </Button>
            <Button
              disabled={true}
              // onClick={() => onOpenAuth && onOpenAuth('register')}
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
              color: C.pink,
              '&:hover': { color: C.white },
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
              borderTop: `1px solid ${alpha(C.purple, 0.2)}`,
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

              <Divider sx={{ my: 1.5, borderColor: alpha(C.purple, 0.2) }} />

              <Button disabled={true}
                // onClick={() => onOpenAuth && onOpenAuth('login')}
                sx={{ ...linkSX, justifyContent: 'flex-start' }}
              >
                Login
              </Button>
              <Button disabled={true} 
                // onClick={() => onOpenAuth && onOpenAuth('register')}
                sx={{ ...ctaSX, alignSelf: 'flex-start' }}
              >
                Join Now
              </Button>
            </Stack>
          </Box>
        </Container>
      </Collapse>
    </AppBar>
  );
};