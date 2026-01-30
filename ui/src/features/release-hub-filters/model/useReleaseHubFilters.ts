// src/features/release-hub-filters/model/useReleaseHubFilters.ts
import * as React from "react";
import type { ReleaseSortKey } from "@/entities/release/model/types";

export type ReleaseHubView = "all" | "year" | "character" | "series";

export interface ReleaseHubFiltersState {
  view: ReleaseHubView;
  query: string;
  year?: number;
  character?: string;
  series?: string;
  sort: ReleaseSortKey;
  page: number;
  page_size: number;
}

const DEFAULTS: ReleaseHubFiltersState = {
  view: "all",
  query: "",
  sort: "newest",
  page: 1,
  page_size: 24,
};

export function useReleaseHubFilters() {
  const [state, setState] = React.useState<ReleaseHubFiltersState>(DEFAULTS);

  const actions = React.useMemo(() => {
    return {
      setView: (view: ReleaseHubView) => setState((s) => ({ ...s, view, page: 1 })),

      setQuery: (query: string) => setState((s) => ({ ...s, query, page: 1 })),

      setYear: (year?: number) => setState((s) => ({ ...s, year, page: 1 })),

      setCharacter: (character?: string) => setState((s) => ({ ...s, character, page: 1 })),

      setSeries: (series?: string) => setState((s) => ({ ...s, series, page: 1 })),

      setSort: (sort: ReleaseSortKey) => setState((s) => ({ ...s, sort, page: 1 })),

      setPage: (page: number) => setState((s) => ({ ...s, page })),

      setPageSize: (page_size: number) => setState((s) => ({ ...s, page_size, page: 1 })),

      reset: () => setState(DEFAULTS),
    };
  }, []);

  return { state, actions };
}
