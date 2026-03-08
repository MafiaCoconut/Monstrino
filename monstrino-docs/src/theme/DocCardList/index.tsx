/**
 * Swizzled @theme/DocCardList
 *
 * Replaces the default two-column Bootstrap-style row/col layout with a
 * responsive CSS-grid that automatically fills available space.
 * Works universally for every docs category in every plugin instance.
 */

import React, {type ComponentProps, type ReactNode} from 'react';
import clsx from 'clsx';
import {
  useCurrentSidebarSiblings,
  filterDocCardListItems,
} from '@docusaurus/plugin-content-docs/client';
import DocCard from '@theme/DocCard';
import type {Props} from '@theme/DocCardList';

import styles from './styles.module.css';

/* ------------------------------------------------------------------ */
/* Fallback: when no items prop is passed, read from sidebar context  */
/* ------------------------------------------------------------------ */

function DocCardListForCurrentSidebarCategory({className}: Props): ReactNode {
  const items = useCurrentSidebarSiblings();
  return <DocCardList items={items} className={className} />;
}

/* ------------------------------------------------------------------ */
/* Public export                                                       */
/* ------------------------------------------------------------------ */

export default function DocCardList(props: Props): ReactNode {
  const {items, className} = props;

  if (!items) {
    return <DocCardListForCurrentSidebarCategory {...props} />;
  }

  const filteredItems = filterDocCardListItems(items);

  if (filteredItems.length === 0) {
    return null;
  }

  return (
    <section className={clsx(styles.grid, className)}>
      {filteredItems.map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <article key={index} className={styles.gridItem}>
          <DocCard item={item} />
        </article>
      ))}
    </section>
  );
}
