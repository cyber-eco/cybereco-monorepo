import React from 'react';
import styles from './DocumentationHero.module.css';

interface DocumentationHeroProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  gradient?: string;
}

export default function DocumentationHero({ 
  icon, 
  title, 
  subtitle,
  gradient = 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)'
}: DocumentationHeroProps) {
  return (
    <div className={styles.hero} style={{ background: gradient }}>
      <div className={styles.heroContent}>
        <h1 className={styles.title}>
          <span className={styles.titleIcon}>{icon}</span>
          {title}
        </h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
    </div>
  );
}