'use client';

import type { CharacterApi, ReleaseApi, SeriesApi } from '@/shared/seo/releaseHub';

const rawBase = process.env.NEXT_PUBLIC_BACKEND_URL || '';
const API_BASE = rawBase.replace(/\/$/, '');
const API_URL = API_BASE ? `${API_BASE}/api/v1` : '';

type ApiResponse<T> = T | { result?: T } | { data?: T };

const unwrap = <T,>(data: ApiResponse<T>): T => {
  if (data && typeof data === 'object') {
    if ('result' in data && data.result) return data.result as T;
    if ('data' in data && data.data) return data.data as T;
  }
  return data as T;
};

async function fetchJson<T>(path: string): Promise<T> {
  if (!API_URL) {
    throw new Error('API base URL is not configured');
  }
  const res = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
  const json = (await res.json()) as ApiResponse<T>;
  return unwrap(json);
}

export async function fetchRelease(id: string) {
  return fetchJson<ReleaseApi>(`/releases/${id}`);
}

export async function fetchSeries(id: string) {
  return fetchJson<SeriesApi>(`/series/${id}`);
}

export async function fetchCharacter(id: string) {
  return fetchJson<CharacterApi>(`/characters/${id}`);
}
