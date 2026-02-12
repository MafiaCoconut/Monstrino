import type { Metadata } from 'next';
import SeriesCatalog from '@/release-hub/Catalog/SeriesCatalog';
import { buildCatalogMetadata } from '@/shared/seo/catalogMetadata';

type PageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  return buildCatalogMetadata('Series Catalog', '/catalog/s', searchParams);
}

export default function Page() {
  return <SeriesCatalog />;
}
