'use client';

import { useI18n } from '@cybereco/i18n';
import styles from './page.module.css';

export default function LicensePage() {
  const { t } = useI18n();
  
  return (
    <div className={styles.container}>
      <header className={styles.pageHeader}>
        <h1 className={styles.title}>
          {t('license:licensePage.title')}
        </h1>
        <p className={styles.subtitle}>
          {t('license:licensePage.subtitle')}
        </p>
      </header>
      
      <section className={styles.contentSection}>
        <div className={styles.content}>
          <h2>{t('license:licensePage.sections.cyberEcoLicense.title')}</h2>
          <p className={styles.licenseInfo}>
            {t('license:licensePage.sections.cyberEcoLicense.version')}
          </p>
          
          <h3>{t('license:licensePage.sections.acceptance.title')}</h3>
          <p>{t('license:licensePage.sections.acceptance.content')}</p>
          
          <h3>{t('license:licensePage.sections.copyright.title')}</h3>
          <p>{t('license:licensePage.sections.copyright.content')}</p>
          
          <h3>{t('license:licensePage.sections.limitations.title')}</h3>
          <p>{t('license:licensePage.sections.limitations.intro')}</p>
          <ul>
            <li>{t('license:licensePage.sections.limitations.item1')}</li>
            <li>{t('license:licensePage.sections.limitations.item2')}</li>
            <li>{t('license:licensePage.sections.limitations.item3')}</li>
          </ul>
          
          <h3 className={styles.highlight}>{t('license:licensePage.sections.dataAnalytics.title')}</h3>
          <div className={styles.specialSection}>
            <p>{t('license:licensePage.sections.dataAnalytics.content')}</p>
            <ul>
              <li>{t('license:licensePage.sections.dataAnalytics.restriction1')}</li>
              <li>{t('license:licensePage.sections.dataAnalytics.restriction2')}</li>
              <li>{t('license:licensePage.sections.dataAnalytics.restriction3')}</li>
              <li>{t('license:licensePage.sections.dataAnalytics.restriction4')}</li>
            </ul>
            <p className={styles.note}>{t('license:licensePage.sections.dataAnalytics.note')}</p>
          </div>
          
          <h3>{t('license:licensePage.sections.patents.title')}</h3>
          <p>{t('license:licensePage.sections.patents.content')}</p>
          
          <h3>{t('license:licensePage.sections.notices.title')}</h3>
          <p>{t('license:licensePage.sections.notices.content1')}</p>
          <p>{t('license:licensePage.sections.notices.content2')}</p>
          
          <h3>{t('license:licensePage.sections.noOtherRights.title')}</h3>
          <p>{t('license:licensePage.sections.noOtherRights.content')}</p>
          
          <h3>{t('license:licensePage.sections.termination.title')}</h3>
          <p>{t('license:licensePage.sections.termination.content')}</p>
          
          <h3>{t('license:licensePage.sections.noLiability.title')}</h3>
          <p className={styles.disclaimer}>
            {t('license:licensePage.sections.noLiability.content')}
          </p>
          
          <h3>{t('license:licensePage.sections.definitions.title')}</h3>
          <p>{t('license:licensePage.sections.definitions.intro')}</p>
          <ul>
            <li><strong>{t('license:licensePage.sections.definitions.licensor')}</strong>: {t('license:licensePage.sections.definitions.licensorDef')}</li>
            <li><strong>{t('license:licensePage.sections.definitions.software')}</strong>: {t('license:licensePage.sections.definitions.softwareDef')}</li>
            <li><strong>{t('license:licensePage.sections.definitions.you')}</strong>: {t('license:licensePage.sections.definitions.youDef')}</li>
            <li><strong>{t('license:licensePage.sections.definitions.yourCompany')}</strong>: {t('license:licensePage.sections.definitions.yourCompanyDef')}</li>
            <li><strong>{t('license:licensePage.sections.definitions.control')}</strong>: {t('license:licensePage.sections.definitions.controlDef')}</li>
            <li><strong>{t('license:licensePage.sections.definitions.yourLicenses')}</strong>: {t('license:licensePage.sections.definitions.yourLicensesDef')}</li>
            <li><strong>{t('license:licensePage.sections.definitions.use')}</strong>: {t('license:licensePage.sections.definitions.useDef')}</li>
            <li><strong>{t('license:licensePage.sections.definitions.trademark')}</strong>: {t('license:licensePage.sections.definitions.trademarkDef')}</li>
          </ul>
        </div>
        
        <p className={styles.lastUpdated}>
          {t('license:licensePage.lastUpdated')}
        </p>
      </section>
    </div>
  );
}