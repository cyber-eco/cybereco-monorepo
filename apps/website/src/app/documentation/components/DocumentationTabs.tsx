import React, { useState } from 'react';
import styles from './DocumentationTabs.module.css';

export interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content?: React.ReactNode;
}

interface DocumentationTabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
  renderContent?: (tabId: string) => React.ReactNode;
}

export default function DocumentationTabs({
  tabs,
  defaultTab,
  className,
  renderContent
}: DocumentationTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || '');
  const [showScrollHint, setShowScrollHint] = useState(false);

  const activeTabContent = renderContent
    ? renderContent(activeTab)
    : tabs.find(tab => tab.id === activeTab)?.content;

  // Check if tabs are scrollable
  React.useEffect(() => {
    const checkScroll = () => {
      const tabsElement = document.querySelector(`.${styles.tabs}`);
      if (tabsElement) {
        setShowScrollHint(tabsElement.scrollWidth > tabsElement.clientWidth);
      }
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [tabs]);

  return (
    <div className={`${styles.tabsContainer} ${className || ''}`}>
      <div className={`${styles.tabs} ${showScrollHint ? styles.scrollable : ''}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon && <span style={{ marginRight: '0.5rem' }}>{tab.icon}</span>}
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