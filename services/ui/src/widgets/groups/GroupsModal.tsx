import React, { useState } from 'react';
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Stack,
  List,
  ListItem,
  Avatar,
  Card,
  CardContent
} from '@mui/material';
import { Close, Forum, Add, Search, People } from '@mui/icons-material';

const GroupsModal = ({ isOpen, onClose, groups }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: 'background.default',
          border: 1,
          borderColor: 'rgba(139, 95, 191, 0.3)',
          maxHeight: '80vh'
        }
      }}
    >
      <DialogTitle sx={{ 
        bgcolor: 'background.default',
        borderBottom: 1,
        borderColor: 'rgba(139, 95, 191, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Forum sx={{ color: 'primary.main' }} />
          <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 800 }}>
            My Groups ({groups.length})
          </Typography>
        </Stack>
        <IconButton onClick={onClose} sx={{ color: 'text.secondary' }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ bgcolor: 'background.default', p: 0 }}>
        {/* Search */}
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'rgba(139, 95, 191, 0.2)' }}>
          <TextField
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search groups..."
            size="small"
            InputProps={{
              startAdornment: <Search sx={{ color: 'secondary.main', mr: 1 }} />,
            }}
          />
        </Box>

        {/* Groups List */}
        <Box sx={{ p: 2, maxHeight: 400, overflow: 'auto' }}>
          <Stack spacing={2}>
            {filteredGroups.map((group) => (
              <Card
                key={group.id}
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  border: 1,
                  borderColor: 'rgba(139, 95, 191, 0.2)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                <CardContent>
                  <Stack direction="row" spacing={2}>
                    {/* Group Image */}
                    <Avatar
                      src={group.image}
                      sx={{
                        width: 48,
                        height: 48,
                        bgcolor: 'secondary.main'
                      }}
                    >
                      {!group.image && <Forum />}
                    </Avatar>

                    {/* Group Info */}
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" sx={{ color: 'white', mb: 0.5 }}>
                        {group.name}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'text.secondary',
                          mb: 1,
                          lineHeight: 1.4
                        }}
                      >
                        {group.description}
                      </Typography>
                      
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <People sx={{ fontSize: 14, color: 'secondary.main' }} />
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              color: 'secondary.main',
                              fontFamily: '"Fira Code", monospace'
                            }}
                          >
                            {group.members} members
                          </Typography>
                        </Box>
                        
                        <Stack direction="row" spacing={1}>
                          <Button 
                            size="small" 
                            sx={{ 
                              color: 'primary.main',
                              fontSize: '0.7rem'
                            }}
                          >
                            View
                          </Button>
                          <Button 
                            size="small" 
                            sx={{ 
                              color: 'error.main',
                              fontSize: '0.7rem'
                            }}
                          >
                            Leave
                          </Button>
                        </Stack>
                      </Stack>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            ))}

            {filteredGroups.length === 0 && (
              <Box textAlign="center" sx={{ py: 4 }}>
                <Forum sx={{ fontSize: 48, color: 'secondary.main', mb: 2 }} />
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {searchTerm ? 'No groups found' : 'No groups yet'}
                </Typography>
              </Box>
            )}
          </Stack>
        </Box>
      </DialogContent>

      <DialogActions sx={{ 
        bgcolor: 'background.default',
        borderTop: 1,
        borderColor: 'rgba(139, 95, 191, 0.2)',
        p: 2
      }}>
        <Stack spacing={1} sx={{ width: '100%' }}>
          <Button 
            variant="contained"
            startIcon={<Add />}
            fullWidth
            sx={{ 
              bgcolor: 'secondary.main'
            }}
          >
            Join Group
          </Button>
          
          <Button 
            variant="outlined"
            fullWidth
            sx={{ 
              borderColor: 'rgba(255, 255, 255, 0.3)',
              color: 'white'
            }}
          >
            Browse All Groups
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default GroupsModal;