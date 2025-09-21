import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardMedia, CardContent, Button, Chip, Stack, Paper } from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';
import Favorite from '@mui/icons-material/Favorite';
import Share from '@mui/icons-material/Share';
import Add from '@mui/icons-material/Add';
import { mockUserData } from '@/data/mocAppData';
import { UserHeader } from '@/widgets/headers';

const DollViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const doll = mockUserData.dolls.find(d => d.id === parseInt(id));

  if (!doll) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <Typography variant="h4">Doll not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
      
      <Box component="main" sx={{ flexGrow: 1, ml: '200px', mt: 8 }}>
        <UserHeader userData={mockUserData.currentUser} onEditProfile={undefined} />
        
        <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
          <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} sx={{ mb: 3 }}>Back</Button>
          
          <Card sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
            <CardMedia
              component="img"
              height="400"
              image={doll.image || 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop'}
              alt={doll.name}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent>
              <Typography variant="h4" sx={{ color: 'white', mb: 2 }}>{doll.name}</Typography>
              
              <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <Chip label={doll.character} color="primary" />
                <Chip label={doll.series} color="secondary" />
                <Chip label={doll.year} variant="outlined" />
              </Stack>

              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
                {doll.description}
              </Typography>

              <Paper sx={{ p: 2, bgcolor: 'rgba(139, 95, 191, 0.1)', mb: 3 }}>
                <Typography variant="h6" sx={{ color: 'primary.main', mb: 1 }}>Details</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Character Type: {doll.character}<br />
                  Series: {doll.series}<br />
                  Release Year: {doll.year}
                </Typography>
              </Paper>

              <Stack direction="row" spacing={2}>
                <Button variant="contained" startIcon={<Add />}>Add to Collection</Button>
                <Button variant="outlined" startIcon={<Favorite />}>Like</Button>
                <Button variant="outlined" startIcon={<Share />}>Share</Button>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default DollViewPage;