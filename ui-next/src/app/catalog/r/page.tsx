import type { Metadata } from 'next';
import ReleaseCatalog from '@/release-hub/Catalog/ReleaseCatalog';
import { buildCatalogMetadata } from '@/shared/seo/catalogMetadata';

type PageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  return buildCatalogMetadata('Release Catalog', '/catalog/r', searchParams);
}

export default function Page() {
  return <ReleaseCatalog />;
}
