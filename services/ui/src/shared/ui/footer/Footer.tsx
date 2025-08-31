import React from 'react';
import { Heart, Github, Twitter, Instagram, Mail } from 'lucide-react';
import {
  Box,
  Container,
  Stack,
  Typography,
  IconButton,
  Link,
  Divider,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { alpha } from '@mui/material/styles';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const C = {
    black: '#0a0a0a',
    white: '#ffffff',
    purple: '#8b5fbf',
    pink: '#ff69b4',
    yellow: '#ffd93d',
    green: '#66cc66',
  };

  const sectionTitleSX = {
    fontWeight: 600,
    color: C.white,
    fontFamily: 'Fira Code, monospace',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    mb: 2,
  };

  const linkSX = {
    color: alpha(C.white, 0.7),
    textDecoration: 'none',
    transition: 'color .15s ease',
    '&:hover': { color: C.pink },
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: C.black,
        borderTop: `1px solid ${alpha(C.purple, 0.2)}`,
        py: { xs: 6, lg: 8 },
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, lg: 4 } }}>
        <Grid container spacing={{ xs: 3, md: 4, lg: 6 }}>
          {/* Brand Section */}
          <Grid size={{ xs:12, md: 6 }}>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography
                  sx={{
                    fontFamily: 'Inter, Helvetica Neue, Arial, sans-serif',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '-0.02em',
                    color: C.pink,
                    fontSize: { xs: '1.5rem', lg: '1.875rem' },
                    lineHeight: 1,
                  }}
                >
                  MONSTRINO
                </Typography>
              </Box>

              <Typography
                sx={{
                  color: alpha(C.white, 0.7),
                  maxWidth: 520,
                  lineHeight: 1.7,
                }}
              >
                The ultimate social network for Monster High fans. Connect with ghouls worldwide,
                share your monster moments, and embrace your freaky-fab side.
              </Typography>

              {/* Social Links */}
              <Stack direction="row" spacing={1.5} sx={{ mt: 1 }}>
                {[
                  { Icon: Instagram, label: 'Follow us on Instagram', href: '#' },
                  { Icon: Twitter, label: 'Follow us on Twitter', href: '#' },
                  { Icon: Github, label: 'Check our GitHub', href: '#' },
                  { Icon: Mail, label: 'Email us', href: '#' },
                ].map(({ Icon, label, href }) => (
                  <IconButton
                    key={label}
                    aria-label={label}
                    component="a"
                    href={href}
                    sx={{
                      bgcolor: alpha(C.white, 0.1),
                      color: C.pink,
                      p: 1.25,
                      borderRadius: '50%',
                      transition: 'all .3s ease',
                      '&:hover': {
                        bgcolor: C.pink,
                        color: C.black,
                        transform: 'scale(1.1)',
                      },
                    }}
                  >
                    <Icon size={20} />
                  </IconButton>
                ))}
              </Stack>
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs:12, md: 6 }}>
            <Typography sx={sectionTitleSX}>Quick Links</Typography>
            <Stack component="ul" spacing={1.25} sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {[
                { label: 'Features', href: '#features' },
                { label: 'Community', href: '#community' },
                { label: 'About Us', href: '#about' },
                { label: 'Contact', href: '#contact' },
              ].map(({ label, href }) => (
                <Box component="li" key={label}>
                  <Link href={href} sx={linkSX}>
                    {label}
                  </Link>
                </Box>
              ))}
            </Stack>
          </Grid>

          {/* Support */}
          <Grid size={{ xs:12, md: 6 }}>
            <Typography sx={sectionTitleSX}>Support</Typography>
            <Stack component="ul" spacing={1.25} sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {[
                { label: 'Help Center', href: '#help' },
                { label: 'Privacy Policy', href: '#privacy' },
                { label: 'Terms of Service', href: '#terms' },
                { label: 'Safety Guidelines', href: '#safety' },
              ].map(({ label, href }) => (
                <Box component="li" key={label}>
                  <Link href={href} sx={linkSX}>
                    {label}
                  </Link>
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>

        {/* Bottom Section */}
        <Divider sx={{ borderColor: alpha(C.purple, 0.2), mt: 6 }} />
        <Box
          sx={{
            mt: 3,
            pt: 2,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'center', md: 'center' },
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Typography sx={{ color: alpha(C.white, 0.6), fontSize: 14, textAlign: { xs: 'center', md: 'left' } }}>
            © {currentYear} Monstrino. All rights reserved. Made with{' '}
            <Box component="span" sx={{ mx: 0.5, display: 'inline-flex', verticalAlign: 'middle', color: C.pink }}>
              <Heart size={16} />
            </Box>
            for monster fans everywhere.
          </Typography>

          <Stack direction="row" spacing={3} sx={{ fontSize: 14 }}>
            <Link href="#monster-code" sx={linkSX}>
              Monster Code of Conduct
            </Link>
            <Link href="#accessibility" sx={linkSX}>
              Accessibility
            </Link>
          </Stack>
        </Box>

        <Typography
          sx={{
            textAlign: 'center',
            mt: 3,
            color: alpha(C.white, 0.4),
            fontSize: 12,
            fontFamily: 'Fira Code, monospace',
            letterSpacing: '0.12em',
          }}
        >
          EMBRACE YOUR INNER MONSTER • BE FREAKY, BE FABULOUS, BE YOU
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
