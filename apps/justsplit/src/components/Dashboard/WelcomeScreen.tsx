import Link from 'next/link';
import styles from '../../app/page.module.css';
import Button from '../ui/Button';
import { useLanguage } from '@/context/LanguageContext';

export default function WelcomeScreen() {
  const { t } = useLanguage();
  
  return (
    <main className={styles.main} style={{ color: '#ffffff' }}>
      <h1 style={{ color: '#ffffff', textShadow: '0 2px 8px rgba(0, 0, 0, 0.4)' }}>JustSplit</h1>
      <p style={{ color: '#ffffff', textShadow: '0 1px 4px rgba(0, 0, 0, 0.4)' }}>{t('welcome')}</p>
      <p style={{ color: '#ffffff', textShadow: '0 1px 4px rgba(0, 0, 0, 0.4)' }}>{t('subtitle')}</p>
      <div className={styles.buttons}>
        <Link href="/expenses/new" passHref>
          <Button variant="primary">{t('addExpense')}</Button>
        </Link>
        <Link href="/events/new" passHref>
          <Button variant="primary">{t('createEvent')}</Button>
        </Link>
        
      </div>
    </main>
  );
}
