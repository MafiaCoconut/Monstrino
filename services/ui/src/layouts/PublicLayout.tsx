import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, LinearProgress } from '@mui/material';
import { PublicHeader } from '@/widgets/headers';
import { AppFooter } from '@/widgets/footers';

export function PublicLayout() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      <PublicHeader />
      <Box component="main" sx={{ flex: 1, width: '100%' }}>
        <React.Suspense fallback={<LinearProgress />}>
          <Outlet />
        </React.Suspense>
      </Box>
      <AppFooter />
    </Box>
  );
}
