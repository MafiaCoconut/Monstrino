import React, { useState } from 'react';
import { Outlet, useParams, useLocation, Link as RouterLink } from 'react-router-dom';
import {
  AppBar, Toolbar, Avatar, Typography, Container,
  Box, Button, ButtonGroup, LinearProgress,
  useMediaQuery,
  useTheme,
  IconButton
} from '@mui/material';
import LeftMenu from '@/widgets/LeftMenu';
import MenuOpen from '@mui/icons-material/MenuOpen';
import { PublicHeader } from '@/widgets/headers';
import { AppFooter } from '@/widgets/footers';

export function PublicLayout() {
    const { username = '' } = useParams<{ username: string }>();
    const location = useLocation();
    const base = `/users/${username}`;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const nav = [
    { to: base, label: 'Profile', end: true },
    { to: `${base}/collections`, label: 'Collections' },
    { to: `${base}/friends`, label: 'Friends' },
    { to: `${base}/groups`, label: 'Groups' },
    { to: `${base}/wishlist`, label: 'Wishlist' },
    ];

    const isActive = (to: string, end?: boolean) =>
    end ? location.pathname === to : location.pathname.startsWith(to);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column'}}>
        <PublicHeader />
        <Box display="flex">
            <Container sx={{ py: 10 }}>
                <React.Suspense fallback={<LinearProgress />}>
                    <Outlet />
                </React.Suspense>
            </Container>
        </Box>
        <AppFooter />
    </Box>
  );
}
