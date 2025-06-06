'use client';

import React from 'react';
import { useLanguage } from '@cybereco/ui-components';
import styles from './page.module.css';

export default function RoadmapPage() {
  const { t } = useLanguage();

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>{t('common:roadmapPage.title')}</h1>
          <p className={styles.subtitle}>{t('common:roadmapPage.subtitle')}</p>
        </div>
      </section>

      {/* Roadmap Phases */}
      <section className={styles.roadmapSection}>
        <div className={styles.sectionContent}>
          <div className={styles.phasesContainer}>
            <div className={`${styles.phaseCard} ${styles.currentPhase}`}>
              <div className={styles.phaseHeader}>
                <div className={styles.phaseNumber}>1</div>
                <div className={styles.phaseStatus}>{t('common:roadmapPage.currentStatus')}</div>
              </div>
              <h3 className={styles.phaseTitle}>{t('common:roadmapPage.phase1Title')}</h3>
              <p className={styles.phaseText}>{t('common:roadmapPage.phase1Text')}</p>
              <div className={styles.phaseApps}>
                <div className={styles.appTag}>Hub</div>
                <div className={styles.appTag}>JustSplit</div>
                <div className={styles.appTag}>Website</div>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{width: '75%'}}></div>
              </div>
              <span className={styles.progressText}>{t('common:roadmapPage.progressComplete')}</span>
            </div>

            <div className={styles.phaseCard}>
              <div className={styles.phaseHeader}>
                <div className={styles.phaseNumber}>2</div>
                <div className={styles.phaseStatus}>{t('common:roadmapPage.nextStatus')}</div>
              </div>
              <h3 className={styles.phaseTitle}>{t('common:roadmapPage.phase2Title')}</h3>
              <p className={styles.phaseText}>{t('common:roadmapPage.phase2Text')}</p>
              <div className={styles.phaseApps}>
                <div className={styles.appTag}>Somos</div>
                <div className={styles.appTag}>Demos</div>
                <div className={styles.appTag}>Plantopia</div>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{width: '10%'}}></div>
              </div>
              <span className={styles.progressText}>{t('common:roadmapPage.planningPhase')}</span>
            </div>

            <div className={styles.phaseCard}>
              <div className={styles.phaseHeader}>
                <div className={styles.phaseNumber}>3</div>
                <div className={styles.phaseStatus}>{t('common:roadmapPage.futureStatus')}</div>
              </div>
              <h3 className={styles.phaseTitle}>{t('common:roadmapPage.phase3Title')}</h3>
              <p className={styles.phaseText}>{t('common:roadmapPage.phase3Text')}</p>
              <div className={styles.phaseApps}>
                <div className={styles.appTag}>{t('common:roadmapPage.thirtyPlusApps')}</div>
                <div className={styles.appTag}>{t('common:roadmapPage.integration')}</div>
                <div className={styles.appTag}>{t('common:roadmapPage.ecosystem')}</div>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{width: '0%'}}></div>
              </div>
              <span className={styles.progressText}>{t('common:roadmapPage.planned')}</span>
            </div>

            <div className={styles.phaseCard}>
              <div className={styles.phaseHeader}>
                <div className={styles.phaseNumber}>4</div>
                <div className={styles.phaseStatus}>{t('common:roadmapPage.visionStatus')}</div>
              </div>
              <h3 className={styles.phaseTitle}>{t('common:roadmapPage.phase4Title')}</h3>
              <p className={styles.phaseText}>{t('common:roadmapPage.phase4Text')}</p>
              <div className={styles.phaseApps}>
                <div className={styles.appTag}>{t('common:roadmapPage.p2pNetworks')}</div>
                <div className={styles.appTag}>{t('common:roadmapPage.blockchain')}</div>
                <div className={styles.appTag}>{t('common:roadmapPage.decentralized')}</div>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{width: '0%'}}></div>
              </div>
              <span className={styles.progressText}>{t('common:roadmapPage.longTermVision')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Current Focus Section */}
      <section className={styles.currentFocusSection}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>🎯 {t('common:roadmapPage.currentFocusSectionTitle')}</h2>
          <div className={styles.focusGrid}>
            <div className={styles.focusCard}>
              <div className={styles.focusIcon}>🔧</div>
              <h3 className={styles.focusTitle}>{t('common:roadmapPage.criticalFixesTitle')}</h3>
              <div className={styles.focusDetails}>
                <h4>{t('common:roadmapPage.justSplitStabilization')}</h4>
                <ul>
                  <li>{t('common:roadmapPage.criticalFix1')}</li>
                  <li>{t('common:roadmapPage.criticalFix2')}</li>
                  <li>{t('common:roadmapPage.criticalFix3')}</li>
                  <li>{t('common:roadmapPage.criticalFix4')}</li>
                </ul>
              </div>
              <div className={styles.focusStatus}>🔄 {t('common:roadmapPage.inProgressStatus2')}</div>
            </div>

            <div className={styles.focusCard}>
              <div className={styles.focusIcon}>🏢</div>
              <h3 className={styles.focusTitle}>{t('common:roadmapPage.hubDevelopmentTitle')}</h3>
              <div className={styles.focusDetails}>
                <h4>{t('common:roadmapPage.coreAuthentication')}</h4>
                <ul>
                  <li>{t('common:roadmapPage.hubFeature1')}</li>
                  <li>{t('common:roadmapPage.hubFeature2')}</li>
                  <li>{t('common:roadmapPage.hubFeature3')}</li>
                  <li>{t('common:roadmapPage.hubFeature4')}</li>
                </ul>
              </div>
              <div className={styles.focusStatus}>📋 {t('common:roadmapPage.plannedStatus')}</div>
            </div>

            <div className={styles.focusCard}>
              <div className={styles.focusIcon}>🔗</div>
              <h3 className={styles.focusTitle}>{t('common:roadmapPage.integrationTitle')}</h3>
              <div className={styles.focusDetails}>
                <h4>{t('common:roadmapPage.crossAppFeatures')}</h4>
                <ul>
                  <li>{t('common:roadmapPage.integrationFeature1')}</li>
                  <li>{t('common:roadmapPage.integrationFeature2')}</li>
                  <li>{t('common:roadmapPage.integrationFeature3')}</li>
                  <li>{t('common:roadmapPage.integrationFeature4')}</li>
                </ul>
              </div>
              <div className={styles.focusStatus}>⏳ {t('common:roadmapPage.nextQuarterStatus')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Roadmap */}
      <section className={styles.technicalSection}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>🛠️ {t('common:roadmapPage.technicalEvolutionTitle')}</h2>
          <div className={styles.evolutionTimeline}>
            <div className={styles.evolutionPhase}>
              <h3>{t('common:roadmapPage.techPhase1Title')}</h3>
              <p>{t('common:roadmapPage.techPhase1Text')}</p>
              <div className={styles.techStack}>
                <span>{t('common:roadmapPage.techStack1')}</span>
                <span>{t('common:roadmapPage.techStack2')}</span>
                <span>{t('common:roadmapPage.techStack3')}</span>
                <span>{t('common:roadmapPage.techStack4')}</span>
              </div>
            </div>
            <div className={styles.evolutionPhase}>
              <h3>{t('common:roadmapPage.techPhase2Title')}</h3>
              <p>{t('common:roadmapPage.techPhase2Text')}</p>
              <div className={styles.techStack}>
                <span>{t('common:roadmapPage.techStack5')}</span>
                <span>{t('common:roadmapPage.techStack6')}</span>
                <span>{t('common:roadmapPage.techStack7')}</span>
              </div>
            </div>
            <div className={styles.evolutionPhase}>
              <h3>{t('common:roadmapPage.techPhase3Title')}</h3>
              <p>{t('common:roadmapPage.techPhase3Text')}</p>
              <div className={styles.techStack}>
                <span>{t('common:roadmapPage.techStack8')}</span>
                <span>{t('common:roadmapPage.techStack9')}</span>
                <span>{t('common:roadmapPage.techStack10')}</span>
              </div>
            </div>
            <div className={styles.evolutionPhase}>
              <h3>{t('common:roadmapPage.techPhase4Title')}</h3>
              <p>{t('common:roadmapPage.techPhase4Text')}</p>
              <div className={styles.techStack}>
                <span>{t('common:roadmapPage.techStack11')}</span>
                <span>{t('common:roadmapPage.techStack12')}</span>
                <span>{t('common:roadmapPage.techStack13')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className={styles.milestonesSection}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>{t('common:roadmapPage.milestonesTitle')}</h2>
          <div className={styles.milestonesGrid}>
            <div className={styles.milestoneCard}>
              <div className={styles.milestoneIcon}>🎯</div>
              <h3 className={styles.milestoneTitle}>{t('common:roadmapPage.currentFocusTitle')}</h3>
              <p className={styles.milestoneText}>{t('common:roadmapPage.currentMilestone')}</p>
              <div className={styles.milestoneStatus}>{t('common:roadmapPage.inProgressStatus')}</div>
            </div>
            <div className={styles.milestoneCard}>
              <div className={styles.milestoneIcon}>🚀</div>
              <h3 className={styles.milestoneTitle}>{t('common:roadmapPage.nextQuarterTitle')}</h3>
              <p className={styles.milestoneText}>{t('common:roadmapPage.nextMilestone')}</p>
              <div className={styles.milestoneStatus}>{t('common:roadmapPage.q2Status')}</div>
            </div>
            <div className={styles.milestoneCard}>
              <div className={styles.milestoneIcon}>🌟</div>
              <h3 className={styles.milestoneTitle}>{t('common:roadmapPage.longTermTitle')}</h3>
              <p className={styles.milestoneText}>{t('common:roadmapPage.futureMilestone')}</p>
              <div className={styles.milestoneStatus}>{t('common:roadmapPage.timeframeStatus')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Visualization */}
      <section className={styles.timelineSection}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>{t('common:roadmapPage.timelineTitle')}</h2>
          <div className={styles.timelineVisualization}>
            <div className={styles.timelineLine}></div>
            <div className={styles.timelinePoint} data-year="2024">
              <div className={styles.timelineMarker}></div>
              <div className={styles.timelineLabel}>
                <strong>2024</strong>
                <span>{t('common:roadmapPage.timeline2024')}</span>
              </div>
            </div>
            <div className={styles.timelinePoint} data-year="2025">
              <div className={styles.timelineMarker}></div>
              <div className={styles.timelineLabel}>
                <strong>2025</strong>
                <span>{t('common:roadmapPage.timeline2025')}</span>
              </div>
            </div>
            <div className={styles.timelinePoint} data-year="2027">
              <div className={styles.timelineMarker}></div>
              <div className={styles.timelineLabel}>
                <strong>2027</strong>
                <span>{t('common:roadmapPage.timeline2027')}</span>
              </div>
            </div>
            <div className={styles.timelinePoint} data-year="2030">
              <div className={styles.timelineMarker}></div>
              <div className={styles.timelineLabel}>
                <strong>2030+</strong>
                <span>{t('common:roadmapPage.timeline2030')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>{t('common:roadmapPage.ctaTitle')}</h2>
          <p className={styles.ctaText}>
            {t('common:roadmapPage.ctaText')}
          </p>
          <div className={styles.ctaButtons}>
            <a href="/portfolio" className={styles.ctaButton}>
              {t('common:roadmapPage.ctaButton')}
            </a>
            <a href="/vision" className={styles.ctaButtonSecondary}>
              {t('common:roadmapPage.ctaButtonSecondary')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}