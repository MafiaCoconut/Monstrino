import type { JSX } from 'react';
import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import styles from './introduction.module.css';

export default function Introduction(): JSX.Element {
  return (
    <Layout title="Introduction" description="Choose where to start exploring Monstrino documentation.">
      <main className={styles.page}>

        <section className={`${styles.hero} ${styles.fadeIn}`}>
          <h1 className={styles.title}>
            Where do you want to <span className={styles.gradient}>start?</span>
          </h1>
          <p className={styles.subtitle}>
            Monstrino has two documentation areas. Choose the one that fits your goal.
          </p>
        </section>

        <section className={styles.cards}>

          <Link to={useBaseUrl('docs/intro')} className={styles.card}>
            <div className={styles.cardIcon}>📖</div>
            <h2 className={styles.cardTitle}>Documentation</h2>
            <p className={styles.cardDesc}>
              Product-level knowledge: domain models, API contracts, UI architecture,
              service descriptions, pipelines, and practical guides.
              Start here if you want to <strong>understand what Monstrino does</strong>.
            </p>
            <span className={styles.cardCta}>Open Documentation →</span>
          </Link>

          <Link to={useBaseUrl('dev-notes/intro')} className={styles.card}>
            <div className={styles.cardIcon}>🛠</div>
            <h2 className={styles.cardTitle}>Dev Notes</h2>
            <p className={styles.cardDesc}>
              Engineering reasoning: architecture decisions, system reality, trade-offs,
              and boundary definitions.
              Start here if you want to <strong>understand why Monstrino is built this way</strong>.
            </p>
            <span className={styles.cardCta}>Open Dev Notes →</span>
          </Link>

        </section>

      </main>
    </Layout>
  );
}
