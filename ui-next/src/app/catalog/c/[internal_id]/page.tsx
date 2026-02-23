import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CharacterPage from '@/release-hub/Index/CharacterIndex';
import { fetchCharacter } from '@/shared/api/releaseHub.server';
import { getCharacterSeo } from '@/shared/seo/releaseHub';
import { CharacterStructuredData } from '@/shared/seo/StructuredData';
import type { DetailSeoLink } from '@/shared/seo/DetailSeoContent';
import { DetailDataHydrator } from '@/shared/data/DetailDataHydrator';
import { characterIndexMockById } from '@/data/real-data/CharacterIndexMock';
export const revalidate = 43200;

type PageProps = {
  params: { internal_id: string } | Promise<{ internal_id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { internal_id } = await params;
  const apiData = await fetchCharacter(internal_id);
  const seo = getCharacterSeo(apiData, internal_id);
  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: seo.canonical,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { internal_id } = await params;
  const apiData = await fetchCharacter(internal_id);
  const fallback = characterIndexMockById(internal_id);

  if (!apiData && !fallback) {
    notFound();
  }

  const seo = getCharacterSeo(apiData, internal_id);
  const characterFallback = fallback ?? null;
  const apiRecord = apiData as any;
  const description =
    apiRecord?.description ||
    characterFallback?.officialDescription ||
    characterFallback?.biography ||
    seo.description;

  const links: DetailSeoLink[] = [];
  if (characterFallback?.releases?.length) {
    characterFallback.releases.slice(0, 3).forEach((release: any) => {
      if (!release?.id) return;
      links.push({
        href: `/catalog/r/${release.id}`,
        label: release.name ? `Release: ${release.name}` : `Release ${release.id}`,
      });
    });
  }
  links.push({ href: '/catalog/c', label: 'Browse all characters' });

  return (
    <>
      <CharacterStructuredData
        name={seo.title}
        description={description}
        url={seo.canonical}
        relatedLinks={links}
      />
      <DetailDataHydrator type="character" id={internal_id} initialData={apiData} />
      <CharacterPage />
    </>
  );
}
