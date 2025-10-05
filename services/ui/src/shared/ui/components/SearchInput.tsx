import { TextField } from '@mui/material';
import { ChangeEvent } from 'react';

type SearchInputProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoFocus?: boolean;
};

export const SearchInput = ({
  value,
  onChange,
  placeholder = 'Поиск...',
  autoFocus = true,
}: SearchInputProps) => (
  <TextField
    size="small"
    variant="outlined"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    autoFocus={autoFocus}
    fullWidth
    sx={{
      mb: 2,
      '& .MuiOutlinedInput-root': {
        borderRadius: 3,
      },
    }}
  />
);
