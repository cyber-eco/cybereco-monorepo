'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaDatabase, FaLayerGroup, FaArrowRight, FaLock, FaSync, FaCode, FaChartLine, FaCube, FaCheck, FaKey, FaShieldAlt } from 'react-icons/fa';
import { useI18n } from '@cybereco/i18n';
import { DocumentationHero, DocumentationTabs } from '../components';
import type { Tab } from '../components';
import styles from './page.module.css';

export default function DataArchitectureDocumentation() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const { t } = useI18n();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={styles.container}>Loading...</div>;
  }

  // Code examples
  const userModelCode = `interface HubUser {
  id: string;
  email: string;
  profile: {
    displayName: string;
    avatar?: string;
    preferences: UserPreferences;
  };
  permissions: Permission[];
  groups: GroupMembership[];
  createdAt: Date;
  updatedAt: Date;
}`;

  const apiExampleCode = `// Fetch user data from Hub
const user = await hubClient.users.get(userId);

// Update user profile
await hubClient.users.update(userId, {
  profile: { displayName: 'New Name' }
});

// Real-time subscription
hubClient.subscribe('user:updated', (data) => {
  // Handle user update
  handleUserUpdate(data);
});`;

  const hubClientCode = `import { HubClient } from '@cybereco/hub-sdk';

const client = new HubClient({
  appId: 'justsplit',
  apiKey: process.env.HUB_API_KEY,
  wsUrl: 'wss://hub.cybere.co/ws'
});

// Use throughout your app
export default client;`;

  const goodPracticeCode = `// ✅ Good: Reference Hub data
interface Expense {
  id: string;
  amount: number;
  userId: string; // Reference to Hub user
  groupId: string; // Reference to Hub group
}`;

  const badPracticeCode = `// ❌ Bad: Duplicate Hub data
interface Expense {
  id: string;
  amount: number;
  userName: string; // Don't duplicate!
  userEmail: string; // Don't duplicate!
  groupName: string; // Don't duplicate!
}`;

  const cacheCode = `class DataCache {
  private cache = new Map();
  
  async get<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }
    
    const data = await fetcher();
    this.cache.set(key, data);
    
    // Auto-invalidate after 5 minutes
    setTimeout(() => this.cache.delete(key), 300000);
    
    return data;
  }
}`;

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const renderOverviewTab = () => (
    <>
      <h2>{t('common:dataArchitecture.overview.title') || 'Unified Data Layer'}</h2>
      <p className={styles.lead}>
        {t('common:dataArchitecture.overview.description') || 
        'CyberEco implements a revolutionary architecture where the Hub serves as a centralized data layer, while applications operate as lightweight consumers of this shared data infrastructure.'}
      </p>

      <div className={styles.conceptDiagram}>
        <div className={styles.layer}>
          <div className={styles.layerHeader}>
            <FaDatabase />
            <h3>{t('common:dataArchitecture.overview.dataLayer') || 'Data Layer (Hub)'}</h3>
          </div>
          <div className={styles.layerContent}>
            <div className={styles.dataType}>
              <FaDatabase className={styles.dataIcon} />
              <span>{t('common:dataArchitecture.overview.userProfiles') || 'User Profiles'}</span>
            </div>
            <div className={styles.dataType}>
              <FaDatabase className={styles.dataIcon} />
              <span>{t('common:dataArchitecture.overview.permissions') || 'Permissions'}</span>
            </div>
            <div className={styles.dataType}>
              <FaDatabase className={styles.dataIcon} />
              <span>{t('common:dataArchitecture.overview.financialData') || 'Financial Data'}</span>
            </div>
            <div className={styles.dataType}>
              <FaDatabase className={styles.dataIcon} />
              <span>{t('common:dataArchitecture.overview.groups') || 'Groups'}</span>
            </div>
            <div className={styles.dataType}>
              <FaDatabase className={styles.dataIcon} />
              <span>{t('common:dataArchitecture.overview.activities') || 'Activities'}</span>
            </div>
            <div className={styles.dataType}>
              <FaDatabase className={styles.dataIcon} />
              <span>{t('common:dataArchitecture.overview.notifications') || 'Notifications'}</span>
            </div>
          </div>
        </div>

        <div className={styles.arrow}>
          <FaArrowRight />
          <span>{t('common:dataArchitecture.overview.consumes') || 'Consumes'}</span>
        </div>

        <div className={styles.layer}>
          <div className={styles.layerHeader}>
            <FaLayerGroup />
            <h3>{t('common:dataArchitecture.overview.appLayer') || 'Application Layer'}</h3>
          </div>
          <div className={styles.layerContent}>
            <div className={styles.appCard}>
              <h4>JustSplit</h4>
              <p>{t('common:dataArchitecture.overview.justSplitDesc') || 'Expense tracking'}</p>
            </div>
            <div className={styles.appCard}>
              <h4>Somos</h4>
              <p>{t('common:dataArchitecture.overview.somosDesc') || 'Family heritage'}</p>
            </div>
            <div className={styles.appCard}>
              <h4>Demos</h4>
              <p>{t('common:dataArchitecture.overview.demosDesc') || 'Community governance'}</p>
            </div>
            <div className={styles.appCard}>
              <h4>Plantopia</h4>
              <p>{t('common:dataArchitecture.overview.plantopiaDesc') || 'Smart gardening'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.keyPoints}>
        <h3>{t('common:dataArchitecture.overview.keyPoints') || 'Key Points'}</h3>
        <ul>
          <li>
            <FaCheck />
            {t('common:dataArchitecture.overview.point1') || 'Single source of truth for all shared data'}
          </li>
          <li>
            <FaCheck />
            {t('common:dataArchitecture.overview.point2') || 'Apps maintain only app-specific data'}
          </li>
          <li>
            <FaCheck />
            {t('common:dataArchitecture.overview.point3') || 'Real-time synchronization across applications'}
          </li>
          <li>
            <FaCheck />
            {t('common:dataArchitecture.overview.point4') || 'Centralized permissions and access control'}
          </li>
        </ul>
      </div>
    </>
  );

  const renderArchitectureTab = () => (
    <>
      <h2>{t('common:dataArchitecture.architecture.title') || 'System Architecture'}</h2>
      
      <div className={styles.architectureDiagram}>
        <div className={styles.hubSection}>
          <h3><FaCube /> {t('common:dataArchitecture.architecture.hubServices') || 'Hub Services'}</h3>
          <div className={styles.serviceGrid}>
            <div className={styles.service}>
              <FaKey className={styles.serviceIcon} />
              <h4>{t('common:dataArchitecture.architecture.authService') || 'Auth Service'}</h4>
              <p>{t('common:dataArchitecture.architecture.authServiceDesc') || 'User authentication and session management'}</p>
            </div>
            <div className={styles.service}>
              <FaDatabase className={styles.serviceIcon} />
              <h4>{t('common:dataArchitecture.architecture.dataService') || 'Data Service'}</h4>
              <p>{t('common:dataArchitecture.architecture.dataServiceDesc') || 'CRUD operations for shared data'}</p>
            </div>
            <div className={styles.service}>
              <FaShieldAlt className={styles.serviceIcon} />
              <h4>{t('common:dataArchitecture.architecture.permissionService') || 'Permission Service'}</h4>
              <p>{t('common:dataArchitecture.architecture.permissionServiceDesc') || 'Access control and authorization'}</p>
            </div>
            <div className={styles.service}>
              <FaSync className={styles.serviceIcon} />
              <h4>{t('common:dataArchitecture.architecture.syncService') || 'Sync Service'}</h4>
              <p>{t('common:dataArchitecture.architecture.syncServiceDesc') || 'Real-time data synchronization'}</p>
            </div>
          </div>
        </div>

        <div className={styles.dataModels}>
          <h3><FaDatabase /> {t('common:dataArchitecture.architecture.dataModels') || 'Shared Data Models'}</h3>
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <span className={styles.codeLanguage}>TypeScript</span>
              <button 
                className={styles.copyButton}
                onClick={() => handleCopyCode(userModelCode, 'user-model')}
              >
                {copiedCode === 'user-model' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className={styles.codeContent}>
              <code>{userModelCode}</code>
            </pre>
          </div>
        </div>

        <div className={styles.apiStructure}>
          <h3><FaCode /> {t('common:dataArchitecture.architecture.apiStructure') || 'API Structure'}</h3>
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <span className={styles.codeLanguage}>JavaScript</span>
              <button 
                className={styles.copyButton}
                onClick={() => handleCopyCode(apiExampleCode, 'api-example')}
              >
                {copiedCode === 'api-example' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className={styles.codeContent}>
              <code>{apiExampleCode}</code>
            </pre>
          </div>
        </div>
      </div>
    </>
  );

  const renderDataFlowTab = () => (
    <>
      <h2>{t('common:dataArchitecture.dataflow.title') || 'Data Flow Patterns'}</h2>
      
      <div className={styles.flowPatterns}>
        <div className={styles.flowPattern}>
          <h3>{t('common:dataArchitecture.dataflow.readFlow') || '📖 Read Flow'}</h3>
          <div className={styles.flowSteps}>
            <div className={styles.flowStep}>
              <span className={styles.stepNumber}>1</span>
              <span>{t('common:dataArchitecture.dataflow.readStep1') || 'App requests data'}</span>
            </div>
            <div className={styles.flowArrow}>↓</div>
            <div className={styles.flowStep}>
              <span className={styles.stepNumber}>2</span>
              <span>{t('common:dataArchitecture.dataflow.readStep2') || 'Hub validates permissions'}</span>
            </div>
            <div className={styles.flowArrow}>↓</div>
            <div className={styles.flowStep}>
              <span className={styles.stepNumber}>3</span>
              <span>{t('common:dataArchitecture.dataflow.readStep3') || 'Data returned from Hub'}</span>
            </div>
            <div className={styles.flowArrow}>↓</div>
            <div className={styles.flowStep}>
              <span className={styles.stepNumber}>4</span>
              <span>{t('common:dataArchitecture.dataflow.readStep4') || 'App caches and displays'}</span>
            </div>
          </div>
        </div>

        <div className={styles.flowPattern}>
          <h3>{t('common:dataArchitecture.dataflow.writeFlow') || '✏️ Write Flow'}</h3>
          <div className={styles.flowSteps}>
            <div className={styles.flowStep}>
              <span className={styles.stepNumber}>1</span>
              <span>{t('common:dataArchitecture.dataflow.writeStep1') || 'App submits data'}</span>
            </div>
            <div className={styles.flowArrow}>↓</div>
            <div className={styles.flowStep}>
              <span className={styles.stepNumber}>2</span>
              <span>{t('common:dataArchitecture.dataflow.writeStep2') || 'Hub validates data'}</span>
            </div>
            <div className={styles.flowArrow}>↓</div>
            <div className={styles.flowStep}>
              <span className={styles.stepNumber}>3</span>
              <span>{t('common:dataArchitecture.dataflow.writeStep3') || 'Store in Hub database'}</span>
            </div>
            <div className={styles.flowArrow}>↓</div>
            <div className={styles.flowStep}>
              <span className={styles.stepNumber}>4</span>
              <span>{t('common:dataArchitecture.dataflow.writeStep4') || 'Broadcast to subscribers'}</span>
            </div>
          </div>
        </div>

        <div className={styles.flowPattern}>
          <h3>{t('common:dataArchitecture.dataflow.syncFlow') || '🔄 Real-time Sync'}</h3>
          <div className={styles.flowSteps}>
            <div className={styles.flowStep}>
              <span className={styles.stepNumber}>1</span>
              <span>{t('common:dataArchitecture.dataflow.syncStep1') || 'Data changes in Hub'}</span>
            </div>
            <div className={styles.flowArrow}>↓</div>
            <div className={styles.flowStep}>
              <span className={styles.stepNumber}>2</span>
              <span>{t('common:dataArchitecture.dataflow.syncStep2') || 'WebSocket notification'}</span>
            </div>
            <div className={styles.flowArrow}>↓</div>
            <div className={styles.flowStep}>
              <span className={styles.stepNumber}>3</span>
              <span>{t('common:dataArchitecture.dataflow.syncStep3') || 'Apps receive update'}</span>
            </div>
            <div className={styles.flowArrow}>↓</div>
            <div className={styles.flowStep}>
              <span className={styles.stepNumber}>4</span>
              <span>{t('common:dataArchitecture.dataflow.syncStep4') || 'UI updates automatically'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.syncExample}>
        <h3>{t('common:dataArchitecture.dataflow.exampleTitle') || 'Example: Cross-App Transaction'}</h3>
        <div className={styles.exampleFlow}>
          <div className={styles.exampleStep}>
            <FaCode className={styles.appIcon} />
            <p>{t('common:dataArchitecture.dataflow.example1') || 'User creates expense in JustSplit'}</p>
          </div>
          <div className={styles.exampleArrow}>→</div>
          <div className={styles.exampleStep}>
            <FaDatabase className={styles.appIcon} />
            <p>{t('common:dataArchitecture.dataflow.example2') || 'Transaction stored in Hub'}</p>
          </div>
          <div className={styles.exampleArrow}>→</div>
          <div className={styles.exampleStep}>
            <FaChartLine className={styles.appIcon} />
            <p>{t('common:dataArchitecture.dataflow.example3') || 'Financial dashboard updates instantly'}</p>
          </div>
        </div>
      </div>
    </>
  );

  const renderImplementationTab = () => (
    <>
      <h2>{t('common:dataArchitecture.implementation.title') || 'Implementation Guide'}</h2>
      
      <div className={styles.implementationSection}>
        <h3>{t('common:dataArchitecture.implementation.appIntegration') || 'App Integration'}</h3>
        <div className={styles.codeBlock}>
          <div className={styles.codeHeader}>
            <span className={styles.codeLanguage}>JavaScript</span>
            <button 
              className={styles.copyButton}
              onClick={() => handleCopyCode(hubClientCode, 'hub-client')}
            >
              {copiedCode === 'hub-client' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className={styles.codeContent}>
            <code>{hubClientCode}</code>
          </pre>
        </div>
      </div>

      <div className={styles.implementationSection}>
        <h3>{t('common:dataArchitecture.implementation.dataModeling') || 'Data Modeling Best Practices'}</h3>
        <div className={styles.bestPractices}>
          <div className={styles.practice}>
            <div className={styles.practiceHeader}>
              <span className={styles.good}>{t('common:dataArchitecture.implementation.good') || 'Good'}</span>
            </div>
            <div className={styles.codeBlock}>
              <pre className={styles.codeContent}>
                <code>{goodPracticeCode}</code>
              </pre>
            </div>
          </div>
          <div className={styles.practice}>
            <div className={styles.practiceHeader}>
              <span className={styles.bad}>{t('common:dataArchitecture.implementation.bad') || 'Bad'}</span>
            </div>
            <div className={styles.codeBlock}>
              <pre className={styles.codeContent}>
                <code>{badPracticeCode}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.implementationSection}>
        <h3>{t('common:dataArchitecture.implementation.caching') || 'Caching Strategy'}</h3>
        <div className={styles.codeBlock}>
          <div className={styles.codeHeader}>
            <span className={styles.codeLanguage}>TypeScript</span>
            <button 
              className={styles.copyButton}
              onClick={() => handleCopyCode(cacheCode, 'cache-impl')}
            >
              {copiedCode === 'cache-impl' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className={styles.codeContent}>
            <code>{cacheCode}</code>
          </pre>
        </div>
      </div>
    </>
  );

  const renderBenefitsTab = () => (
    <>
      <h2>{t('common:dataArchitecture.benefits.title') || 'Benefits & Impact'}</h2>
      
      <div className={styles.benefitGrid}>
        <div className={styles.benefitCard}>
          <div className={styles.benefitIcon}>👤</div>
          <h3>{t('common:dataArchitecture.benefits.users') || 'For Users'}</h3>
          <ul>
            <li>{t('common:dataArchitecture.benefits.user1') || 'Instant updates across all apps'}</li>
            <li>{t('common:dataArchitecture.benefits.user2') || 'Single profile for everything'}</li>
            <li>{t('common:dataArchitecture.benefits.user3') || 'Cross-app analytics and insights'}</li>
            <li>{t('common:dataArchitecture.benefits.user4') || 'Consistent experience everywhere'}</li>
          </ul>
        </div>

        <div className={styles.benefitCard}>
          <div className={styles.benefitIcon}>💻</div>
          <h3>{t('common:dataArchitecture.benefits.developers') || 'For Developers'}</h3>
          <ul>
            <li>{t('common:dataArchitecture.benefits.dev1') || 'No user data synchronization needed'}</li>
            <li>{t('common:dataArchitecture.benefits.dev2') || 'Built-in permissions system'}</li>
            <li>{t('common:dataArchitecture.benefits.dev3') || 'Reusable data models and APIs'}</li>
            <li>{t('common:dataArchitecture.benefits.dev4') || 'Focus on app-specific features'}</li>
          </ul>
        </div>

        <div className={styles.benefitCard}>
          <div className={styles.benefitIcon}>🚀</div>
          <h3>{t('common:dataArchitecture.benefits.platform') || 'For Platform'}</h3>
          <ul>
            <li>{t('common:dataArchitecture.benefits.platform1') || 'Scalable to unlimited apps'}</li>
            <li>{t('common:dataArchitecture.benefits.platform2') || 'Centralized data governance'}</li>
            <li>{t('common:dataArchitecture.benefits.platform3') || 'Comprehensive analytics'}</li>
            <li>{t('common:dataArchitecture.benefits.platform4') || 'Easier maintenance and updates'}</li>
          </ul>
        </div>
      </div>

      <div className={styles.metrics}>
        <h3>{t('common:dataArchitecture.benefits.metrics') || 'Performance Metrics'}</h3>
        <div className={styles.metricGrid}>
          <div className={styles.metric}>
            <div className={styles.metricValue}>&lt; 50ms</div>
            <div className={styles.metricLabel}>{t('common:dataArchitecture.benefits.apiResponse') || 'API Response Time'}</div>
          </div>
          <div className={styles.metric}>
            <div className={styles.metricValue}>99.9%</div>
            <div className={styles.metricLabel}>{t('common:dataArchitecture.benefits.uptime') || 'Service Uptime'}</div>
          </div>
          <div className={styles.metric}>
            <div className={styles.metricValue}>&lt; 100ms</div>
            <div className={styles.metricLabel}>{t('common:dataArchitecture.benefits.syncLatency') || 'Sync Latency'}</div>
          </div>
          <div className={styles.metric}>
            <div className={styles.metricValue}>∞</div>
            <div className={styles.metricLabel}>{t('common:dataArchitecture.benefits.scalability') || 'App Scalability'}</div>
          </div>
        </div>
      </div>

      <div className={styles.futureVision}>
        <h3>{t('common:dataArchitecture.benefits.future') || 'Future Vision'}</h3>
        <div className={styles.roadmap}>
          <div className={styles.phase}>
            <h4>{t('common:dataArchitecture.benefits.phase1') || 'Phase 1: Current'}</h4>
            <p>{t('common:dataArchitecture.benefits.phase1Desc') || 'Centralized data with API access'}</p>
          </div>
          <div className={styles.phaseArrow}>→</div>
          <div className={styles.phase}>
            <h4>{t('common:dataArchitecture.benefits.phase2') || 'Phase 2: Enhanced'}</h4>
            <p>{t('common:dataArchitecture.benefits.phase2Desc') || 'GraphQL, offline-first, advanced caching'}</p>
          </div>
          <div className={styles.phaseArrow}>→</div>
          <div className={styles.phase}>
            <h4>{t('common:dataArchitecture.benefits.phase3') || 'Phase 3: Decentralized'}</h4>
            <p>{t('common:dataArchitecture.benefits.phase3Desc') || 'P2P sync, blockchain, user data pods'}</p>
          </div>
        </div>
      </div>
    </>
  );

  // Define tabs
  const tabs: Tab[] = [
    {
      id: 'overview',
      label: t('common:dataArchitecture.tabs.overview') || 'Overview',
      content: renderOverviewTab()
    },
    {
      id: 'architecture',
      label: t('common:dataArchitecture.tabs.architecture') || 'Architecture',
      content: renderArchitectureTab()
    },
    {
      id: 'dataflow',
      label: t('common:dataArchitecture.tabs.dataflow') || 'Data Flow',
      content: renderDataFlowTab()
    },
    {
      id: 'implementation',
      label: t('common:dataArchitecture.tabs.implementation') || 'Implementation',
      content: renderImplementationTab()
    },
    {
      id: 'benefits',
      label: t('common:dataArchitecture.tabs.benefits') || 'Benefits',
      content: renderBenefitsTab()
    }
  ];

  return (
    <div className={styles.container}>
      <DocumentationHero
        title={t('common:dataArchitecture.title') || 'Data Layer Architecture'}
        subtitle={t('common:dataArchitecture.subtitle') || 'Centralized data management for the CyberEco ecosystem'}
        icon={<FaDatabase />}
        gradient="linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #2563eb 100%)"
      />

      <DocumentationTabs tabs={tabs} defaultTab="overview" />

      <div className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h4>{t('common:dataArchitecture.footer.relatedDocs') || 'Related Documentation'}</h4>
            <ul className={styles.footerLinks}>
              <li>
                <Link href="/documentation/authentication">
                  <FaLock /> {t('common:dataArchitecture.footer.authentication') || 'Authentication'}
                </Link>
              </li>
              <li>
                <Link href="/documentation/api">
                  <FaCode /> {t('common:dataArchitecture.footer.apiReference') || 'API Reference'}
                </Link>
              </li>
              <li>
                <Link href="/documentation">
                  <FaDatabase /> {t('common:dataArchitecture.footer.allDocs') || 'All Documentation'}
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h4>{t('common:dataArchitecture.footer.resources') || 'Resources'}</h4>
            <ul className={styles.footerLinks}>
              <li>
                <a href="https://github.com/cybereco" target="_blank" rel="noopener noreferrer">
                  {t('common:dataArchitecture.footer.github') || 'GitHub'}
                </a>
              </li>
              <li>
                <Link href="/roadmap">
                  {t('common:dataArchitecture.footer.roadmap') || 'Roadmap'}
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  {t('common:dataArchitecture.footer.contact') || 'Contact'}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}