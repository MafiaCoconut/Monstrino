import { useState } from 'react';
import { Box, List, ListItemButton, Typography } from '@mui/material';
import { useReleasesSearch } from '@entities/release/api/useReleasesSearch';
import { SearchInput } from '@/shared/ui/components';

type SearchReleasesProps = {
  onSelect: (release: Release) => void;
};

export const SearchReleases = ({ onSelect }: SearchReleasesProps) => {
    const [query, setQuery] = useState('');
    const [isLoading, setIsloading] = useState(false);
    const [releases, setReleases] = useState([]);

    return (
    <Box>
        <SearchInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Найти куклу по названию..."
        />

        {isLoading && <Typography>Загрузка...</Typography>}

        {!isLoading && releases?.length === 0 && (
        <Typography color="text.secondary" sx={{ mt: 2 }}>
            Ничего не найдено.
        </Typography>
        )}

        {/* {!isLoading && (
        <List>
            {releases?.map((r) => (
            <ListItemButton key={r.id} onClick={() => onSelect(r)}>
                {r.name} ({r.year})
            </ListItemButton>
            ))}
        </List>
        )} */}
    </Box>
    );
};
