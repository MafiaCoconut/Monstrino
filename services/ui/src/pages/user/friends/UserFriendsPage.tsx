import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Avatar, 
  Button, 
  TextField, 
  InputAdornment,
  Container,
  IconButton,
  useMediaQuery,
  useTheme,
  Chip
} from '@mui/material';
import Search from '@mui/icons-material/Search';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Message from '@mui/icons-material/Message';
import MenuOpen from '@mui/icons-material/MenuOpen';
import { mockUserData } from '../../../data/mocAppData';
import { AppHeader, UserHeader } from '@/widgets/headers';

const FriendsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const filteredFriends = mockUserData.friends.filter(friend =>
    friend.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'online': return 'success';
      case 'away': return 'warning';
      case 'offline': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
      <AppHeader />
      
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
          <MenuOpen sx={{ transform: mobileMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }} />
        </IconButton>
      )}
            
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          ml: { xs: 0, md: '200px', lg: '220px' },
          mt: 8,
          minHeight: 'calc(100vh - 64px)',
          width: 'auto',
          overflowX: 'hidden'
        }}
      >
        <UserHeader userData={mockUserData.currentUser} onEditProfile={undefined} />
        
        <Container 
          maxWidth={false}
          sx={{ 
            py: { xs: 2, md: 3 }, 
            px: { xs: 1, md: 3 },
            maxWidth: 'none',
            width: '100%'
          }}
        >
          <Typography 
            variant="h4" 
            sx={{ 
              color: 'primary.main', 
              mb: 3,
              fontSize: { xs: '1.8rem', md: '2.125rem' },
              textAlign: { xs: 'center', md: 'left' }
            }}
          >
            My Friends
          </Typography>
          
          <TextField
            fullWidth
            placeholder="Search friends..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ 
              mb: 3, 
              maxWidth: { xs: '100%', md: 400 },
              mx: { xs: 0, md: 0 }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
              sx: {
                borderRadius: 2,
                bgcolor: 'rgba(255, 255, 255, 0.05)',
                color: 'white',
                '& fieldset': { borderColor: 'rgba(139, 95, 191, 0.3)' },
                '&:hover fieldset': { borderColor: 'primary.main' },
                '&.Mui-focused fieldset': { borderColor: 'primary.main' }
              }
            }}
          />

          <Grid 
            container 
            spacing={{ xs: 2, md: 3 }}
            sx={{
              width: '100%',
              margin: 0,
              '& .MuiGrid-item': {
                paddingLeft: { xs: '8px', md: '12px' },
                paddingTop: { xs: '8px', md: '12px' }
              }
            }}
          >
            {filteredFriends.map((friend) => (
              <Grid 
                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                key={friend.id}
                sx={{
                  display: 'flex'
                }}
              >
                <Card 
                  sx={{ 
                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                    border: 1,
                    borderColor: 'rgba(139, 95, 191, 0.2)',
                    width: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      borderColor: 'primary.main',
                      boxShadow: '0 8px 24px rgba(255, 105, 180, 0.3)'
                    }
                  }}
                >
                  <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                    <Avatar 
                      src={friend.avatar} 
                      sx={{ 
                        width: { xs: 50, md: 60 }, 
                        height: { xs: 50, md: 60 }, 
                        mx: 'auto', 
                        mb: 2,
                        bgcolor: 'primary.main'
                      }} 
                    >
                      {!friend.avatar && friend.username.charAt(0)}
                    </Avatar>
                    
                    <Typography 
                      variant="h6" 
                      align="center" 
                      sx={{ 
                        color: 'white', 
                        mb: 1,
                        fontSize: { xs: '1rem', md: '1.25rem' }
                      }}
                    >
                      {friend.username}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                      <Chip 
                        label={friend.status?.toUpperCase() || 'OFFLINE'}
                        size="small"
                        color={getStatusColor(friend.status)}
                        sx={{ 
                          fontSize: { xs: '0.65rem', md: '0.75rem' },
                          height: { xs: 20, md: 24 }
                        }}
                      />
                    </Box>
                    
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        gap: 1,
                        flexDirection: { xs: 'column', sm: 'row' }
                      }}
                    >
                      <Button 
                        size="small" 
                        startIcon={<Message sx={{ fontSize: { xs: '16px', md: '18px' } }} />} 
                        fullWidth
                        variant="contained"
                        sx={{
                          bgcolor: 'secondary.main',
                          color: 'white',
                          fontSize: { xs: '0.75rem', md: '0.875rem' },
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            bgcolor: 'secondary.dark',
                            transform: 'translateY(-1px)'
                          }
                        }}
                      >
                        Message
                      </Button>
                      <Button 
                        size="small" 
                        color="error"
                        variant="outlined"
                        sx={{
                          fontSize: { xs: '0.75rem', md: '0.875rem' },
                          borderColor: 'error.main',
                          color: 'error.main',
                          minWidth: { xs: '100%', sm: 'auto' },
                          '&:hover': {
                            bgcolor: 'rgba(244, 67, 54, 0.1)',
                            borderColor: 'error.main'
                          }
                        }}
                      >
                        Remove
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Empty State */}
          {filteredFriends.length === 0 && (
            <Box 
              sx={{ 
                textAlign: 'center', 
                py: { xs: 6, md: 8 },
                px: { xs: 2, md: 0 }
              }}
            >
              <Typography 
                variant="h2" 
                sx={{ 
                  mb: 2, 
                  fontSize: { xs: '3rem', md: '4rem' }
                }}
              >
                👻
              </Typography>
              <Typography 
                variant="h5" 
                sx={{ 
                  color: 'white', 
                  mb: 1,
                  fontSize: { xs: '1.5rem', md: '1.5rem' }
                }}
              >
                {searchTerm ? 'No friends found' : 'No friends yet'}
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'text.secondary', 
                  mb: 3,
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  maxWidth: '400px',
                  mx: 'auto'
                }}
              >
                {searchTerm ? 'Try adjusting your search terms' : 'Start connecting with fellow monster collectors!'}
              </Typography>
              {!searchTerm && (
                <Button
                  variant="contained"
                  startIcon={<PersonAdd />}
                  sx={{ 
                    bgcolor: 'primary.main', 
                    color: 'black',
                    px: { xs: 3, md: 4 },
                    py: { xs: 1.5, md: 1 },
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(255, 105, 180, 0.3)'
                    }
                  }}
                >
                  Find Friends
                </Button>
              )}
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default FriendsPage;