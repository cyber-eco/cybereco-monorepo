'use client';

import React from 'react';
import { useLanguage } from '@cybereco/ui-components';
import styles from './page.module.css';

export default function VisionPage() {
  const { t } = useLanguage();

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>{t('common:visionPage.title')}</h1>
          <p className={styles.subtitle}>{t('common:visionPage.subtitle')}</p>
        </div>
      </section>

      {/* Current State */}
      <section className={styles.currentSection}>
        <div className={styles.sectionContent}>
          <div className={styles.currentCard}>
            <h2 className={styles.sectionTitle}>{t('common:visionPage.currentStateTitle')}</h2>
            <p className={styles.sectionText}>{t('common:visionPage.currentStateText')}</p>
            <div className={styles.currentApps}>
              <div className={styles.appItem}>
                <div className={styles.appIcon}>🏢</div>
                <span>CyberEco Hub</span>
              </div>
              <div className={styles.appItem}>
                <div className={styles.appIcon}>💰</div>
                <span>JustSplit</span>
              </div>
              <div className={styles.appItem}>
                <div className={styles.appIcon}>🌐</div>
                <span>Website</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section className={styles.futureSection}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>🔮 {t('common:visionPage.futureVisionTitle')}</h2>
          <p className={styles.sectionText}>{t('common:visionPage.futureVisionText')}</p>
          
          <div className={styles.visionGrid}>
            <div className={styles.visionCard}>
              <div className={styles.visionIcon}>📱</div>
              <h3 className={styles.visionTitle}>{t('common:visionPage.mobileP2PTitle')}</h3>
              <p className={styles.visionText}>{t('common:visionPage.mobileP2PText')}</p>
              <div className={styles.visionDetails}>
                <ul>
                  <li>{t('common:visionPage.mobileP2PFeature1')}</li>
                  <li>{t('common:visionPage.mobileP2PFeature2')}</li>
                  <li>{t('common:visionPage.mobileP2PFeature3')}</li>
                  <li>{t('common:visionPage.mobileP2PFeature4')}</li>
                </ul>
              </div>
            </div>

            <div className={styles.visionCard}>
              <div className={styles.visionIcon}>🔐</div>
              <h3 className={styles.visionTitle}>{t('common:visionPage.dataSovereigntyTitle')}</h3>
              <p className={styles.visionText}>{t('common:visionPage.dataSovereigntyText')}</p>
              <div className={styles.visionDetails}>
                <ul>
                  <li>{t('common:visionPage.dataSovereigntyFeature1')}</li>
                  <li>{t('common:visionPage.dataSovereigntyFeature2')}</li>
                  <li>{t('common:visionPage.dataSovereigntyFeature3')}</li>
                  <li>{t('common:visionPage.dataSovereigntyFeature4')}</li>
                </ul>
              </div>
            </div>

            <div className={styles.visionCard}>
              <div className={styles.visionIcon}>🪙</div>
              <h3 className={styles.visionTitle}>{t('common:visionPage.tokenEconomicsTitle')}</h3>
              <p className={styles.visionText}>{t('common:visionPage.tokenEconomicsText')}</p>
              <div className={styles.visionDetails}>
                <ul>
                  <li>{t('common:visionPage.tokenEconomicsFeature1')}</li>
                  <li>{t('common:visionPage.tokenEconomicsFeature2')}</li>
                  <li>{t('common:visionPage.tokenEconomicsFeature3')}</li>
                  <li>{t('common:visionPage.tokenEconomicsFeature4')}</li>
                </ul>
              </div>
            </div>

            <div className={styles.visionCard}>
              <div className={styles.visionIcon}>🌍</div>
              <h3 className={styles.visionTitle}>{t('common:visionPage.globalAccessibilityTitle')}</h3>
              <p className={styles.visionText}>{t('common:visionPage.globalAccessibilityText')}</p>
              <div className={styles.visionDetails}>
                <ul>
                  <li>{t('common:visionPage.globalAccessibilityFeature1')}</li>
                  <li>{t('common:visionPage.globalAccessibilityFeature2')}</li>
                  <li>{t('common:visionPage.globalAccessibilityFeature3')}</li>
                  <li>{t('common:visionPage.globalAccessibilityFeature4')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Architecture */}
      <section className={styles.architectureSection}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>🏗️ {t('common:visionPage.architectureTitle')}</h2>
          <div className={styles.architectureDiagram}>
            <div className={styles.architectureLayer}>
              <h3>{t('common:visionPage.layer3Title')}</h3>
              <p>{t('common:visionPage.layer3Text')}</p>
              <div className={styles.layerComponents}>
                <span>{t('common:visionPage.layer3Component1')}</span>
                <span>{t('common:visionPage.layer3Component2')}</span>
                <span>{t('common:visionPage.layer3Component3')}</span>
              </div>
            </div>
            <div className={styles.architectureLayer}>
              <h3>{t('common:visionPage.layer2Title')}</h3>
              <p>{t('common:visionPage.layer2Text')}</p>
              <div className={styles.layerComponents}>
                <span>{t('common:visionPage.layer2Component1')}</span>
                <span>{t('common:visionPage.layer2Component2')}</span>
                <span>{t('common:visionPage.layer2Component3')}</span>
              </div>
            </div>
            <div className={styles.architectureLayer}>
              <h3>{t('common:visionPage.layer1Title')}</h3>
              <p>{t('common:visionPage.layer1Text')}</p>
              <div className={styles.layerComponents}>
                <span>{t('common:visionPage.layer1Component1')}</span>
                <span>{t('common:visionPage.layer1Component2')}</span>
                <span>{t('common:visionPage.layer1Component3')}</span>
              </div>
            </div>
            <div className={styles.architectureLayer}>
              <h3>{t('common:visionPage.deviceLayerTitle')}</h3>
              <p>{t('common:visionPage.deviceLayerText')}</p>
              <div className={styles.layerComponents}>
                <span>{t('common:visionPage.deviceLayerComponent1')}</span>
                <span>{t('common:visionPage.deviceLayerComponent2')}</span>
                <span>{t('common:visionPage.deviceLayerComponent3')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className={styles.timelineSection}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>{t('common:visionPage.timelineTitle')}</h2>
          <div className={styles.timeline}>
            <div className={styles.timelineItem}>
              <div className={styles.timelineMarker}>1</div>
              <div className={styles.timelineContent}>
                <h3>{t('common:visionPage.phase1Title')}</h3>
                <p>{t('common:visionPage.phase1Text')}</p>
              </div>
            </div>
            <div className={styles.timelineItem}>
              <div className={styles.timelineMarker}>2</div>
              <div className={styles.timelineContent}>
                <h3>{t('common:visionPage.phase2Title')}</h3>
                <p>{t('common:visionPage.phase2Text')}</p>
              </div>
            </div>
            <div className={styles.timelineItem}>
              <div className={styles.timelineMarker}>3</div>
              <div className={styles.timelineContent}>
                <h3>{t('common:visionPage.phase3Title')}</h3>
                <p>{t('common:visionPage.phase3Text')}</p>
              </div>
            </div>
            <div className={styles.timelineItem}>
              <div className={styles.timelineMarker}>4</div>
              <div className={styles.timelineContent}>
                <h3>{t('common:visionPage.phase4Title')}</h3>
                <p>{t('common:visionPage.phase4Text')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>{t('common:visionPage.ctaTitle')}</h2>
          <p className={styles.ctaText}>
            {t('common:visionPage.ctaText')}
          </p>
          <div className={styles.ctaButtons}>
            <a href="/roadmap" className={styles.ctaButton}>
              {t('common:visionPage.ctaButton')}
            </a>
            <a href="/philosophy" className={styles.ctaButtonSecondary}>
              {t('common:visionPage.ctaButtonSecondary')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}