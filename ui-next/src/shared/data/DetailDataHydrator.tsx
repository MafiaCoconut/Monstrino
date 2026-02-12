'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchCharacter, fetchRelease, fetchSeries } from '@/shared/api/releaseHub.client';

const fetchers = {
  release: fetchRelease,
  series: fetchSeries,
  character: fetchCharacter,
};

export type DetailType = keyof typeof fetchers;

export function DetailDataHydrator({
  type,
  id,
  initialData,
}: {
  type: DetailType;
  id: string;
  initialData?: Record<string, unknown> | null;
}) {
  const fetcher = fetchers[type];
  const enabled = Boolean(id) && Boolean(process.env.NEXT_PUBLIC_BACKEND_URL);

  useQuery({
    queryKey: [type, id],
    queryFn: () => fetcher(id),
    initialData: initialData ?? undefined,
    enabled,
    staleTime: 0,
  });

  return null;
}
