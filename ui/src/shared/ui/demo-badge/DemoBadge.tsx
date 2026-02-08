import { Box, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export const DemoBadge = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 16,
        left: 16,
        zIndex: 9999,
        backgroundColor: 'rgba(255, 152, 0, 0.9)',
        backdropFilter: 'blur(8px)',
        padding: '8px 16px',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      <InfoOutlinedIcon
        sx={{
          fontSize: 18,
          color: '#fff'
        }}
      />
      <Typography
        variant="body2"
        sx={{
          color: '#fff',
          fontWeight: 600,
          fontSize: '0.813rem',
          letterSpacing: '0.5px',
        }}
      >
        DEMO VERSION
      </Typography>
    </Box>
  );
};
