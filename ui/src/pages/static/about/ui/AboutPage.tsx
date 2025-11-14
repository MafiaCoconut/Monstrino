import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import LeftMenu from '../../../../widgets/LeftMenu';

export const AboutPage = () => {
  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
      <LeftMenu mobileOpen={undefined} onMobileClose={undefined} />
      
      <Box component="main" sx={{ flexGrow: 1, mt: 8 }}>
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Typography variant="h3" sx={{ color: 'primary.main', mb: 4 }}>About Monstrino</Typography>
          
          <Paper sx={{ p: 4, bgcolor: 'rgba(255, 255, 255, 0.05)', mb: 3 }}>
            <Typography variant="h5" sx={{ color: 'primary.main', mb: 2 }}>Fan-Made Community Project</Typography>
            <Typography sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.7 }}>
              Monstrino is an unofficial, fan-created social networking platform designed to celebrate the Monster High universe. 
              This project was created by fans, for fans, as a tribute to the beloved Monster High franchise.
            </Typography>
            
            <Typography variant="h6" sx={{ color: 'warning.main', mb: 2 }}>Important Legal Notice</Typography>
            <Typography sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.7 }}>
              Monster High® is a registered trademark of Mattel, Inc. This website is NOT affiliated with, endorsed by, 
              or sponsored by Mattel, Inc. All Monster High characters, names, marks, emblems and images are property of Mattel, Inc.
              This is a non-commercial fan project created for educational and entertainment purposes only.
            </Typography>

            <Typography variant="h6" sx={{ color: 'primary.main', mb: 2 }}>Our Mission</Typography>
            <Typography sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
              To provide a safe, creative space for Monster High fans to connect, share their collections, 
              and celebrate their love for these iconic characters. We respect all intellectual property rights 
              and encourage users to support official Monster High products.
            </Typography>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};
