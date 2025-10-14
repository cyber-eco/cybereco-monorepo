'use client';

import { useI18n } from '@cybereco/i18n';
import styles from './page.module.css';

export default function JustSplitGuidePage() {
  const { t } = useI18n();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.breadcrumb}>
          <a href="/documentation" className={styles.breadcrumbLink}>
            {t('documentation:justSplitGuide.documentation') || 'Documentation'}
          </a>
          <span className={styles.breadcrumbSeparator}>›</span>
          <span className={styles.breadcrumbCurrent}>
            {t('documentation:justSplitGuide.title') || 'JustSplit User Guide'}
          </span>
        </div>
        <h1 className={styles.title}>
          💰 {t('documentation:justSplitGuide.title') || 'JustSplit User Guide'}
        </h1>
        <div className={styles.guideMeta}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>⏱️ {t('documentation:justSplitGuide.duration') || 'Duration'}:</span>
            <span className={styles.metaValue}>30-45 {t('documentation:justSplitGuide.minutes') || 'minutes'}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>📈 {t('documentation:justSplitGuide.level') || 'Level'}:</span>
            <span className={styles.metaValue}>{t('documentation:justSplitGuide.intermediate') || 'Intermediate'}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>🎯 {t('documentation:justSplitGuide.goal') || 'Goal'}:</span>
            <span className={styles.metaValue}>{t('documentation:justSplitGuide.goalText') || 'Master expense sharing and group management'}</span>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.introSection}>
          <h2 className={styles.sectionTitle}>
            {t('documentation:justSplitGuide.introTitle') || 'Master Expense Sharing'}
          </h2>
          <p className={styles.introText}>
            {t('documentation:justSplitGuide.introText') || 'JustSplit makes sharing expenses with friends, family, and colleagues simple and transparent. This comprehensive guide covers everything from basic expense splitting to advanced group management, receipt scanning, and settlement tracking.'}
          </p>
          
          <div className={styles.featureHighlights}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🧾</div>
              <h4>{t('documentation:justSplitGuide.receiptScanning') || 'Receipt Scanning'}</h4>
              <p>{t('documentation:justSplitGuide.receiptScanningDesc') || 'Scan receipts with your camera and automatically extract expense details'}</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>💱</div>
              <h4>{t('documentation:justSplitGuide.multiCurrency') || 'Multi-Currency Support'}</h4>
              <p>{t('documentation:justSplitGuide.multiCurrencyDesc') || 'Handle expenses in 150+ currencies with real-time conversion'}</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🔄</div>
              <h4>{t('documentation:justSplitGuide.smartSplitting') || 'Smart Splitting'}</h4>
              <p>{t('documentation:justSplitGuide.smartSplittingDesc') || 'Equal, custom, percentage, and share-based splitting methods'}</p>
            </div>
          </div>
        </div>

        <div className={styles.chaptersSection}>
          <h2 className={styles.sectionTitle}>
            {t('documentation:justSplitGuide.chaptersTitle') || 'Guide Chapters'}
          </h2>

          <div className={styles.chapter}>
            <div className={styles.chapterNumber}>1</div>
            <div className={styles.chapterContent}>
              <h3 className={styles.chapterTitle}>
                {t('documentation:justSplitGuide.chapter1Title') || 'Getting Started with JustSplit'}
              </h3>
              <p className={styles.chapterDescription}>
                {t('documentation:justSplitGuide.chapter1Desc') || 'Learn the basics: creating your first expense, understanding the interface, and navigating the app.'}
              </p>
              
              <div className={styles.chapterTopics}>
                <h4>{t('documentation:justSplitGuide.youllLearn') || "You'll Learn"}:</h4>
                <ul className={styles.topicsList}>
                  <li>{t('documentation:justSplitGuide.topic1_1') || 'App navigation and interface overview'}</li>
                  <li>{t('documentation:justSplitGuide.topic1_2') || 'Creating your first expense in under 2 minutes'}</li>
                  <li>{t('documentation:justSplitGuide.topic1_3') || 'Understanding expense status and notifications'}</li>
                  <li>{t('documentation:justSplitGuide.topic1_4') || 'Basic privacy and sharing settings'}</li>
                </ul>
              </div>
              
              <div className={styles.practicalExample}>
                <div className={styles.exampleIcon}>💡</div>
                <div className={styles.exampleContent}>
                  <h5>{t('documentation:justSplitGuide.practicalExample') || 'Practical Example'}:</h5>
                  <p>{t('documentation:justSplitGuide.example1') || 'Split a $60 dinner bill equally among 3 friends, send notifications, and track who has paid.'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.chapter}>
            <div className={styles.chapterNumber}>2</div>
            <div className={styles.chapterContent}>
              <h3 className={styles.chapterTitle}>
                {t('documentation:justSplitGuide.chapter2Title') || 'Group Management & Organization'}
              </h3>
              <p className={styles.chapterDescription}>
                {t('documentation:justSplitGuide.chapter2Desc') || 'Create and manage groups for different contexts: family, friends, work colleagues, or special events.'}
              </p>
              
              <div className={styles.chapterTopics}>
                <h4>{t('documentation:justSplitGuide.youllLearn')}:</h4>
                <ul className={styles.topicsList}>
                  <li>{t('documentation:justSplitGuide.topic2_1') || 'Creating groups for different scenarios (family, work, travel)'}</li>
                  <li>{t('documentation:justSplitGuide.topic2_2') || 'Inviting members and managing permissions'}</li>
                  <li>{t('documentation:justSplitGuide.topic2_3') || 'Group settings and privacy controls'}</li>
                  <li>{t('documentation:justSplitGuide.topic2_4') || 'Archive and delete groups when needed'}</li>
                </ul>
              </div>
              
              <div className={styles.groupTypes}>
                <h4>{t('documentation:justSplitGuide.commonGroupTypes') || 'Common Group Types'}:</h4>
                <div className={styles.groupTypeCards}>
                  <div className={styles.groupTypeCard}>
                    <span className={styles.groupIcon}>👨‍👩‍👧‍👦</span>
                    <h5>{t('documentation:justSplitGuide.familyGroup') || 'Family'}</h5>
                    <p>{t('documentation:justSplitGuide.familyGroupDesc') || 'Household expenses, utilities, groceries'}</p>
                  </div>
                  <div className={styles.groupTypeCard}>
                    <span className={styles.groupIcon}>🏢</span>
                    <h5>{t('documentation:justSplitGuide.workGroup') || 'Work Team'}</h5>
                    <p>{t('documentation:justSplitGuide.workGroupDesc') || 'Team lunches, office supplies, events'}</p>
                  </div>
                  <div className={styles.groupTypeCard}>
                    <span className={styles.groupIcon}>✈️</span>
                    <h5>{t('documentation:justSplitGuide.travelGroup') || 'Travel'}</h5>
                    <p>{t('documentation:justSplitGuide.travelGroupDesc') || 'Trip planning, accommodation, activities'}</p>
                  </div>
                  <div className={styles.groupTypeCard}>
                    <span className={styles.groupIcon}>🎉</span>
                    <h5>{t('documentation:justSplitGuide.eventGroup') || 'Events'}</h5>
                    <p>{t('documentation:justSplitGuide.eventGroupDesc') || 'Parties, weddings, special occasions'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.chapter}>
            <div className={styles.chapterNumber}>3</div>
            <div className={styles.chapterContent}>
              <h3 className={styles.chapterTitle}>
                {t('documentation:justSplitGuide.chapter3Title') || 'Advanced Splitting Methods'}
              </h3>
              <p className={styles.chapterDescription}>
                {t('documentation:justSplitGuide.chapter3Desc') || 'Go beyond equal splits with custom amounts, percentages, shares, and complex splitting scenarios.'}
              </p>
              
              <div className={styles.splittingMethods}>
                <div className={styles.methodCard}>
                  <div className={styles.methodIcon}>⚖️</div>
                  <h4>{t('documentation:justSplitGuide.equalSplit') || 'Equal Split'}</h4>
                  <p>{t('documentation:justSplitGuide.equalSplitDesc') || 'Divide the total amount equally among all participants. Perfect for simple shared meals or utilities.'}</p>
                  <div className={styles.useCase}>
                    <strong>{t('documentation:justSplitGuide.bestFor') || 'Best for'}:</strong> {t('documentation:justSplitGuide.equalSplitUse') || 'Restaurant bills, shared rent, group purchases'}
                  </div>
                </div>
                
                <div className={styles.methodCard}>
                  <div className={styles.methodIcon}>🎯</div>
                  <h4>{t('documentation:justSplitGuide.customSplit') || 'Custom Amounts'}</h4>
                  <p>{t('documentation:justSplitGuide.customSplitDesc') || 'Assign specific dollar amounts to each person. Ideal when people consumed different amounts.'}</p>
                  <div className={styles.useCase}>
                    <strong>{t('documentation:justSplitGuide.bestFor')}:</strong> {t('documentation:justSplitGuide.customSplitUse') || 'Different meal costs, varying participation levels'}
                  </div>
                </div>
                
                <div className={styles.methodCard}>
                  <div className={styles.methodIcon}>📊</div>
                  <h4>{t('documentation:justSplitGuide.percentageSplit') || 'Percentage Split'}</h4>
                  <p>{t('documentation:justSplitGuide.percentageSplitDesc') || 'Assign percentages that total 100%. Great for income-based or proportional sharing.'}</p>
                  <div className={styles.useCase}>
                    <strong>{t('documentation:justSplitGuide.bestFor')}:</strong> {t('documentation:justSplitGuide.percentageSplitUse') || 'Income-based splitting, business partnerships'}
                  </div>
                </div>
                
                <div className={styles.methodCard}>
                  <div className={styles.methodIcon}>📈</div>
                  <h4>{t('documentation:justSplitGuide.sharesSplit') || 'Shares-Based'}</h4>
                  <p>{t('documentation:justSplitGuide.sharesSplitDesc') || 'Assign relative shares (e.g., 1 share, 2 shares). Perfect for different consumption levels.'}</p>
                  <div className={styles.useCase}>
                    <strong>{t('documentation:justSplitGuide.bestFor')}:</strong> {t('documentation:justSplitGuide.sharesSplitUse') || 'Time-based costs, varying portions'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.chapter}>
            <div className={styles.chapterNumber}>4</div>
            <div className={styles.chapterContent}>
              <h3 className={styles.chapterTitle}>
                {t('documentation:justSplitGuide.chapter4Title') || 'Receipt Scanning & Data Entry'}
              </h3>
              <p className={styles.chapterDescription}>
                {t('documentation:justSplitGuide.chapter4Desc') || 'Speed up expense entry with smart receipt scanning and learn best practices for accurate data capture.'}
              </p>
              
              <div className={styles.scanningTips}>
                <h4>{t('documentation:justSplitGuide.scanningTips') || 'Scanning Tips for Best Results'}:</h4>
                <div className={styles.tipsList}>
                  <div className={styles.tip}>
                    <span className={styles.tipIcon}>💡</span>
                    <span className={styles.tipText}>{t('documentation:justSplitGuide.tip1') || 'Ensure good lighting and hold the camera steady'}</span>
                  </div>
                  <div className={styles.tip}>
                    <span className={styles.tipIcon}>📐</span>
                    <span className={styles.tipText}>{t('documentation:justSplitGuide.tip2') || 'Keep the receipt flat and fully visible in frame'}</span>
                  </div>
                  <div className={styles.tip}>
                    <span className={styles.tipIcon}>🎯</span>
                    <span className={styles.tipText}>{t('documentation:justSplitGuide.tip3') || 'Clean the camera lens for sharper image quality'}</span>
                  </div>
                  <div className={styles.tip}>
                    <span className={styles.tipIcon}>📱</span>
                    <span className={styles.tipText}>{t('documentation:justSplitGuide.tip4') || 'Use dark background to improve text contrast'}</span>
                  </div>
                </div>
              </div>
              
              <div className={styles.supportedReceipts}>
                <h4>{t('documentation:justSplitGuide.supportedReceipts') || 'Supported Receipt Types'}:</h4>
                <div className={styles.receiptTypes}>
                  <div className={styles.receiptType}>
                    <span className={styles.supportIcon}>✅</span>
                    <span>{t('documentation:justSplitGuide.restaurantReceipts') || 'Restaurant receipts'}</span>
                  </div>
                  <div className={styles.receiptType}>
                    <span className={styles.supportIcon}>✅</span>
                    <span>{t('documentation:justSplitGuide.retailReceipts') || 'Retail store receipts'}</span>
                  </div>
                  <div className={styles.receiptType}>
                    <span className={styles.supportIcon}>✅</span>
                    <span>{t('documentation:justSplitGuide.gasReceipts') || 'Gas station receipts'}</span>
                  </div>
                  <div className={styles.receiptType}>
                    <span className={styles.supportIcon}>✅</span>
                    <span>{t('documentation:justSplitGuide.hotelReceipts') || 'Hotel bills'}</span>
                  </div>
                  <div className={styles.receiptType}>
                    <span className={styles.supportIcon}>❌</span>
                    <span>{t('documentation:justSplitGuide.handwrittenReceipts') || 'Handwritten receipts'}</span>
                  </div>
                  <div className={styles.receiptType}>
                    <span className={styles.supportIcon}>❌</span>
                    <span>{t('documentation:justSplitGuide.fadedReceipts') || 'Severely faded receipts'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.chapter}>
            <div className={styles.chapterNumber}>5</div>
            <div className={styles.chapterContent}>
              <h3 className={styles.chapterTitle}>
                {t('documentation:justSplitGuide.chapter5Title') || 'Settlement & Payment Tracking'}
              </h3>
              <p className={styles.chapterDescription}>
                {t('documentation:justSplitGuide.chapter5Desc') || 'Track who owes what, manage settlements, and integrate with popular payment platforms.'}
              </p>
              
              <div className={styles.paymentMethods}>
                <h4>{t('documentation:justSplitGuide.supportedPayments') || 'Supported Payment Methods'}:</h4>
                <div className={styles.paymentGrid}>
                  <div className={styles.paymentCard}>
                    <div className={styles.paymentIcon}>💳</div>
                    <h5>{t('documentation:justSplitGuide.digitalPayments') || 'Digital Payments'}</h5>
                    <p>{t('documentation:justSplitGuide.digitalPaymentsDesc') || 'Venmo, PayPal, Zelle, Cash App, Apple Pay'}</p>
                  </div>
                  <div className={styles.paymentCard}>
                    <div className={styles.paymentIcon}>🏦</div>
                    <h5>{t('documentation:justSplitGuide.bankTransfer') || 'Bank Transfer'}</h5>
                    <p>{t('documentation:justSplitGuide.bankTransferDesc') || 'Direct bank-to-bank payments and wire transfers'}</p>
                  </div>
                  <div className={styles.paymentCard}>
                    <div className={styles.paymentIcon}>💵</div>
                    <h5>{t('documentation:justSplitGuide.cash') || 'Cash'}</h5>
                    <p>{t('documentation:justSplitGuide.cashDesc') || 'In-person cash payments with mutual confirmation'}</p>
                  </div>
                  <div className={styles.paymentCard}>
                    <div className={styles.paymentIcon}>🔗</div>
                    <h5>{t('documentation:justSplitGuide.otherMethods') || 'Other Methods'}</h5>
                    <p>{t('documentation:justSplitGuide.otherMethodsDesc') || 'Cryptocurrency, gift cards, custom arrangements'}</p>
                  </div>
                </div>
              </div>
              
              <div className={styles.settlementProcess}>
                <h4>{t('documentation:justSplitGuide.settlementProcess') || 'Settlement Process'}:</h4>
                <div className={styles.processSteps}>
                  <div className={styles.processStep}>
                    <div className={styles.stepIcon}>1</div>
                    <div className={styles.stepText}>{t('documentation:justSplitGuide.settlementStep1') || 'Click "Settle Up" on expense or dashboard'}</div>
                  </div>
                  <div className={styles.processStep}>
                    <div className={styles.stepIcon}>2</div>
                    <div className={styles.stepText}>{t('documentation:justSplitGuide.settlementStep2') || 'Choose payment method and add reference'}</div>
                  </div>
                  <div className={styles.processStep}>
                    <div className={styles.stepIcon}>3</div>
                    <div className={styles.stepText}>{t('documentation:justSplitGuide.settlementStep3') || 'Mark as paid - other person gets notification'}</div>
                  </div>
                  <div className={styles.processStep}>
                    <div className={styles.stepIcon}>4</div>
                    <div className={styles.stepText}>{t('documentation:justSplitGuide.settlementStep4') || 'Both parties confirm - expense marked as settled'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.quickReference}>
          <h2 className={styles.sectionTitle}>
            {t('documentation:justSplitGuide.quickReferenceTitle') || 'Quick Reference'}
          </h2>
          
          <div className={styles.referenceGrid}>
            <div className={styles.referenceCard}>
              <h4>{t('documentation:justSplitGuide.commonActions') || 'Common Actions'}</h4>
              <ul className={styles.referenceList}>
                <li>{t('documentation:justSplitGuide.action1') || 'Add new expense: + button in bottom right'}</li>
                <li>{t('documentation:justSplitGuide.action2') || 'Scan receipt: Camera icon when adding expense'}</li>
                <li>{t('documentation:justSplitGuide.action3') || 'Edit expense: Tap expense → Edit button'}</li>
                <li>{t('documentation:justSplitGuide.action4') || 'Mark as paid: Expense details → Settle Up'}</li>
                <li>{t('documentation:justSplitGuide.action5') || 'View balances: Dashboard → Balance overview'}</li>
              </ul>
            </div>
            
            <div className={styles.referenceCard}>
              <h4>{t('documentation:justSplitGuide.keyboardShortcuts') || 'Keyboard Shortcuts'}</h4>
              <ul className={styles.referenceList}>
                <li><strong>Ctrl/Cmd + N:</strong> {t('documentation:justSplitGuide.shortcut1') || 'New expense'}</li>
                <li><strong>Ctrl/Cmd + G:</strong> {t('documentation:justSplitGuide.shortcut2') || 'New group'}</li>
                <li><strong>Ctrl/Cmd + /:</strong> {t('documentation:justSplitGuide.shortcut3') || 'Search expenses'}</li>
                <li><strong>Ctrl/Cmd + D:</strong> {t('documentation:justSplitGuide.shortcut4') || 'Dashboard view'}</li>
                <li><strong>Ctrl/Cmd + E:</strong> {t('documentation:justSplitGuide.shortcut5') || 'Export data'}</li>
              </ul>
            </div>
            
            <div className={styles.referenceCard}>
              <h4>{t('documentation:justSplitGuide.troubleshooting') || 'Troubleshooting'}</h4>
              <ul className={styles.referenceList}>
                <li>{t('documentation:justSplitGuide.trouble1') || 'Receipt not scanning: Check lighting and focus'}</li>
                <li>{t('documentation:justSplitGuide.trouble2') || 'Notifications not working: Check app permissions'}</li>
                <li>{t('documentation:justSplitGuide.trouble3') || 'Wrong currency: Edit in expense settings'}</li>
                <li>{t('documentation:justSplitGuide.trouble4') || 'Can\'t settle up: Check internet connection'}</li>
                <li>{t('documentation:justSplitGuide.trouble5') || 'Missing data: Pull down to refresh'}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.nextStepsSection}>
          <h2 className={styles.sectionTitle}>
            {t('documentation:justSplitGuide.nextStepsTitle') || 'Continue Learning'}
          </h2>
          <div className={styles.nextStepsGrid}>
            <div className={styles.nextStepCard}>
              <div className={styles.nextStepIcon}>🔐</div>
              <h3>{t('documentation:justSplitGuide.privacyGuide') || 'Privacy & Security'}</h3>
              <p>{t('documentation:justSplitGuide.privacyGuideDesc') || 'Master privacy controls and advanced security features for your expenses.'}</p>
              <a href="/guides/privacy-settings" className={styles.nextStepLink}>
                {t('documentation:justSplitGuide.learnMore') || 'Learn More'} →
              </a>
            </div>
            <div className={styles.nextStepCard}>
              <div className={styles.nextStepIcon}>👥</div>
              <h3>{t('documentation:justSplitGuide.groupManagement') || 'Advanced Group Management'}</h3>
              <p>{t('documentation:justSplitGuide.groupManagementDesc') || 'Learn advanced techniques for managing large groups and complex scenarios.'}</p>
              <a href="/guides/group-management" className={styles.nextStepLink}>
                {t('documentation:justSplitGuide.explore') || 'Explore'} →
              </a>
            </div>
            <div className={styles.nextStepCard}>
              <div className={styles.nextStepIcon}>📊</div>
              <h3>{t('documentation:justSplitGuide.dataExport') || 'Data Export & Analysis'}</h3>
              <p>{t('documentation:justSplitGuide.dataExportDesc') || 'Export your data and analyze spending patterns with detailed reports.'}</p>
              <a href="/guides/data-export" className={styles.nextStepLink}>
                {t('documentation:justSplitGuide.getStarted') || 'Get Started'} →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}