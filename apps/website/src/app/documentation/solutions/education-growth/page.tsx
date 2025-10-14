'use client';

import React from 'react';
import Link from 'next/link';
import { useI18n } from '@cybereco/i18n';
import { FaGraduationCap, FaBook, FaShieldAlt, FaGlobe, FaBolt, FaBalanceScale, FaBrain, FaHandsHelping } from 'react-icons/fa';
import styles from '../../page.module.css';

export default function EducationGrowthPage() {
  const { t } = useI18n();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>
          <FaGraduationCap /> {t('documentation:solutions.education.title') || 'Education & Growth'}
        </h1>
        <p className={styles.subtitle}>
          {t('documentation:solutions.education.subtitle') || 'Lifelong learning, personal development, and cultural heritage preservation tools'}
        </p>
      </div>

      <div className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>
          <FaGlobe /> {t('documentation:solutions.education.problem.title') || 'The Problem'}
        </h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>💰</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.education.problem.access.title') || 'Educational Inequality'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.education.problem.access.description') || 
                'Quality education remains expensive and inaccessible to many, creating social and economic divides that perpetuate inequality.'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📚</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.education.problem.relevance.title') || 'Outdated Methods'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.education.problem.relevance.description') || 
                'Traditional education systems fail to adapt to modern needs, teaching outdated skills while ignoring critical life competencies.'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🌍</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.education.problem.heritage.title') || 'Cultural Erosion'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.education.problem.heritage.description') || 
                'Family histories and cultural knowledge disappear as generations pass without systems to preserve and share this wisdom.'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🤖</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.education.problem.personalization.title') || 'One-Size-Fits-All'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.education.problem.personalization.description') || 
                'Standardized learning ignores individual differences, learning styles, and personal goals, limiting human potential.'}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>
          <FaBolt /> {t('documentation:solutions.education.solution.title') || 'The CyberEco Solution'}
        </h2>
        <p className={styles.contentText}>
          {t('documentation:solutions.education.solution.description') || 
            'CyberEco democratizes education through peer-to-peer learning, personalized development paths, and cultural preservation tools. Our platform makes knowledge sharing accessible while honoring diverse learning styles and cultural heritage.'}
        </p>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>🌟 {t('documentation:solutions.education.features.title') || 'Key Features'}</h3>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>👥</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.education.features.p2p.title') || 'Peer Learning'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.education.features.p2p.description') || 
                'Connect with mentors and learners in your community for skill exchanges, reducing costs while building relationships.'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🎯</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.education.features.personalized.title') || 'Adaptive Paths'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.education.features.personalized.description') || 
                'AI-powered learning paths that adapt to your goals, pace, and preferred learning styles for optimal growth.'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🏛️</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.education.features.heritage.title') || 'Heritage Vault'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.education.features.heritage.description') || 
                'Preserve family stories, cultural traditions, and ancestral wisdom for future generations through multimedia archives.'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🧘</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.education.features.wellness.title') || 'Holistic Growth'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.education.features.wellness.description') || 
                'Track not just academic progress but emotional, physical, and spiritual development for balanced growth.'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔧</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.education.features.practical.title') || 'Life Skills'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.education.features.practical.description') || 
                'Focus on practical skills like financial literacy, emotional intelligence, and sustainable living alongside academics.'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🌐</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.education.features.global.title') || 'Global Classroom'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.education.features.global.description') || 
                'Learn from diverse perspectives worldwide while maintaining local community connections and cultural context.'}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>⚙️ {t('documentation:solutions.education.implementation.title') || 'Technical Implementation'}</h3>
        <div className={styles.conceptGrid}>
          <div className={styles.conceptCard}>
            <h4>{t('documentation:solutions.education.implementation.academy.title') || 'Academy Platform'}</h4>
            <p>{t('documentation:solutions.education.implementation.academy.description') || 
              'Decentralized learning management system with skill verification, peer reviews, and community-validated certifications.'}</p>
          </div>
          <div className={styles.conceptCard}>
            <h4>{t('documentation:solutions.education.implementation.somos.title') || 'Somos Heritage'}</h4>
            <p>{t('documentation:solutions.education.implementation.somos.description') || 
              'Family tree builder with multimedia storytelling, cultural mapping, and intergenerational knowledge transfer tools.'}</p>
          </div>
          <div className={styles.conceptCard}>
            <h4>{t('documentation:solutions.education.implementation.mindgrow.title') || 'MindGrow Tracker'}</h4>
            <p>{t('documentation:solutions.education.implementation.mindgrow.description') || 
              'Personal development dashboard tracking learning progress, wellness metrics, and life goals with AI insights.'}</p>
          </div>
          <div className={styles.conceptCard}>
            <h4>{t('documentation:solutions.education.implementation.knowledge.title') || 'Knowledge Graph'}</h4>
            <p>{t('documentation:solutions.education.implementation.knowledge.description') || 
              'Interconnected learning resources mapped to show relationships between concepts and personalized learning paths.'}</p>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>✅ {t('documentation:solutions.education.benefits.title') || 'Benefits'}</h3>
        
        <div className={styles.comparisonTable}>
          <table>
            <thead>
              <tr>
                <th>{t('documentation:solutions.education.benefits.stakeholder') || 'Stakeholder'}</th>
                <th>{t('documentation:solutions.education.benefits.advantages') || 'Key Advantages'}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>{t('documentation:solutions.education.benefits.forLearners.title') || 'For Learners'}</strong></td>
                <td>
                  <ul className={styles.conceptList}>
                    <li>{t('documentation:solutions.education.benefits.forLearners.access') || 'Affordable access to quality education'}</li>
                    <li>{t('documentation:solutions.education.benefits.forLearners.personalized') || 'Personalized learning experiences'}</li>
                    <li>{t('documentation:solutions.education.benefits.forLearners.practical') || 'Practical skills for real life'}</li>
                    <li>{t('documentation:solutions.education.benefits.forLearners.heritage') || 'Connection to cultural roots'}</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td><strong>{t('documentation:solutions.education.benefits.forEducators.title') || 'For Educators'}</strong></td>
                <td>
                  <ul className={styles.conceptList}>
                    <li>{t('documentation:solutions.education.benefits.forEducators.reach') || 'Expanded reach to eager learners'}</li>
                    <li>{t('documentation:solutions.education.benefits.forEducators.tools') || 'Advanced teaching tools and analytics'}</li>
                    <li>{t('documentation:solutions.education.benefits.forEducators.community') || 'Supportive educator community'}</li>
                    <li>{t('documentation:solutions.education.benefits.forEducators.impact') || 'Direct impact measurement'}</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td><strong>{t('documentation:solutions.education.benefits.forFamilies.title') || 'For Families'}</strong></td>
                <td>
                  <ul className={styles.conceptList}>
                    <li>{t('documentation:solutions.education.benefits.forFamilies.preservation') || 'Preserve family history and wisdom'}</li>
                    <li>{t('documentation:solutions.education.benefits.forFamilies.connection') || 'Strengthen intergenerational bonds'}</li>
                    <li>{t('documentation:solutions.education.benefits.forFamilies.learning') || 'Learn together as a family'}</li>
                    <li>{t('documentation:solutions.education.benefits.forFamilies.legacy') || 'Create lasting digital legacy'}</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>💡 {t('documentation:solutions.education.useCases.title') || 'Use Cases'}</h3>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>💻</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.education.useCases.skills.title') || 'Skill Exchanges'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.education.useCases.skills.description') || 
                'Communities trading skills like language lessons for programming tutorials, creating local learning economies'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📖</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.education.useCases.family.title') || 'Family Archives'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.education.useCases.family.description') || 
                'Grandparents recording stories and traditions for grandchildren to discover and learn from'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🌱</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.education.useCases.youth.title') || 'Youth Development'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.education.useCases.youth.description') || 
                'Young people exploring careers through mentorship and hands-on projects with local professionals'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🎨</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.education.useCases.cultural.title') || 'Cultural Learning'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.education.useCases.cultural.description') || 
                'Communities preserving and teaching traditional arts, crafts, and customs to new generations'}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <div className={styles.redirectCard}>
          <h4>{t('documentation:solutions.education.technicalDocs') || 'Technical Documentation'}</h4>
          <p>
            {t('documentation:solutions.education.technicalDocsDesc') || 'Learn more about implementing education and growth features in your applications.'}
          </p>
          <Link href="/documentation/guides/education" className={styles.redirectButton}>
            {t('documentation:solutions.education.viewDocs') || 'View Technical Docs'}
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}