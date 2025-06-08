'use client';

import styles from '../page.module.css';
import { useI18n } from '@cybereco/i18n';
import { FaCheckCircle, FaCopy, FaTerminal } from 'react-icons/fa';
import { useState } from 'react';

export function DevelopmentSetup() {
  const { t } = useI18n();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const codeBlocks = [
    {
      title: 'Clone Repository',
      code: 'git clone https://github.com/cybereco/cybereco-monorepo.git\ncd cybereco-monorepo'
    },
    {
      title: 'Install Dependencies',
      code: 'npm install'
    },
    {
      title: 'Start Development',
      code: 'npm run dev'
    }
  ];

  return (
    <>
      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>🚀 {t('documentationPage.developmentSetupTitle') || 'Development Setup'}</h3>
        <p className={styles.contentText}>
          {t('documentationPage.developmentSetupIntro') || 'Get your local development environment up and running in minutes with our comprehensive setup guide.'}
        </p>
      </div>

      <div className={styles.contentSection}>
        <h4 className={styles.sectionTitle}>📋 {t('documentationPage.prerequisitesTitle') || 'Prerequisites'}</h4>
        <div className={styles.prerequisiteGrid}>
          <div className={styles.prerequisiteCard}>
            <FaCheckCircle className={styles.checkIcon} />
            <div>
              <h5>{t('documentationPage.nodePrereq') || 'Node.js 18+'}</h5>
              <p>{t('documentationPage.nodePrereqDesc') || 'JavaScript runtime for building and running apps'}</p>
            </div>
          </div>
          <div className={styles.prerequisiteCard}>
            <FaCheckCircle className={styles.checkIcon} />
            <div>
              <h5>{t('documentationPage.npmPrereq') || 'npm 9+'}</h5>
              <p>{t('documentationPage.npmPrereqDesc') || 'Package manager for JavaScript dependencies'}</p>
            </div>
          </div>
          <div className={styles.prerequisiteCard}>
            <FaCheckCircle className={styles.checkIcon} />
            <div>
              <h5>{t('documentationPage.gitPrereq') || 'Git'}</h5>
              <p>{t('documentationPage.gitPrereqDesc') || 'Version control system for code management'}</p>
            </div>
          </div>
          <div className={styles.prerequisiteCard}>
            <FaCheckCircle className={styles.checkIcon} />
            <div>
              <h5>{t('documentationPage.firebasePrereq') || 'Firebase CLI'}</h5>
              <p>{t('documentationPage.firebasePrereqDesc') || 'Optional: For Firebase emulator and deployment'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h4 className={styles.sectionTitle}>⚡ {t('documentationPage.quickStartTitle') || 'Quick Start'}</h4>
        <div className={styles.quickStartSteps}>
          {codeBlocks.map((block, index) => (
            <div key={index} className={styles.codeBlockContainer}>
              <div className={styles.codeBlockHeader}>
                <span>{block.title}</span>
                <button 
                  className={styles.copyButton}
                  onClick={() => copyToClipboard(block.code, index)}
                  aria-label="Copy code"
                >
                  {copiedIndex === index ? (
                    <span className={styles.copiedText}>Copied!</span>
                  ) : (
                    <FaCopy />
                  )}
                </button>
              </div>
              <pre className={styles.codeBlock}>
                <code>{block.code}</code>
              </pre>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.contentSection}>
        <h4 className={styles.sectionTitle}>🏗️ {t('documentationPage.projectStructureTitle') || 'Project Structure'}</h4>
        <div className={styles.structureView}>
          <pre className={styles.fileTree}>
{`cybereco-monorepo/
├── apps/
│   ├── hub/              # Central authentication hub
│   ├── website/          # Marketing website
│   ├── justsplit/        # Expense splitting app
│   └── gateway/          # Cross-port auth solution
├── libs/
│   ├── auth/             # Authentication library
│   ├── ui-components/    # Shared UI components
│   ├── shared-types/     # TypeScript types
│   └── firebase-config/  # Firebase utilities
├── docs/                 # Documentation
├── scripts/              # Build & deploy scripts
├── nx.json              # NX configuration
└── package.json         # Root dependencies`}
          </pre>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h4 className={styles.sectionTitle}>🛠️ {t('documentationPage.developmentCommandsTitle') || 'Development Commands'}</h4>
        <div className={styles.commandGrid}>
          <div className={styles.commandCard}>
            <h5>{t('documentationPage.servingAppsTitle') || 'Serving Applications'}</h5>
            <div className={styles.commandList}>
              <div className={styles.commandItem}>
                <code>nx serve hub</code>
                <span>{t('documentationPage.serveHubDesc') || 'Start Hub on port 40000'}</span>
              </div>
              <div className={styles.commandItem}>
                <code>nx serve website</code>
                <span>{t('documentationPage.serveWebsiteDesc') || 'Start Website on port 40001'}</span>
              </div>
              <div className={styles.commandItem}>
                <code>nx serve justsplit-app</code>
                <span>{t('documentationPage.serveJustSplitDesc') || 'Start JustSplit on port 40002'}</span>
              </div>
            </div>
          </div>

          <div className={styles.commandCard}>
            <h5>{t('documentationPage.testingTitle') || 'Testing'}</h5>
            <div className={styles.commandList}>
              <div className={styles.commandItem}>
                <code>nx test &lt;app&gt;</code>
                <span>{t('documentationPage.runTestsDesc') || 'Run tests for specific app'}</span>
              </div>
              <div className={styles.commandItem}>
                <code>nx affected:test</code>
                <span>{t('documentationPage.affectedTestsDesc') || 'Test only changed projects'}</span>
              </div>
              <div className={styles.commandItem}>
                <code>nx run-many --target=test</code>
                <span>{t('documentationPage.allTestsDesc') || 'Run all tests in parallel'}</span>
              </div>
            </div>
          </div>

          <div className={styles.commandCard}>
            <h5>{t('documentationPage.buildingTitle') || 'Building'}</h5>
            <div className={styles.commandList}>
              <div className={styles.commandItem}>
                <code>nx build &lt;app&gt;</code>
                <span>{t('documentationPage.buildAppDesc') || 'Build specific application'}</span>
              </div>
              <div className={styles.commandItem}>
                <code>nx affected:build</code>
                <span>{t('documentationPage.affectedBuildDesc') || 'Build only changed projects'}</span>
              </div>
              <div className={styles.commandItem}>
                <code>npm run build</code>
                <span>{t('documentationPage.buildAllDesc') || 'Build all applications'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h4 className={styles.sectionTitle}>🔥 {t('documentationPage.firebaseEmulatorTitle') || 'Firebase Emulator Setup'}</h4>
        <div className={styles.emulatorSection}>
          <p>{t('documentationPage.firebaseEmulatorDesc') || 'For full local development with authentication and database:'}</p>
          <div className={styles.emulatorSteps}>
            <div className={styles.emulatorStep}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h5>{t('documentationPage.installFirebaseCLI') || 'Install Firebase CLI'}</h5>
                <code>npm install -g firebase-tools</code>
              </div>
            </div>
            <div className={styles.emulatorStep}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h5>{t('documentationPage.startEmulators') || 'Start Emulators'}</h5>
                <code>npm run emulators</code>
              </div>
            </div>
            <div className={styles.emulatorStep}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <h5>{t('documentationPage.accessEmulatorUI') || 'Access Emulator UI'}</h5>
                <code>http://localhost:5002</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h4 className={styles.sectionTitle}>🔧 {t('documentationPage.environmentConfigTitle') || 'Environment Configuration'}</h4>
        <div className={styles.envSection}>
          <p>{t('documentationPage.envConfigDesc') || 'Create .env.local files in each app directory with the following variables:'}</p>
          <div className={styles.envExample}>
            <pre className={styles.codeBlock}>
{`# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# Development Settings
NEXT_PUBLIC_USE_EMULATOR=true
NEXT_PUBLIC_EMULATOR_HOST=localhost`}</pre>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <div className={styles.helpSection}>
          <h4>{t('documentationPage.needHelpTitle') || '🤔 Need Help?'}</h4>
          <div className={styles.helpGrid}>
            <div className={styles.helpCard}>
              <FaTerminal className={styles.helpIcon} />
              <h5>{t('documentationPage.commonIssues') || 'Common Issues'}</h5>
              <p>{t('documentationPage.commonIssuesDesc') || 'Check our troubleshooting guide for solutions.'}</p>
              <a href="#" className={styles.helpLink}>
                {t('documentationPage.viewTroubleshooting') || 'View Guide'} →
              </a>
            </div>
            <div className={styles.helpCard}>
              <FaTerminal className={styles.helpIcon} />
              <h5>{t('documentationPage.askCommunity') || 'Ask the Community'}</h5>
              <p>{t('documentationPage.askCommunityDesc') || 'Get help from experienced developers.'}</p>
              <a href="#" className={styles.helpLink}>
                {t('documentationPage.joinDiscord') || 'Join Discord'} →
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}