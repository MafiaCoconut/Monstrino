import type {JSX, ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import ImageLightbox from '@site/src/components/ImageLightbox';
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
            Monster High data is scattered, inconsistent, and incomplete across sources.<br/>
            Monstrino resolves it — canonical product records, controlled vocabulary,
            and pricing history with provenance for every release.
          </p>

          <div className={styles.buttons}>
            <div className={styles.buttonsRow}>
              <Link className={styles.primaryButton} to={useBaseUrl("introduction")}>
                Get Started
              </Link>
              <Link className={styles.secondaryButton} to={useBaseUrl("docs/ai-features/overview")}>
                AI Features
              </Link>
            </div>
            <div className={styles.buttonsRow}>
              <Link className={styles.tertiaryButton} to={useBaseUrl("docs/raw-to-catalog/overview")}>
                From Raw Data to Structured Catalog
              </Link>
            </div>
          </div>
        </section>

        {/* PLATFORM PILLARS */}
        <section className={styles.section}>
          <div className={styles.pillars}>
            <div className={styles.pillar}>
              <div className={styles.pillarHeader}>
                <div className={styles.pillarIcon}>🗂</div>
                <div className={styles.pillarSubtitle}>Canonical Catalog</div>
              </div>
              <div className={styles.pillarTitle}>Stable product identities across sources</div>
              <p className={styles.pillarText}>
                Every release, character, pet, and series has a durable canonical identity independent of any source identifier.
                Classification uses controlled vocabulary. External references preserve source provenance without polluting canonical data.
              </p>
            </div>
            <div className={styles.pillar}>
              <div className={styles.pillarHeader}>
                <div className={styles.pillarIcon}>🔀</div>
                <div className={styles.pillarSubtitle}>Source Reconciliation</div>
              </div>
              <div className={styles.pillarTitle}>Uncontrolled sources, normalized entities</div>
              <p className={styles.pillarText}>
                Sources provide no schema guarantees. A resolver chain translates partial, inconsistent, and conflicting source hints
                into canonical domain entities — domain-aware resolution, not field mapping.
              </p>
            </div>
            <div className={styles.pillar}>
              <div className={styles.pillarHeader}>
                <div className={styles.pillarIcon}>✦</div>
                <div className={styles.pillarSubtitle}>Enrichment Pipeline</div>
              </div>
              <div className={styles.pillarTitle}>Completeness without compromising authority</div>
              <p className={styles.pillarText}>
                Attribute gaps are addressed through a staged enrichment layer. AI inference returns structured proposals —
                a validation step decides what enters the catalog. Probabilistic systems assist without becoming the source of truth.
              </p>
            </div>
          </div>
        </section>

        {/* QUICK LINKS */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Quick Links</h2>

          <div className={styles.quickLinksGroup}>
            <h3 className={styles.quickLinksLabel}>Documentation</h3>
            <div className={styles.quickLinks}>
              <Link className={styles.quickLinkItem} to={useBaseUrl("docs/architecture/overview")}>
                🏗 Architecture
              </Link>
              <Link className={styles.quickLinkItem} to={useBaseUrl("docs/ai-features/overview")}>
                🤖 AI Features
              </Link>
              <Link className={styles.quickLinkItem} to={useBaseUrl("docs/pipelines/overview")}>
                🔄 Pipelines
              </Link>
              <Link className={styles.quickLinkItem} to={useBaseUrl("docs/principles/overview")}>
                📐 Design Principles
              </Link>
            </div>
          </div>

          <div className={styles.quickLinksGroup}>
            <h3 className={styles.quickLinksLabel}>Dev Notes</h3>
            <div className={styles.quickLinks}>
              <Link className={styles.quickLinkItem} to={useBaseUrl("dev-notes/architecture/system-context")}>
                🗺 System Context
              </Link>
              <Link className={styles.quickLinkItem} to={useBaseUrl("dev-notes/ai/ai-orchestrator-architecture")}>
                🧠 AI Orchestrator
              </Link>
              <Link className={styles.quickLinkItem} to={useBaseUrl("dev-notes/pipelines/pipelines-overview")}>
                ⚙ Pipeline Patterns
              </Link>
            </div>
            <div className={styles.quickLinks}>
              <Link className={styles.quickLinkItem} to={useBaseUrl("dev-notes/infrastructure/environment-strategy")}>
                🌍 Infrastructure
              </Link>
              <Link className={styles.quickLinkItem} to={useBaseUrl("dev-notes/decisions/architecture-decisions")}>
                📝 ADRs
              </Link>
              <Link className={styles.quickLinkItem} to={useBaseUrl("dev-notes/roadmap/overview")}>
                🗓 Roadmap
              </Link>
            </div>
          </div>
        </section>

        {/* STATUS OVERVIEW */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Project at a Glance</h2>
          <div className={styles.statsRow}>
            {/* <div className={styles.statCard}>
              <span className={styles.statNumber}>9</span>
              <span className={styles.statLabel}>Microservices</span>
            </div> */}
            <div className={styles.statCard}>
              <span className={styles.statNumber}>7</span>
              <span className={styles.statLabel}>Shared Packages</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>5+</span>
              <span className={styles.statLabel}>Data Pipelines</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>AI</span>
              <span className={styles.statLabel}>LLM Enrichment</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>30+</span>
              <span className={styles.statLabel}>Tables</span>
            </div>
          </div>
        </section>

        {/* ARCHITECTURE DIAGRAM */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Monstrino Architecture</h2>

          <div className={styles.archDiagram}>
            <ImageLightbox
              // src={useBaseUrl("/img/architecture/docs-homepage-diagram.jpg")}
              src={useBaseUrl("/img/architecture/architecture-overview-new.jpg")}
              mobileSrc={useBaseUrl("/img/architecture/architecture-overview-new.jpg")}
              alt="Monstrino Architecture Diagram"
              className={styles.archImage}
              disableLightboxOnMobile
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
