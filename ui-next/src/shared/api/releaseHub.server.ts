import { DETAIL_REVALIDATE_SECONDS } from '@/shared/seo/constants';
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

async function fetchJson<T>(path: string, revalidateSeconds = DETAIL_REVALIDATE_SECONDS): Promise<T | null> {
  if (!API_URL) return null;
  const res = await fetch(`${API_URL}${path}`, {
    next: { revalidate: revalidateSeconds },
  });
  if (!res.ok) return null;
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

export async function fetchReleasesList() {
  return fetchJson<Array<Record<string, unknown>>>(`/releases`, 60 * 60);
}

export async function fetchSeriesList() {
  return fetchJson<Array<Record<string, unknown>>>(`/series`, 60 * 60);
}

export async function fetchCharactersList() {
  return fetchJson<Array<Record<string, unknown>>>(`/characters`, 60 * 60);
}
