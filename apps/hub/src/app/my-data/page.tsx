'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@cybereco/ui-components';
import { useHubAuth } from '../../hooks/useHubAuth';
import { 
  FaDatabase, 
  FaChartLine, 
  FaLock, 
  FaDownload, 
  FaTrash,
  FaPlug,
  FaChevronRight,
  FaShieldAlt,
  FaHistory,
  FaClock,
  FaExclamationTriangle
} from 'react-icons/fa';
import Link from 'next/link';
import { getHubFirestore } from '@cybereco/firebase-config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import styles from './my-data.module.css';

interface AppDataConnection {
  appId: string;
  appName: string;
  appIcon: React.ReactNode;
  dataTypes: string[];
  lastAccessed: string;
  permissions: string[];
  status: 'active' | 'inactive';
  dataCount?: number;
}

interface DataMetric {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}

export default function MyDataPage() {
  const { userProfile: user, isLoading } = useHubAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'connections' | 'privacy'>('overview');
  const [connectedApps, setConnectedApps] = useState<AppDataConnection[]>([]);
  const [dataMetrics, setDataMetrics] = useState<DataMetric[]>([]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      try {
        // Add a small delay to ensure Firebase is initialized
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const db = getHubFirestore();
        
        if (!db) {
          console.error('Firestore not initialized');
          throw new Error('Firestore not initialized');
        }
        
        // Fetch user's app permissions and usage
        let permissionsSnapshot;
        try {
          const permissionsRef = collection(db, 'permissions');
          const userPermissionsQuery = query(permissionsRef, where('userId', '==', user.id));
          permissionsSnapshot = await getDocs(userPermissionsQuery);
        } catch (queryError) {
          console.warn('Permissions collection might not exist yet:', queryError);
          // Continue with empty permissions
          permissionsSnapshot = { docs: [] };
        }
        
        const appConnections: AppDataConnection[] = [];
        let totalDataPoints = 0;
        
        // For each app the user has permissions for
        for (const doc of permissionsSnapshot.docs) {
          const permission = doc.data();
          
          // Get app details
          let appSnapshot;
          try {
            const appsRef = collection(db, 'apps');
            const appQuery = query(appsRef, where('id', '==', permission.appId));
            appSnapshot = await getDocs(appQuery);
          } catch (appError) {
            console.warn('Error fetching app details:', appError);
            appSnapshot = { empty: true, docs: [] };
          }
          
          if (!appSnapshot.empty) {
            const appData = appSnapshot.docs[0].data();
            
            // Count data points for this app (simplified - in production, query actual data)
            let dataCount = 0;
            if (permission.appId === 'justsplit') {
              // Count JustSplit data: expenses, groups, settlements
              dataCount = 150; // Placeholder - would query actual collections
            }
            
            totalDataPoints += dataCount;
            
            appConnections.push({
              appId: permission.appId,
              appName: appData.name || 'Unknown App',
              appIcon: <FaChartLine />, // Icon based on app
              dataTypes: appData.dataTypes || ['User Data'],
              lastAccessed: permission.lastAccessed?.toDate?.()?.toISOString() || new Date().toISOString(),
              permissions: permission.permissions || ['read', 'write'],
              status: appData.status === 'active' ? 'active' : 'inactive',
              dataCount
            });
          }
        }
        
        // If no permissions found but user is logged in, they at least have Hub access
        if (appConnections.length === 0) {
          appConnections.push({
            appId: 'hub',
            appName: 'CyberEco Hub',
            appIcon: <FaDatabase />,
            dataTypes: ['Profile', 'Settings', 'Preferences'],
            lastAccessed: new Date().toISOString(),
            permissions: ['read', 'write'],
            status: 'active',
            dataCount: 1
          });
          totalDataPoints = 1;
        }
        
        setConnectedApps(appConnections);
        
        // Calculate metrics
        const metrics: DataMetric[] = [
          {
            label: t('myData.totalDataPoints') || 'Total Data Points',
            value: totalDataPoints.toLocaleString(),
            icon: <FaDatabase />,
            trend: 'up'
          },
          {
            label: t('myData.connectedApps') || 'Connected Apps',
            value: appConnections.length,
            icon: <FaPlug />,
          },
          {
            label: t('myData.dataExports') || 'Data Exports',
            value: 0, // Would track actual exports
            icon: <FaDownload />,
          },
          {
            label: t('myData.privacyScore') || 'Privacy Score',
            value: '95%', // Calculate based on privacy settings
            icon: <FaShieldAlt />,
            trend: 'neutral'
          }
        ];
        
        setDataMetrics(metrics);
        
      } catch (error) {
        console.error('Error fetching user data:', error);
        console.error('Error details:', {
          message: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined
        });
        
        // Fallback to basic data
        setConnectedApps([{
          appId: 'hub',
          appName: 'CyberEco Hub',
          appIcon: <FaDatabase />,
          dataTypes: ['Profile', 'Settings'],
          lastAccessed: new Date().toISOString(),
          permissions: ['read', 'write'],
          status: 'active'
        }]);
        
        setDataMetrics([
          {
            label: t('myData.totalDataPoints') || 'Total Data Points',
            value: '1',
            icon: <FaDatabase />,
          },
          {
            label: t('myData.connectedApps') || 'Connected Apps',
            value: 1,
            icon: <FaPlug />,
          },
          {
            label: t('myData.dataExports') || 'Data Exports',
            value: 0,
            icon: <FaDownload />,
          },
          {
            label: t('myData.privacyScore') || 'Privacy Score',
            value: '95%',
            icon: <FaShieldAlt />,
          }
        ]);
      }
    };

    fetchUserData();
  }, [user, t]);

  if (!user) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>
              <FaDatabase className={styles.titleIcon} />
              {t('navigation.myData') || 'My Data'}
            </h1>
            <p className={styles.subtitle}>
              {t('myData.subtitle') || 'Manage your data across all CyberEco applications'}
            </p>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className={styles.tabNav}>
          <button
            className={`${styles.tab} ${activeTab === 'overview' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <FaChartLine />
            {t('myData.overview') || 'Overview'}
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'connections' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('connections')}
          >
            <FaPlug />
            {t('myData.connections') || 'App Connections'}
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'privacy' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('privacy')}
          >
            <FaLock />
            {t('myData.privacy') || 'Privacy & Security'}
          </button>
        </div>

        {/* Tab Content */}
        <div className={styles.tabContent}>
          {activeTab === 'overview' && (
            <div className={styles.overviewTab}>
              {/* Metrics Grid */}
              <div className={styles.metricsGrid}>
                {dataMetrics.map((metric, index) => (
                  <div key={index} className={styles.metricCard}>
                    <div className={styles.metricIcon}>{metric.icon}</div>
                    <div className={styles.metricContent}>
                      <div className={styles.metricValue}>{metric.value}</div>
                      <div className={styles.metricLabel}>{metric.label}</div>
                    </div>
                    {metric.trend && (
                      <div className={`${styles.metricTrend} ${styles[metric.trend]}`}>
                        {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '—'}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  {t('myData.quickActions') || 'Quick Actions'}
                </h2>
                <div className={styles.actionGrid}>
                  <button className={styles.actionCard}>
                    <FaDownload className={styles.actionIcon} />
                    <span>{t('myData.exportData') || 'Export My Data'}</span>
                  </button>
                  <button className={styles.actionCard}>
                    <FaHistory className={styles.actionIcon} />
                    <span>{t('myData.viewHistory') || 'View Access History'}</span>
                  </button>
                  <button className={styles.actionCard}>
                    <FaShieldAlt className={styles.actionIcon} />
                    <span>{t('myData.privacySettings') || 'Privacy Settings'}</span>
                  </button>
                  <button className={`${styles.actionCard} ${styles.dangerAction}`}>
                    <FaTrash className={styles.actionIcon} />
                    <span>{t('myData.deleteAllData') || 'Delete All Data'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'connections' && (
            <div className={styles.connectionsTab}>
              <div className={styles.appsList}>
                {connectedApps.map((app) => (
                  <div key={app.appId} className={styles.appCard}>
                    <div className={styles.appHeader}>
                      <div className={styles.appInfo}>
                        <div className={styles.appIcon}>{app.appIcon}</div>
                        <div>
                          <h3 className={styles.appName}>{app.appName}</h3>
                          <div className={styles.appStatus}>
                            <span className={`${styles.statusDot} ${styles[app.status]}`} />
                            {app.status === 'active' ? t('myData.active') || 'Active' : t('myData.inactive') || 'Inactive'}
                          </div>
                        </div>
                      </div>
                      <Link href={`/apps/${app.appId}/settings`} className={styles.manageButton}>
                        {t('myData.manage') || 'Manage'}
                        <FaChevronRight />
                      </Link>
                    </div>

                    <div className={styles.appDetails}>
                      <div className={styles.dataTypes}>
                        <h4>{t('myData.dataTypes') || 'Data Types'}</h4>
                        <div className={styles.tagList}>
                          {app.dataTypes.map((type) => (
                            <span key={type} className={styles.tag}>{type}</span>
                          ))}
                        </div>
                      </div>

                      <div className={styles.permissions}>
                        <h4>{t('myData.permissions') || 'Permissions'}</h4>
                        <div className={styles.tagList}>
                          {app.permissions.map((permission) => (
                            <span key={permission} className={styles.permissionTag}>
                              {permission.charAt(0).toUpperCase() + permission.slice(1)}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className={styles.lastAccess}>
                        <FaClock className={styles.clockIcon} />
                        <span>{t('myData.lastAccessed') || 'Last accessed'}: {new Date(app.lastAccessed).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {connectedApps.length === 0 && (
                <div className={styles.emptyState}>
                  <FaPlug className={styles.emptyIcon} />
                  <h3>{t('myData.noApps') || 'No Connected Apps'}</h3>
                  <p>{t('myData.noAppsDesc') || 'Start using CyberEco apps to see your data connections here.'}</p>
                  <Link href="/apps" className={styles.exploreButton}>
                    {t('myData.exploreApps') || 'Explore Apps'}
                  </Link>
                </div>
              )}
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className={styles.privacyTab}>
              <div className={styles.privacyCard}>
                <div className={styles.privacyHeader}>
                  <FaShieldAlt className={styles.privacyIcon} />
                  <h2>{t('myData.dataPrivacy') || 'Your Data Privacy'}</h2>
                </div>
                
                <div className={styles.privacyContent}>
                  <div className={styles.privacyItem}>
                    <h3>{t('myData.dataOwnership') || 'Data Ownership'}</h3>
                    <p>{t('myData.dataOwnershipDesc') || 'You own all your data. CyberEco acts only as a processor.'}</p>
                  </div>

                  <div className={styles.privacyItem}>
                    <h3>{t('myData.dataEncryption') || 'Data Encryption'}</h3>
                    <p>{t('myData.dataEncryptionDesc') || 'All data is encrypted at rest and in transit using industry standards.'}</p>
                  </div>

                  <div className={styles.privacyItem}>
                    <h3>{t('myData.dataPortability') || 'Data Portability'}</h3>
                    <p>{t('myData.dataPortabilityDesc') || 'Export your data anytime in common formats (JSON, CSV).'}</p>
                  </div>

                  <div className={styles.privacyItem}>
                    <h3>{t('myData.dataRetention') || 'Data Retention'}</h3>
                    <p>{t('myData.dataRetentionDesc') || 'We keep your data only as long as you need it. Delete anytime.'}</p>
                  </div>
                </div>

                <div className={styles.privacyActions}>
                  <Link href="/privacy" className={styles.privacyLink}>
                    {t('myData.viewPrivacyPolicy') || 'View Privacy Policy'}
                  </Link>
                  <Link href="/security" className={styles.privacyLink}>
                    {t('myData.securitySettings') || 'Security Settings'}
                  </Link>
                </div>
              </div>

              <div className={styles.warningCard}>
                <FaExclamationTriangle className={styles.warningIcon} />
                <div>
                  <h3>{t('myData.deleteWarning') || 'Data Deletion'}</h3>
                  <p>{t('myData.deleteWarningDesc') || 'Deleting your data is permanent and cannot be undone.'}</p>
                  <button className={styles.deleteButton}>
                    {t('myData.requestDeletion') || 'Request Data Deletion'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}