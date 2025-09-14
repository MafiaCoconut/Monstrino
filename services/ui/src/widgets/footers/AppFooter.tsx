import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Container,
  Stack,
  IconButton
} from '@mui/material';
import { Favorite, GitHub, Twitter, Instagram, Email } from '@mui/icons-material';

const AppFooter = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'background.default',
        borderTop: 1,
        borderColor: 'rgba(139, 95, 191, 0.2)',
        py: 3,
        mt: 'auto'
      }}
    >
      <Container maxWidth="xl">
        <Stack 
          direction={{ xs: 'column', md: 'row' }} 
          justifyContent="space-between" 
          alignItems="center"
          spacing={2}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              © {currentYear} Monstrino. Made with
            </Typography>
            <Favorite sx={{ color: 'primary.main', fontSize: 16 }} />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              for monster fans everywhere.
            </Typography>
          </Box>
          
          <Stack direction="row" spacing={1}>
            <IconButton size="small" sx={{ color: 'primary.main' }}>
              <Instagram />
            </IconButton>
            <IconButton size="small" sx={{ color: 'primary.main' }}>
              <Twitter />
            </IconButton>
            <IconButton size="small" sx={{ color: 'primary.main' }}>
              <GitHub />
            </IconButton>
            <IconButton size="small" sx={{ color: 'primary.main' }}>
              <Email />
            </IconButton>
          </Stack>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2}
            alignItems="center"
            sx={{ mt: 2 }}
          >
            <Typography 
              variant="caption" 
              onClick={() => navigate('/help')}
              sx={{ 
                color: 'text.secondary',
                cursor: 'pointer',
                '&:hover': { color: 'primary.main' }
              }}
            >
              Help Center
            </Typography>
            <Typography 
              variant="caption" 
              onClick={() => navigate('/privacy')}
              sx={{ 
                color: 'text.secondary',
                cursor: 'pointer',
                '&:hover': { color: 'primary.main' }
              }}
            >
              Privacy Policy
            </Typography>
            <Typography 
              variant="caption" 
              onClick={() => navigate('/terms')}
              sx={{ 
                color: 'text.secondary',
                cursor: 'pointer',
                '&:hover': { color: 'primary.main' }
              }}
            >
              Terms of Service
            </Typography>
            <Typography 
              variant="caption" 
              onClick={() => navigate('/about')}
              sx={{ 
                color: 'text.secondary',
                cursor: 'pointer',
                '&:hover': { color: 'primary.main' }
              }}
            >
              About Us
            </Typography>
            <Typography 
              variant="caption" 
              onClick={() => navigate('/contact')}
              sx={{ 
                color: 'text.secondary',
                cursor: 'pointer',
                '&:hover': { color: 'primary.main' }
              }}
            >
              Contact
            </Typography>
          </Stack>
        </Stack>
        
        <Box textAlign="center" sx={{ mt: 2 }}>
          <Typography 
            variant="caption" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.4)',
              fontFamily: '"Fira Code", monospace',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}
          >
            EMBRACE YOUR INNER MONSTER • BE FREAKY, BE FABULOUS, BE YOU
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default AppFooter;