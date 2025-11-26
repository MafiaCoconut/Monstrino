import type {JSX, ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import React from 'react';

import styles from './index.module.css';


export default function Home(): JSX.Element {
  return (
    <Layout title="Monstrino Documentation">
      <main className={styles.page}>

        {/* HERO SECTION */}
        <section className={`${styles.hero} ${styles.fadeIn}`}>
          <h1 className={styles.title}>
            Monstrino <span className={styles.gradient}>Documentation</span>
          </h1>

          <p className={styles.subtitle}>
            Your complete source of truth for Monsters, Releases, Characters,
            Pipelines, Data Models, Services, and the entire Monstrino ecosystem.
          </p>

          <div className={styles.buttons}>
            <Link className={styles.primaryButton} to="/docs/intro">
              Get Started
            </Link>
            <Link className={styles.secondaryButton} to="/docs/api">
              API Reference
            </Link>
          </div>
        </section>

        {/* QUICK LINKS */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Quick Links</h2>
          <div className={styles.quickLinks}>
            <Link className={styles.quickLinkItem} to="/docs/models/overview">
              📦 Releases & Models
            </Link>
            <Link className={styles.quickLinkItem} to="/docs/architecture">
              🏗 Architecture
            </Link>
            <Link className={styles.quickLinkItem} to="/docs/services/overview">
              ⚙ Services
            </Link>
            <Link className={styles.quickLinkItem} to="/docs/parser">
              🛠 Parsing System
            </Link>
            <Link className={styles.quickLinkItem} to="/docs/importer">
              🔁 Import Pipelines
            </Link>
          </div>
        </section>

        {/* ECOSYSTEM MAP */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Ecosystem Map</h2>

          <div className={styles.ecosystem}>
            <div className={`${styles.ecoItem} ${styles.fadeUp}`}>
              <h3>Core Domain</h3>
              <p>DTOs, Enums, Core logic, Shared Types.</p>
            </div>

            <div className={`${styles.ecoItem} ${styles.fadeUp}`}>
              <h3>Repositories</h3>
              <p>ORM, database structure, Unit-of-Work integration.</p>
            </div>

            <div className={`${styles.ecoItem} ${styles.fadeUp}`}>
              <h3>Microservices</h3>
              <p>Parser, Importer, Image Service, Sandbox Service.</p>
            </div>

            <div className={`${styles.ecoItem} ${styles.fadeUp}`}>
              <h3>Frontend</h3>
              <p>Monstrino UI, Components, Icons & Theming.</p>
            </div>

            <div className={`${styles.ecoItem} ${styles.fadeUp}`}>
              <h3>Pipelines</h3>
              <p>Event flow, processing logic, orchestration.</p>
            </div>
          </div>
        </section>

        {/* ARCHITECTURE DIAGRAM */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Monstrino Architecture</h2>

          <div className={styles.archDiagram}>
            <img
              src="/img/architecture/monstrino-architecture.svg"
              alt="Monstrino Architecture Diagram"
              className={styles.archImage}
            />
            <p className={styles.archCaption}>
              A high-level overview of the core domain, data flow, and microservices.
            </p>
          </div>
        </section>

      </main>
    </Layout>
  );
}