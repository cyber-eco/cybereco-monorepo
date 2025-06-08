'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaRocket, FaGlobe, FaNetworkWired, FaShieldAlt, FaCoins, FaUsers, FaCode, FaDatabase, FaLock, FaChartLine, FaArrowRight, FaMobileAlt, FaCubes, FaCheckCircle } from 'react-icons/fa';
import { useI18n } from '@cybereco/i18n';
import styles from './page.module.css';

export default function VisionDocs() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Code examples
  const dataLayerCode = `interface DataLayer {
  onChain: {
    dataHash: string;           // Merkle root of encrypted data
    accessRights: AccessToken[];// Who can access what data
    timestamp: number;          // Block timestamp
    owner: string;              // User's DID
  };
  offChain: {
    encryptedData: Uint8Array;  // Encrypted user data
    localCache: Object;         // Device-local cache
    p2pBackup: string[];        // Peer backup locations
  };
}`;

  const privacyLayersCode = `interface PrivacyLayers {
  // Layer 1: Personal Encryption (User Controls)
  personalVault: {
    masterKey: CryptoKey;       // User-generated master key
    dataEncryption: 'AES-256';  // Symmetric encryption for data
    keyDerivation: 'PBKDF2';    // Key derivation from passphrase
  };
  
  // Layer 2: Sharing Encryption (Selective Access)
  sharingProtocol: {
    recipientKeys: PublicKey[]; // Recipients' public keys
    accessProofs: ZKProof[];    // Zero-knowledge access proofs
    expirationTime: number;     // Time-limited access
  };
}`;

  const smartContractCode = `// Smart contract for data access control
contract DataAccessControl {
  mapping(address => mapping(bytes32 => AccessPermission)) permissions;
  
  function grantAccess(
    address user,
    bytes32 dataHash,
    uint256 expiration,
    bytes calldata zkProof
  ) external;
  
  function verifyAccess(
    address requester,
    bytes32 dataHash
  ) external view returns (bool);
}`;

  const networkEconomicsCode = `interface NetworkEconomics {
  totalSupply: 1_000_000_000;        // 1 billion CYE tokens
  inflationRate: 0.03;               // 3% annual inflation for rewards
  
  rewardDistribution: {
    networkParticipation: 0.60;      // 60% to node operators
    developmentFund: 0.25;           // 25% to platform development
    communityGrants: 0.10;           // 10% to community projects
    teamAllocation: 0.05;            // 5% to core team
  };
}`;

  const renderOverviewTab = () => (
    <div className={styles.tabSection}>
      <h2>{t('documentation:documentationPage.vision.visionOverview.title') || 'Vision Overview'}</h2>
      
      <div className={styles.transformationSection}>
        <h3 className={styles.transformationTitle}>
          {t('documentation:documentationPage.vision.visionOverview.currentState') || 'Current State'} 
          <FaArrowRight className={styles.arrowIcon} />
          {t('documentation:documentationPage.vision.visionOverview.futureState') || 'Future State'}
        </h3>
        
        <div className={styles.comparisonGrid}>
          <div className={styles.comparisonCard}>
            <div className={styles.comparisonHeader}>
              <FaNetworkWired className={styles.comparisonIcon} />
              <h4>{t('documentation:documentationPage.vision.visionOverview.infrastructure') || 'Infrastructure'}</h4>
            </div>
            <div className={styles.comparisonContent}>
              <div className={styles.currentState}>
                <span className={styles.stateLabel}>
                  {t('documentation:documentationPage.vision.visionOverview.currentCentralized') || 'Current'}
                </span>
                <p>{t('documentation:documentationPage.vision.visionOverview.firebaseCloud') || 'Firebase Cloud Services'}</p>
              </div>
              <div className={styles.divider}></div>
              <div className={styles.futureState}>
                <span className={styles.stateLabel}>
                  {t('documentation:documentationPage.vision.visionOverview.futureDecentralized') || 'Future'}
                </span>
                <p>{t('documentation:documentationPage.vision.visionOverview.mobileP2P') || 'Mobile Device P2P Network'}</p>
              </div>
            </div>
          </div>

          <div className={styles.comparisonCard}>
            <div className={styles.comparisonHeader}>
              <FaDatabase className={styles.comparisonIcon} />
              <h4>{t('documentation:documentationPage.vision.visionOverview.dataStorage') || 'Data Storage'}</h4>
            </div>
            <div className={styles.comparisonContent}>
              <div className={styles.currentState}>
                <span className={styles.stateLabel}>
                  {t('documentation:documentationPage.vision.visionOverview.currentCentralized') || 'Current'}
                </span>
                <p>{t('documentation:documentationPage.vision.visionOverview.cloudDatabases') || 'Cloud Databases'}</p>
              </div>
              <div className={styles.divider}></div>
              <div className={styles.futureState}>
                <span className={styles.stateLabel}>
                  {t('documentation:documentationPage.vision.visionOverview.futureDecentralized') || 'Future'}
                </span>
                <p>{t('documentation:documentationPage.vision.visionOverview.onChainLocal') || 'On-Chain + Local Encryption'}</p>
              </div>
            </div>
          </div>

          <div className={styles.comparisonCard}>
            <div className={styles.comparisonHeader}>
              <FaShieldAlt className={styles.comparisonIcon} />
              <h4>{t('documentation:documentationPage.vision.visionOverview.privacyModel') || 'Privacy Model'}</h4>
            </div>
            <div className={styles.comparisonContent}>
              <div className={styles.currentState}>
                <span className={styles.stateLabel}>
                  {t('documentation:documentationPage.vision.visionOverview.currentCentralized') || 'Current'}
                </span>
                <p>{t('documentation:documentationPage.vision.visionOverview.trustBased') || 'Trust-Based (Service Provider)'}</p>
              </div>
              <div className={styles.divider}></div>
              <div className={styles.futureState}>
                <span className={styles.stateLabel}>
                  {t('documentation:documentationPage.vision.visionOverview.futureDecentralized') || 'Future'}
                </span>
                <p>{t('documentation:documentationPage.vision.visionOverview.zeroKnowledge') || 'Zero-Knowledge Proofs'}</p>
              </div>
            </div>
          </div>

          <div className={styles.comparisonCard}>
            <div className={styles.comparisonHeader}>
              <FaUsers className={styles.comparisonIcon} />
              <h4>{t('documentation:documentationPage.vision.visionOverview.networkEffect') || 'Network Effect'}</h4>
            </div>
            <div className={styles.comparisonContent}>
              <div className={styles.currentState}>
                <span className={styles.stateLabel}>
                  {t('documentation:documentationPage.vision.visionOverview.currentCentralized') || 'Current'}
                </span>
                <p>{t('documentation:documentationPage.vision.visionOverview.serverDependent') || 'Server-Dependent'}</p>
              </div>
              <div className={styles.divider}></div>
              <div className={styles.futureState}>
                <span className={styles.stateLabel}>
                  {t('documentation:documentationPage.vision.visionOverview.futureDecentralized') || 'Future'}
                </span>
                <p>{t('documentation:documentationPage.vision.visionOverview.communityPowered') || 'Community-Powered'}</p>
              </div>
            </div>
          </div>

          <div className={styles.comparisonCard}>
            <div className={styles.comparisonHeader}>
              <FaCoins className={styles.comparisonIcon} />
              <h4>{t('documentation:documentationPage.vision.visionOverview.costStructure') || 'Cost Structure'}</h4>
            </div>
            <div className={styles.comparisonContent}>
              <div className={styles.currentState}>
                <span className={styles.stateLabel}>
                  {t('documentation:documentationPage.vision.visionOverview.currentCentralized') || 'Current'}
                </span>
                <p>{t('documentation:documentationPage.vision.visionOverview.cloudFees') || 'Cloud Service Fees'}</p>
              </div>
              <div className={styles.divider}></div>
              <div className={styles.futureState}>
                <span className={styles.stateLabel}>
                  {t('documentation:documentationPage.vision.visionOverview.futureDecentralized') || 'Future'}
                </span>
                <p>{t('documentation:documentationPage.vision.visionOverview.networkRewards') || 'Network Participation Rewards'}</p>
              </div>
            </div>
          </div>

          <div className={styles.comparisonCard}>
            <div className={styles.comparisonHeader}>
              <FaLock className={styles.comparisonIcon} />
              <h4>{t('documentation:documentationPage.vision.visionOverview.dataOwnership') || 'Data Ownership'}</h4>
            </div>
            <div className={styles.comparisonContent}>
              <div className={styles.currentState}>
                <span className={styles.stateLabel}>
                  {t('documentation:documentationPage.vision.visionOverview.currentCentralized') || 'Current'}
                </span>
                <p>{t('documentation:documentationPage.vision.visionOverview.platformControlled') || 'Platform-Controlled'}</p>
              </div>
              <div className={styles.divider}></div>
              <div className={styles.futureState}>
                <span className={styles.stateLabel}>
                  {t('documentation:documentationPage.vision.visionOverview.futureDecentralized') || 'Future'}
                </span>
                <p>{t('documentation:documentationPage.vision.visionOverview.userSovereign') || 'User-Sovereign'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderArchitectureTab = () => (
    <div className={styles.tabSection}>
      <h2>{t('documentation:documentationPage.vision.architecture.title') || 'Decentralized Architecture Vision'}</h2>
      
      <div className={styles.architectureSection}>
        <h3>
          <FaMobileAlt className={styles.sectionIcon} />
          {t('documentation:documentationPage.vision.architecture.mobileP2P.title') || 'Mobile-First P2P Network'}
        </h3>
        
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <FaNetworkWired className={styles.featureIcon} />
            <h4>{t('documentation:documentationPage.vision.architecture.mobileP2P.personalNodes') || 'Personal Nodes'}</h4>
            <p>Each user's mobile device becomes a network node</p>
          </div>
          
          <div className={styles.featureCard}>
            <FaCoins className={styles.featureIcon} />
            <h4>{t('documentation:documentationPage.vision.architecture.mobileP2P.contributionIncentives') || 'Contribution Incentives'}</h4>
            <p>Users earn tokens for providing compute/storage resources</p>
          </div>
          
          <div className={styles.featureCard}>
            <FaChartLine className={styles.featureIcon} />
            <h4>{t('documentation:documentationPage.vision.architecture.mobileP2P.dynamicLoadBalancing') || 'Dynamic Load Balancing'}</h4>
            <p>Network automatically distributes workload across available devices</p>
          </div>
          
          <div className={styles.featureCard}>
            <FaDatabase className={styles.featureIcon} />
            <h4>{t('documentation:documentationPage.vision.architecture.mobileP2P.offlineFirst') || 'Offline-First Design'}</h4>
            <p>Apps function fully offline, sync when connected</p>
          </div>
        </div>

        <div className={styles.networkDiagram}>
          <h4>{t('documentation:documentationPage.vision.architecture.mobileP2P.networkTopology') || 'Network Topology'}</h4>
          <div className={styles.diagramContainer}>
            <div className={styles.nodeGrid}>
              <div className={styles.networkNode}>
                <FaMobileAlt className={styles.nodeIcon} />
                <h5>Mobile Node</h5>
                <ul>
                  <li>Local Storage</li>
                  <li>App Instances</li>
                  <li>Crypto Wallet</li>
                </ul>
              </div>
              
              <div className={styles.nodeConnection}></div>
              
              <div className={styles.networkNode}>
                <FaMobileAlt className={styles.nodeIcon} />
                <h5>Mobile Node</h5>
                <ul>
                  <li>Relay Service</li>
                  <li>Data Routing</li>
                  <li>Network Sync</li>
                </ul>
              </div>
              
              <div className={styles.nodeConnection}></div>
              
              <div className={styles.networkNode}>
                <FaMobileAlt className={styles.nodeIcon} />
                <h5>Mobile Node</h5>
                <ul>
                  <li>Computation</li>
                  <li>Verification</li>
                  <li>Consensus</li>
                </ul>
              </div>
            </div>
            
            <div className={styles.blockchainLayer}>
              <FaCubes className={styles.blockchainIcon} />
              <h5>Blockchain (State Layer)</h5>
              <p>Smart Contracts • Data Hashes • Access Rights</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.architectureSection}>
        <h3>
          <FaCubes className={styles.sectionIcon} />
          {t('documentation:documentationPage.vision.architecture.blockchain.title') || 'Blockchain Integration Strategy'}
        </h3>
        
        <div className={styles.codeBlock}>
          <div className={styles.codeHeader}>
            <span className={styles.codeLanguage}>TypeScript</span>
            <button 
              className={styles.copyButton}
              onClick={() => handleCopyCode(dataLayerCode, 'data-layer')}
            >
              {copiedCode === 'data-layer' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className={styles.codeContent}>
            <code>{dataLayerCode}</code>
          </pre>
        </div>
      </div>

      <div className={styles.architectureSection}>
        <h3>
          <FaShieldAlt className={styles.sectionIcon} />
          {t('documentation:documentationPage.vision.architecture.privacy.title') || 'Privacy-Preserving Cryptography'}
        </h3>
        
        <div className={styles.codeBlock}>
          <div className={styles.codeHeader}>
            <span className={styles.codeLanguage}>TypeScript</span>
            <button 
              className={styles.copyButton}
              onClick={() => handleCopyCode(privacyLayersCode, 'privacy-layers')}
            >
              {copiedCode === 'privacy-layers' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className={styles.codeContent}>
            <code>{privacyLayersCode}</code>
          </pre>
        </div>
      </div>
    </div>
  );

  const renderRoadmapTab = () => (
    <div className={styles.tabSection}>
      <h2>{t('documentation:documentationPage.vision.roadmap.title') || 'Technical Implementation Roadmap'}</h2>
      
      <div className={styles.roadmapTimeline}>
        <div className={styles.timelineItem}>
          <div className={styles.timelineMarker}>1</div>
          <div className={styles.timelineContent}>
            <h3 className={styles.phaseTitle}>
              {t('documentation:documentationPage.vision.roadmap.phases.hybrid') || 'Phase 1: Hybrid Foundation (2025-2026)'}
            </h3>
            <p className={styles.phaseSubtitle}>Prepare for Decentralization</p>
            
            <div className={styles.phaseFeatures}>
              <div className={styles.phaseFeature}>
                <FaCheckCircle className={styles.checkIcon} />
                <span>Multi-Backend Support</span>
              </div>
              <div className={styles.phaseFeature}>
                <FaCheckCircle className={styles.checkIcon} />
                <span>Encryption by Default</span>
              </div>
              <div className={styles.phaseFeature}>
                <FaCheckCircle className={styles.checkIcon} />
                <span>DID Integration</span>
              </div>
              <div className={styles.phaseFeature}>
                <FaCheckCircle className={styles.checkIcon} />
                <span>P2P Testing</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.timelineItem}>
          <div className={styles.timelineMarker}>2</div>
          <div className={styles.timelineContent}>
            <h3 className={styles.phaseTitle}>
              {t('documentation:documentationPage.vision.roadmap.phases.network') || 'Phase 2: Network Foundation (2026-2027)'}
            </h3>
            <p className={styles.phaseSubtitle}>Build Decentralized Infrastructure</p>
            
            <div className={styles.phaseFeatures}>
              <div className={styles.phaseFeature}>
                <FaCheckCircle className={styles.checkIcon} />
                <span>Device Registration</span>
              </div>
              <div className={styles.phaseFeature}>
                <FaCheckCircle className={styles.checkIcon} />
                <span>Resource Sharing</span>
              </div>
              <div className={styles.phaseFeature}>
                <FaCheckCircle className={styles.checkIcon} />
                <span>Incentive System</span>
              </div>
              <div className={styles.phaseFeature}>
                <FaCheckCircle className={styles.checkIcon} />
                <span>Consensus Mechanism</span>
              </div>
            </div>

            <div className={styles.codeBlock}>
              <div className={styles.codeHeader}>
                <span className={styles.codeLanguage}>Solidity</span>
                <button 
                  className={styles.copyButton}
                  onClick={() => handleCopyCode(smartContractCode, 'smart-contract')}
                >
                  {copiedCode === 'smart-contract' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre className={styles.codeContent}>
                <code>{smartContractCode}</code>
              </pre>
            </div>
          </div>
        </div>

        <div className={styles.timelineItem}>
          <div className={styles.timelineMarker}>3</div>
          <div className={styles.timelineContent}>
            <h3 className={styles.phaseTitle}>
              {t('documentation:documentationPage.vision.roadmap.phases.full') || 'Phase 3: Full Decentralization (2027-2028)'}
            </h3>
            <p className={styles.phaseSubtitle}>Complete Migration to P2P</p>
            
            <div className={styles.phaseFeatures}>
              <div className={styles.phaseFeature}>
                <FaCheckCircle className={styles.checkIcon} />
                <span>Complete Data Sovereignty</span>
              </div>
              <div className={styles.phaseFeature}>
                <FaCheckCircle className={styles.checkIcon} />
                <span>Cross-App Privacy</span>
              </div>
              <div className={styles.phaseFeature}>
                <FaCheckCircle className={styles.checkIcon} />
                <span>Network Governance</span>
              </div>
              <div className={styles.phaseFeature}>
                <FaCheckCircle className={styles.checkIcon} />
                <span>Global Accessibility</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEconomicsTab = () => (
    <div className={styles.tabSection}>
      <h2>{t('documentation:documentationPage.vision.economics.title') || 'Economic Model & Incentives'}</h2>
      
      <div className={styles.tokenomicsSection}>
        <h3>{t('documentation:documentationPage.vision.economics.tokenEconomics') || 'Token Economics (Future CyberEco Token - CYE)'}</h3>
        
        <div className={styles.tokenGrid}>
          <div className={styles.tokenCard}>
            <div className={styles.tokenIcon}>
              <FaNetworkWired />
            </div>
            <h4>{t('documentation:documentationPage.vision.economics.networkRewards') || 'Network Participation'}</h4>
            <ul>
              <li>Storage: 10-50 CYE/GB-month</li>
              <li>Compute: 1-5 CYE/CPU-hour</li>
              <li>Relay: 0.1-1 CYE/MB</li>
            </ul>
          </div>

          <div className={styles.tokenCard}>
            <div className={styles.tokenIcon}>
              <FaShieldAlt />
            </div>
            <h4>{t('documentation:documentationPage.vision.economics.privacyIncentives') || 'Privacy Incentives'}</h4>
            <ul>
              <li>Privacy bonus: +20% rewards</li>
              <li>ZK proofs: 5-10 CYE/proof</li>
              <li>Consensus: 1-3 CYE/round</li>
            </ul>
          </div>

          <div className={styles.tokenCard}>
            <div className={styles.tokenIcon}>
              <FaRocket />
            </div>
            <h4>{t('documentation:documentationPage.vision.economics.applicationAccess') || 'Application Access'}</h4>
            <ul>
              <li>Free tier with contribution</li>
              <li>Premium features via CYE</li>
              <li>Cross-app integration</li>
            </ul>
          </div>
        </div>

        <div className={styles.codeBlock}>
          <div className={styles.codeHeader}>
            <span className={styles.codeLanguage}>TypeScript</span>
            <button 
              className={styles.copyButton}
              onClick={() => handleCopyCode(networkEconomicsCode, 'network-economics')}
            >
              {copiedCode === 'network-economics' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className={styles.codeContent}>
            <code>{networkEconomicsCode}</code>
          </pre>
        </div>
      </div>
    </div>
  );

  const renderImpactTab = () => (
    <div className={styles.tabSection}>
      <h2>{t('documentation:documentationPage.vision.impact.title') || 'Global Impact & Benefits'}</h2>
      
      <div className={styles.impactGrid}>
        <div className={styles.impactCard}>
          <div className={styles.impactHeader}>
            <FaUsers className={styles.impactIcon} />
            <h3>{t('documentation:documentationPage.vision.impact.forUsers') || 'For Individual Users'}</h3>
          </div>
          
          <div className={styles.impactContent}>
            <h4>Enhanced Privacy</h4>
            <ul>
              <li>Zero Data Mining - No corporate surveillance</li>
              <li>Granular Control - Choose what to share</li>
              <li>Temporal Limits - Set expiration times</li>
              <li>Audit Transparency - Track access logs</li>
            </ul>

            <h4>Financial Benefits</h4>
            <ul>
              <li>Earn from contributing to network</li>
              <li>No subscription fees</li>
              <li>Universal access globally</li>
              <li>Complete data portability</li>
            </ul>
          </div>
        </div>

        <div className={styles.impactCard}>
          <div className={styles.impactHeader}>
            <FaGlobe className={styles.impactIcon} />
            <h3>{t('documentation:documentationPage.vision.impact.forSociety') || 'For Society'}</h3>
          </div>
          
          <div className={styles.impactContent}>
            <h4>{t('documentation:documentationPage.vision.impact.digitalRights') || 'Digital Rights'}</h4>
            <ul>
              <li>Data sovereignty for all users</li>
              <li>Privacy by technical design</li>
              <li>Open platform innovation</li>
              <li>Censorship resistance</li>
            </ul>

            <h4>{t('documentation:documentationPage.vision.impact.economicDemocratization') || 'Economic Democratization'}</h4>
            <ul>
              <li>Inclusive participation</li>
              <li>Global network effects</li>
              <li>Community governance</li>
              <li>Innovation incentives</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.metricsSection}>
        <h3>Success Metrics & Goals</h3>
        <div className={styles.metricsGrid}>
          <div className={styles.metricCard}>
            <div className={styles.metricValue}>1M+</div>
            <div className={styles.metricLabel}>Active Nodes</div>
          </div>
          <div className={styles.metricCard}>
            <div className={styles.metricValue}>10M+</div>
            <div className={styles.metricLabel}>Monthly Users</div>
          </div>
          <div className={styles.metricCard}>
            <div className={styles.metricValue}>99.9%</div>
            <div className={styles.metricLabel}>Privacy Rate</div>
          </div>
          <div className={styles.metricCard}>
            <div className={styles.metricValue}>100%</div>
            <div className={styles.metricLabel}>Data Control</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            <FaGlobe className={styles.titleIcon} />
            {t('documentation:documentationPage.vision.title') || 'Decentralized Future Vision'}
          </h1>
          <p className={styles.subtitle}>
            {t('documentation:documentationPage.vision.subtitle') || 
            'Transitioning from centralized cloud infrastructure to a distributed, privacy-first, blockchain-based ecosystem'}
          </p>
        </div>
      </div>

      <div className={styles.executiveSummary}>
        <h2>
          <FaRocket className={styles.sectionIcon} />
          {t('documentation:documentationPage.vision.executiveSummary.title') || 'Executive Summary'}
        </h2>
        <p className={styles.summaryText}>
          {t('documentation:documentationPage.vision.executiveSummary.description') || 
          'CyberEco envisions a future where digital infrastructures empower individuals and communities rather than centralizing control. Our vision extends beyond current limitations to create a truly decentralized ecosystem where users own their data, identity, and digital relationships.'}
        </p>
      </div>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'overview' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          {t('documentation:documentationPage.vision.tabs.overview', { defaultValue: 'Overview' })}
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'architecture' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('architecture')}
        >
          {t('documentation:documentationPage.vision.tabs.architecture', { defaultValue: 'Architecture' })}
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'roadmap' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('roadmap')}
        >
          {t('documentation:documentationPage.vision.tabs.roadmap', { defaultValue: 'Roadmap' })}
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'economics' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('economics')}
        >
          {t('documentation:documentationPage.vision.tabs.economics', { defaultValue: 'Economics' })}
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'impact' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('impact')}
        >
          {t('documentation:documentationPage.vision.tabs.impact', { defaultValue: 'Impact' })}
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'architecture' && renderArchitectureTab()}
          {activeTab === 'roadmap' && renderRoadmapTab()}
          {activeTab === 'economics' && renderEconomicsTab()}
          {activeTab === 'impact' && renderImpactTab()}
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h4>{t('documentation:documentationPage.vision.getInvolved.title') || 'Get Involved'}</h4>
            <ul className={styles.footerLinks}>
              <li>
                <Link href="/documentation">
                  <FaCode /> {t('documentation:documentationPage.vision.getInvolved.forDevelopers') || 'For Developers'}
                </Link>
              </li>
              <li>
                <Link href="/community">
                  <FaUsers /> {t('documentation:documentationPage.vision.getInvolved.forUsers') || 'For Users'}
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <FaGlobe /> {t('documentation:documentationPage.vision.getInvolved.forOrganizations') || 'For Organizations'}
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h4>Resources</h4>
            <ul className={styles.footerLinks}>
              <li>
                <a href="https://github.com/cybereco" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
              <li>
                <Link href="/roadmap">
                  Roadmap
                </Link>
              </li>
              <li>
                <Link href="/documentation">
                  All Documentation
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}