import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Box, Pagination, Paper, Stack, Typography } from "@mui/material";

import { Context } from "@/main";
import { createApi } from "@/shared/api/http";

import { getReleases } from "@/entities/release";
import type { ReleaseDTO, ReleaseListResponse, ReleaseSortKey } from "@/entities/release";
import type { ReleaseHubView } from "@/features/release-hub-filters/model/useReleaseHubFilters";
import { releasesMock } from "@/data/mocAppData";

import { ReleaseGrid } from "@/entities/release";
import { ReleaseGridSkeleton } from "@/entities/release";
import { ReleaseHubToolbar } from "@/features/release-hub-filters";
import { useReleaseHubFilters } from "@/features/release-hub-filters/model/useReleaseHubFilters";

type MockFilter = {
  query: string;
  view: ReleaseHubView;
  year?: number;
  character?: string;
  series?: string;
  sort: ReleaseSortKey;
};

function normalizeText(value?: string | null) {
  return (value ?? "").toLowerCase().trim();
}

function includesText(value: string, query: string) {
  if (!query) return true;
  return value.includes(query);
}

function matchesList(items: Array<{ name: string }> | null | undefined, query: string) {
  if (!query) return true;
  if (!items?.length) return false;
  return items.some((item) => normalizeText(item.name).includes(query));
}

function filterMockReleases(items: ReleaseDTO[], filter: MockFilter) {
  const query = normalizeText(filter.query);
  const character = normalizeText(filter.character);
  const series = normalizeText(filter.series);

  return items.filter((release) => {
    if (filter.view === "year" && filter.year !== undefined) {
      if (release.year !== filter.year) return false;
    }

    if (filter.view === "character" && character) {
      if (!matchesList(release.release_characters ?? null, character)) return false;
    }

    if (filter.view === "series" && series) {
      if (!matchesList(release.release_series ?? null, series)) return false;
    }

    if (query) {
      const haystack = [
        normalizeText(release.name),
        normalizeText(release.description ?? ""),
      ];

      const matchesQuery =
        haystack.some((value) => includesText(value, query)) ||
        matchesList(release.release_characters ?? null, query) ||
        matchesList(release.release_series ?? null, query);

      if (!matchesQuery) return false;
    }

    return true;
  });
}

function sortMockReleases(items: ReleaseDTO[], sort: ReleaseSortKey) {
  const sorted = [...items];
  sorted.sort((a, b) => {
    const yearA = a.year ?? 0;
    const yearB = b.year ?? 0;
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    switch (sort) {
      case "newest":
        return yearB - yearA || nameA.localeCompare(nameB);
      case "oldest":
        return yearA - yearB || nameA.localeCompare(nameB);
      case "name_desc":
        return nameB.localeCompare(nameA);
      case "name_asc":
      default:
        return nameA.localeCompare(nameB);
    }
  });
  return sorted;
}

type Props = {
  onOpenRelease?: (id: string) => void;
};

export function ReleaseHubLayout({ onOpenRelease }: Props) {
  const navigate = useNavigate();

  const { userStore } = React.useContext(Context);
  const api = React.useMemo(() => createApi(userStore), [userStore]);

  const { state, actions } = useReleaseHubFilters();

  const [data, setData] = React.useState<ReleaseListResponse | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [debouncedQuery, setDebouncedQuery] = React.useState(state.query);
  React.useEffect(() => {
    const t = window.setTimeout(() => setDebouncedQuery(state.query), 250);
    return () => window.clearTimeout(t);
  }, [state.query]);

  React.useEffect(() => {
    let alive = true;
    setLoading(true);
    setError(null);

    const mockItems = sortMockReleases(
      filterMockReleases(releasesMock, {
        query: debouncedQuery,
        view: state.view,
        year: state.year,
        character: state.character,
        series: state.series,
        sort: state.sort,
      }),
      state.sort
    );

    if (releasesMock.length) {
      const start = (state.page - 1) * state.page_size;
      const pagedItems = mockItems.slice(start, start + state.page_size);
      setData({
        items: pagedItems,
        page: state.page,
        page_size: state.page_size,
        total: mockItems.length,
      });
      setLoading(false);
      return () => {
        alive = false;
      };
    }

    getReleases(api, {
      query: debouncedQuery || undefined,
      year: state.view === "year" ? state.year : undefined,
      character: state.view === "character" ? state.character : undefined,
      series: state.view === "series" ? state.series : undefined,
      page: state.page,
      page_size: state.page_size,
      sort: state.sort,
    })
      .then((res) => {
        if (!alive) return;
        setData(res);
      })
      .catch((e: any) => {
        if (!alive) return;
        setError(e?.message ?? "Failed to load releases");
        setData(null);
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [
    api,
    debouncedQuery,
    state.view,
    state.year,
    state.character,
    state.series,
    state.page,
    state.page_size,
    state.sort,
  ]);

  const totalPages = data ? Math.max(1, Math.ceil(data.total / data.page_size)) : 1;
  const totalCount = data?.total ?? 0;
  const visibleCount = data?.items?.length ?? 0;

  const handleOpenRelease = React.useCallback(
    (release: ReleaseDTO) => {
      if (onOpenRelease) {
        onOpenRelease(release.id);
        return;
      }
      navigate(`/releases/${release.id}`, { state: { release } });
    },
    [navigate, onOpenRelease]
  );

  return (
    <Box className="container" sx={{ px: { xs: 1.5, md: 2 }, py: { xs: 2, md: 3 } }}>
      <Stack spacing={2}>
        <ReleaseHubToolbar
          state={state}
          onViewChange={actions.setView}
          onQueryChange={actions.setQuery}
          onYearChange={actions.setYear}
          onCharacterChange={actions.setCharacter}
          onSeriesChange={actions.setSeries}
          onSortChange={actions.setSort}
          onReset={actions.reset}
        />

        {error ? <Alert severity="error">{error}</Alert> : null}

        {data && !loading ? (
          <Typography variant="body2" color="text.secondary">
            Showing {visibleCount} of {totalCount} releases
          </Typography>
        ) : null}

        {loading && !data ? (
          <ReleaseGridSkeleton count={12} />
        ) : data?.items?.length ? (
          <ReleaseGrid items={data.items} onOpen={handleOpenRelease} />
        ) : (
          <Paper elevation={0} sx={{ border: (t) => `1px solid ${t.palette.divider}`, borderRadius: 3, p: 3, textAlign: "center" }}>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              Nothing found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Try a different query, or reset filters.
            </Typography>
          </Paper>
        )}

        <Stack direction="row" justifyContent="center" sx={{ py: 1 }}>
          <Pagination
            page={state.page}
            count={totalPages}
            onChange={(_, page) => actions.setPage(page)}
            shape="rounded"
            size="large"
          />
        </Stack>
      </Stack>
    </Box>
  );
}
