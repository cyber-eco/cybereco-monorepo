'use client';

import { useI18n } from '@cybereco/i18n';
import styles from './page.module.css';

export default function PrivacyPage() {
  const { t } = useI18n();
  
  return (
        <div className={styles.container}>
          <header className={styles.pageHeader}>
            <h1 className={styles.title}>
              {t('privacy:privacyPage.title')}
            </h1>
            <p className={styles.subtitle}>
              {t('privacy:privacyPage.subtitle')}
            </p>
          </header>
          
          <section className={styles.contentSection}>
            <div className={styles.content}>
              <h2>{t('privacy:privacyPage.sections.overview.title')}</h2>
              <p>
                {t('privacy:privacyPage.intro')}
              </p>
              
              <h2>{t('privacy:privacyPage.sections.dataCollection.title')}</h2>
              <h3>{t('privacy:privacyPage.sections.dataCollection.accountData.title')}</h3>
              <ul>
                <li>{t('privacy:privacyPage.sections.dataCollection.accountData.item1')}</li>
                <li>{t('privacy:privacyPage.sections.dataCollection.accountData.item2')}</li>
                <li>{t('privacy:privacyPage.sections.dataCollection.accountData.item3')}</li>
                <li>{t('privacy:privacyPage.sections.dataCollection.accountData.item4')}</li>
              </ul>
              <h3>{t('privacy:privacyPage.sections.dataCollection.usageData.title')}</h3>
              <ul>
                <li>{t('privacy:privacyPage.sections.dataCollection.usageData.item1')}</li>
                <li>{t('privacy:privacyPage.sections.dataCollection.usageData.item2')}</li>
                <li>{t('privacy:privacyPage.sections.dataCollection.usageData.item3')}</li>
                <li>{t('privacy:privacyPage.sections.dataCollection.usageData.item4')}</li>
              </ul>
              
              <h2>{t('privacy:privacyPage.sections.dataUsage.title')}</h2>
              <ul>
                <li>{t('privacy:privacyPage.sections.dataUsage.purpose1')}</li>
                <li>{t('privacy:privacyPage.sections.dataUsage.purpose2')}</li>
                <li>{t('privacy:privacyPage.sections.dataUsage.purpose3')}</li>
                <li>{t('privacy:privacyPage.sections.dataUsage.purpose4')}</li>
                <li>{t('privacy:privacyPage.sections.dataUsage.purpose5')}</li>
                <li>{t('privacy:privacyPage.sections.dataUsage.purpose6')}</li>
              </ul>
              
              <h2>{t('privacy:privacyPage.sections.dataSharing.title')}</h2>
              <p><strong>{t('privacy:privacyPage.sections.dataSharing.never')}</strong></p>
              <ul>
                <li>{t('privacy:privacyPage.sections.dataSharing.never1')}</li>
                <li>{t('privacy:privacyPage.sections.dataSharing.never2')}</li>
                <li>{t('privacy:privacyPage.sections.dataSharing.never3')}</li>
                <li>{t('privacy:privacyPage.sections.dataSharing.never4')}</li>
              </ul>
              <p><strong>{t('privacy:privacyPage.sections.dataSharing.exceptions')}</strong></p>
              <ul>
                <li>{t('privacy:privacyPage.sections.dataSharing.exception1')}</li>
                <li>{t('privacy:privacyPage.sections.dataSharing.exception2')}</li>
                <li>{t('privacy:privacyPage.sections.dataSharing.exception3')}</li>
              </ul>
              
              <h2>{t('privacy:privacyPage.sections.security.title')}</h2>
              <ul>
                <li>{t('privacy:privacyPage.sections.security.measure1')}</li>
                <li>{t('privacy:privacyPage.sections.security.measure2')}</li>
                <li>{t('privacy:privacyPage.sections.security.measure3')}</li>
                <li>{t('privacy:privacyPage.sections.security.measure4')}</li>
                <li>{t('privacy:privacyPage.sections.security.measure5')}</li>
                <li>{t('privacy:privacyPage.sections.security.measure6')}</li>
              </ul>
              
              <h2>{t('privacy:privacyPage.sections.contact.title')}</h2>
              <p>
                {t('privacy:privacyPage.sections.contact.text')}
              </p>
              <p>
                {t('privacy:privacyPage.sections.contact.email')}
              </p>
            </div>
            
            <p className={styles.lastUpdated}>
              {t('privacy:privacyPage.lastUpdated')}
            </p>
          </section>
        </div>
  );
}