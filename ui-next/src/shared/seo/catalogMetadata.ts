import type { Metadata } from 'next';
import { getSiteUrl } from './siteUrl';

type SearchParams = Record<string, string | string[] | undefined> | undefined;

export function buildCatalogMetadata(
  title: string,
  path: string,
  searchParams?: SearchParams
): Metadata {
  const hasQuery = Boolean(searchParams && Object.keys(searchParams).length > 0);
  const canonical = `${getSiteUrl()}${path}`;

  return {
    title,
    alternates: {
      canonical,
    },
    robots: hasQuery
      ? {
          index: false,
          follow: true,
        }
      : {
          index: true,
          follow: true,
        },
  };
}
