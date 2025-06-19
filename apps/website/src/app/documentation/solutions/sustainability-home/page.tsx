'use client';

import React from 'react';
import Link from 'next/link';
import { useI18n } from '@cybereco/i18n';
import { FaHome, FaLeaf, FaShieldAlt, FaGlobe, FaBolt, FaBalanceScale, FaSeedling, FaRecycle } from 'react-icons/fa';
import styles from '../../page.module.css';

export default function SustainabilityHomePage() {
  const { t } = useI18n();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>
          <FaHome /> {t('documentation:solutions.sustainability.title') || 'Sustainability & Home'}
        </h1>
        <p className={styles.subtitle}>
          {t('documentation:solutions.sustainability.subtitle') || 'Smart solutions for sustainable living, home management, and environmental stewardship'}
        </p>
      </div>

      <div className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>
          <FaGlobe /> {t('documentation:solutions.sustainability.problem.title') || 'The Problem'}
        </h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🌡️</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.sustainability.problem.climate.title') || 'Climate Crisis'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.sustainability.problem.climate.description') || 
                'Individual actions feel meaningless against global challenges, with limited tools to track and reduce personal environmental impact.'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🏭</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.sustainability.problem.waste.title') || 'Resource Waste'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.sustainability.problem.waste.description') || 
                'Homes waste energy, water, and food due to lack of monitoring and optimization tools for sustainable resource management.'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🍔</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.sustainability.problem.food.title') || 'Food System Disconnect'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.sustainability.problem.food.description') || 
                'Dependence on industrial food systems with high carbon footprints, while lacking knowledge for local food production.'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📊</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.sustainability.problem.visibility.title') || 'No Impact Visibility'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.sustainability.problem.visibility.description') || 
                'Without clear metrics and feedback, people cannot see how their choices affect the environment or where to improve.'}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>
          <FaBolt /> {t('documentation:solutions.sustainability.solution.title') || 'The CyberEco Solution'}
        </h2>
        <p className={styles.contentText}>
          {t('documentation:solutions.sustainability.solution.description') || 
            'CyberEco empowers sustainable living through intelligent home management, urban gardening assistance, and community resource sharing. Our platform makes environmental stewardship accessible and rewarding.'}
        </p>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>🌟 {t('documentation:solutions.sustainability.features.title') || 'Key Features'}</h3>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🌱</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.sustainability.features.gardening.title') || 'Smart Gardening'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.sustainability.features.gardening.description') || 
                'AI-powered plant care recommendations, seasonal planting guides, and community seed exchanges for successful home food production.'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>⚡</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.sustainability.features.energy.title') || 'Energy Optimization'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.sustainability.features.energy.description') || 
                'Real-time monitoring and intelligent automation to reduce energy consumption and integrate renewable sources.'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>💧</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.sustainability.features.water.title') || 'Water Conservation'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.sustainability.features.water.description') || 
                'Smart irrigation systems, rainwater harvesting guides, and usage tracking to minimize water waste.'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>♻️</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.sustainability.features.circular.title') || 'Circular Economy'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.sustainability.features.circular.description') || 
                'Community resource sharing, repair networks, and waste-to-resource programs for zero-waste living.'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📈</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.sustainability.features.tracking.title') || 'Impact Tracking'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.sustainability.features.tracking.description') || 
                'Personal carbon footprint monitoring with actionable insights and community challenges for collective impact.'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🤝</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.sustainability.features.community.title') || 'Eco-Communities'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.sustainability.features.community.description') || 
                'Connect with local sustainability groups, share resources, and participate in environmental initiatives.'}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>⚙️ {t('documentation:solutions.sustainability.implementation.title') || 'Technical Implementation'}</h3>
        <div className={styles.conceptGrid}>
          <div className={styles.conceptCard}>
            <h4>{t('documentation:solutions.sustainability.implementation.plantopia.title') || 'Plantopia Platform'}</h4>
            <p>{t('documentation:solutions.sustainability.implementation.plantopia.description') || 
              'AI-driven gardening assistant with plant recognition, care scheduling, and community knowledge sharing for urban agriculture.'}</p>
          </div>
          <div className={styles.conceptCard}>
            <h4>{t('documentation:solutions.sustainability.implementation.homehub.title') || 'HomeHub System'}</h4>
            <p>{t('documentation:solutions.sustainability.implementation.homehub.description') || 
              'Integrated home automation focusing on resource efficiency, renewable energy management, and sustainable living patterns.'}</p>
          </div>
          <div className={styles.conceptCard}>
            <h4>{t('documentation:solutions.sustainability.implementation.ecotrack.title') || 'EcoTrack Analytics'}</h4>
            <p>{t('documentation:solutions.sustainability.implementation.ecotrack.description') || 
              'Comprehensive environmental impact tracking with personalized recommendations and progress gamification.'}</p>
          </div>
          <div className={styles.conceptCard}>
            <h4>{t('documentation:solutions.sustainability.implementation.resources.title') || 'Resource Network'}</h4>
            <p>{t('documentation:solutions.sustainability.implementation.resources.description') || 
              'Local sharing economy platform for tools, materials, and skills to reduce consumption and build community resilience.'}</p>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>✅ {t('documentation:solutions.sustainability.benefits.title') || 'Benefits'}</h3>
        
        <div className={styles.comparisonTable}>
          <table>
            <thead>
              <tr>
                <th>{t('documentation:solutions.sustainability.benefits.stakeholder') || 'Stakeholder'}</th>
                <th>{t('documentation:solutions.sustainability.benefits.advantages') || 'Key Advantages'}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>{t('documentation:solutions.sustainability.benefits.forIndividuals.title') || 'For Individuals'}</strong></td>
                <td>
                  <ul className={styles.conceptList}>
                    <li>{t('documentation:solutions.sustainability.benefits.forIndividuals.costs') || 'Reduced utility costs through optimization'}</li>
                    <li>{t('documentation:solutions.sustainability.benefits.forIndividuals.food') || 'Fresh, healthy food from home gardens'}</li>
                    <li>{t('documentation:solutions.sustainability.benefits.forIndividuals.impact') || 'Clear visibility of environmental impact'}</li>
                    <li>{t('documentation:solutions.sustainability.benefits.forIndividuals.health') || 'Healthier living environments'}</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td><strong>{t('documentation:solutions.sustainability.benefits.forCommunities.title') || 'For Communities'}</strong></td>
                <td>
                  <ul className={styles.conceptList}>
                    <li>{t('documentation:solutions.sustainability.benefits.forCommunities.resilience') || 'Enhanced local food security'}</li>
                    <li>{t('documentation:solutions.sustainability.benefits.forCommunities.sharing') || 'Resource sharing reduces waste'}</li>
                    <li>{t('documentation:solutions.sustainability.benefits.forCommunities.knowledge') || 'Collective knowledge building'}</li>
                    <li>{t('documentation:solutions.sustainability.benefits.forCommunities.green') || 'Greener neighborhoods'}</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td><strong>{t('documentation:solutions.sustainability.benefits.forPlanet.title') || 'For Planet'}</strong></td>
                <td>
                  <ul className={styles.conceptList}>
                    <li>{t('documentation:solutions.sustainability.benefits.forPlanet.emissions') || 'Reduced carbon emissions'}</li>
                    <li>{t('documentation:solutions.sustainability.benefits.forPlanet.biodiversity') || 'Increased urban biodiversity'}</li>
                    <li>{t('documentation:solutions.sustainability.benefits.forPlanet.resources') || 'Conservation of natural resources'}</li>
                    <li>{t('documentation:solutions.sustainability.benefits.forPlanet.awareness') || 'Growing environmental consciousness'}</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>💡 {t('documentation:solutions.sustainability.useCases.title') || 'Use Cases'}</h3>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🏡</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.sustainability.useCases.urban.title') || 'Urban Gardening'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.sustainability.useCases.urban.description') || 
                'Apartment dwellers growing fresh produce on balconies and windowsills with expert guidance'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🌍</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.sustainability.useCases.carbon.title') || 'Carbon Reduction'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.sustainability.useCases.carbon.description') || 
                'Families tracking and reducing their carbon footprint through lifestyle changes and technology'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔧</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.sustainability.useCases.sharing.title') || 'Tool Libraries'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.sustainability.useCases.sharing.description') || 
                'Neighborhoods sharing tools and equipment to reduce consumption and build connections'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>⚡</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.sustainability.useCases.energy.title') || 'Energy Communities'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.sustainability.useCases.energy.description') || 
                'Local renewable energy cooperatives sharing resources and achieving energy independence'}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <div className={styles.redirectCard}>
          <h4>{t('documentation:solutions.sustainability.technicalDocs') || 'Technical Documentation'}</h4>
          <p>
            {t('documentation:solutions.sustainability.technicalDocsDesc') || 'Learn more about implementing sustainability features in your applications.'}
          </p>
          <Link href="/documentation/guides/sustainability" className={styles.redirectButton}>
            {t('documentation:solutions.sustainability.viewDocs') || 'View Technical Docs'}
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}