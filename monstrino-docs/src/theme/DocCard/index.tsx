/**
 * Swizzled @theme/DocCard
 *
 * Universal replacement for the default Docusaurus card component.
 * Renders every category/doc item as a polished card regardless of which
 * docs section or folder it belongs to.
 */

import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {
  useDocById,
  findFirstSidebarItemLink,
} from '@docusaurus/plugin-content-docs/client';
import {usePluralForm} from '@docusaurus/theme-common';
import isInternalUrl from '@docusaurus/isInternalUrl';
import {translate} from '@docusaurus/Translate';
import type {Props} from '@theme/DocCard';
import type {
  PropSidebarItemCategory,
  PropSidebarItemLink,
} from '@docusaurus/plugin-content-docs';

import styles from './styles.module.css';

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function useCategoryItemsPlural() {
  const {selectMessage} = usePluralForm();
  return (count: number) =>
    selectMessage(
      count,
      translate(
        {
          message: '1 item|{count} items',
          id: 'theme.docs.DocCard.categoryDescription.plurals',
          description:
            'The default description for a category card in the generated index about how many items this category includes',
        },
        {count},
      ),
    );
}

/* ------------------------------------------------------------------ */
/* Shared card shell                                                   */
/* ------------------------------------------------------------------ */

function CardShell({
  href,
  className,
  typeLabel,
  badge,
  title,
  description,
}: {
  href: string;
  className?: string;
  typeLabel: string;
  badge?: ReactNode;
  title: string;
  description?: string;
}): ReactNode {
  return (
    <Link
      to={href}
      className={clsx(styles.card, className)}
      aria-label={title}>
      {/* top accent bar is rendered via ::before in CSS */}

      <div className={styles.cardHeader}>
        <span className={styles.typeTag}>{typeLabel}</span>
        {badge}
      </div>

      <h2 className={styles.cardTitle}>{title}</h2>

      {description ? (
        <p className={styles.cardDescription}>{description}</p>
      ) : (
        <p className={clsx(styles.cardDescription, styles.cardDescriptionEmpty)}>
          -
        </p>
      )}

      <div className={styles.cardFooter} aria-hidden="true">
        <span className={styles.arrow}>→</span>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Category card                                                       */
/* ------------------------------------------------------------------ */

function CardCategory({item}: {item: PropSidebarItemCategory}): ReactNode {
  const href = findFirstSidebarItemLink(item);
  const categoryItemsPlural = useCategoryItemsPlural();

  if (!href) {
    return null;
  }

  const description = item.description ?? categoryItemsPlural(item.items.length);

  const badge = (
    <span className={styles.countBadge} title={`${item.items.length} items`}>
      {item.items.length}
    </span>
  );

  return (
    <CardShell
      href={href}
      className={clsx(item.className, styles.categoryCard)}
      typeLabel="Category"
      badge={badge}
      title={item.label}
      description={description}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Doc / link card                                                     */
/* ------------------------------------------------------------------ */

function CardLink({item}: {item: PropSidebarItemLink}): ReactNode {
  const isExternal = !isInternalUrl(item.href);
  const doc = useDocById(item.docId ?? undefined);
  const description = item.description ?? doc?.description;

  return (
    <CardShell
      href={item.href}
      className={clsx(item.className, styles.docCard)}
      typeLabel={isExternal ? 'External' : 'Doc'}
      title={item.label}
      description={description}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Public export                                                       */
/* ------------------------------------------------------------------ */

export default function DocCard({item}: Props): ReactNode {
  switch (item.type) {
    case 'link':
      return <CardLink item={item} />;
    case 'category':
      return <CardCategory item={item} />;
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`);
  }
}
