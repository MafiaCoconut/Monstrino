import type { Metadata } from 'next';
import PetCatalog from '@/release-hub/Catalog/PetCatalog';
import { buildCatalogMetadata } from '@/shared/seo/catalogMetadata';

type PageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  return buildCatalogMetadata('Pet Catalog', '/catalog/p', searchParams);
}

export default function Page() {
  return <PetCatalog />;
}
