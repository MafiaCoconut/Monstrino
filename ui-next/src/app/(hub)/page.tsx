import type { Metadata } from 'next';
import HomePage from '@/release-hub/Homepage';
import { getSiteUrl } from '@/shared/seo/siteUrl';

export const metadata: Metadata = {
  title: 'Monstrino',
  description: 'Monster High Collection & Release Hub',
  alternates: {
    canonical: `${getSiteUrl()}/`,
  },
};

export default function Page() {
  return <HomePage />;
}
