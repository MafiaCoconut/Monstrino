import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  Stack,
  Paper,
  Divider
} from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';
import Add from '@mui/icons-material/Add';
import { mockUserData } from '../../../data/mocAppData';
import LeftMenu from '../../../widgets/LeftMenu';
import RightMenu from '../../../widgets/RightMenu';
import { DollCard } from '@/entities/collection';
import { UserHeader } from '@/widgets/headers';
import { AddDollModal } from '@/widgets/dolls';

const CollectionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isAddDollModalOpen, setIsAddDollModalOpen] = useState(false);

  // Find collection by ID
  const collection = mockUserData.collections.find(c => c.id === parseInt(id));
  const [dolls, setDolls] = useState(
    mockUserData.dolls.filter(doll => doll.collectionId === parseInt(id))
  );

  if (!collection) {
    return (
      <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh', alignItems: 'center', justifyContent: 'center' }}>
        <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'background.paper' }}>
          <Typography variant="h4" sx={{ color: 'primary.main', mb: 2 }}>
            Collection Not Found
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/collections')}
            sx={{ bgcolor: 'secondary.main' }}
          >
            Back to Collections
          </Button>
        </Paper>
      </Box>
    );
  }

  const handleAddDoll = (dollData) => {
    const newDoll = {
      ...dollData,
      id: Date.now(),
      collectionId: parseInt(id)
    };
    setDolls([...dolls, newDoll]);
    setIsAddDollModalOpen(false);
  };

  const handleRemoveDoll = (dollId) => {
    if (window.confirm('Remove this doll from the collection?')) {
      setDolls(dolls.filter(doll => doll.id !== dollId));
    }
  };

  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
      <Box component="main" sx={{ flexGrow: 1, ml: '200px', mr: '200px', mt: 8 }}>
        <UserHeader userData={mockUserData.currentUser} onEditProfile={undefined} />

        <Container maxWidth="xl" sx={{ py: 3 }}>
          {/* Back Button and Collection Info */}
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 3 }}>
            <Box>
              <Button
                startIcon={<ArrowBack />}
                onClick={() => navigate('/collections')}
                sx={{ color: 'primary.main', mb: 2 }}
              >
                Back to Collections
              </Button>
              <Typography
                variant="h4"
                sx={{
                  color: 'primary.main',
                  fontWeight: 800,
                  mb: 1
                }}
              >
                {collection.name}
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                {collection.description}
              </Typography>
            </Box>

            <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'rgba(139, 95, 191, 0.1)' }}>
              <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                {dolls.length}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {dolls.length === 1 ? 'Doll' : 'Dolls'}
              </Typography>
            </Paper>
          </Stack>

          <Divider sx={{ mb: 3, borderColor: 'rgba(139, 95, 191, 0.2)' }} />

          {/* Dolls Grid - Smaller items */}
          <Grid container spacing={2}>
            {dolls.map((doll) => (
              <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={doll.id}>
                <DollCard
                  doll={doll}
                  onRemove={handleRemoveDoll}
                  size="small"
                />
              </Grid>
            ))}
          </Grid>

          {/* Empty State */}
          {dolls.length === 0 && (
            <Box textAlign="center" sx={{ py: 8 }}>
              <Typography variant="h2" sx={{ mb: 2 }}>🧸</Typography>
              <Typography variant="h5" sx={{ color: 'white', mb: 1 }}>
                No Dolls Yet
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
                Start adding dolls to your collection!
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => setIsAddDollModalOpen(true)}
                sx={{ bgcolor: 'primary.main', color: 'black' }}
              >
                Add Your First Doll
              </Button>
            </Box>
          )}
        </Container>

      </Box>

      {/* Right Menu */}
      <RightMenu onAddDoll={() => setIsAddDollModalOpen(true)} />

      <AddDollModal
        isOpen={isAddDollModalOpen}
        onClose={() => setIsAddDollModalOpen(false)}
        onSubmit={handleAddDoll}
      />
    </Box>
  );
};

export default CollectionPage;