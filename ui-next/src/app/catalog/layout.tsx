import { Suspense, type ReactNode } from 'react';
import CatalogLayout from '@/release-hub/Layout/CatalogLayout';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      <CatalogLayout>{children}</CatalogLayout>
    </Suspense>
  );
}
