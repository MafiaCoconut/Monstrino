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
import { useNavigate, useParams } from 'react-router-dom';

import FavoriteOutlined from '@mui/icons-material/FavoriteOutlined';
import { DollCard } from '@/entities/doll';

type FavoriteDollsWidgetProps = {
    favoriteDolls: {id: number, image: string, name: string, character: string}[];
    isMobile?: boolean;
}

export const FavoriteDollsWidget = ({favoriteDolls, isMobile=false}: FavoriteDollsWidgetProps) => {
    const { username } = useParams();
    const navigate = useNavigate();
    return (
        <Box sx={{ mb: 3 }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <FavoriteOutlined sx={{ color: 'primary.main' }} />
              <Typography variant="h6" sx={{ color: 'primary.main', fontSize: { xs: '1rem', md: '1.25rem' } }}>
                Favorite Dolls
              </Typography>
            </Stack>
            <Box sx={{
              display: 'flex',
              gap: 2,
              pb: 1,
              minHeight: 200,
              overflowX: 'auto',
              overflowY: 'hidden',
              flexWrap: 'nowrap',
              scrollBehavior: 'smooth',
              '&::-webkit-scrollbar': { height: 6 },
              '&::-webkit-scrollbar-track': { bgcolor: 'rgba(139, 95, 191, 0.1)' },
              '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(139, 95, 191, 0.5)', borderRadius: 3 }
            }}>
              {favoriteDolls.map((doll) => (
                <Box key={doll.id} >
                  <DollCard dollId={doll.id} image={doll.image} name={doll.name} character={doll.character} isMobile={isMobile}/>
                </Box>
              ))}
            </Box>
        </Box>

    )
}