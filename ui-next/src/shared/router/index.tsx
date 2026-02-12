'use client';

import React, { forwardRef, useCallback, useMemo } from 'react';
import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import {
  usePathname,
  useRouter,
  useSearchParams as useNextSearchParams,
  useParams as useNextParams,
} from 'next/navigation';

export type RouterLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> &
  Omit<NextLinkProps, 'href'> & {
    to: string;
  };

export const Link = forwardRef<HTMLAnchorElement, RouterLinkProps>(function Link(
  { to, ...props },
  ref
) {
  return <NextLink ref={ref} href={to} {...props} />;
});

export const RouterLink = Link;

export function useNavigate() {
  const router = useRouter();
  return (to: string, options?: { replace?: boolean; scroll?: boolean }) => {
    if (options?.replace) {
      router.replace(to, { scroll: options?.scroll });
      return;
    }
    router.push(to, { scroll: options?.scroll });
  };
}

export function useLocation() {
  const pathname = usePathname();

  return useMemo(
    () => ({
      pathname: pathname ?? '',
      search: '',
      hash: '',
      state: null,
      key: '',
    }),
    [pathname]
  );
}

export function useParams<T extends Record<string, string | string[]>>() {
  return useNextParams<T>();
}

export function useSearchParams() {
  const router = useRouter();
  const pathname = usePathname() ?? '';
  const searchParams = useNextSearchParams();

  const setSearchParams = useCallback(
    (
      next:
        | URLSearchParams
        | Record<string, string | number | boolean | null | undefined>,
      options?: { replace?: boolean; scroll?: boolean }
    ) => {
      let params: URLSearchParams;

      if (next instanceof URLSearchParams) {
        params = new URLSearchParams(next.toString());
      } else {
        params = new URLSearchParams();
        Object.entries(next).forEach(([key, value]) => {
          if (value === '' || value == null || value === false) {
            return;
          }
          params.set(key, String(value));
        });
      }

      const query = params.toString();
      const url = query ? `${pathname}?${query}` : pathname;
      if (options?.replace ?? true) {
        router.replace(url, { scroll: options?.scroll });
      } else {
        router.push(url, { scroll: options?.scroll });
      }
    },
    [pathname, router, searchParams]
  );

  return [searchParams ?? new URLSearchParams(), setSearchParams] as const;
}
