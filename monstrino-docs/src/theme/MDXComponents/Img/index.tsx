import React from 'react';
import MDXImg from '@theme-original/MDXComponents/Img';
import ImageLightbox from '@site/src/components/ImageLightbox';

type ImgSrc = string | { default?: unknown } | undefined;

function normalizeSrc(src: ImgSrc): string | undefined {
  if (typeof src === 'string') {
    return src;
  }

  if (src && typeof src === 'object' && 'default' in src && typeof src.default === 'string') {
    return src.default;
  }

  return undefined;
}

function shouldUseLightbox(src: string | undefined): boolean {
  if (!src) return false;
  return src.includes('/img/') || src.includes('/assets/images/');
}

export default function MDXImgWithLightbox(props: React.ComponentProps<'img'>): React.JSX.Element {
  const normalizedSrc = normalizeSrc(props.src as ImgSrc);

  if (!shouldUseLightbox(normalizedSrc) || !normalizedSrc) {
    return <MDXImg {...props} />;
  }

  return (
    <ImageLightbox
      src={normalizedSrc}
      alt={props.alt ?? ''}
      className={props.className}
      style={props.style}
    />
  );
}
