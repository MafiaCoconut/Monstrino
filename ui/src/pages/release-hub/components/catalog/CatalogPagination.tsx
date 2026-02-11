import React from 'react';
import { Box, Pagination, useMediaQuery, useTheme } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';

interface CatalogPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  sx?: SxProps<Theme>;
}

export const CatalogPagination: React.FC<CatalogPaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  sx,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={[{ display: 'flex', justifyContent: 'center', mt: { xs: 3, sm: 4 } }, sx]}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(_, page) => onPageChange(page)}
        size="medium"
        siblingCount={isMobile ? 0 : 1}
        sx={{
          '& .MuiPaginationItem-root': {
            color: 'text.secondary',
            fontSize: { xs: '0.8125rem', sm: '0.875rem' },
            minWidth: { xs: 28, sm: 32 },
            height: { xs: 28, sm: 32 },
            '&.Mui-selected': {
              backgroundColor: 'primary.main',
              color: 'white',
            },
          },
        }}
      />
    </Box>
  );
};
