import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Chip,
  Stack,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  useMediaQuery,
  useTheme,
  Paper
} from '@mui/material';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import Add from '@mui/icons-material/Add';
import FavoriteOutlined from '@mui/icons-material/FavoriteOutlined';
import Star from '@mui/icons-material/Star';
import StarBorder from '@mui/icons-material/StarBorder';
import { useNavigate } from 'react-router-dom';
import { mockUserData } from '@/data/mocAppData';

export const WishlistPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [wishlist, setWishlist] = useState(mockUserData.wishlist);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filterPriority, setFilterPriority] = useState('all');
  const [sortBy, setSortBy] = useState('dateAdded');

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return <Star />;
      case 'medium': return <StarBorder />;
      case 'low': return <StarBorder />;
      default: return <StarBorder />;
    }
  };

  const handleRemoveFromWishlist = (itemId) => {
    setWishlist(wishlist.filter(item => item.id !== itemId));
  };

  const handlePriorityChange = (itemId, newPriority) => {
    setWishlist(wishlist.map(item => 
      item.id === itemId ? { ...item, priority: newPriority } : item
    ));
  };

  const filteredWishlist = wishlist.filter(item => 
    filterPriority === 'all' || item.priority === filterPriority
  );

  const sortedWishlist = [...filteredWishlist].sort((a, b) => {
    switch (sortBy) {
      case 'dateAdded':
        return new Date(b.addedAt) - new Date(a.addedAt);
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      case 'name':
        return a.dollName.localeCompare(b.dollName);
      default:
        return 0;
    }
  });

  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>      
      {/* Mobile Menu Toggle */}
      {isMobile && (
        <IconButton
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          sx={{
            position: 'fixed',
            top: 70,
            left: mobileMenuOpen ? 250 : 10,
            zIndex: 1300,
            bgcolor: 'background.paper',
            color: 'primary.main',
            transition: 'left 0.3s ease',
            '&:hover': { bgcolor: 'rgba(255, 105, 180, 0.1)' }
          }}
        >
          <FavoriteOutlined />
        </IconButton>
      )}
      
      {/* Main Content */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          ml: { xs: 0, md: '200px', lg: '220px' },
          mt: 8,
          minHeight: 'calc(100vh - 64px)',
          width: 'auto'
        }}
      >
        <Container maxWidth={false} sx={{ py: { xs: 2, md: 3 }, px: { xs: 1, md: 3 }, maxWidth: 'none', width: '100%' }}>
          {/* Header Section */}
          <Box sx={{ mb: 4 }}>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
              <FavoriteOutlined sx={{ color: 'primary.main', fontSize: '2rem' }} />
              <Typography 
                variant="h4" 
                sx={{ 
                  color: 'primary.main', 
                  fontWeight: 800,
                  fontSize: { xs: '1.5rem', md: '2rem' }
                }}
              >
                My Wishlist
              </Typography>
              <Chip 
                label={`${wishlist.length} items`} 
                color="secondary" 
                variant="outlined"
              />
            </Stack>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'text.secondary',
                fontSize: { xs: '0.9rem', md: '1rem' }
              }}
            >
              Keep track of the dolls you want to add to your collection
            </Typography>
          </Box>

          {/* Filters and Sort */}
          <Paper sx={{ p: 2, mb: 3, bgcolor: 'rgba(139, 95, 191, 0.1)' }}>
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={2} 
              alignItems={{ xs: 'stretch', sm: 'center' }}
            >
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={filterPriority}
                  label="Priority"
                  onChange={(e) => setFilterPriority(e.target.value)}
                >
                  <MenuItem value="all">All Priorities</MenuItem>
                  <MenuItem value="high">High Priority</MenuItem>
                  <MenuItem value="medium">Medium Priority</MenuItem>
                  <MenuItem value="low">Low Priority</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Sort by</InputLabel>
                <Select
                  value={sortBy}
                  label="Sort by"
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <MenuItem value="dateAdded">Date Added</MenuItem>
                  <MenuItem value="priority">Priority</MenuItem>
                  <MenuItem value="name">Name</MenuItem>
                </Select>
              </FormControl>

              <Button
                variant="contained"
                startIcon={<Add />}
                sx={{ ml: 'auto' }}
                onClick={() => console.log('Add to wishlist')}
              >
                Add Item
              </Button>
            </Stack>
          </Paper>

          {/* Wishlist Grid */}
          <Grid container spacing={2}>
            {sortedWishlist.map((item) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg:3 }} key={item.id}>
                <Card 
                  sx={{ 
                    bgcolor: 'rgba(255, 105, 180, 0.1)',
                    border: 1,
                    borderColor: 'rgba(139, 95, 191, 0.2)',
                    transition: 'all 0.2s',
                    '&:hover': { 
                      transform: 'translateY(-4px)',
                      borderColor: 'primary.main',
                      boxShadow: '0 8px 24px rgba(255, 105, 180, 0.3)'
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height={160}
                    image={item.dollImage}
                    alt={item.dollName}
                  />
                  <CardContent sx={{ p: 1.5 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="start" sx={{ mb: 1 }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          color: 'white', 
                          fontWeight: 600,
                          fontSize: { xs: '0.9rem', md: '1rem' }
                        }}
                      >
                        {item.dollName}
                      </Typography>
                      <IconButton 
                        size="small" 
                        onClick={() => handlePriorityChange(item.id, 
                          item.priority === 'high' ? 'medium' : 
                          item.priority === 'medium' ? 'low' : 'high'
                        )}
                        sx={{ color: getPriorityColor(item.priority) + '.main' }}
                      >
                        {getPriorityIcon(item.priority)}
                      </IconButton>
                    </Stack>
                    
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'primary.main', 
                        mb: 1,
                        fontSize: { xs: '0.75rem', md: '0.8rem' }
                      }}
                    >
                      {item.character}
                    </Typography>
                    
                    <Chip 
                      label={item.priority.toUpperCase()}
                      size="small"
                      color={getPriorityColor(item.priority)}
                      sx={{ mb: 1 }}
                    />
                    
                    {item.notes && (
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: 'text.secondary',
                          display: 'block',
                          mb: 1,
                          fontSize: '0.7rem'
                        }}
                      >
                        {item.notes}
                      </Typography>
                    )}
                    
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography 
                        variant="caption" 
                        sx={{ color: 'text.secondary', fontSize: '0.65rem' }}
                      >
                        Added {new Date(item.addedAt).toLocaleDateString()}
                      </Typography>
                      
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveFromWishlist(item.id)}
                        sx={{ color: 'error.main' }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {sortedWishlist.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <FavoriteOutlined sx={{ fontSize: 64, color: 'secondary.main', mb: 2 }} />
              <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
                {filterPriority === 'all' ? 'Your wishlist is empty' : `No ${filterPriority} priority items`}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Start adding dolls you want to collect!
              </Typography>
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  );
};

