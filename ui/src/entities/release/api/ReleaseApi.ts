// src/entities/release/api/releaseApi.ts
import type { AxiosInstance } from "axios";
import type { ReleaseDTO, ReleaseListQuery, ReleaseListResponse } from "../model/types";

type ApiEnvelope<T> = {
  result: T;
  // если у вас есть мета/ошибки — можно расширить позже
};

function unwrap<T>(data: T | ApiEnvelope<T>): T {
  if (data && typeof data === "object" && "result" in (data as any)) {
    return (data as ApiEnvelope<T>).result;
  }
  return data as T;
}

export async function getReleases(
  api: AxiosInstance,
  q: ReleaseListQuery
): Promise<ReleaseListResponse> {
  // ВАЖНО: подстройте path под ваш backend
  // Если у вас endpoint: /api/v1/releases -> здесь будет "/releases"
  const { data } = await api.get<ReleaseListResponse | ApiEnvelope<ReleaseListResponse>>(
    "/releases",
    {
      params: {
        query: q.query || undefined,
        year: q.year || undefined,
        character: q.character || undefined,
        series: q.series || undefined,
        page: q.page,
        page_size: q.page_size,
        sort: q.sort,
      },
    }
  );

  return unwrap(data);
}

export async function getReleaseById(
  api: AxiosInstance,
  id: string
): Promise<ReleaseDTO> {
  const { data } = await api.get<ReleaseDTO | ApiEnvelope<ReleaseDTO>>(
    `/releases/${id}`
  );

  return unwrap(data);
}
