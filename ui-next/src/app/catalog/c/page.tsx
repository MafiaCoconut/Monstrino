import type { Metadata } from 'next';
import CharacterCatalog from '@/release-hub/Catalog/CharacterCatalog';
import { buildCatalogMetadata } from '@/shared/seo/catalogMetadata';

type PageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  return buildCatalogMetadata('Character Catalog', '/catalog/c', searchParams);
}

export default function Page() {
  return <CharacterCatalog />;
}
