import React, { useState } from 'react';
import { Box, Typography, Container, Paper, TextField, Button, Alert } from '@mui/material';
import Send from '@mui/icons-material/Send';

export const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>      
      <Box component="main" sx={{ flexGrow: 1, mt: 8 }}>
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Typography variant="h3" sx={{ color: 'primary.main', mb: 4 }}>Contact Us</Typography>
          
          {submitted && (
            <Alert severity="success" sx={{ mb: 3 }}>
              Message sent! We'll get back to you soon.
            </Alert>
          )}

          <Paper sx={{ p: 4, bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
            <Typography variant="h6" sx={{ color: 'primary.main', mb: 3 }}>Get in Touch</Typography>
            
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                sx={{ mb: 3 }}
                required
              />
              
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                sx={{ mb: 3 }}
                required
              />
              
              <TextField
                fullWidth
                label="Message"
                multiline
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                sx={{ mb: 3 }}
                required
              />
              
              <Button
                type="submit"
                variant="contained"
                startIcon={<Send />}
                sx={{ bgcolor: 'primary.main', color: 'black' }}
              >
                Send Message
              </Button>
            </Box>

            <Box sx={{ mt: 4, pt: 3, borderTop: 1, borderColor: 'rgba(139, 95, 191, 0.2)' }}>
              <Typography variant="h6" sx={{ color: 'primary.main', mb: 2 }}>For Legal/Copyright Issues</Typography>
              <Typography sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                If you represent Mattel, Inc. or have copyright concerns, please contact us immediately. 
                We respect all intellectual property rights and will respond promptly to valid DMCA requests.
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};