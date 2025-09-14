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
  Chip
} from '@mui/material';
import { Close, People, PersonAdd, Search, Circle } from '@mui/icons-material';

const FriendsModal = ({ isOpen, onClose, friends }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFriends = friends.filter(friend =>
    friend.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'success.main';
      case 'away': return 'warning.main';
      default: return 'rgba(255, 255, 255, 0.3)';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'online': return 'Online';
      case 'away': return 'Away';
      default: return 'Offline';
    }
  };

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose}
      maxWidth="sm"
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
          <People sx={{ color: 'primary.main' }} />
          <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 800 }}>
            My Friends ({friends.length})
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
            placeholder="Search friends..."
            size="small"
            InputProps={{
              startAdornment: <Search sx={{ color: 'secondary.main', mr: 1 }} />,
            }}
          />
        </Box>

        {/* Friends List */}
        <List sx={{ maxHeight: 400, overflow: 'auto' }}>
          {filteredFriends.map((friend) => (
            <ListItem 
              key={friend.id}
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.05)',
                mb: 1,
                mx: 1,
                borderRadius: 1,
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <Stack direction="row" alignItems="center" spacing={2} sx={{ width: '100%' }}>
                {/* Avatar with Status */}
                <Box sx={{ position: 'relative' }}>
                  <Avatar
                    src={friend.avatar}
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: 'primary.main',
                      color: 'black',
                      fontSize: '0.875rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {!friend.avatar && friend.username.charAt(0).toUpperCase()}
                  </Avatar>
                  <Circle 
                    sx={{ 
                      position: 'absolute',
                      bottom: -2,
                      right: -2,
                      fontSize: 12,
                      color: getStatusColor(friend.status)
                    }} 
                  />
                </Box>

                {/* Friend Info */}
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 600 }}>
                    {friend.username}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: getStatusColor(friend.status),
                      fontFamily: '"Fira Code", monospace'
                    }}
                  >
                    {getStatusText(friend.status)}
                  </Typography>
                </Box>

                {/* Actions */}
                <Stack direction="row" spacing={1}>
                  <Button 
                    size="small" 
                    sx={{ 
                      color: 'secondary.main',
                      minWidth: 'auto',
                      fontSize: '0.7rem'
                    }}
                  >
                    Message
                  </Button>
                  <Button 
                    size="small" 
                    sx={{ 
                      color: 'error.main',
                      minWidth: 'auto',
                      fontSize: '0.7rem'
                    }}
                  >
                    Remove
                  </Button>
                </Stack>
              </Stack>
            </ListItem>
          ))}

          {filteredFriends.length === 0 && (
            <Box textAlign="center" sx={{ py: 4 }}>
              <People sx={{ fontSize: 48, color: 'secondary.main', mb: 2 }} />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {searchTerm ? 'No friends found' : 'No friends yet'}
              </Typography>
            </Box>
          )}
        </List>
      </DialogContent>

      <DialogActions sx={{ 
        bgcolor: 'background.default',
        borderTop: 1,
        borderColor: 'rgba(139, 95, 191, 0.2)',
        p: 2
      }}>
        <Button 
          variant="contained"
          startIcon={<PersonAdd />}
          fullWidth
          sx={{ 
            bgcolor: 'secondary.main'
          }}
        >
          Add Friend
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FriendsModal;