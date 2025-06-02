'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaDatabase, FaLayerGroup, FaArrowRight, FaLock, FaSync, FaCode, FaChartLine, FaCube, FaCheck } from 'react-icons/fa';
import { useLanguage } from '@cybereco/ui-components';
import styles from './page.module.css';

export default function DataArchitectureDocumentation() {
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const { t } = useLanguage();

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const CodeBlock = ({ code, language = 'typescript', id }: { code: string; language?: string; id: string }) => (
    <div className={styles.codeBlock}>
      <div className={styles.codeHeader}>
        <span className={styles.codeLanguage}>{language}</span>
        <button
          className={styles.copyButton}
          onClick={() => copyToClipboard(code, id)}
          aria-label="Copy code"
        >
          {copiedCode === id ? <FaCheck /> : '📋'}
        </button>
      </div>
      <pre className={styles.codeContent}>
        <code>{code}</code>
      </pre>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            <FaDatabase className={styles.titleIcon} />
            {t('dataArchitecture.title') || 'Data Layer Architecture'}
          </h1>
          <p className={styles.subtitle}>
            {t('dataArchitecture.subtitle') || 'Centralized data management with distributed application consumption'}
          </p>
        </div>
      </div>

      <nav className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'overview' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          {t('dataArchitecture.tabs.overview') || 'Overview'}
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'architecture' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('architecture')}
        >
          {t('dataArchitecture.tabs.architecture') || 'Architecture'}
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'dataflow' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('dataflow')}
        >
          {t('dataArchitecture.tabs.dataflow') || 'Data Flow'}
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'implementation' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('implementation')}
        >
          {t('dataArchitecture.tabs.implementation') || 'Implementation'}
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'benefits' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('benefits')}
        >
          {t('dataArchitecture.tabs.benefits') || 'Benefits'}
        </button>
      </nav>

      <div className={styles.content}>
        {activeTab === 'overview' && (
          <section className={styles.section}>
            <h2>{t('dataArchitecture.overview.title') || 'Unified Data Layer'}</h2>
            <p className={styles.lead}>
              {t('dataArchitecture.overview.description') || 
              'CyberEco implements a revolutionary architecture where the Hub serves as a centralized data layer, while applications operate as lightweight consumers of this shared data infrastructure.'}
            </p>

            <div className={styles.conceptDiagram}>
              <div className={styles.layer}>
                <div className={styles.layerHeader}>
                  <FaDatabase />
                  <h3>{t('dataArchitecture.overview.dataLayer') || 'Data Layer (Hub)'}</h3>
                </div>
                <div className={styles.layerContent}>
                  <div className={styles.dataType}>
                    <span className={styles.dataIcon}>👤</span>
                    <span>{t('dataArchitecture.overview.userProfiles') || 'User Profiles'}</span>
                  </div>
                  <div className={styles.dataType}>
                    <span className={styles.dataIcon}>🔐</span>
                    <span>{t('dataArchitecture.overview.permissions') || 'Permissions'}</span>
                  </div>
                  <div className={styles.dataType}>
                    <span className={styles.dataIcon}>💰</span>
                    <span>{t('dataArchitecture.overview.financialData') || 'Financial Data'}</span>
                  </div>
                  <div className={styles.dataType}>
                    <span className={styles.dataIcon}>👥</span>
                    <span>{t('dataArchitecture.overview.groups') || 'Groups'}</span>
                  </div>
                  <div className={styles.dataType}>
                    <span className={styles.dataIcon}>📊</span>
                    <span>{t('dataArchitecture.overview.activities') || 'Activities'}</span>
                  </div>
                  <div className={styles.dataType}>
                    <span className={styles.dataIcon}>🔔</span>
                    <span>{t('dataArchitecture.overview.notifications') || 'Notifications'}</span>
                  </div>
                </div>
              </div>

              <div className={styles.arrow}>
                <FaArrowRight />
                <span>{t('dataArchitecture.overview.consumes') || 'Consumes'}</span>
              </div>

              <div className={styles.layer}>
                <div className={styles.layerHeader}>
                  <FaLayerGroup />
                  <h3>{t('dataArchitecture.overview.appLayer') || 'Application Layer'}</h3>
                </div>
                <div className={styles.layerContent}>
                  <div className={styles.appCard}>
                    <h4>JustSplit</h4>
                    <p>{t('dataArchitecture.overview.justSplitDesc') || 'Expense tracking'}</p>
                  </div>
                  <div className={styles.appCard}>
                    <h4>Somos</h4>
                    <p>{t('dataArchitecture.overview.somosDesc') || 'Family heritage'}</p>
                  </div>
                  <div className={styles.appCard}>
                    <h4>Demos</h4>
                    <p>{t('dataArchitecture.overview.demosDesc') || 'Community governance'}</p>
                  </div>
                  <div className={styles.appCard}>
                    <h4>Plantopia</h4>
                    <p>{t('dataArchitecture.overview.plantopiaDesc') || 'Smart gardening'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.keyPoints}>
              <h3>{t('dataArchitecture.overview.keyPoints') || 'Key Points'}</h3>
              <ul>
                <li>
                  <FaCheck />
                  <span>{t('dataArchitecture.overview.point1') || 'Single source of truth for all shared data'}</span>
                </li>
                <li>
                  <FaCheck />
                  <span>{t('dataArchitecture.overview.point2') || 'Apps maintain only app-specific data'}</span>
                </li>
                <li>
                  <FaCheck />
                  <span>{t('dataArchitecture.overview.point3') || 'Real-time synchronization across applications'}</span>
                </li>
                <li>
                  <FaCheck />
                  <span>{t('dataArchitecture.overview.point4') || 'Centralized permissions and access control'}</span>
                </li>
              </ul>
            </div>
          </section>
        )}

        {activeTab === 'architecture' && (
          <section className={styles.section}>
            <h2>{t('dataArchitecture.architecture.title') || 'System Architecture'}</h2>
            
            <div className={styles.architectureDiagram}>
              <div className={styles.hubSection}>
                <h3>{t('dataArchitecture.architecture.hubServices') || 'Hub Services'}</h3>
                <div className={styles.serviceGrid}>
                  <div className={styles.service}>
                    <div className={styles.serviceIcon}>🔐</div>
                    <h4>{t('dataArchitecture.architecture.authService') || 'Auth Service'}</h4>
                    <p>{t('dataArchitecture.architecture.authServiceDesc') || 'User authentication and session management'}</p>
                  </div>
                  <div className={styles.service}>
                    <div className={styles.serviceIcon}>📊</div>
                    <h4>{t('dataArchitecture.architecture.dataService') || 'Data Service'}</h4>
                    <p>{t('dataArchitecture.architecture.dataServiceDesc') || 'CRUD operations for shared data'}</p>
                  </div>
                  <div className={styles.service}>
                    <div className={styles.serviceIcon}>🛡️</div>
                    <h4>{t('dataArchitecture.architecture.permissionService') || 'Permission Service'}</h4>
                    <p>{t('dataArchitecture.architecture.permissionServiceDesc') || 'Access control and authorization'}</p>
                  </div>
                  <div className={styles.service}>
                    <div className={styles.serviceIcon}>🔄</div>
                    <h4>{t('dataArchitecture.architecture.syncService') || 'Sync Service'}</h4>
                    <p>{t('dataArchitecture.architecture.syncServiceDesc') || 'Real-time data synchronization'}</p>
                  </div>
                </div>
              </div>

              <div className={styles.dataModels}>
                <h3>{t('dataArchitecture.architecture.dataModels') || 'Shared Data Models'}</h3>
                <div className={styles.modelGrid}>
                  <div className={styles.model}>
                    <h4>SharedUserProfile</h4>
                    <ul>
                      <li>id: string</li>
                      <li>name: string</li>
                      <li>preferences: object</li>
                      <li>appData: Record</li>
                    </ul>
                  </div>
                  <div className={styles.model}>
                    <h4>Transaction</h4>
                    <ul>
                      <li>id: string</li>
                      <li>amount: number</li>
                      <li>currency: string</li>
                      <li>appId: string</li>
                    </ul>
                  </div>
                  <div className={styles.model}>
                    <h4>SharedGroup</h4>
                    <ul>
                      <li>id: string</li>
                      <li>members: array</li>
                      <li>appContexts: object</li>
                      <li>settings: object</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.apiStructure}>
              <h3>{t('dataArchitecture.architecture.apiStructure') || 'API Structure'}</h3>
              <CodeBlock
                id="api-structure"
                code={`// Hub Data Service API
class HubDataService {
  // User Operations
  async getUserProfile(userId: string): Promise<SharedUserProfile>
  async updateUserProfile(userId: string, updates: Partial<SharedUserProfile>)
  
  // Transaction Operations
  async createTransaction(transaction: Transaction): Promise<string>
  async getUserTransactions(userId: string, filters?: Filters): Promise<Transaction[]>
  
  // Group Operations
  async createSharedGroup(group: SharedGroup): Promise<string>
  async getUserGroups(userId: string): Promise<SharedGroup[]>
  
  // Real-time Subscriptions
  subscribeToUserData(userId: string, callback: Function): Unsubscribe
  subscribeToGroupUpdates(groupId: string, callback: Function): Unsubscribe
}`}
              />
            </div>
          </section>
        )}

        {activeTab === 'dataflow' && (
          <section className={styles.section}>
            <h2>{t('dataArchitecture.dataflow.title') || 'Data Flow Patterns'}</h2>

            <div className={styles.flowPatterns}>
              <div className={styles.flowPattern}>
                <h3>{t('dataArchitecture.dataflow.readFlow') || '📖 Read Flow'}</h3>
                <div className={styles.flowSteps}>
                  <div className={styles.flowStep}>
                    <span className={styles.stepNumber}>1</span>
                    <span>{t('dataArchitecture.dataflow.readStep1') || 'App requests data'}</span>
                  </div>
                  <div className={styles.flowArrow}>↓</div>
                  <div className={styles.flowStep}>
                    <span className={styles.stepNumber}>2</span>
                    <span>{t('dataArchitecture.dataflow.readStep2') || 'Hub validates permissions'}</span>
                  </div>
                  <div className={styles.flowArrow}>↓</div>
                  <div className={styles.flowStep}>
                    <span className={styles.stepNumber}>3</span>
                    <span>{t('dataArchitecture.dataflow.readStep3') || 'Data returned from Hub'}</span>
                  </div>
                  <div className={styles.flowArrow}>↓</div>
                  <div className={styles.flowStep}>
                    <span className={styles.stepNumber}>4</span>
                    <span>{t('dataArchitecture.dataflow.readStep4') || 'App caches and displays'}</span>
                  </div>
                </div>
              </div>

              <div className={styles.flowPattern}>
                <h3>{t('dataArchitecture.dataflow.writeFlow') || '✏️ Write Flow'}</h3>
                <div className={styles.flowSteps}>
                  <div className={styles.flowStep}>
                    <span className={styles.stepNumber}>1</span>
                    <span>{t('dataArchitecture.dataflow.writeStep1') || 'App submits data'}</span>
                  </div>
                  <div className={styles.flowArrow}>↓</div>
                  <div className={styles.flowStep}>
                    <span className={styles.stepNumber}>2</span>
                    <span>{t('dataArchitecture.dataflow.writeStep2') || 'Hub validates data'}</span>
                  </div>
                  <div className={styles.flowArrow}>↓</div>
                  <div className={styles.flowStep}>
                    <span className={styles.stepNumber}>3</span>
                    <span>{t('dataArchitecture.dataflow.writeStep3') || 'Store in Hub database'}</span>
                  </div>
                  <div className={styles.flowArrow}>↓</div>
                  <div className={styles.flowStep}>
                    <span className={styles.stepNumber}>4</span>
                    <span>{t('dataArchitecture.dataflow.writeStep4') || 'Broadcast to subscribers'}</span>
                  </div>
                </div>
              </div>

              <div className={styles.flowPattern}>
                <h3>{t('dataArchitecture.dataflow.syncFlow') || '🔄 Real-time Sync'}</h3>
                <div className={styles.flowSteps}>
                  <div className={styles.flowStep}>
                    <span className={styles.stepNumber}>1</span>
                    <span>{t('dataArchitecture.dataflow.syncStep1') || 'Data changes in Hub'}</span>
                  </div>
                  <div className={styles.flowArrow}>↓</div>
                  <div className={styles.flowStep}>
                    <span className={styles.stepNumber}>2</span>
                    <span>{t('dataArchitecture.dataflow.syncStep2') || 'WebSocket notification'}</span>
                  </div>
                  <div className={styles.flowArrow}>↓</div>
                  <div className={styles.flowStep}>
                    <span className={styles.stepNumber}>3</span>
                    <span>{t('dataArchitecture.dataflow.syncStep3') || 'Apps receive update'}</span>
                  </div>
                  <div className={styles.flowArrow}>↓</div>
                  <div className={styles.flowStep}>
                    <span className={styles.stepNumber}>4</span>
                    <span>{t('dataArchitecture.dataflow.syncStep4') || 'UI updates automatically'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.syncExample}>
              <h3>{t('dataArchitecture.dataflow.exampleTitle') || 'Example: Cross-App Transaction'}</h3>
              <div className={styles.exampleFlow}>
                <div className={styles.exampleStep}>
                  <div className={styles.appIcon}>💰</div>
                  <p>{t('dataArchitecture.dataflow.example1') || 'User creates expense in JustSplit'}</p>
                </div>
                <FaArrowRight className={styles.exampleArrow} />
                <div className={styles.exampleStep}>
                  <div className={styles.appIcon}>🏛️</div>
                  <p>{t('dataArchitecture.dataflow.example2') || 'Transaction stored in Hub'}</p>
                </div>
                <FaArrowRight className={styles.exampleArrow} />
                <div className={styles.exampleStep}>
                  <div className={styles.appIcon}>📊</div>
                  <p>{t('dataArchitecture.dataflow.example3') || 'Financial dashboard updates instantly'}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'implementation' && (
          <section className={styles.section}>
            <h2>{t('dataArchitecture.implementation.title') || 'Implementation Guide'}</h2>

            <div className={styles.implementationSection}>
              <h3>{t('dataArchitecture.implementation.appIntegration') || 'App Integration'}</h3>
              <CodeBlock
                id="app-integration"
                code={`// JustSplit Integration Example
import { HubDataService } from '@cybereco/hub-sdk';

class JustSplitDataLayer {
  private hubData: HubDataService;
  private localCache: LocalCache;
  
  async createExpense(expense: ExpenseInput): Promise<void> {
    // 1. Create shared transaction in Hub
    const transactionId = await this.hubData.createTransaction({
      userId: expense.paidBy,
      amount: expense.amount,
      currency: expense.currency,
      date: expense.date,
      appId: 'justsplit'
    });
    
    // 2. Store app-specific data locally
    await this.localCache.saveExpense({
      ...expense,
      transactionId,
      splitDetails: expense.splits
    });
    
    // 3. Notify group members
    await this.hubData.notifyGroup(expense.groupId, {
      type: 'new_expense',
      data: { transactionId, expenseId: expense.id }
    });
  }
  
  // Subscribe to real-time updates
  subscribeToGroupExpenses(groupId: string) {
    return this.hubData.subscribeToGroupData(groupId, (update) => {
      if (update.type === 'transaction_update') {
        this.updateLocalExpense(update.data);
      }
    });
  }
}`}
              />
            </div>

            <div className={styles.implementationSection}>
              <h3>{t('dataArchitecture.implementation.dataModeling') || 'Data Modeling Best Practices'}</h3>
              <div className={styles.bestPractices}>
                <div className={styles.practice}>
                  <div className={styles.practiceHeader}>
                    <span className={styles.good}>✅ {t('dataArchitecture.implementation.good') || 'Good'}</span>
                  </div>
                  <CodeBlock
                    id="good-practice"
                    code={`// Extend shared types
interface JustSplitUser extends SharedUserProfile {
  splitPreferences: {
    defaultCurrency: string;
    roundingMethod: 'up' | 'down' | 'nearest';
  };
}`}
                  />
                </div>
                <div className={styles.practice}>
                  <div className={styles.practiceHeader}>
                    <span className={styles.bad}>❌ {t('dataArchitecture.implementation.bad') || 'Bad'}</span>
                  </div>
                  <CodeBlock
                    id="bad-practice"
                    code={`// Duplicate shared fields
interface JustSplitUser {
  id: string; // Duplicates SharedUserProfile
  name: string; // Duplicates SharedUserProfile
  email: string; // Duplicates SharedUserProfile
  splitPreferences: object;
}`}
                  />
                </div>
              </div>
            </div>

            <div className={styles.implementationSection}>
              <h3>{t('dataArchitecture.implementation.caching') || 'Caching Strategy'}</h3>
              <CodeBlock
                id="caching"
                code={`class SmartCache {
  private cache = new Map<string, CachedItem>();
  private subscriptions = new Map<string, Unsubscribe>();
  
  async get<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
    // Check cache first
    const cached = this.cache.get(key);
    if (cached && !this.isExpired(cached)) {
      return cached.data as T;
    }
    
    // Fetch from Hub
    const data = await fetcher();
    
    // Cache with TTL
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: 5 * 60 * 1000 // 5 minutes
    });
    
    // Subscribe to updates
    if (!this.subscriptions.has(key)) {
      const unsubscribe = hubData.subscribeToKey(key, (newData) => {
        this.cache.set(key, {
          data: newData,
          timestamp: Date.now(),
          ttl: 5 * 60 * 1000
        });
      });
      this.subscriptions.set(key, unsubscribe);
    }
    
    return data;
  }
}`}
              />
            </div>
          </section>
        )}

        {activeTab === 'benefits' && (
          <section className={styles.section}>
            <h2>{t('dataArchitecture.benefits.title') || 'Benefits & Impact'}</h2>

            <div className={styles.benefitGrid}>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  <FaChartLine />
                </div>
                <h3>{t('dataArchitecture.benefits.users') || 'For Users'}</h3>
                <ul>
                  <li>{t('dataArchitecture.benefits.user1') || 'Instant updates across all apps'}</li>
                  <li>{t('dataArchitecture.benefits.user2') || 'Single profile for everything'}</li>
                  <li>{t('dataArchitecture.benefits.user3') || 'Cross-app analytics and insights'}</li>
                  <li>{t('dataArchitecture.benefits.user4') || 'Consistent experience everywhere'}</li>
                </ul>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  <FaCode />
                </div>
                <h3>{t('dataArchitecture.benefits.developers') || 'For Developers'}</h3>
                <ul>
                  <li>{t('dataArchitecture.benefits.dev1') || 'No user data synchronization needed'}</li>
                  <li>{t('dataArchitecture.benefits.dev2') || 'Built-in permissions system'}</li>
                  <li>{t('dataArchitecture.benefits.dev3') || 'Reusable data models and APIs'}</li>
                  <li>{t('dataArchitecture.benefits.dev4') || 'Focus on app-specific features'}</li>
                </ul>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  <FaCube />
                </div>
                <h3>{t('dataArchitecture.benefits.platform') || 'For Platform'}</h3>
                <ul>
                  <li>{t('dataArchitecture.benefits.platform1') || 'Scalable to unlimited apps'}</li>
                  <li>{t('dataArchitecture.benefits.platform2') || 'Centralized data governance'}</li>
                  <li>{t('dataArchitecture.benefits.platform3') || 'Comprehensive analytics'}</li>
                  <li>{t('dataArchitecture.benefits.platform4') || 'Easier maintenance and updates'}</li>
                </ul>
              </div>
            </div>

            <div className={styles.metrics}>
              <h3>{t('dataArchitecture.benefits.metrics') || 'Performance Metrics'}</h3>
              <div className={styles.metricGrid}>
                <div className={styles.metric}>
                  <div className={styles.metricValue}>{'<50ms'}</div>
                  <div className={styles.metricLabel}>{t('dataArchitecture.benefits.apiResponse') || 'API Response Time'}</div>
                </div>
                <div className={styles.metric}>
                  <div className={styles.metricValue}>{'99.9%'}</div>
                  <div className={styles.metricLabel}>{t('dataArchitecture.benefits.uptime') || 'Service Uptime'}</div>
                </div>
                <div className={styles.metric}>
                  <div className={styles.metricValue}>{'<100ms'}</div>
                  <div className={styles.metricLabel}>{t('dataArchitecture.benefits.syncLatency') || 'Sync Latency'}</div>
                </div>
                <div className={styles.metric}>
                  <div className={styles.metricValue}>{'∞'}</div>
                  <div className={styles.metricLabel}>{t('dataArchitecture.benefits.scalability') || 'App Scalability'}</div>
                </div>
              </div>
            </div>

            <div className={styles.futureVision}>
              <h3>{t('dataArchitecture.benefits.future') || 'Future Vision'}</h3>
              <div className={styles.roadmap}>
                <div className={styles.phase}>
                  <h4>{t('dataArchitecture.benefits.phase1') || 'Phase 1: Current'}</h4>
                  <p>{t('dataArchitecture.benefits.phase1Desc') || 'Centralized data with API access'}</p>
                </div>
                <FaArrowRight className={styles.phaseArrow} />
                <div className={styles.phase}>
                  <h4>{t('dataArchitecture.benefits.phase2') || 'Phase 2: Enhanced'}</h4>
                  <p>{t('dataArchitecture.benefits.phase2Desc') || 'GraphQL, offline-first, advanced caching'}</p>
                </div>
                <FaArrowRight className={styles.phaseArrow} />
                <div className={styles.phase}>
                  <h4>{t('dataArchitecture.benefits.phase3') || 'Phase 3: Decentralized'}</h4>
                  <p>{t('dataArchitecture.benefits.phase3Desc') || 'P2P sync, blockchain, user data pods'}</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      <div className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h4>{t('dataArchitecture.footer.relatedDocs') || 'Related Documentation'}</h4>
            <ul className={styles.footerLinks}>
              <li><Link href="/documentation">{t('dataArchitecture.footer.allDocs') || 'All Documentation'}</Link></li>
              <li><Link href="/documentation/authentication">{t('dataArchitecture.footer.authentication') || 'Authentication'}</Link></li>
              <li><a href="/documentation#api-reference">{t('dataArchitecture.footer.apiReference') || 'API Reference'}</a></li>
            </ul>
          </div>
          
          <div className={styles.footerSection}>
            <h4>{t('dataArchitecture.footer.resources') || 'Resources'}</h4>
            <ul className={styles.footerLinks}>
              <li><a href="https://github.com/cybereco">{t('dataArchitecture.footer.github') || 'GitHub'}</a></li>
              <li><a href="/roadmap">{t('dataArchitecture.footer.roadmap') || 'Roadmap'}</a></li>
              <li><a href="/contact">{t('dataArchitecture.footer.contact') || 'Contact'}</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}