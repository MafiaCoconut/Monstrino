import type { ReactNode } from 'react';
import HubLayout from '@/release-hub/Layout/HubLayout';

export default function Layout({ children }: { children: ReactNode }) {
  return <HubLayout>{children}</HubLayout>;
}
