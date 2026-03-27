import type { JSX } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
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


        {/* WHY MONSTRINO */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Why Monstrino Exists</h2>

          <p className={styles.sectionText}>
            Collector data for franchises like Monster High is scattered across wikis,
            marketplaces, and community blogs — each holding a different piece of the puzzle,
            none of it structured or connected.
          </p>

          <div className={styles.problemsGrid}>
            <div className={styles.pillar}>
              <div className={styles.pillarHeader}>
                <div className={styles.pillarIcon}>🗂️</div>
              </div>
              <div className={styles.pillarTitle}>Fragmented Sources</div>
              <p className={styles.pillarText}>
                The same product appears across wikis, retailers, and marketplaces —
                each with different, partial, or conflicting data.
              </p>
            </div>

            <div className={styles.pillar}>
              <div className={styles.pillarHeader}>
                <div className={styles.pillarIcon}>📄</div>
              </div>
              <div className={styles.pillarTitle}>Unstructured Data</div>
              <p className={styles.pillarText}>
                Product details are buried inside prose descriptions instead of structured fields —
                impossible to compare or automate.
              </p>
            </div>

            <div className={styles.pillar}>
              <div className={styles.pillarHeader}>
                <div className={styles.pillarIcon}>📦</div>
              </div>
              <div className={styles.pillarTitle}>Missing Contents</div>
              <p className={styles.pillarText}>
                Which accessories were in the box? Which clothes? This almost never
                exists in structured form — only in reviews and forum threads.
              </p>
            </div>

            <div className={styles.pillar}>
              <div className={styles.pillarHeader}>
                <div className={styles.pillarIcon}>💰</div>
              </div>
              <div className={styles.pillarTitle}>No Pricing Aggregation</div>
              <p className={styles.pillarText}>
                Real market value requires checking eBay, Vinted, and official retailers
                simultaneously. No catalog does this automatically.
              </p>
            </div>

            <div className={styles.pillar}>
              <div className={styles.pillarHeader}>
                <div className={styles.pillarIcon}>🕸️</div>
              </div>
              <div className={styles.pillarTitle}>No Knowledge Graph</div>
              <p className={styles.pillarText}>
                Each release is an isolated entry. Relationships between characters,
                pets, and series are never mapped — no catalog supports this.
              </p>
            </div>
          </div>

          <div className={styles.sectionCta}>
            <Link className={styles.secondaryButton} to={useBaseUrl("why-monstrino/intro")}>
              Why Monstrino →
            </Link>
          </div>
        </section>


        {/* WHY AI MATTERS */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Why AI Matters Here</h2>

          <div className={styles.pillars}>
            <div className={styles.pillar}>
              <div className={styles.pillarHeader}>
                <div className={styles.pillarIcon}>AI</div>
                <div className={styles.pillarSubtitle}>Semantic Recovery</div>
              </div>

              <div className={styles.pillarTitle}>
                Product meaning is often missing from source data
              </div>

              <p className={styles.pillarText}>
                Source pages rarely provide the full semantics needed for a canonical catalog:
                characters, release classification, relationships, and structured item meaning.
              </p>
            </div>

            <div className={styles.pillar}>
              <div className={styles.pillarHeader}>
                <div className={styles.pillarIcon}>AI</div>
                <div className={styles.pillarSubtitle}>Operational Enrichment</div>
              </div>

              <div className={styles.pillarTitle}>
                AI is a core enrichment engine, not a side feature
              </div>

              <p className={styles.pillarText}>
                Monstrino uses AI where rule-based extraction reaches its limit, turning incomplete
                source payloads into richer structured proposals that move the pipeline forward.
              </p>
            </div>

            <div className={styles.pillar}>
              <div className={styles.pillarHeader}>
                <div className={styles.pillarIcon}>AI</div>
                <div className={styles.pillarSubtitle}>Controlled Import</div>
              </div>

              <div className={styles.pillarTitle}>
                Validation keeps AI from becoming the source of truth
              </div>

              <p className={styles.pillarText}>
                AI outputs are validated before import, so enrichment improves completeness without
                bypassing provenance, canonical matching, or downstream data quality controls.
              </p>
            </div>
          </div>
        </section>


        {/* CORE ARCHITECTURE PRINCIPLES */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Core Architecture Principles</h2>

          <div className={`${styles.pillars} ${styles.architecturePillars}`}>

            <div className={styles.pillar}>
              <div className={styles.pillarHeader}>
                <div className={styles.pillarIcon}>🧩</div>
                <div className={styles.pillarSubtitle}>Identity Layer</div>
              </div>

              <div className={styles.pillarTitle}>
                Canonical entities independent of sources
              </div>

              <p className={styles.pillarText}>
                Releases, characters, pets, and series are represented as canonical
                domain entities with stable identities independent of any external source.
                External identifiers are preserved only as references with provenance.
              </p>
            </div>


            <div className={styles.pillar}>
              <div className={styles.pillarHeader}>
                <div className={styles.pillarIcon}>🔀</div>
                <div className={styles.pillarSubtitle}>Source Reconciliation</div>
              </div>

              <div className={styles.pillarTitle}>
                Uncontrolled sources resolved into domain entities
              </div>

              <p className={styles.pillarText}>
                External sources provide incomplete and inconsistent information.
                Resolver chains translate partial hints into canonical entities
                using domain-aware resolution instead of naive field mapping.
              </p>
            </div>


            <div className={styles.pillar}>
              <div className={styles.pillarHeader}>
                <div className={styles.pillarIcon}>✦</div>
                <div className={styles.pillarSubtitle}>AI Enrichment</div>
              </div>

              <div className={styles.pillarTitle}>
                Completeness without compromising authority
              </div>

              <p className={styles.pillarText}>
                Missing attributes are addressed through a staged enrichment layer.
                AI generates structured proposals that are validated before entering
                the catalog. Probabilistic systems assist without becoming the source of truth.
              </p>
            </div>


            <div className={styles.pillar}>
              <div className={styles.pillarHeader}>
                <div className={styles.pillarIcon}>⚙</div>
                <div className={styles.pillarSubtitle}>Ingestion Platform</div>
              </div>

              <div className={styles.pillarTitle}>
                Structured pipelines transform raw data into catalog entities
              </div>

              <p className={styles.pillarText}>
                Monstrino is built around staged ingestion pipelines that process
                external data through collection, parsing, enrichment, reconciliation,
                and import steps. Pipelines make the system observable, retryable,
                and scalable.
              </p>
            </div>

          </div>
        </section>


        {/* ARCHITECTURE DIAGRAM */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Monstrino Architecture</h2>

          <div className={styles.archDiagram}>
            <ImageLightbox
              src={useBaseUrl("/img/architecture/architecture-overview-mini-v7.jpg")}
              mobileSrc={useBaseUrl("/img/architecture/architecture-overview-mini-v7.jpg")}
              alt="Monstrino Architecture Diagram"
              className={styles.archImage}
              disableLightboxOnMobile
            />

            <p className={styles.archCaption}>
              High-level overview of the Monstrino platform
            </p>
          </div>
        </section>


        {/* PROJECT AT A GLANCE */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Project at a Glance</h2>

          <div className={styles.statsBar}>

            <div className={styles.statsBarGroup}>
              <div className={styles.statsBarGroupLabel}>Catalog</div>
              <div className={styles.statsBarItems}>
                <div className={styles.statsBarItem}>
                  <span className={styles.statsBarNumber}>1,000+</span>
                  <span className={styles.statsBarItemLabel}>Catalog Entities</span>
                </div>
                <div className={styles.statsBarItem}>
                  <span className={styles.statsBarNumber}>4</span>
                  <span className={styles.statsBarItemLabel}>Entity Types</span>
                </div>
              </div>
            </div>

            <div className={styles.statsBarGroup}>
              <div className={styles.statsBarGroupLabel}>Data Collection</div>
              <div className={styles.statsBarItems}>
                <div className={styles.statsBarItem}>
                  <span className={styles.statsBarNumber}>35+</span>
                  <span className={styles.statsBarItemLabel}>Integrations</span>
                </div>
                <div className={styles.statsBarItem}>
                  <span className={styles.statsBarNumber}>20</span>
                  <span className={styles.statsBarItemLabel}>Countries</span>
                </div>
                <div className={styles.statsBarItem}>
                  <span className={styles.statsBarNumber}>4</span>
                  <span className={styles.statsBarItemLabel}>Source Types</span>
                </div>
              </div>
            </div>

            <div className={styles.statsBarGroup}>
              <div className={styles.statsBarGroupLabel}>Platform</div>
              <div className={styles.statsBarItems}>
                <div className={styles.statsBarItem}>
                  <span className={styles.statsBarNumber}>20+</span>
                  <span className={styles.statsBarItemLabel}>Microservices</span>
                </div>
                <div className={styles.statsBarItem}>
                  <span className={styles.statsBarNumber}>7</span>
                  <span className={styles.statsBarItemLabel}>Custom Packages</span>
                </div>
                <div className={styles.statsBarItem}>
                  <span className={styles.statsBarNumber}>7</span>
                  <span className={styles.statsBarItemLabel}>DB Schemas</span>
                </div>
              </div>
            </div>

            <div className={styles.statsBarGroup}>
              <div className={styles.statsBarGroupLabel}>AI</div>
              <div className={styles.statsBarItems}>
                <div className={styles.statsBarItem}>
                  <span className={styles.statsBarNumber}>10+</span>
                  <span className={styles.statsBarItemLabel}>AI Scenarios</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* QUICK LINKS */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Explore the System</h2>

          <div className={styles.quickLinksGroup}>
            <h3 className={styles.quickLinksLabel}>Architecture</h3>

            <div className={styles.quickLinks}>
              <Link className={styles.quickLinkItem} to={useBaseUrl("docs/architecture/overview")}>
                🏗 System Architecture
              </Link>

              <Link className={styles.quickLinkItem} to={useBaseUrl("docs/pipelines/overview")}>
                🔄 Data Pipelines
              </Link>

              <Link className={styles.quickLinkItem} to={useBaseUrl("docs/principles/overview")}>
                📐 Design Principles
              </Link>
            </div>
          </div>


          <div className={styles.quickLinksGroup}>
            <h3 className={styles.quickLinksLabel}>Platform Components</h3>

            <div className={styles.quickLinks}>
              <Link className={styles.quickLinkItem} to={useBaseUrl("docs/ai-features/overview")}>
                🤖 AI Enrichment
              </Link>

              <Link className={styles.quickLinkItem} to={useBaseUrl("dev-notes/ai/ai-orchestrator-architecture")}>
                🧠 AI Orchestrator
              </Link>

              <Link className={styles.quickLinkItem} to={useBaseUrl("dev-notes/infrastructure/environment-strategy")}>
                🌍 Infrastructure
              </Link>
            </div>

            <div className={styles.quickLinks}>
              <Link className={styles.quickLinkItem} to={useBaseUrl("dev-notes/decisions/architecture-decisions")}>
                📝 Architecture Decisions (ADR)
              </Link>

              <Link className={styles.quickLinkItem} to={useBaseUrl("dev-notes/roadmap/overview")}>
                🗓 Roadmap
              </Link>
            </div>
          </div>

        </section>

      </main>
    </Layout>
  );
}
