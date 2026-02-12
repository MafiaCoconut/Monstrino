import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PetPage from '@/release-hub/Index/PetIndex';
import { SeoHeader } from '@/shared/seo/SeoHeader';
import { getSiteUrl } from '@/shared/seo/siteUrl';
import { petIndexByNumericId } from '@/data/real-data/petIndexMock';


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

  return (
    <>
      <SeoHeader title={pet?.name ?? `Pet ${id}`} description={pet?.description ?? undefined} />
      <PetPage />
    </>
  );
}
