import type { DetailSeoLink } from './DetailSeoContent';

type BaseStructuredDataProps = {
  name: string;
  description?: string;
  url: string;
  relatedLinks?: DetailSeoLink[];
};

type ProductStructuredDataProps = BaseStructuredDataProps;
type PersonStructuredDataProps = BaseStructuredDataProps;
type CreativeWorkStructuredDataProps = BaseStructuredDataProps;

function createStructuredData(
  type: 'Product' | 'Person' | 'CreativeWorkSeries',
  props: BaseStructuredDataProps
) {
  const { name, description, url, relatedLinks } = props;
  
  return {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    description: description || undefined,
    url,
    ...(relatedLinks && relatedLinks.length > 0
      ? {
          isRelatedTo: relatedLinks.map((link) => ({
            '@type': 'Thing',
            name: link.label,
            url: link.href.startsWith('http')
              ? link.href
              : `${url.split('/').slice(0, 3).join('/')}${link.href}`,
          })),
        }
      : {}),
  };
}

export function ProductStructuredData(props: ProductStructuredDataProps) {
  const structuredData = createStructuredData('Product', props);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function CharacterStructuredData(props: PersonStructuredDataProps) {
  const structuredData = createStructuredData('Person', props);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function SeriesStructuredData(props: CreativeWorkStructuredDataProps) {
  const structuredData = createStructuredData('CreativeWorkSeries', props);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
