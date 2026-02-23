import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PetPage from '@/release-hub/Index/PetIndex';
import { ProductStructuredData } from '@/shared/seo/StructuredData';
import { getSiteUrl } from '@/shared/seo/siteUrl';
import { petIndexByNumericId } from '@/data/real-data/petIndexMock';

export const revalidate = 43200;

type PageProps = {
  params: { internal_id: string } | Promise<{ internal_id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { internal_id } = await params;
  const pet = petIndexByNumericId.get(internal_id);
  const title = pet?.name ?? `Pet ${internal_id}`;
  const description = pet?.description ?? `Pet profile for ${title}.`;
  return {
    title,
    description,
    alternates: {
      canonical: `${getSiteUrl()}/catalog/p/${internal_id}`,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { internal_id } = await params;
  const pet = petIndexByNumericId.get(internal_id);
  if (!pet) {
    notFound();
  }

  const title = pet?.name ?? `Pet ${internal_id}`;
  const description = pet?.description ?? `Pet profile for ${title}.`;
  const url = `${getSiteUrl()}/catalog/p/${internal_id}`;

  return (
    <>
      <ProductStructuredData name={title} description={description} url={url} />
      <PetPage />
    </>
  );
}
