'use client';

import { useI18n } from '@cybereco/i18n';
import styles from './page.module.css';

export default function GroupManagementGuidePage() {
  const { t } = useI18n();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.breadcrumb}>
          <a href="/documentation" className={styles.breadcrumbLink}>
            {t('documentation:groupManagementGuide.documentation') || 'Documentation'}
          </a>
          <span className={styles.breadcrumbSeparator}>›</span>
          <span className={styles.breadcrumbCurrent}>
            {t('documentation:groupManagementGuide.title') || 'Advanced Group Management'}
          </span>
        </div>
        <h1 className={styles.title}>
          👥 {t('documentation:groupManagementGuide.title') || 'Advanced Group Management'}
        </h1>
        <div className={styles.guideMeta}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>⏱️ {t('documentation:groupManagementGuide.duration') || 'Duration'}:</span>
            <span className={styles.metaValue}>25-35 {t('documentation:groupManagementGuide.minutes') || 'minutes'}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>📈 {t('documentation:groupManagementGuide.level') || 'Level'}:</span>
            <span className={styles.metaValue}>{t('documentation:groupManagementGuide.advanced') || 'Advanced'}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>🎯 {t('documentation:groupManagementGuide.goal') || 'Goal'}:</span>
            <span className={styles.metaValue}>{t('documentation:groupManagementGuide.goalText') || 'Master complex group scenarios'}</span>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.introSection}>
          <h2 className={styles.sectionTitle}>
            {t('documentation:groupManagementGuide.introTitle') || 'Beyond Basic Groups'}
          </h2>
          <p className={styles.introText}>
            {t('documentation:groupManagementGuide.introText') || 'This advanced guide covers complex group management scenarios, from large event coordination to ongoing household management. Learn to handle hierarchical groups, custom roles, automated splitting rules, and advanced privacy controls for sophisticated expense sharing needs.'}
          </p>
          
          <div className={styles.complexityGrid}>
            <div className={styles.complexityCard}>
              <div className={styles.complexityIcon}>🏢</div>
              <h4>{t('documentation:groupManagementGuide.largeGroups') || 'Large Groups'}</h4>
              <p>{t('documentation:groupManagementGuide.largeGroupsDesc') || 'Manage groups with 20+ members efficiently'}</p>
            </div>
            <div className={styles.complexityCard}>
              <div className={styles.complexityIcon}>🔗</div>
              <h4>{t('documentation:groupManagementGuide.nestedGroups') || 'Nested Groups'}</h4>
              <p>{t('documentation:groupManagementGuide.nestedGroupsDesc') || 'Create subgroups within larger organizations'}</p>
            </div>
            <div className={styles.complexityCard}>
              <div className={styles.complexityIcon}>⚙️</div>
              <h4>{t('documentation:groupManagementGuide.automation') || 'Automation Rules'}</h4>
              <p>{t('documentation:groupManagementGuide.automationDesc') || 'Set up automatic splitting and notifications'}</p>
            </div>
          </div>
        </div>

        <div className={styles.groupTypesSection}>
          <h2 className={styles.sectionTitle}>
            {t('documentation:groupManagementGuide.groupTypes') || 'Complex Group Types'}
          </h2>
          
          <div className={styles.groupTypesList}>
            <div className={styles.groupTypeCard}>
              <div className={styles.groupTypeHeader}>
                <div className={styles.groupTypeIcon}>🏠</div>
                <h3>{t('documentation:groupManagementGuide.householdGroup') || 'Household Management'}</h3>
                <span className={styles.groupSize}>{t('documentation:groupManagementGuide.size2to8') || '2-8 members'}</span>
              </div>
              <p className={styles.groupTypeDesc}>
                {t('documentation:groupManagementGuide.householdDesc') || 'Long-term shared living with recurring expenses, utilities, and household purchases.'}
              </p>
              <div className={styles.groupFeatures}>
                <h4>{t('documentation:groupManagementGuide.keyFeatures') || 'Key Features'}:</h4>
                <ul>
                  <li>{t('documentation:groupManagementGuide.householdFeature1') || 'Recurring expense templates for rent, utilities'}</li>
                  <li>{t('documentation:groupManagementGuide.householdFeature2') || 'Proportional splitting based on income or room size'}</li>
                  <li>{t('documentation:groupManagementGuide.householdFeature3') || 'Automated monthly settlement reminders'}</li>
                  <li>{t('documentation:groupManagementGuide.householdFeature4') || 'Shopping list integration for shared purchases'}</li>
                </ul>
              </div>
              <div className={styles.bestPractice}>
                <strong>{t('documentation:groupManagementGuide.bestPractice') || 'Best Practice'}:</strong>
                <p>{t('documentation:groupManagementGuide.householdBestPractice') || 'Set up automatic monthly settlements and use percentage-based splitting for major expenses like rent.'}</p>
              </div>
            </div>

            <div className={styles.groupTypeCard}>
              <div className={styles.groupTypeHeader}>
                <div className={styles.groupTypeIcon}>🎉</div>
                <h3>{t('documentation:groupManagementGuide.eventGroup') || 'Large Event Coordination'}</h3>
                <span className={styles.groupSize}>{t('documentation:groupManagementGuide.size10to100') || '10-100+ members'}</span>
              </div>
              <p className={styles.groupTypeDesc}>
                {t('documentation:groupManagementGuide.eventDesc') || 'Weddings, conferences, large parties with multiple organizers and varying participant levels.'}
              </p>
              <div className={styles.groupFeatures}>
                <h4>{t('documentation:groupManagementGuide.keyFeatures') || 'Key Features'}:</h4>
                <ul>
                  <li>{t('documentation:groupManagementGuide.eventFeature1') || 'Hierarchical organizer roles with different permissions'}</li>
                  <li>{t('documentation:groupManagementGuide.eventFeature2') || 'Budget categories with spending limits and alerts'}</li>
                  <li>{t('documentation:groupManagementGuide.eventFeature3') || 'Attendee participation levels (full cost vs. partial)'}</li>
                  <li>{t('documentation:groupManagementGuide.eventFeature4') || 'Multi-phase expense timeline (planning, execution, cleanup)'}</li>
                </ul>
              </div>
              <div className={styles.bestPractice}>
                <strong>{t('documentation:groupManagementGuide.bestPractice') || 'Best Practice'}:</strong>
                <p>{t('documentation:groupManagementGuide.eventBestPractice') || 'Create subgroups for different event aspects (catering, venue, entertainment) with dedicated organizers.'}</p>
              </div>
            </div>

            <div className={styles.groupTypeCard}>
              <div className={styles.groupTypeHeader}>
                <div className={styles.groupTypeIcon}>🏢</div>
                <h3>{t('documentation:groupManagementGuide.businessGroup') || 'Business Team Expenses'}</h3>
                <span className={styles.groupSize}>{t('documentation:groupManagementGuide.size5to50') || '5-50 members'}</span>
              </div>
              <p className={styles.groupTypeDesc}>
                {t('documentation:groupManagementGuide.businessDesc') || 'Corporate teams with expense policies, approval workflows, and integration with accounting systems.'}
              </p>
              <div className={styles.groupFeatures}>
                <h4>{t('documentation:groupManagementGuide.keyFeatures') || 'Key Features'}:</h4>
                <ul>
                  <li>{t('documentation:groupManagementGuide.businessFeature1') || 'Approval workflows for expenses over certain amounts'}</li>
                  <li>{t('documentation:groupManagementGuide.businessFeature2') || 'Integration with accounting software (QuickBooks, Xero)'}</li>
                  <li>{t('documentation:groupManagementGuide.businessFeature3') || 'Policy enforcement and spending limit alerts'}</li>
                  <li>{t('documentation:groupManagementGuide.businessFeature4') || 'Detailed reporting and audit trails'}</li>
                </ul>
              </div>
              <div className={styles.bestPractice}>
                <strong>{t('documentation:groupManagementGuide.bestPractice') || 'Best Practice'}:</strong>
                <p>{t('documentation:groupManagementGuide.businessBestPractice') || 'Set up approval chains and integrate with your existing expense management workflow.'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.rolesSection}>
          <h2 className={styles.sectionTitle}>
            {t('documentation:groupManagementGuide.rolesPermissions') || 'Roles & Permissions'}
          </h2>
          
          <div className={styles.rolesGrid}>
            <div className={styles.roleCard}>
              <div className={styles.roleHeader}>
                <div className={styles.roleIcon}>👑</div>
                <h3>{t('documentation:groupManagementGuide.ownerRole') || 'Group Owner'}</h3>
              </div>
              <div className={styles.rolePermissions}>
                <h4>{t('documentation:groupManagementGuide.permissions') || 'Permissions'}:</h4>
                <ul>
                  <li>{t('documentation:groupManagementGuide.ownerPerm1') || 'Full group settings and member management'}</li>
                  <li>{t('documentation:groupManagementGuide.ownerPerm2') || 'Delete group and export all data'}</li>
                  <li>{t('documentation:groupManagementGuide.ownerPerm3') || 'Assign and revoke admin roles'}</li>
                  <li>{t('documentation:groupManagementGuide.ownerPerm4') || 'Set group-wide privacy and automation rules'}</li>
                </ul>
              </div>
            </div>

            <div className={styles.roleCard}>
              <div className={styles.roleHeader}>
                <div className={styles.roleIcon}>⚡</div>
                <h3>{t('documentation:groupManagementGuide.adminRole') || 'Administrator'}</h3>
              </div>
              <div className={styles.rolePermissions}>
                <h4>{t('documentation:groupManagementGuide.permissions') || 'Permissions'}:</h4>
                <ul>
                  <li>{t('documentation:groupManagementGuide.adminPerm1') || 'Add/remove members and approve join requests'}</li>
                  <li>{t('documentation:groupManagementGuide.adminPerm2') || 'Edit any expense and manage settlements'}</li>
                  <li>{t('documentation:groupManagementGuide.adminPerm3') || 'Configure spending limits and approval workflows'}</li>
                  <li>{t('documentation:groupManagementGuide.adminPerm4') || 'Generate reports and export group data'}</li>
                </ul>
              </div>
            </div>

            <div className={styles.roleCard}>
              <div className={styles.roleHeader}>
                <div className={styles.roleIcon}>✏️</div>
                <h3>{t('documentation:groupManagementGuide.moderatorRole') || 'Moderator'}</h3>
              </div>
              <div className={styles.rolePermissions}>
                <h4>{t('documentation:groupManagementGuide.permissions') || 'Permissions'}:</h4>
                <ul>
                  <li>{t('documentation:groupManagementGuide.modPerm1') || 'Add expenses and invite new members'}</li>
                  <li>{t('documentation:groupManagementGuide.modPerm2') || 'Edit own expenses and those they created'}</li>
                  <li>{t('documentation:groupManagementGuide.modPerm3') || 'Approve small expenses under set limits'}</li>
                  <li>{t('documentation:groupManagementGuide.modPerm4') || 'View basic group analytics and member activity'}</li>
                </ul>
              </div>
            </div>

            <div className={styles.roleCard}>
              <div className={styles.roleHeader}>
                <div className={styles.roleIcon}>👤</div>
                <h3>{t('documentation:groupManagementGuide.memberRole') || 'Member'}</h3>
              </div>
              <div className={styles.rolePermissions}>
                <h4>{t('documentation:groupManagementGuide.permissions') || 'Permissions'}:</h4>
                <ul>
                  <li>{t('documentation:groupManagementGuide.memberPerm1') || 'Add expenses and upload receipts'}</li>
                  <li>{t('documentation:groupManagementGuide.memberPerm2') || 'Edit own expenses before approval'}</li>
                  <li>{t('documentation:groupManagementGuide.memberPerm3') || 'View group expenses and personal balances'}</li>
                  <li>{t('documentation:groupManagementGuide.memberPerm4') || 'Settle debts and request payment'}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.automationSection}>
          <h2 className={styles.sectionTitle}>
            {t('documentation:groupManagementGuide.automationRules') || 'Automation & Rules'}
          </h2>
          
          <div className={styles.automationCards}>
            <div className={styles.automationCard}>
              <div className={styles.automationIcon}>🔄</div>
              <h3>{t('documentation:groupManagementGuide.recurringExpenses') || 'Recurring Expenses'}</h3>
              <p>{t('documentation:groupManagementGuide.recurringDesc') || 'Set up automatic monthly or weekly expenses like rent, utilities, or subscription services.'}</p>
              <div className={styles.automationExample}>
                <h4>{t('documentation:groupManagementGuide.example') || 'Example'}:</h4>
                <div className={styles.exampleCard}>
                  <strong>{t('documentation:groupManagementGuide.rentExample') || 'Monthly Rent Split'}</strong>
                  <p>• {t('documentation:groupManagementGuide.rentAmount') || 'Amount: $2,400 (split by room size)'}</p>
                  <p>• {t('documentation:groupManagementGuide.rentDate') || 'Due: 1st of each month'}</p>
                  <p>• {t('documentation:groupManagementGuide.rentReminder') || 'Reminder: 3 days before due'}</p>
                  <p>• {t('documentation:groupManagementGuide.rentSplit') || 'Split: 40% / 35% / 25% by room size'}</p>
                </div>
              </div>
            </div>

            <div className={styles.automationCard}>
              <div className={styles.automationIcon}>⚖️</div>
              <h3>{t('documentation:groupManagementGuide.smartSplitting') || 'Smart Splitting Rules'}</h3>
              <p>{t('documentation:groupManagementGuide.smartSplittingDesc') || 'Create intelligent rules that automatically determine how expenses should be split based on category, amount, or participants.'}</p>
              <div className={styles.automationExample}>
                <h4>{t('documentation:groupManagementGuide.rules') || 'Rules'}:</h4>
                <div className={styles.rulesList}>
                  <div className={styles.rule}>
                    <span className={styles.ruleCategory}>{t('documentation:groupManagementGuide.groceries') || 'Groceries'}</span>
                    <span className={styles.ruleArrow}>→</span>
                    <span className={styles.ruleAction}>{t('documentation:groupManagementGuide.equalSplit') || 'Equal split among household'}</span>
                  </div>
                  <div className={styles.rule}>
                    <span className={styles.ruleCategory}>{t('documentation:groupManagementGuide.utilities') || 'Utilities'}</span>
                    <span className={styles.ruleArrow}>→</span>
                    <span className={styles.ruleAction}>{t('documentation:groupManagementGuide.proportionalSplit') || 'Proportional by room size'}</span>
                  </div>
                  <div className={styles.rule}>
                    <span className={styles.ruleCategory}>{t('documentation:groupManagementGuide.entertainment') || 'Entertainment'}</span>
                    <span className={styles.ruleArrow}>→</span>
                    <span className={styles.ruleAction}>{t('documentation:groupManagementGuide.participantSplit') || 'Only among participants'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.automationCard}>
              <div className={styles.automationIcon}>🔔</div>
              <h3>{t('documentation:groupManagementGuide.notificationRules') || 'Notification Management'}</h3>
              <p>{t('documentation:groupManagementGuide.notificationDesc') || 'Fine-tune who gets notified about what, when, and how to avoid notification fatigue in large groups.'}</p>
              <div className={styles.notificationMatrix}>
                <div className={styles.matrixHeader}>
                  <h4>{t('documentation:groupManagementGuide.notificationMatrix') || 'Notification Matrix'}:</h4>
                </div>
                <div className={styles.matrixRows}>
                  <div className={styles.matrixRow}>
                    <span className={styles.matrixAction}>{t('documentation:groupManagementGuide.expenseAdded') || 'Expense Added'}</span>
                    <span className={styles.matrixTarget}>{t('documentation:groupManagementGuide.participants') || 'Participants + Admins'}</span>
                  </div>
                  <div className={styles.matrixRow}>
                    <span className={styles.matrixAction}>{t('documentation:groupManagementGuide.paymentMade') || 'Payment Made'}</span>
                    <span className={styles.matrixTarget}>{t('documentation:groupManagementGuide.expenseCreator') || 'Expense Creator'}</span>
                  </div>
                  <div className={styles.matrixRow}>
                    <span className={styles.matrixAction}>{t('documentation:groupManagementGuide.largePurchase') || 'Large Purchase (>$100)'}</span>
                    <span className={styles.matrixTarget}>{t('documentation:groupManagementGuide.allMembers') || 'All Members'}</span>
                  </div>
                  <div className={styles.matrixRow}>
                    <span className={styles.matrixAction}>{t('documentation:groupManagementGuide.settlementReminder') || 'Settlement Reminder'}</span>
                    <span className={styles.matrixTarget}>{t('documentation:groupManagementGuide.debtors') || 'People with debts'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.conflictSection}>
          <h2 className={styles.sectionTitle}>
            {t('documentation:groupManagementGuide.conflictResolution') || 'Conflict Resolution'}
          </h2>
          
          <div className={styles.conflictScenarios}>
            <div className={styles.scenarioCard}>
              <div className={styles.scenarioIcon}>💸</div>
              <h3>{t('documentation:groupManagementGuide.disputedExpense') || 'Disputed Expenses'}</h3>
              <p>{t('documentation:groupManagementGuide.disputedDesc') || 'When group members disagree about an expense amount, category, or participants.'}</p>
              <div className={styles.resolutionSteps}>
                <h4>{t('documentation:groupManagementGuide.resolutionProcess') || 'Resolution Process'}:</h4>
                <ol>
                  <li>{t('documentation:groupManagementGuide.disputeStep1') || 'Member flags expense as disputed with reason'}</li>
                  <li>{t('documentation:groupManagementGuide.disputeStep2') || 'Admin or moderator reviews evidence (receipts, photos)'}</li>
                  <li>{t('documentation:groupManagementGuide.disputeStep3') || 'Group discussion period (3-7 days)'}</li>
                  <li>{t('documentation:groupManagementGuide.disputeStep4') || 'Admin makes final decision or initiates group vote'}</li>
                </ol>
              </div>
            </div>

            <div className={styles.scenarioCard}>
              <div className={styles.scenarioIcon}>⏰</div>
              <h3>{t('documentation:groupManagementGuide.latePayments') || 'Chronic Late Payments'}</h3>
              <p>{t('documentation:groupManagementGuide.latePaymentsDesc') || 'Managing members who consistently pay late or not at all.'}</p>
              <div className={styles.escalationLadder}>
                <h4>{t('documentation:groupManagementGuide.escalationLadder') || 'Escalation Ladder'}:</h4>
                <div className={styles.escalationSteps}>
                  <div className={styles.escalationStep}>
                    <span className={styles.stepNumber}>1</span>
                    <div>
                      <strong>{t('documentation:groupManagementGuide.gentleReminder') || 'Gentle Reminder'}</strong>
                      <p>{t('documentation:groupManagementGuide.reminderDesc') || 'Automatic friendly notification after 3 days'}</p>
                    </div>
                  </div>
                  <div className={styles.escalationStep}>
                    <span className={styles.stepNumber}>2</span>
                    <div>
                      <strong>{t('documentation:groupManagementGuide.personalContact') || 'Personal Contact'}</strong>
                      <p>{t('documentation:groupManagementGuide.contactDesc') || 'Admin reaches out directly to understand issues'}</p>
                    </div>
                  </div>
                  <div className={styles.escalationStep}>
                    <span className={styles.stepNumber}>3</span>
                    <div>
                      <strong>{t('documentation:groupManagementGuide.restrictedAccess') || 'Restricted Access'}</strong>
                      <p>{t('documentation:groupManagementGuide.restrictionDesc') || 'Temporary limitation on adding new expenses'}</p>
                    </div>
                  </div>
                  <div className={styles.escalationStep}>
                    <span className={styles.stepNumber}>4</span>
                    <div>
                      <strong>{t('documentation:groupManagementGuide.groupDecision') || 'Group Decision'}</strong>
                      <p>{t('documentation:groupManagementGuide.decisionDesc') || 'Group votes on continued membership'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.analyticsSection}>
          <h2 className={styles.sectionTitle}>
            {t('documentation:groupManagementGuide.groupAnalytics') || 'Group Analytics & Insights'}
          </h2>
          
          <div className={styles.analyticsGrid}>
            <div className={styles.analyticsCard}>
              <div className={styles.analyticsIcon}>📊</div>
              <h3>{t('documentation:groupManagementGuide.spendingPatterns') || 'Spending Patterns'}</h3>
              <div className={styles.analyticsFeatures}>
                <ul>
                  <li>{t('documentation:groupManagementGuide.categoryBreakdown') || 'Spending by category and member'}</li>
                  <li>{t('documentation:groupManagementGuide.trendAnalysis') || 'Monthly and seasonal trends'}</li>
                  <li>{t('documentation:groupManagementGuide.budgetTracking') || 'Budget vs. actual spending'}</li>
                  <li>{t('documentation:groupManagementGuide.costPerMember') || 'Average cost per member over time'}</li>
                </ul>
              </div>
            </div>

            <div className={styles.analyticsCard}>
              <div className={styles.analyticsIcon}>⚖️</div>
              <h3>{t('documentation:groupManagementGuide.participationMetrics') || 'Participation Metrics'}</h3>
              <div className={styles.analyticsFeatures}>
                <ul>
                  <li>{t('documentation:groupManagementGuide.expenseContribution') || 'Who adds the most expenses'}</li>
                  <li>{t('documentation:groupManagementGuide.paymentReliability') || 'Payment speed and reliability scores'}</li>
                  <li>{t('documentation:groupManagementGuide.engagementLevel') || 'Member engagement and activity levels'}</li>
                  <li>{t('documentation:groupManagementGuide.fairnessIndex') || 'Group fairness and balance index'}</li>
                </ul>
              </div>
            </div>

            <div className={styles.analyticsCard}>
              <div className={styles.analyticsIcon}>🎯</div>
              <h3>{t('documentation:groupManagementGuide.predictiveInsights') || 'Predictive Insights'}</h3>
              <div className={styles.analyticsFeatures}>
                <ul>
                  <li>{t('documentation:groupManagementGuide.futureSpending') || 'Predicted monthly spending'}</li>
                  <li>{t('documentation:groupManagementGuide.unusualExpenses') || 'Alerts for unusual expense patterns'}</li>
                  <li>{t('documentation:groupManagementGuide.optimizationSuggestions') || 'Suggestions for cost optimization'}</li>
                  <li>{t('documentation:groupManagementGuide.settlementForecasting') || 'Settlement timing predictions'}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.nextStepsSection}>
          <h2 className={styles.sectionTitle}>
            {t('documentation:groupManagementGuide.nextStepsTitle') || 'Next Steps'}
          </h2>
          <div className={styles.nextStepsGrid}>
            <div className={styles.nextStepCard}>
              <div className={styles.nextStepIcon}>📊</div>
              <h3>{t('documentation:groupManagementGuide.dataExportGuide') || 'Data Export & Analysis'}</h3>
              <p>{t('documentation:groupManagementGuide.dataExportDesc') || 'Learn to export group data and create custom reports for detailed financial analysis.'}</p>
              <a href="/guides/data-export" className={styles.nextStepLink}>
                {t('documentation:groupManagementGuide.learnMore') || 'Learn More'} →
              </a>
            </div>
            <div className={styles.nextStepCard}>
              <div className={styles.nextStepIcon}>🔐</div>
              <h3>{t('documentation:groupManagementGuide.privacySettings') || 'Privacy & Security'}</h3>
              <p>{t('documentation:groupManagementGuide.privacyDesc') || 'Configure advanced privacy settings for large groups and sensitive financial information.'}</p>
              <a href="/guides/privacy-settings" className={styles.nextStepLink}>
                {t('documentation:groupManagementGuide.configure') || 'Configure'} →
              </a>
            </div>
            <div className={styles.nextStepCard}>
              <div className={styles.nextStepIcon}>🤝</div>
              <h3>{t('documentation:groupManagementGuide.support') || 'Group Support'}</h3>
              <p>{t('documentation:groupManagementGuide.supportDesc') || 'Get help with complex group setups and conflict resolution strategies.'}</p>
              <a href="/support" className={styles.nextStepLink}>
                {t('documentation:groupManagementGuide.contactSupport') || 'Contact Support'} →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}