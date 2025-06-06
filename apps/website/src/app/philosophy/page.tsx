'use client';

import React from 'react';
import { useLanguage } from '@cybereco/ui-components';
import styles from './page.module.css';

export default function PhilosophyPage() {
  const { t } = useLanguage();

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>{t('common:philosophyPage.title')}</h1>
          <p className={styles.subtitle}>🌟 {t('common:philosophyPage.subtitle')}</p>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className={styles.manifestoSection}>
        <div className={styles.manifestoCard}>
          <h2 className={styles.manifestoTitle}>🎯 {t('common:philosophyPage.manifestoTitle')}</h2>
          <blockquote className={styles.manifestoQuote}>
            "{t('common:philosophyPage.manifestoQuote')}"
          </blockquote>
          <div className={styles.manifestoBeliefs}>
            <h3>{t('common:philosophyPage.manifestoBeliefTitle')}</h3>
            <ul>
              <li><strong>{t('common:philosophyPage.manifestoBelief1')}</strong></li>
              <li><strong>{t('common:philosophyPage.manifestoBelief2')}</strong></li>
              <li><strong>{t('common:philosophyPage.manifestoBelief3')}</strong></li>
              <li><strong>{t('common:philosophyPage.manifestoBelief4')}</strong></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className={styles.principlesSection}>
        <h2 className={styles.sectionTitle}>🌱 {t('common:philosophyPage.principlesSectionTitle')}</h2>
        <div className={styles.principlesGrid}>
          <div className={styles.principleCard}>
            <div className={styles.principleIcon}>🔐</div>
            <h3 className={styles.principleTitle}>{t('common:philosophyPage.digitalSovereigntyTitle')}</h3>
            <p className={styles.principleQuote}>"{t('common:philosophyPage.digitalSovereigntyQuote')}"</p>
            <div className={styles.principleDetails}>
              <h4>{t('common:philosophyPage.digitalSovereigntyMeansTitle')}</h4>
              <ul>
                <li>{t('common:philosophyPage.digitalSovereigntyMeans1')}</li>
                <li>{t('common:philosophyPage.digitalSovereigntyMeans2')}</li>
                <li>{t('common:philosophyPage.digitalSovereigntyMeans3')}</li>
                <li>{t('common:philosophyPage.digitalSovereigntyMeans4')}</li>
              </ul>
              <h4>{t('common:philosophyPage.digitalSovereigntyImplTitle')}</h4>
              <ul>
                <li>{t('common:philosophyPage.digitalSovereigntyImpl1')}</li>
                <li>{t('common:philosophyPage.digitalSovereigntyImpl2')}</li>
                <li>{t('common:philosophyPage.digitalSovereigntyImpl3')}</li>
                <li>{t('common:philosophyPage.digitalSovereigntyImpl4')}</li>
              </ul>
            </div>
          </div>

          <div className={styles.principleCard}>
            <div className={styles.principleIcon}>🌱</div>
            <h3 className={styles.principleTitle}>{t('common:philosophyPage.wellbeingTitle')}</h3>
            <p className={styles.principleQuote}>"{t('common:philosophyPage.wellbeingQuote')}"</p>
            <div className={styles.principleDetails}>
              <h4>{t('common:philosophyPage.wellbeingMeansTitle')}</h4>
              <ul>
                <li>{t('common:philosophyPage.wellbeingMeans1')}</li>
                <li>{t('common:philosophyPage.wellbeingMeans2')}</li>
                <li>{t('common:philosophyPage.wellbeingMeans3')}</li>
                <li>{t('common:philosophyPage.wellbeingMeans4')}</li>
              </ul>
              <h4>{t('common:philosophyPage.wellbeingImplTitle')}</h4>
              <ul>
                <li>{t('common:philosophyPage.wellbeingImpl1')}</li>
                <li>{t('common:philosophyPage.wellbeingImpl2')}</li>
                <li>{t('common:philosophyPage.wellbeingImpl3')}</li>
                <li>{t('common:philosophyPage.wellbeingImpl4')}</li>
              </ul>
            </div>
          </div>

          <div className={styles.principleCard}>
            <div className={styles.principleIcon}>🔗</div>
            <h3 className={styles.principleTitle}>{t('common:philosophyPage.interconnectionTitle')}</h3>
            <p className={styles.principleQuote}>"{t('common:philosophyPage.interconnectionQuote')}"</p>
            <div className={styles.principleDetails}>
              <h4>{t('common:philosophyPage.interconnectionMeansTitle')}</h4>
              <ul>
                <li>{t('common:philosophyPage.interconnectionMeans1')}</li>
                <li>{t('common:philosophyPage.interconnectionMeans2')}</li>
                <li>{t('common:philosophyPage.interconnectionMeans3')}</li>
                <li>{t('common:philosophyPage.interconnectionMeans4')}</li>
              </ul>
              <h4>{t('common:philosophyPage.interconnectionImplTitle')}</h4>
              <ul>
                <li>{t('common:philosophyPage.interconnectionImpl1')}</li>
                <li>{t('common:philosophyPage.interconnectionImpl2')}</li>
                <li>{t('common:philosophyPage.interconnectionImpl3')}</li>
                <li>{t('common:philosophyPage.interconnectionImpl4')}</li>
              </ul>
            </div>
          </div>

          <div className={styles.principleCard}>
            <div className={styles.principleIcon}>🤝</div>
            <h3 className={styles.principleTitle}>{t('common:philosophyPage.communityTitle')}</h3>
            <p className={styles.principleQuote}>"{t('common:philosophyPage.communityQuote')}"</p>
            <div className={styles.principleDetails}>
              <h4>{t('common:philosophyPage.communityMeansTitle')}</h4>
              <ul>
                <li>{t('common:philosophyPage.communityMeans1')}</li>
                <li>{t('common:philosophyPage.communityMeans2')}</li>
                <li>{t('common:philosophyPage.communityMeans3')}</li>
                <li>{t('common:philosophyPage.communityMeans4')}</li>
              </ul>
              <h4>{t('common:philosophyPage.communityImplTitle')}</h4>
              <ul>
                <li>{t('common:philosophyPage.communityImpl1')}</li>
                <li>{t('common:philosophyPage.communityImpl2')}</li>
                <li>{t('common:philosophyPage.communityImpl3')}</li>
                <li>{t('common:philosophyPage.communityImpl4')}</li>
              </ul>
            </div>
          </div>

          <div className={styles.principleCard}>
            <div className={styles.principleIcon}>📖</div>
            <h3 className={styles.principleTitle}>{t('common:philosophyPage.opennessTitle')}</h3>
            <p className={styles.principleQuote}>"{t('common:philosophyPage.opennessQuote')}"</p>
            <div className={styles.principleDetails}>
              <h4>{t('common:philosophyPage.opennessMeansTitle')}</h4>
              <ul>
                <li>{t('common:philosophyPage.opennessMeans1')}</li>
                <li>{t('common:philosophyPage.opennessMeans2')}</li>
                <li>{t('common:philosophyPage.opennessMeans3')}</li>
                <li>{t('common:philosophyPage.opennessMeans4')}</li>
              </ul>
              <h4>{t('common:philosophyPage.opennessImplTitle')}</h4>
              <ul>
                <li>{t('common:philosophyPage.opennessImpl1')}</li>
                <li>{t('common:philosophyPage.opennessImpl2')}</li>
                <li>{t('common:philosophyPage.opennessImpl3')}</li>
                <li>{t('common:philosophyPage.opennessImpl4')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>{t('common:philosophyPage.ctaTitle')}</h2>
          <p className={styles.ctaText}>
            {t('common:philosophyPage.ctaText')}
          </p>
          <div className={styles.ctaButtons}>
            <a href="/portfolio" className={styles.ctaButton}>
              {t('common:philosophyPage.ctaButton')}
            </a>
            <a href="/vision" className={styles.ctaButtonSecondary}>
              {t('common:philosophyPage.ctaButtonSecondary')}
            </a>
          </div>
        </div>
      </section>

      {/* Implementation Section */}
      <section className={styles.implementationSection}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>🚀 {t('common:philosophyPage.implementationTitle')}</h2>
          <p className={styles.sectionDescription}>
            {t('common:philosophyPage.implementationText')}
          </p>
          <div className={styles.actionGrid}>
            <div className={styles.actionCard}>
              <h4>🔒 {t('common:philosophyPage.privacyTitle')}</h4>
              <p>{t('common:philosophyPage.privacyText')}</p>
            </div>
            <div className={styles.actionCard}>
              <h4>🌐 {t('common:philosophyPage.decentralizedTitle')}</h4>
              <p>{t('common:philosophyPage.decentralizedText')}</p>
            </div>
            <div className={styles.actionCard}>
              <h4>💡 {t('common:philosophyPage.innovationTitle')}</h4>
              <p>{t('common:philosophyPage.innovationText')}</p>
            </div>
            <div className={styles.actionCard}>
              <h4>🎯 {t('common:philosophyPage.humanCenteredTitle')}</h4>
              <p>{t('common:philosophyPage.humanCenteredText')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}