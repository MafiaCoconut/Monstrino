import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';

export const TermsPage = () => {
  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>      
      <Box component="main" sx={{ flexGrow: 1, mt: 8 }}>
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Typography variant="h3" sx={{ color: 'primary.main', mb: 4 }}>Terms of Service</Typography>
          
          <Paper sx={{ p: 4, bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
            <Typography variant="h6" sx={{ color: 'warning.main', mb: 2 }}>IMPORTANT COPYRIGHT NOTICE</Typography>
            <Typography sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.7 }}>
              Monster High® and all related characters, names, marks, emblems and images are trademarks and copyrighted 
              works of Mattel, Inc. This website is NOT affiliated with, endorsed by, or sponsored by Mattel, Inc. 
              This is a non-commercial fan project for educational and entertainment purposes only.
            </Typography>

            <Typography variant="h6" sx={{ color: 'primary.main', mb: 2 }}>Acceptable Use</Typography>
            <Typography sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.7 }}>
              Users must be respectful, not post inappropriate content, and follow community guidelines. 
              Any content that infringes on Mattel's copyrights will be removed immediately.
            </Typography>

            <Typography variant="h6" sx={{ color: 'primary.main', mb: 2 }}>User Content</Typography>
            <Typography sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.7 }}>
              You retain ownership of content you post, but grant us permission to display it on the platform. 
              Do not post copyrighted material you don't own. Fan art and personal collections are welcome.
            </Typography>

            <Typography variant="h6" sx={{ color: 'primary.main', mb: 2 }}>Platform Limitations</Typography>
            <Typography sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.7 }}>
              This platform is provided "as is" without warranties. We reserve the right to modify or terminate 
              services at any time. We are not responsible for user-generated content.
            </Typography>

            <Typography variant="h6" sx={{ color: 'error.main', mb: 2 }}>DMCA Compliance</Typography>
            <Typography sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
              We respect intellectual property rights. If you believe content infringes your copyright, 
              please contact us immediately for removal. We comply with all DMCA takedown requests.
            </Typography>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};
