import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PetPage from '@/release-hub/Index/PetIndex';
import { SeoHeader } from '@/shared/seo/SeoHeader';
import { getSiteUrl } from '@/shared/seo/siteUrl';
import { petIndexByNumericId } from '@/data/real-data/petIndexMock';


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

  return (
    <>
      <SeoHeader title={pet?.name ?? `Pet ${internal_id}`} description={pet?.description ?? undefined} />
      <PetPage />
    </>
  );
}
