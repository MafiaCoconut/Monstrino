import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ReleasePage from '@/release-hub/Index/ReleaseIndex';
import { fetchRelease } from '@/shared/api/releaseHub.server';
import { getReleaseSeo } from '@/shared/seo/releaseHub';
import { ProductStructuredData } from '@/shared/seo/StructuredData';
import type { DetailSeoLink } from '@/shared/seo/DetailSeoContent';
import { DetailDataHydrator } from '@/shared/data/DetailDataHydrator';
import { releaseIndexMock } from '@/data/real-data/releaseIndexMock';
import { characterMock } from '@/data/real-data/characterMock';
import { seriesMock } from '@/data/real-data/seriesMock';
export const revalidate = 43200;

const normalizeName = (value?: string | null) => value?.trim().toLowerCase() ?? '';

const characterIdByName = new Map<string, number>();
characterMock.forEach((character: any) => {
  const name = normalizeName(character?.display_name ?? character?.name);
  if (name && !characterIdByName.has(name)) {
    characterIdByName.set(name, Number(character.id));
  }
});

const seriesIdByName = new Map<string, number>();
seriesMock.forEach((series: any) => {
  const name = normalizeName(series?.display_name ?? series?.name);
  if (name && !seriesIdByName.has(name)) {
    seriesIdByName.set(name, Number(series.id));
  }
});

type PageProps = {
  params: { internal_id: string } | Promise<{ internal_id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { internal_id } = await params;
  const apiData = await fetchRelease(internal_id);
  const seo = getReleaseSeo(apiData, internal_id);
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
  const apiData = await fetchRelease(internal_id);
  const fallback = releaseIndexMock.find((release) => `${release.id}` === `${internal_id}`);

  if (!apiData && !fallback) {
    notFound();
  }

  const seo = getReleaseSeo(apiData, internal_id);
  const releaseFallback = fallback ?? null;
  const apiRecord = apiData as any;
  const characterName = apiRecord?.character_name ?? apiRecord?.characterName ?? releaseFallback?.characterName;
  const seriesName = apiRecord?.series_name ?? apiRecord?.seriesName ?? releaseFallback?.seriesName;
  const apiCharacterId = apiRecord?.character_id ?? apiRecord?.characterId;
  const apiSeriesId = apiRecord?.series_id ?? apiRecord?.seriesId;
  const characterId =
    apiCharacterId ??
    (characterName ? characterIdByName.get(normalizeName(characterName)) : undefined);
  const seriesId =
    apiSeriesId ??
    (seriesName ? seriesIdByName.get(normalizeName(seriesName)) : undefined);

  const links: DetailSeoLink[] = [];
  if (characterId) {
    links.push({
      href: `/catalog/c/${characterId}`,
      label: characterName ? `Character: ${characterName}` : 'Character profile',
    });
  }
  if (seriesId) {
    links.push({
      href: `/catalog/s/${seriesId}`,
      label: seriesName ? `Series: ${seriesName}` : 'Series details',
    });
  }
  links.push({ href: '/catalog/r', label: 'Browse all releases' });

  const summaryParts = [
    seriesName ? `Part of the ${seriesName} series` : null,
    characterName ? `featuring ${characterName}` : null,
    releaseFallback?.year ? `released in ${releaseFallback.year}` : null,
  ].filter(Boolean) as string[];

  const summaryText = summaryParts.length > 0 ? `${summaryParts.join(' ')}.` : null;
  const description =
    apiRecord?.subtitle ||
    releaseFallback?.subtitle ||
    summaryText ||
    apiRecord?.description ||
    seo.description;

  return (
    <>
      <ProductStructuredData
        name={seo.title}
        description={description}
        url={seo.canonical}
        relatedLinks={links}
      />
      <DetailDataHydrator type="release" id={internal_id} initialData={apiData} />
      <ReleasePage />
    </>
  );
}
