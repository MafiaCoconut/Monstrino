import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function DocCard({ title, children, href }: { title: string; children?: React.ReactNode; href?: string }) {
  const content = (
    <div className={`${styles.card} ${href ? styles.cardLink : ''}`}>
      <h3>{title}</h3>
      {children && <p>{children}</p>}
    </div>
  );

  if (href) {
    return <Link to={href} style={{ textDecoration: 'none' }}>{content}</Link>;
  }

  return content;
}
