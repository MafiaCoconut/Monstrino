'use client';

import type { ReactNode } from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { useState } from 'react';

export default function ThemeRegistry({ children }: { children: ReactNode }) {
  const [cache] = useState(() => {
    const cache = createCache({ key: 'mui', prepend: true });
    cache.compat = true;
    return cache;
  });

  useServerInsertedHTML(() => {
    const entries = Object.entries(cache.inserted);
    const styles = entries
      .filter(([, value]) => typeof value === 'string')
      .map(([, value]) => value)
      .join('');

    if (!styles) {
      return null;
    }

    return (
      <style
        data-emotion={`${cache.key} ${entries
          .filter(([, value]) => typeof value === 'string')
          .map(([key]) => key)
          .join(' ')}`}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
