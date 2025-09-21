import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';

export const PrivacyPage = () => {
  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>      
      <Box component="main" sx={{ flexGrow: 1, ml: '200px', mt: 8 }}>
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Typography variant="h3" sx={{ color: 'primary.main', mb: 4 }}>Privacy Policy</Typography>
          
          <Paper sx={{ p: 4, bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
            <Typography sx={{ color: 'text.secondary', mb: 2, fontSize: '0.9rem' }}>
              Last updated: {new Date().toLocaleDateString()}
            </Typography>

            <Typography variant="h6" sx={{ color: 'primary.main', mb: 2 }}>Information We Collect</Typography>
            <Typography sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.7 }}>
              We collect information you provide when creating an account (username, email), content you post, 
              and basic usage analytics. We do not sell personal data to third parties.
            </Typography>

            <Typography variant="h6" sx={{ color: 'primary.main', mb: 2 }}>How We Use Information</Typography>
            <Typography sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.7 }}>
              Your information is used to provide our services, improve user experience, and ensure platform safety. 
              We may send service-related communications but will not spam you.
            </Typography>

            <Typography variant="h6" sx={{ color: 'primary.main', mb: 2 }}>Data Protection</Typography>
            <Typography sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.7 }}>
              We implement security measures to protect your data. However, no internet transmission is 100% secure. 
              Users under 13 require parental consent in compliance with COPPA regulations.
            </Typography>

            <Typography variant="h6" sx={{ color: 'warning.main', mb: 2 }}>Third-Party Content</Typography>
            <Typography sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.7 }}>
              This platform displays Monster High-related content for fan purposes only. All Monster High intellectual 
              property belongs to Mattel, Inc. We are not affiliated with Mattel and this is a non-commercial fan project.
            </Typography>

            <Typography variant="h6" sx={{ color: 'primary.main', mb: 2 }}>Contact Us</Typography>
            <Typography sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
              For privacy concerns, contact us through our Contact page. You can request data deletion at any time.
            </Typography>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

