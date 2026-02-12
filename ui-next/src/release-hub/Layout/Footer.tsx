'use client';

import {
  Box,
  Container,
  Divider,
  IconButton,
  Link as MuiLink,
  Typography,
  Grid,
} from "@mui/material";
import { Link } from '@/shared/router';

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
  info: [
    { label: 'About', path: '/info/about' },
    { label: 'Support', path: '/info/support' },
    { label: 'Contact', path: '/info/contact' },
  ],
  legal: [
    { label: 'Privacy', path: '/legal/privacy' },
    { label: 'Terms', path: '/legal/terms' },
    { label: 'Impressum', path: '/legal/impressum' },
  ],
  // community: [
  //   { label: 'Discord', path: '#' },
  //   { label: 'Twitter', path: '#' },
  //   { label: 'Instagram', path: '#' },
  // ],
  resources: [
    { label: 'API', path: '/docusaurus/' },
    { label: 'Documentation', path: '/docusaurus/' },
    { label: 'Contribute', path: '/docusaurus/' },
  ],
};

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        pt: { xs: 4, sm: 6, md: 8 },
        pb: { xs: 3, sm: 4 },
        borderTop: '1px solid',
        borderColor: 'divider',
        background: 'linear-gradient(180deg, transparent 0%, rgba(20, 20, 32, 0.5) 100%)',
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3 } }}>
        <Grid container spacing={{ xs: 3, sm: 4, md: 6 }} sx={{ display: { xs: 'none', md: 'flex' } }}>
          {/* Brand */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: { xs: 1.5, sm: 2 } }}>
              <AutoAwesomeIcon sx={{ color: 'primary.main', fontSize: { xs: 20, sm: 24 } }} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '1.125rem', sm: '1.25rem' },
                  background: 'linear-gradient(135deg, #FF1493 0%, #00D4FF 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Monstrino
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: { xs: 2, sm: 3 }, maxWidth: { xs: '100%', md: 300 }, fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}>
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
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: { xs: 1.5, sm: 2 }, color: 'text.primary', fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}>
              Catalog
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1, sm: 1.5 } }}>
              {footerLinks.catalog.map((link) => (
                <MuiLink
                  key={link.path}
                  component={Link}
                  to={link.path}
                  sx={{
                    color: 'text.secondary',
                    textDecoration: 'none',
                    fontSize: { xs: '0.8125rem', sm: '0.875rem' },
                    '&:hover': { color: 'primary.main' },
                  }}
                >
                  {link.label}
                </MuiLink>
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: { xs: 1.5, sm: 2 }, color: 'text.primary', fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}>
              Info
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1, sm: 1.5 } }}>
              {footerLinks.info.map((link) => (
                <MuiLink
                  key={link.path}
                  component={Link}
                  to={link.path}
                  sx={{
                    color: 'text.secondary',
                    textDecoration: 'none',
                    fontSize: { xs: '0.8125rem', sm: '0.875rem' },
                    '&:hover': { color: 'primary.main' },
                  }}
                >
                  {link.label}
                </MuiLink>
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: { xs: 1.5, sm: 2 }, color: 'text.primary', fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}>
              Legal
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1, sm: 1.5 } }}>
              {footerLinks.legal.map((link) => (
                <MuiLink
                  key={link.path}
                  component={Link}
                  to={link.path}
                  sx={{
                    color: 'text.secondary',
                    textDecoration: 'none',
                    fontSize: { xs: '0.8125rem', sm: '0.875rem' },
                    '&:hover': { color: 'primary.main' },
                  }}
                >
                  {link.label}
                </MuiLink>
              ))}
            </Box>
          </Grid>

          {/* <Grid size={{ xs: 6, sm: 4, md: 2 }}>
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
          </Grid> */}

          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: { xs: 1.5, sm: 2 }, color: 'text.primary', fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}>
              Resources
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1, sm: 1.5 } }}>
              {footerLinks.resources.map((link) => (
                <MuiLink
                  key={link.label}
                  href={link.path}
                  sx={{
                    color: 'text.secondary',
                    textDecoration: 'none',
                    fontSize: { xs: '0.8125rem', sm: '0.875rem' },
                    '&:hover': { color: 'primary.main' },
                  }}
                >
                  {link.label}
                </MuiLink>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AutoAwesomeIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 800,
                    fontSize: '1rem',
                    background: 'linear-gradient(135deg, #FF1493 0%, #00D4FF 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Monstrino
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 0.5 }}>
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
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8125rem', lineHeight: 1.6 }}>
              The ultimate catalog platform for Monster High collectors. Track releases, discover characters, and connect with the community.
            </Typography>

            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary', fontSize: '0.8125rem', mb: 1 }}>
                  Catalog
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                  {footerLinks.catalog.map((link) => (
                    <MuiLink
                      key={link.path}
                      component={Link}
                      to={link.path}
                      sx={{
                        color: 'text.secondary',
                        textDecoration: 'none',
                        fontSize: '0.8125rem',
                        py: 0.25,
                        '&:hover': { color: 'primary.main' },
                      }}
                    >
                      {link.label}
                    </MuiLink>
                  ))}
                </Box>
              </Grid>

              <Grid size={{ xs: 6 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary', fontSize: '0.8125rem', mb: 1 }}>
                  Info
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                  {footerLinks.info.map((link) => (
                    <MuiLink
                      key={link.path}
                      component={Link}
                      to={link.path}
                      sx={{
                        color: 'text.secondary',
                        textDecoration: 'none',
                        fontSize: '0.8125rem',
                        py: 0.25,
                        '&:hover': { color: 'primary.main' },
                      }}
                    >
                      {link.label}
                    </MuiLink>
                  ))}
                </Box>
              </Grid>

              <Grid size={{ xs: 6 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary', fontSize: '0.8125rem', mb: 1 }}>
                  Legal
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                  {footerLinks.legal.map((link) => (
                    <MuiLink
                      key={link.path}
                      component={Link}
                      to={link.path}
                      sx={{
                        color: 'text.secondary',
                        textDecoration: 'none',
                        fontSize: '0.8125rem',
                        py: 0.25,
                        '&:hover': { color: 'primary.main' },
                      }}
                    >
                      {link.label}
                    </MuiLink>
                  ))}
                </Box>
              </Grid>

              <Grid size={{ xs: 6 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary', fontSize: '0.8125rem', mb: 1 }}>
                  Resources
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                  {footerLinks.resources.map((link) => (
                    <MuiLink
                      key={link.label}
                      href={link.path}
                      sx={{
                        color: 'text.secondary',
                        textDecoration: 'none',
                        fontSize: '0.8125rem',
                        py: 0.25,
                        '&:hover': { color: 'primary.main' },
                      }}
                    >
                      {link.label}
                    </MuiLink>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Divider sx={{ my: { xs: 3, sm: 4 } }} />

        <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'space-between' }, alignItems: 'center', flexWrap: 'wrap', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
            © {new Date().getFullYear()} Monstrino. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: { xs: 2, sm: 3 } }}>
            <MuiLink
              component={Link}
              to="/legal/privacy"
              sx={{ color: 'text.secondary', textDecoration: 'none', fontSize: { xs: '0.6875rem', sm: '0.75rem' }, '&:hover': { color: 'text.primary' } }}
            >
              Privacy Policy
            </MuiLink>
            <MuiLink
              component={Link}
              to="/legal/terms"
              sx={{ color: 'text.secondary', textDecoration: 'none', fontSize: { xs: '0.6875rem', sm: '0.75rem' }, '&:hover': { color: 'text.primary' } }}
            >
              Terms of Service
            </MuiLink>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
