import React, { useState } from 'react';
import styles from './DocumentationTabs.module.css';

export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface DocumentationTabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
}

export default function DocumentationTabs({ 
  tabs, 
  defaultTab,
  className 
}: DocumentationTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || '');

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;

  return (
    <div className={`${styles.tabsContainer} ${className || ''}`}>
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <div className={styles.content}>
        <div className={styles.section}>
          {activeTabContent}
        </div>
      </div>
    </div>
  );
}