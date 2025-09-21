import React from 'react';
import { Box, Typography, Container, Paper, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';

export const SupportPage = () => {
  const faqs = [
    {
      question: "How do I create a collection?",
      answer: "Go to the Collections page and click 'Create Collection'. Add a name, description, and cover image."
    },
    {
      question: "Is this official Monster High content?",
      answer: "No, this is a fan-made project. Monster High® is owned by Mattel, Inc. We are not affiliated with Mattel."
    },
    {
      question: "How do I add friends?",
      answer: "Visit the Friends page and use the search function to find other users, then send friend requests."
    },
    {
      question: "Can I delete my account?",
      answer: "Yes, contact us through the Contact page to request account deletion and data removal."
    },
    {
      question: "What content is allowed?",
      answer: "Fan art, collection photos, and Monster High discussions are welcome. No inappropriate or copyrighted content."
    }
  ];

  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>      
      <Box component="main" sx={{ flexGrow: 1, mt: 8 }}>
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Typography variant="h3" sx={{ color: 'primary.main', mb: 4 }}>Help Center</Typography>
          
          <Paper sx={{ p: 4, bgcolor: 'rgba(255, 255, 255, 0.05)', mb: 3 }}>
            <Typography variant="h5" sx={{ color: 'primary.main', mb: 3 }}>Frequently Asked Questions</Typography>
            
            {faqs.map((faq, index) => (
              <Accordion key={index} sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', mb: 1 }}>
                <AccordionSummary expandIcon={<ExpandMore sx={{ color: 'primary.main' }} />}>
                  <Typography sx={{ color: 'white' }}>{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ color: 'text.secondary' }}>{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Paper>

          <Paper sx={{ p: 4, bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
            <Typography variant="h6" sx={{ color: 'primary.main', mb: 2 }}>Need More Help?</Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              If you can't find what you're looking for, visit our Contact page to get in touch with our support team.
            </Typography>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};