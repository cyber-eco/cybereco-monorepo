'use client';

import { useI18n } from '@cybereco/i18n';
import styles from './page.module.css';

export default function StatusPage() {
  const { t } = useI18n();
  
  return (
        <div className={styles.container}>
          <header className={styles.pageHeader}>
            <h1 className={styles.title}>
              {t('common:statusPage.title') || 'System Status'}
            </h1>
            <p className={styles.subtitle}>
              {t('common:statusPage.subtitle') || 'Current operational status of all CyberEco services and applications'}
            </p>
          </header>
          
          <section className={styles.contentSection}>
            <div className={styles.overallStatus}>
              <div className={styles.statusIndicator}>
                <div className={styles.statusLight}></div>
                <h2 className={styles.statusText}>{t('common:statusPage.allSystemsOperational') || 'All Systems Operational'}</h2>
              </div>
              <p className={styles.statusDescription}>
                {t('common:statusPage.allSystemsDescription') || 'All CyberEco services are currently running smoothly with no known issues.'}
              </p>
            </div>

            <div className={styles.servicesStatus}>
              <h3 className={styles.sectionTitle}>{t('common:statusPage.serviceStatus') || 'Service Status'}</h3>
              
              <div className={styles.serviceItem}>
                <div className={styles.serviceInfo}>
                  <h4 className={styles.serviceName}>{t('common:statusPage.hubName') || 'CyberEco Hub'}</h4>
                  <p className={styles.serviceDescription}>{t('common:statusPage.hubDescription') || 'Central authentication and user management'}</p>
                </div>
                <div className={styles.serviceStatus}>
                  <span className={styles.statusBadge + ' ' + styles.operational}>{t('common:statusPage.operational') || 'Operational'}</span>
                </div>
              </div>

              <div className={styles.serviceItem}>
                <div className={styles.serviceInfo}>
                  <h4 className={styles.serviceName}>{t('common:statusPage.justSplitName') || 'JustSplit'}</h4>
                  <p className={styles.serviceDescription}>{t('common:statusPage.justSplitDescription') || 'Expense splitting and financial management'}</p>
                </div>
                <div className={styles.serviceStatus}>
                  <span className={styles.statusBadge + ' ' + styles.operational}>{t('common:statusPage.operational') || 'Operational'}</span>
                </div>
              </div>

              <div className={styles.serviceItem}>
                <div className={styles.serviceInfo}>
                  <h4 className={styles.serviceName}>{t('common:statusPage.websiteName') || 'Website'}</h4>
                  <p className={styles.serviceDescription}>{t('common:statusPage.websiteDescription') || 'Main website and documentation'}</p>
                </div>
                <div className={styles.serviceStatus}>
                  <span className={styles.statusBadge + ' ' + styles.operational}>{t('common:statusPage.operational') || 'Operational'}</span>
                </div>
              </div>

              <div className={styles.serviceItem}>
                <div className={styles.serviceInfo}>
                  <h4 className={styles.serviceName}>{t('common:statusPage.somosName') || 'Somos'}</h4>
                  <p className={styles.serviceDescription}>{t('common:statusPage.somosDescription') || 'Family roots and cultural heritage explorer'}</p>
                </div>
                <div className={styles.serviceStatus}>
                  <span className={styles.statusBadge + ' ' + styles.development}>{t('common:statusPage.inDevelopment') || 'In Development'}</span>
                </div>
              </div>

              <div className={styles.serviceItem}>
                <div className={styles.serviceInfo}>
                  <h4 className={styles.serviceName}>{t('common:statusPage.demosName') || 'Demos'}</h4>
                  <p className={styles.serviceDescription}>{t('common:statusPage.demosDescription') || 'Community governance and decision making'}</p>
                </div>
                <div className={styles.serviceStatus}>
                  <span className={styles.statusBadge + ' ' + styles.development}>{t('common:statusPage.inDevelopment') || 'In Development'}</span>
                </div>
              </div>

              <div className={styles.serviceItem}>
                <div className={styles.serviceInfo}>
                  <h4 className={styles.serviceName}>{t('common:statusPage.plantopiaName') || 'Plantopia'}</h4>
                  <p className={styles.serviceDescription}>{t('common:statusPage.plantopiaDescription') || 'Smart gardening and plant management'}</p>
                </div>
                <div className={styles.serviceStatus}>
                  <span className={styles.statusBadge + ' ' + styles.development}>{t('common:statusPage.inDevelopment') || 'In Development'}</span>
                </div>
              </div>
            </div>

            <div className={styles.uptime}>
              <h3 className={styles.sectionTitle}>{t('common:statusPage.systemUptime') || 'System Uptime (Last 30 Days)'}</h3>
              <div className={styles.uptimeGrid}>
                <div className={styles.uptimeItem}>
                  <h4 className={styles.uptimeService}>Hub</h4>
                  <div className={styles.uptimeBar}>
                    <div className={styles.uptimeProgress} style={{width: '99.9%'}}></div>
                  </div>
                  <span className={styles.uptimePercent}>99.9%</span>
                </div>
                <div className={styles.uptimeItem}>
                  <h4 className={styles.uptimeService}>JustSplit</h4>
                  <div className={styles.uptimeBar}>
                    <div className={styles.uptimeProgress} style={{width: '99.8%'}}></div>
                  </div>
                  <span className={styles.uptimePercent}>99.8%</span>
                </div>
                <div className={styles.uptimeItem}>
                  <h4 className={styles.uptimeService}>Website</h4>
                  <div className={styles.uptimeBar}>
                    <div className={styles.uptimeProgress} style={{width: '100%'}}></div>
                  </div>
                  <span className={styles.uptimePercent}>100%</span>
                </div>
              </div>
            </div>

            <div className={styles.recentIncidents}>
              <h3 className={styles.sectionTitle}>{t('common:statusPage.recentIncidents') || 'Recent Incidents'}</h3>
              <div className={styles.incidentItem}>
                <div className={styles.incidentDate}>{t('common:statusPage.noRecentIncidents') || 'No recent incidents'}</div>
                <div className={styles.incidentDescription}>
                  {t('common:statusPage.noIncidentsDescription') || 'All systems have been running smoothly with no reported incidents in the past 30 days.'}
                </div>
              </div>
            </div>

            <div className={styles.maintenance}>
              <h3 className={styles.sectionTitle}>{t('common:statusPage.scheduledMaintenance') || 'Scheduled Maintenance'}</h3>
              <div className={styles.maintenanceItem}>
                <div className={styles.maintenanceDate}>{t('common:statusPage.noScheduledMaintenance') || 'No scheduled maintenance'}</div>
                <div className={styles.maintenanceDescription}>
                  {t('common:statusPage.noMaintenanceDescription') || 'There is currently no scheduled maintenance for any CyberEco services.'}
                </div>
              </div>
            </div>
          </section>
        </div>
  );
}