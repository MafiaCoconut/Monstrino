import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/shared/seo/siteUrl';
import {
  fetchCharactersList,
  fetchReleasesList,
  fetchSeriesList,
} from '@/shared/api/releaseHub.server';

const toArray = (value: unknown): Array<Record<string, unknown>> =>
  Array.isArray(value) ? (value as Array<Record<string, unknown>>) : [];

const getId = (item: Record<string, unknown>) =>
  String(item.id ?? item.internal_id ?? item.slug ?? '');

const getUpdated = (item: Record<string, unknown>) => {
  const raw = item.updated_at ?? item.updatedAt ?? item.modified_at ?? item.modifiedAt;
  if (!raw) return undefined;
  const date = new Date(String(raw));
  return Number.isNaN(date.getTime()) ? undefined : date;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: 'daily', priority: 1 },
    { url: `${base}/catalog/r`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/catalog/c`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/catalog/p`, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${base}/catalog/s`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/info`, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${base}/info/about`, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${base}/info/support`, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${base}/info/contact`, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${base}/legal`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/legal/terms`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/legal/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/legal/impressum`, changeFrequency: 'yearly', priority: 0.3 },
  ];

  try {
    const [releasesRaw, seriesRaw, charactersRaw] = await Promise.all([
      fetchReleasesList(),
      fetchSeriesList(),
      fetchCharactersList(),
    ]);

    const releases = toArray(releasesRaw ?? []);
    const series = toArray(seriesRaw ?? []);
    const characters = toArray(charactersRaw ?? []);

    const releaseRoutes = releases
      .map((item) => {
        const id = getId(item);
        if (!id) return null;
        return {
          url: `${base}/catalog/r/${id}`,
          lastModified: getUpdated(item),
          changeFrequency: 'daily',
          priority: 0.8,
        };
      })
      .filter(Boolean) as MetadataRoute.Sitemap;

    const seriesRoutes = series
      .map((item) => {
        const id = getId(item);
        if (!id) return null;
        return {
          url: `${base}/catalog/s/${id}`,
          lastModified: getUpdated(item),
          changeFrequency: 'weekly',
          priority: 0.6,
        };
      })
      .filter(Boolean) as MetadataRoute.Sitemap;

    const characterRoutes = characters
      .map((item) => {
        const id = getId(item);
        if (!id) return null;
        return {
          url: `${base}/catalog/c/${id}`,
          lastModified: getUpdated(item),
          changeFrequency: 'weekly',
          priority: 0.6,
        };
      })
      .filter(Boolean) as MetadataRoute.Sitemap;

    return [...staticRoutes, ...releaseRoutes, ...seriesRoutes, ...characterRoutes];
  } catch (error) {
    return staticRoutes;
  }
}
