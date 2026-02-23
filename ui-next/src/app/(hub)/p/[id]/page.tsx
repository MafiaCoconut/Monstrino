import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PetPage from '@/release-hub/Index/PetIndex';
import { ProductStructuredData } from '@/shared/seo/StructuredData';
import { getSiteUrl } from '@/shared/seo/siteUrl';
import { petIndexByNumericId } from '@/data/real-data/petIndexMock';

export const revalidate = 43200;

type PageProps = {
  params: { id: string } | Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const pet = petIndexByNumericId.get(id);
  const title = pet?.name ?? `Pet ${id}`;
  const description = pet?.description ?? `Pet profile for ${title}.`;
  return {
    title,
    description,
    alternates: {
      canonical: `${getSiteUrl()}/catalog/p/${id}`,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const pet = petIndexByNumericId.get(id);
  if (!pet) {
    notFound();
  }

  const title = pet?.name ?? `Pet ${id}`;
  const description = pet?.description ?? `Pet profile for ${title}.`;
  const url = `${getSiteUrl()}/catalog/p/${id}`;

  return (
    <>
      <ProductStructuredData name={title} description={description} url={url} />
      <PetPage />
    </>
  );
}
