// src/features/release-hub-filters/ui/ReleaseHubToolbar.tsx
import * as React from "react";
import {
  Box,
  Paper,
  Stack,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  MenuItem,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import type { ReleaseSortKey } from "@/entities/release/model/types";
import type { ReleaseHubFiltersState, ReleaseHubView } from "../model/useReleaseHubFilters";

type Props = {
  state: ReleaseHubFiltersState;
  onViewChange: (v: ReleaseHubView) => void;
  onQueryChange: (v: string) => void;
  onYearChange: (v?: number) => void;
  onCharacterChange: (v?: string) => void;
  onSeriesChange: (v?: string) => void;
  onSortChange: (v: ReleaseSortKey) => void;
  onReset: () => void;
};

const sortOptions: Array<{ value: ReleaseSortKey; label: string }> = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "name_asc", label: "Name A → Z" },
  { value: "name_desc", label: "Name Z → A" },
];

export function ReleaseHubToolbar({
  state,
  onViewChange,
  onQueryChange,
  onYearChange,
  onCharacterChange,
  onSeriesChange,
  onSortChange,
  onReset,
}: Props) {
  const view = state.view;

  return (
    <Paper
      elevation={0}
      sx={{
        border: (t) => `1px solid ${t.palette.divider}`,
        borderRadius: 3,
        overflow: "hidden",
        backgroundColor: "background.paper",
      }}
    >
      <Box
        sx={{
          px: 2.5,
          pt: 2.5,
          pb: 2,
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
          backgroundColor: "background.paper",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: 24, md: 32 },
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          Release Hub
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, maxWidth: 560 }}>
          Curated releases, sortable by year, character, and series. Open any card for full details.
        </Typography>
      </Box>

      <Tabs
        value={view}
        onChange={(_, v) => onViewChange(v)}
        sx={{
          px: 2,
          mt: 0.25,
          "& .MuiTabs-indicator": { height: 3, borderRadius: 2 },
        }}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab value="all" label="All" />
        <Tab value="year" label="By year" />
        <Tab value="character" label="By character" />
        <Tab value="series" label="By series" />
      </Tabs>

      <Box sx={{ p: 2 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={1.5}
          alignItems="stretch"
          sx={{
            "& .MuiTextField-root": {
              backgroundColor: "background.paper",
              borderRadius: 1.5,
            },
          }}
        >
          <TextField
            value={state.query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search releases…"
            fullWidth
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          {view === "year" ? (
            <TextField
              value={state.year ?? ""}
              onChange={(e) => {
                const v = e.target.value.trim();
                onYearChange(v ? Number(v) : undefined);
              }}
              placeholder="Year (e.g. 2012)"
              sx={{ width: { xs: "100%", md: 200 } }}
              size="small"
            />
          ) : null}

          {view === "character" ? (
            <TextField
              value={state.character ?? ""}
              onChange={(e) => onCharacterChange(e.target.value || undefined)}
              placeholder="Character (name or id)"
              sx={{ width: { xs: "100%", md: 280 } }}
              size="small"
            />
          ) : null}

          {view === "series" ? (
            <TextField
              value={state.series ?? ""}
              onChange={(e) => onSeriesChange(e.target.value || undefined)}
              placeholder="Series (name or id)"
              sx={{ width: { xs: "100%", md: 280 } }}
              size="small"
            />
          ) : null}

          <TextField
            select
            value={state.sort}
            onChange={(e) => onSortChange(e.target.value as ReleaseSortKey)}
            sx={{ width: { xs: "100%", md: 220 } }}
            size="small"
          >
            {sortOptions.map((o) => (
              <MenuItem key={o.value} value={o.value}>
                {o.label}
              </MenuItem>
            ))}
          </TextField>

          <Tooltip title="Reset filters">
            <IconButton onClick={onReset} sx={{ alignSelf: { xs: "flex-end", md: "center" } }}>
              <RestartAltIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>
    </Paper>
  );
}
