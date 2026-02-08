import {
  Box,
  Container,
  Divider,
  IconButton,
  Link as MuiLink,
  Typography,
  Grid,
} from "@mui/material";
import { Link } from 'react-router-dom';

import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';




const footerLinks = {
  catalog: [
    { label: 'Releases', path: '/catalog/r' },
    { label: 'Characters', path: '/catalog/c' },
    { label: 'Series', path: '/catalog/s' },
    { label: 'Pets', path: '/catalog/p' },
  ],
  community: [
    { label: 'Discord', path: '#' },
    { label: 'Twitter', path: '#' },
    { label: 'Instagram', path: '#' },
  ],
  resources: [
    { label: 'API', path: '#' },
    { label: 'Documentation', path: '#' },
    { label: 'Contribute', path: '#' },
  ],
};

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        pt: 8,
        pb: 4,
        borderTop: '1px solid',
        borderColor: 'divider',
        background: 'linear-gradient(180deg, transparent 0%, rgba(20, 20, 32, 0.5) 100%)',
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={6}>
          {/* Brand */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <AutoAwesomeIcon sx={{ color: 'primary.main', fontSize: 24 }} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #FF1493 0%, #00D4FF 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Monstrino
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 300 }}>
              The ultimate catalog platform for Monster High collectors. Track releases, discover characters, and connect with the community.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                <TwitterIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                <InstagramIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                <GitHubIcon fontSize="small" />
              </IconButton>
            </Box>
          </Grid>

          {/* Links */}
          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
              Catalog
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {footerLinks.catalog.map((link) => (
                <MuiLink
                  key={link.path}
                  component={Link}
                  to={link.path}
                  sx={{
                    color: 'text.secondary',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    '&:hover': { color: 'primary.main' },
                  }}
                >
                  {link.label}
                </MuiLink>
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
              Community
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {footerLinks.community.map((link) => (
                <MuiLink
                  key={link.label}
                  href={link.path}
                  sx={{
                    color: 'text.secondary',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    '&:hover': { color: 'primary.main' },
                  }}
                >
                  {link.label}
                </MuiLink>
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
              Resources
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {footerLinks.resources.map((link) => (
                <MuiLink
                  key={link.label}
                  href={link.path}
                  sx={{
                    color: 'text.secondary',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    '&:hover': { color: 'primary.main' },
                  }}
                >
                  {link.label}
                </MuiLink>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Monstrino. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <MuiLink href="#" sx={{ color: 'text.secondary', textDecoration: 'none', fontSize: '0.75rem', '&:hover': { color: 'text.primary' } }}>
              Privacy Policy
            </MuiLink>
            <MuiLink href="#" sx={{ color: 'text.secondary', textDecoration: 'none', fontSize: '0.75rem', '&:hover': { color: 'text.primary' } }}>
              Terms of Service
            </MuiLink>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
