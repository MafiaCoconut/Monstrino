import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SeriesPage from '@/release-hub/Index/SeriesIndex';
import { fetchSeries } from '@/shared/api/releaseHub.server';
import { getSeriesSeo } from '@/shared/seo/releaseHub';
import { SeoHeader } from '@/shared/seo/SeoHeader';
import { DetailSeoContent, type DetailSeoLink } from '@/shared/seo/DetailSeoContent';
import { DetailDataHydrator } from '@/shared/data/DetailDataHydrator';
import { seriesIndexByNumericId } from '@/data/real-data/seriesIndexMock';
export const revalidate = 21600;

type PageProps = {
  params: { internal_id: string } | Promise<{ internal_id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { internal_id } = await params;
  const apiData = await fetchSeries(internal_id);
  const seo = getSeriesSeo(apiData, internal_id);
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
  const apiData = await fetchSeries(internal_id);
  const fallback = seriesIndexByNumericId.get(internal_id);

  if (!apiData && !fallback) {
    notFound();
  }

  const seo = getSeriesSeo(apiData, internal_id);
  const seriesFallback = fallback ?? null;
  const apiRecord = apiData as any;
  const mainText =
    apiRecord?.description ||
    seriesFallback?.description ||
    seriesFallback?.concept ||
    seriesFallback?.themeDescription ||
    seo.description;

  const links: DetailSeoLink[] = [];
  if (seriesFallback?.characters?.length) {
    seriesFallback.characters.slice(0, 3).forEach((character: any) => {
      if (!character?.id) return;
      links.push({
        href: `/catalog/c/${character.id}`,
        label: character.name ? `Character: ${character.name}` : `Character ${character.id}`,
      });
    });
  }
  links.push({ href: '/catalog/s', label: 'Browse all series' });

  return (
    <>
      <SeoHeader title={seo.title} description={seo.description} />
      <DetailSeoContent body={mainText} links={links} />
      <DetailDataHydrator type="series" id={internal_id} initialData={apiData} />
      <SeriesPage />
    </>
  );
}
