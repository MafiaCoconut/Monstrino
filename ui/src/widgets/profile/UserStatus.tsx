import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Container,
  Stack,
  Paper,
  Chip,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  useMediaQuery,
  useTheme
} from '@mui/material';

import EmojiEvents from '@mui/icons-material/EmojiEvents';
import Settings from '@mui/icons-material/Settings';
import { mockAchievements } from '@/data/mocAppData';

import { useNavigate } from 'react-router-dom';

export const UserStatus = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    return (
        <Paper sx={{
          // m: { xs: 1, md: 2 },
          p: { xs: 1.5, md: 2 },
          bgcolor: 'rgba(139, 95, 191, 0.1)'
        }}>
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, lg: 6 }}>
              <Typography variant="h6" sx={{ color: 'primary.main', mb: 1, fontSize: { xs: '1rem', md: '1.25rem' } }}>
                Monster Status
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                <Chip label="Vampire Crew" color="primary" size="small" />
                <Chip label="Active" color="success" size="small" />
                <Chip label="Level 15" color="secondary" size="small" />
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, lg: 5 }}>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                <EmojiEvents sx={{ color: 'warning.main' }} />
                <Typography variant="h6" sx={{ color: 'warning.main', fontSize: { xs: '1rem', md: '1.25rem' } }}>
                  Achievements
                </Typography>
              </Stack>
              <Grid container spacing={2}>
                {mockAchievements.slice(0, isMobile ? 2 : 3).map((achievement) => (
                  <Grid>
                    <Chip
                      key={achievement.id}
                      label={achievement.name}
                      size="small"
                      sx={{
                        bgcolor: achievement.color,
                        color: 'white',
                        fontSize: { xs: '0.65rem', md: '0.75rem' }
                      }}
                      // onClick={() => navigate('/achievements')}
                    />
                  </Grid>
                ))}
                {/* <Grid> */}
                  {/* <Button
                    variant="text"
                    size="small"
                    disabled={true}
                    onClick={() => navigate('/achievements')}
                    sx={{ color: 'warning.main', fontSize: '0.7rem', minWidth: 'auto', p: 0.5 }}
                  >
                    View All
                  </Button> */}
                {/* </Grid> */}
              </Grid>
            </Grid>
            {/* <Grid size={{ xs: 12, lg: 1 }} sx={{ textAlign: 'right' }}>
              <IconButton onClick={() => setIsSettingsOpen(true)} sx={{ color: 'primary.main' }} size="small">
                <Settings />
              </IconButton>
            </Grid> */}
          </Grid>
        </Paper>


    )
}
