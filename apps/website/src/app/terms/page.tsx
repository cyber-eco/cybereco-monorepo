'use client';

import { useI18n } from '@cybereco/i18n';
import styles from './page.module.css';

export default function TermsPage() {
  const { t } = useI18n();
  
  return (
        <div className={styles.container}>
          <header className={styles.pageHeader}>
            <h1 className={styles.title}>
              {t('terms:termsPage.title')}
            </h1>
            <p className={styles.subtitle}>
              {t('terms:termsPage.subtitle')}
            </p>
          </header>
          
          <section className={styles.contentSection}>
            <div className={styles.content}>
              <h2>{t('terms:termsPage.sections.acceptance.title')}</h2>
              <p>
                {t('terms:termsPage.sections.acceptance.content')}
              </p>
              
              <h2>{t('terms:termsPage.sections.acceptableUse.title')}</h2>
              <p>
                {t('terms:termsPage.sections.acceptableUse.intro')}
              </p>
              <ul>
                <li>{t('terms:termsPage.sections.acceptableUse.item1')}</li>
                <li>{t('terms:termsPage.sections.acceptableUse.item2')}</li>
                <li>{t('terms:termsPage.sections.acceptableUse.item3')}</li>
                <li>{t('terms:termsPage.sections.acceptableUse.item4')}</li>
                <li>{t('terms:termsPage.sections.acceptableUse.item5')}</li>
                <li>{t('terms:termsPage.sections.acceptableUse.item6')}</li>
                <li>{t('terms:termsPage.sections.acceptableUse.item7')}</li>
                <li>{t('terms:termsPage.sections.acceptableUse.item8')}</li>
              </ul>
              
              <h2>{t('terms:termsPage.sections.accountTerms.title')}</h2>
              <ul>
                <li>{t('terms:termsPage.sections.accountTerms.item1')}</li>
                <li>{t('terms:termsPage.sections.accountTerms.item2')}</li>
                <li>{t('terms:termsPage.sections.accountTerms.item3')}</li>
                <li>{t('terms:termsPage.sections.accountTerms.item4')}</li>
                <li>{t('terms:termsPage.sections.accountTerms.item5')}</li>
                <li>{t('terms:termsPage.sections.accountTerms.item6')}</li>
              </ul>
              
              <h2>{t('terms:termsPage.sections.liability.title')}</h2>
              <p>
                {t('terms:termsPage.sections.liability.limit')}
              </p>
              <p>
                {t('terms:termsPage.sections.liability.cap')}
              </p>
              
              <h2>{t('terms:termsPage.sections.disclaimers.title')}</h2>
              <p>
                {t('terms:termsPage.sections.disclaimers.asIs')}
              </p>
              <p>
                {t('terms:termsPage.sections.disclaimers.availability')}
              </p>
              
              <h2>{t('terms:termsPage.sections.privacy.title')}</h2>
              <p>
                {t('terms:termsPage.sections.privacy.summary')}
              </p>
              
              <h2>{t('terms:termsPage.sections.changes.title')}</h2>
              <p>
                {t('terms:termsPage.sections.changes.notice')}
              </p>
              <p>
                {t('terms:termsPage.sections.changes.continued')}
              </p>
              
              <h2>{t('terms:termsPage.sections.contact.title')}</h2>
              <p>
                {t('terms:termsPage.sections.contact.general')}
              </p>
              <p>
                {t('terms:termsPage.sections.contact.legal')}
              </p>
            </div>
            
            <p className={styles.lastUpdated}>
              {t('terms:termsPage.lastUpdated')}
            </p>
          </section>
        </div>
  );
}