import type { ReactNode } from 'react';
import InfoLayout from '@/release-hub/Layout/InfoLayout';

export default function Layout({ children }: { children: ReactNode }) {
  return <InfoLayout>{children}</InfoLayout>;
}
