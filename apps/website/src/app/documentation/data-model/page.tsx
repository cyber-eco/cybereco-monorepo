'use client';

import React from 'react';
import { useI18n } from '@cybereco/i18n';
import { DocumentationHero, DocumentationTabs } from '../components';
import type { Tab } from '../components';
import { 
  FaDatabase, 
  FaUser, 
  FaUsers, 
  FaGlobe, 
  FaLayerGroup,
  FaHandshake,
  FaCode,
  FaLock,
  FaKey,
  FaNetworkWired
} from 'react-icons/fa';
import styles from './page.module.css';

export default function DataModelPage() {
  const { t } = useI18n();

  const renderOverviewTab = () => (
    <div className={styles.tabContent}>
      <section className={styles.modelSection}>
        <h2 className={styles.sectionTitle}>
          {t('documentation:dataModel.overview.title') || 'Data Ownership Architecture'}
        </h2>
        <p className={styles.sectionDescription}>
          {t('documentation:dataModel.overview.description') || 
          'CyberEco implements a revolutionary multi-party data ownership model that handles everything from personal data to community resources. Each ownership type has specific rules, permissions, and consensus mechanisms.'}
        </p>

        <div className={styles.ownershipTypesGrid}>
          <div className={styles.ownershipCard}>
            <div className={styles.ownershipIcon} style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }}>
              <FaUser />
            </div>
            <h3>{t('documentation:dataModel.overview.personal.title') || 'Personal Data'}</h3>
            <p>{t('documentation:dataModel.overview.personal.description') || 'Single owner with full control. Encrypted in personal vault.'}</p>
            <div className={styles.ownershipFeatures}>
              <span>{t('documentation:dataModel.overview.personal.feature1') || '• Full sovereignty'}</span>
              <span>{t('documentation:dataModel.overview.personal.feature2') || '• Instant deletion'}</span>
              <span>{t('documentation:dataModel.overview.personal.feature3') || '• Private by default'}</span>
            </div>
          </div>

          <div className={styles.ownershipCard}>
            <div className={styles.ownershipIcon} style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}>
              <FaUsers />
            </div>
            <h3>{t('documentation:dataModel.overview.shared.title') || 'Shared Data'}</h3>
            <p>{t('documentation:dataModel.overview.shared.description') || 'Multiple equal owners. Requires consensus for modifications.'}</p>
            <div className={styles.ownershipFeatures}>
              <span>{t('documentation:dataModel.overview.shared.feature1') || '• Multi-signature'}</span>
              <span>{t('documentation:dataModel.overview.shared.feature2') || '• Consensus rules'}</span>
              <span>{t('documentation:dataModel.overview.shared.feature3') || '• Conflict resolution'}</span>
            </div>
          </div>

          <div className={styles.ownershipCard}>
            <div className={styles.ownershipIcon} style={{ background: 'linear-gradient(135deg, #ec4899, #db2777)' }}>
              <FaGlobe />
            </div>
            <h3>{t('documentation:dataModel.overview.public.title') || 'Public Data'}</h3>
            <p>{t('documentation:dataModel.overview.public.description') || 'Community-owned resources. Democratic governance and transparency.'}</p>
            <div className={styles.ownershipFeatures}>
              <span>{t('documentation:dataModel.overview.public.feature1') || '• Open access'}</span>
              <span>{t('documentation:dataModel.overview.public.feature2') || '• Community verified'}</span>
              <span>{t('documentation:dataModel.overview.public.feature3') || '• Immutable history'}</span>
            </div>
          </div>

          <div className={styles.ownershipCard}>
            <div className={styles.ownershipIcon} style={{ background: 'linear-gradient(135deg, #f59e0b, #f97316)' }}>
              <FaLayerGroup />
            </div>
            <h3>{t('documentation:dataModel.overview.hierarchical.title') || 'Hierarchical Data'}</h3>
            <p>{t('documentation:dataModel.overview.hierarchical.description') || 'Parent-child relationships with inherited permissions.'}</p>
            <div className={styles.ownershipFeatures}>
              <span>{t('documentation:dataModel.overview.hierarchical.feature1') || '• Nested ownership'}</span>
              <span>{t('documentation:dataModel.overview.hierarchical.feature2') || '• Permission inheritance'}</span>
              <span>{t('documentation:dataModel.overview.hierarchical.feature3') || '• Delegated access'}</span>
            </div>
          </div>
        </div>

        <div className={styles.codeExample}>
          <h3>{t('documentation:dataModel.overview.example.title') || 'Core Data Types'}</h3>
          <pre>
            <code>{`// Data ownership types in CyberEco
const DataOwnershipTypes = {
  PERSONAL: 'personal',        // Single owner (traditional)
  SHARED: 'shared',           // Multiple equal owners
  HIERARCHICAL: 'hierarchical', // Parent-child relationships
  PUBLIC: 'public',           // Community-owned
  CONSENSUS: 'consensus'       // Requires agreement to modify
};

// Example: Defining ownership rules
const ownershipRules = {
  modify: 'all',      // all must agree to modify
  delete: 'majority', // majority can delete
  view: 'any',        // any owner can view
  add: 'proposer'     // only proposer can add
};`}</code>
          </pre>
        </div>
      </section>
    </div>
  );

  const renderPersonalDataTab = () => (
    <div className={styles.tabContent}>
      <section className={styles.modelSection}>
        <h2 className={styles.sectionTitle}>
          <FaUser /> {t('documentation:dataModel.personal.title') || 'Personal Data Model'}
        </h2>
        
        <div className={styles.conceptCard}>
          <h3>{t('documentation:dataModel.personal.concept.title') || 'Your Digital Vault'}</h3>
          <p>{t('documentation:dataModel.personal.concept.description') || 
            'Personal data represents information owned exclusively by a single user. This includes private notes, personal preferences, individual financial records, and any data that doesn\'t require sharing or collaboration.'}</p>
        </div>

        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <FaLock className={styles.featureIcon} />
            <h4>{t('documentation:dataModel.personal.encryption.title') || 'End-to-End Encryption'}</h4>
            <p>{t('documentation:dataModel.personal.encryption.description') || 
              'All personal data is encrypted with keys only you control. Not even CyberEco can access your private information.'}</p>
          </div>

          <div className={styles.featureCard}>
            <FaKey className={styles.featureIcon} />
            <h4>{t('documentation:dataModel.personal.control.title') || 'Complete Control'}</h4>
            <p>{t('documentation:dataModel.personal.control.description') || 
              'Modify, delete, or export your data instantly. No approval needed, no delays, no questions asked.'}</p>
          </div>
        </div>

        <div className={styles.codeExample}>
          <h3>{t('documentation:dataModel.personal.implementation.title') || 'Implementation Example'}</h3>
          <pre>
            <code>{`// Personal data structure
class PersonalData {
  constructor(userId, data) {
    this.id = generateUUID();
    this.type = DataOwnershipTypes.PERSONAL;
    this.owner = userId;
    this.data = encrypt(data, userId);
    this.created = Date.now();
    this.modified = Date.now();
  }

  // Only owner can modify
  async update(userId, changes) {
    if (userId !== this.owner) {
      throw new Error('Unauthorized');
    }
    
    this.data = encrypt({
      ...decrypt(this.data, userId),
      ...changes
    }, userId);
    this.modified = Date.now();
  }

  // Instant deletion
  async delete(userId) {
    if (userId !== this.owner) {
      throw new Error('Unauthorized');
    }
    
    // Cryptographic deletion
    await secureDelete(this.data);
    return true;
  }
}`}</code>
          </pre>
        </div>

        <div className={styles.useCases}>
          <h3>{t('documentation:dataModel.personal.useCases.title') || 'Common Use Cases'}</h3>
          <div className={styles.useCaseGrid}>
            <div className={styles.useCaseCard}>
              <h4>{t('documentation:dataModel.personal.useCases.notes.title') || 'Personal Notes'}</h4>
              <p>{t('documentation:dataModel.personal.useCases.notes.description') || 'Private thoughts, journals, and reminders'}</p>
            </div>
            <div className={styles.useCaseCard}>
              <h4>{t('documentation:dataModel.personal.useCases.preferences.title') || 'App Preferences'}</h4>
              <p>{t('documentation:dataModel.personal.useCases.preferences.description') || 'Settings, themes, and personalization'}</p>
            </div>
            <div className={styles.useCaseCard}>
              <h4>{t('documentation:dataModel.personal.useCases.health.title') || 'Health Records'}</h4>
              <p>{t('documentation:dataModel.personal.useCases.health.description') || 'Medical data and fitness tracking'}</p>
            </div>
            <div className={styles.useCaseCard}>
              <h4>{t('documentation:dataModel.personal.useCases.financial.title') || 'Financial Data'}</h4>
              <p>{t('documentation:dataModel.personal.useCases.financial.description') || 'Personal budgets and transactions'}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderSharedDataTab = () => (
    <div className={styles.tabContent}>
      <section className={styles.modelSection}>
        <h2 className={styles.sectionTitle}>
          <FaUsers /> {t('documentation:dataModel.shared.title') || 'Shared Data Model'}
        </h2>

        <div className={styles.conceptCard}>
          <h3>{t('documentation:dataModel.shared.concept.title') || 'Collaborative Ownership'}</h3>
          <p>{t('documentation:dataModel.shared.concept.description') || 
            'Shared data represents information owned by multiple parties equally. Changes require consensus based on predefined rules. This model ensures fairness and prevents any single party from unilaterally modifying shared resources.'}</p>
        </div>

        <div className={styles.consensusTypes}>
          <h3>{t('documentation:dataModel.shared.consensus.title') || 'Consensus Mechanisms'}</h3>
          <div className={styles.consensusGrid}>
            <div className={styles.consensusCard}>
              <FaHandshake className={styles.consensusIcon} />
              <h4>{t('documentation:dataModel.shared.consensus.unanimous.title') || 'Unanimous'}</h4>
              <p>{t('documentation:dataModel.shared.consensus.unanimous.description') || 'All parties must agree'}</p>
              <code>consensus: 'all'</code>
            </div>
            <div className={styles.consensusCard}>
              <FaUsers className={styles.consensusIcon} />
              <h4>{t('documentation:dataModel.shared.consensus.majority.title') || 'Majority'}</h4>
              <p>{t('documentation:dataModel.shared.consensus.majority.description') || 'More than 50% must agree'}</p>
              <code>consensus: 'majority'</code>
            </div>
            <div className={styles.consensusCard}>
              <FaLayerGroup className={styles.consensusIcon} />
              <h4>{t('documentation:dataModel.shared.consensus.threshold.title') || 'Threshold'}</h4>
              <p>{t('documentation:dataModel.shared.consensus.threshold.description') || 'Custom percentage required'}</p>
              <code>threshold: 0.66</code>
            </div>
          </div>
        </div>

        <div className={styles.codeExample}>
          <h3>{t('documentation:dataModel.shared.implementation.title') || 'Shared Expense Example'}</h3>
          <pre>
            <code>{`// Shared expense with multi-party ownership
const sharedExpense = {
  id: 'expense_123',
  type: DataOwnershipTypes.SHARED,
  owners: ['did:user1', 'did:user2', 'did:user3'],
  data: {
    amount: 1500,
    currency: 'MXN',
    description: 'Dinner at restaurant',
    splits: {
      'did:user1': 500,
      'did:user2': 500,
      'did:user3': 500
    }
  },
  state: 'proposed', // proposed -> agreed -> settled
  signatures: {
    'did:user1': 'sig1...',
    'did:user2': null, // pending
    'did:user3': null  // pending
  },
  rules: {
    modify: 'all',      // all must agree to modify
    delete: 'majority', // majority can delete
    view: 'any'        // any owner can view
  }
};

// Multi-signature state machine
class ConsensusData {
  async proposeChange(proposerId, changes) {
    const proposal = {
      id: generateId(),
      proposer: proposerId,
      changes: changes,
      signatures: { [proposerId]: await sign(changes, proposerId) },
      status: 'pending'
    };
    
    // Notify other owners
    await this.notifyOwners(proposal);
    return proposal;
  }
  
  async signProposal(proposalId, ownerId) {
    const proposal = this.proposals.find(p => p.id === proposalId);
    proposal.signatures[ownerId] = await sign(proposal.changes, ownerId);
    
    // Check if we have consensus
    if (this.hasConsensus(proposal)) {
      await this.executeProposal(proposal);
    }
  }
}`}</code>
          </pre>
        </div>

        <div className={styles.realWorldExample}>
          <h3>{t('documentation:dataModel.shared.justSplit.title') || 'Real-World Example: JustSplit'}</h3>
          <div className={styles.exampleFlow}>
            <div className={styles.flowStep}>
              <div className={styles.stepNumber}>1</div>
              <h4>{t('documentation:dataModel.shared.justSplit.step1') || 'Create Expense'}</h4>
              <p>{t('documentation:dataModel.shared.justSplit.step1Desc') || 'User creates shared expense with participants'}</p>
            </div>
            <div className={styles.flowStep}>
              <div className={styles.stepNumber}>2</div>
              <h4>{t('documentation:dataModel.shared.justSplit.step2') || 'Notify Parties'}</h4>
              <p>{t('documentation:dataModel.shared.justSplit.step2Desc') || 'All participants receive notification to review'}</p>
            </div>
            <div className={styles.flowStep}>
              <div className={styles.stepNumber}>3</div>
              <h4>{t('documentation:dataModel.shared.justSplit.step3') || 'Collect Signatures'}</h4>
              <p>{t('documentation:dataModel.shared.justSplit.step3Desc') || 'Each party signs to approve the expense'}</p>
            </div>
            <div className={styles.flowStep}>
              <div className={styles.stepNumber}>4</div>
              <h4>{t('documentation:dataModel.shared.justSplit.step4') || 'Execute Change'}</h4>
              <p>{t('documentation:dataModel.shared.justSplit.step4Desc') || 'Once consensus reached, expense is finalized'}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderPublicDataTab = () => (
    <div className={styles.tabContent}>
      <section className={styles.modelSection}>
        <h2 className={styles.sectionTitle}>
          <FaGlobe /> {t('documentation:dataModel.public.title') || 'Public & Community Data'}
        </h2>

        <div className={styles.conceptCard}>
          <h3>{t('documentation:dataModel.public.concept.title') || 'Community-Owned Resources'}</h3>
          <p>{t('documentation:dataModel.public.concept.description') || 
            'Public data belongs to the community. It includes information about public figures, community resources, and shared knowledge. This data is transparent, verifiable, and governed by democratic processes.'}</p>
        </div>

        <div className={styles.publicDataStructure}>
          <h3>{t('documentation:dataModel.public.structure.title') || 'Public Data Architecture'}</h3>
          <div className={styles.architectureGrid}>
            <div className={styles.architectureLayer}>
              <h4>{t('documentation:dataModel.public.structure.public.title') || 'Public Layer'}</h4>
              <p>{t('documentation:dataModel.public.structure.public.description') || 'Open access information'}</p>
              <ul>
                <li>{t('documentation:dataModel.public.structure.public.item1') || 'Political voting records'}</li>
                <li>{t('documentation:dataModel.public.structure.public.item2') || 'Public promises'}</li>
                <li>{t('documentation:dataModel.public.structure.public.item3') || 'Community resources'}</li>
              </ul>
            </div>
            <div className={styles.architectureLayer}>
              <h4>{t('documentation:dataModel.public.structure.verified.title') || 'Verified Layer'}</h4>
              <p>{t('documentation:dataModel.public.structure.verified.description') || 'Claims with cryptographic proof'}</p>
              <ul>
                <li>{t('documentation:dataModel.public.structure.verified.item1') || 'Educational credentials'}</li>
                <li>{t('documentation:dataModel.public.structure.verified.item2') || 'Professional licenses'}</li>
                <li>{t('documentation:dataModel.public.structure.verified.item3') || 'Official documents'}</li>
              </ul>
            </div>
            <div className={styles.architectureLayer}>
              <h4>{t('documentation:dataModel.public.structure.community.title') || 'Community Layer'}</h4>
              <p>{t('documentation:dataModel.public.structure.community.description') || 'User-generated content'}</p>
              <ul>
                <li>{t('documentation:dataModel.public.structure.community.item1') || 'Ratings & reviews'}</li>
                <li>{t('documentation:dataModel.public.structure.community.item2') || 'Fact checks'}</li>
                <li>{t('documentation:dataModel.public.structure.community.item3') || 'Comments & feedback'}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.codeExample}>
          <h3>{t('documentation:dataModel.public.implementation.title') || 'Political Representative Example'}</h3>
          <pre>
            <code>{`// Public figure data structure
const PoliticalRepresentative = {
  id: 'rep_123',
  type: DataOwnershipTypes.PUBLIC,
  
  // Public data - anyone can read
  public: {
    name: 'Juan Pérez',
    position: 'Diputado Federal',
    party: 'Partido Ciudadano',
    district: 'CDMX Distrito 10',
    voting_record: [], // Immutable history
    campaign_promises: []
  },
  
  // Verified claims - requires proof
  verified: {
    education: {
      claim: 'Licenciatura en Derecho, UNAM',
      proof: 'ipfs://QmX...', // Scanned diploma
      verifier: 'did:unam:registrar'
    }
  },
  
  // Community annotations
  community: {
    ratings: new CRDT.Counter(), // Aggregated rating
    comments: new CRDT.Set(),    // Community feedback
    fact_checks: []              // Verified by fact-checkers
  },
  
  // Update rules
  rules: {
    public: {
      update: ['did:official_source', 'did:congress_api'],
      verify: 'community_consensus'
    },
    verified: {
      add: 'verified_institutions_only',
      remove: 'never' // Immutable once verified
    },
    community: {
      add: 'any_user',
      remove: 'community_moderation'
    }
  }
};`}</code>
          </pre>
        </div>

        <div className={styles.governanceModel}>
          <h3>{t('documentation:dataModel.public.governance.title') || 'Community Governance'}</h3>
          <div className={styles.governanceGrid}>
            <div className={styles.governanceCard}>
              <h4>{t('documentation:dataModel.public.governance.proposals.title') || 'Proposals'}</h4>
              <p>{t('documentation:dataModel.public.governance.proposals.description') || 'Community members submit changes'}</p>
            </div>
            <div className={styles.governanceCard}>
              <h4>{t('documentation:dataModel.public.governance.voting.title') || 'Voting'}</h4>
              <p>{t('documentation:dataModel.public.governance.voting.description') || 'Democratic decision making'}</p>
            </div>
            <div className={styles.governanceCard}>
              <h4>{t('documentation:dataModel.public.governance.execution.title') || 'Execution'}</h4>
              <p>{t('documentation:dataModel.public.governance.execution.description') || 'Automatic implementation of decisions'}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderImplementationTab = () => (
    <div className={styles.tabContent}>
      <section className={styles.modelSection}>
        <h2 className={styles.sectionTitle}>
          <FaCode /> {t('documentation:dataModel.implementation.title') || 'Implementation Patterns'}
        </h2>

        <div className={styles.patternSection}>
          <h3>{t('documentation:dataModel.implementation.crdt.title') || 'Conflict-Free Replicated Data Types'}</h3>
          <p>{t('documentation:dataModel.implementation.crdt.description') || 
            'CRDTs enable automatic conflict resolution when multiple parties modify shared data simultaneously.'}</p>
          
          <div className={styles.codeExample}>
            <pre>
              <code>{`// CRDT implementation for shared data
class SharedDataCRDT {
  constructor(owners) {
    this.owners = owners;
    this.state = new Map(); // CRDT map
    this.vector_clock = {}; // Track causality
  }
  
  // Each owner can make changes independently
  update(ownerId, changes) {
    // Increment vector clock
    this.vector_clock[ownerId] = (this.vector_clock[ownerId] || 0) + 1;
    
    // Apply change with timestamp
    const operation = {
      owner: ownerId,
      timestamp: this.vector_clock,
      changes: changes
    };
    
    // CRDT automatically merges concurrent changes
    this.state = this.merge(this.state, operation);
    
    // Broadcast to other owners
    this.broadcast(operation);
  }
  
  // Automatic conflict resolution
  merge(state, operation) {
    // Last-writer-wins for simple fields
    // Sum for numerical operations
    // Union for sets
    // Custom rules for complex types
    return CRDTMerge.apply(state, operation);
  }
}`}</code>
            </pre>
          </div>
        </div>

        <div className={styles.patternSection}>
          <h3>{t('documentation:dataModel.implementation.sync.title') || 'Data Synchronization Protocol'}</h3>
          <p>{t('documentation:dataModel.implementation.sync.description') || 
            'Efficient synchronization ensures all parties have consistent views of shared data.'}</p>
          
          <div className={styles.codeExample}>
            <pre>
              <code>{`// Sync protocol for multi-owner data
class DataSyncProtocol {
  async syncSharedData(userId) {
    const sharedItems = await getSharedDataFor(userId);
    
    for (const item of sharedItems) {
      // Get latest state from all owners
      const states = await Promise.all(
        item.owners.map(owner => fetchStateFrom(owner, item.id))
      );
      
      // Merge using CRDT rules
      const mergedState = CRDTMerge.mergeAll(states);
      
      // Update local copy
      await updateLocalState(userId, item.id, mergedState);
      
      // Handle conflicts if any
      const conflicts = detectConflicts(states);
      if (conflicts.length > 0) {
        await resolveConflicts(conflicts, item.rules);
      }
    }
  }
}`}</code>
            </pre>
          </div>
        </div>

        <div className={styles.patternSection}>
          <h3>{t('documentation:dataModel.implementation.smart.title') || 'Smart Contract Integration'}</h3>
          <p>{t('documentation:dataModel.implementation.smart.description') || 
            'For high-stakes shared data, smart contracts provide immutable consensus rules.'}</p>
          
          <div className={styles.smartContractFlow}>
            <div className={styles.contractStep}>
              <FaNetworkWired />
              <h4>{t('documentation:dataModel.implementation.smart.deploy') || 'Deploy Contract'}</h4>
              <p>{t('documentation:dataModel.implementation.smart.deployDesc') || 'Define consensus rules in code'}</p>
            </div>
            <div className={styles.contractStep}>
              <FaHandshake />
              <h4>{t('documentation:dataModel.implementation.smart.interact') || 'Interact'}</h4>
              <p>{t('documentation:dataModel.implementation.smart.interactDesc') || 'Parties submit proposals and votes'}</p>
            </div>
            <div className={styles.contractStep}>
              <FaLock />
              <h4>{t('documentation:dataModel.implementation.smart.execute') || 'Execute'}</h4>
              <p>{t('documentation:dataModel.implementation.smart.executeDesc') || 'Automatic execution when consensus reached'}</p>
            </div>
          </div>
        </div>

        <div className={styles.bestPractices}>
          <h3>{t('documentation:dataModel.implementation.best.title') || 'Best Practices'}</h3>
          <div className={styles.practiceGrid}>
            <div className={styles.practiceCard}>
              <h4>{t('documentation:dataModel.implementation.best.encryption.title') || 'Always Encrypt'}</h4>
              <p>{t('documentation:dataModel.implementation.best.encryption.description') || 'Encrypt data at rest and in transit'}</p>
            </div>
            <div className={styles.practiceCard}>
              <h4>{t('documentation:dataModel.implementation.best.validation.title') || 'Validate Ownership'}</h4>
              <p>{t('documentation:dataModel.implementation.best.validation.description') || 'Check permissions before any operation'}</p>
            </div>
            <div className={styles.practiceCard}>
              <h4>{t('documentation:dataModel.implementation.best.audit.title') || 'Audit Trail'}</h4>
              <p>{t('documentation:dataModel.implementation.best.audit.description') || 'Log all operations for transparency'}</p>
            </div>
            <div className={styles.practiceCard}>
              <h4>{t('documentation:dataModel.implementation.best.backup.title') || 'Backup Strategy'}</h4>
              <p>{t('documentation:dataModel.implementation.best.backup.description') || 'Distributed backups prevent data loss'}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const tabs: Tab[] = [
    {
      id: 'overview',
      label: t('documentation:dataModel.tabs.overview') || 'Overview',
      content: renderOverviewTab()
    },
    {
      id: 'personal',
      label: t('documentation:dataModel.tabs.personal') || 'Personal Data',
      content: renderPersonalDataTab()
    },
    {
      id: 'shared',
      label: t('documentation:dataModel.tabs.shared') || 'Shared Data',
      content: renderSharedDataTab()
    },
    {
      id: 'public',
      label: t('documentation:dataModel.tabs.public') || 'Public Data',
      content: renderPublicDataTab()
    },
    {
      id: 'implementation',
      label: t('documentation:dataModel.tabs.implementation') || 'Implementation',
      content: renderImplementationTab()
    }
  ];

  return (
    <div className={styles.pageContainer}>
      <DocumentationHero
        icon={<FaDatabase />}
        title={t('documentation:dataModel.title') || 'Data Ownership Model'}
        subtitle={t('documentation:dataModel.subtitle') || 'Revolutionary multi-party data ownership for the decentralized future'}
        gradient="linear-gradient(135deg, #10b981 0%, #3b82f6 50%, #8b5cf6 100%)"
      />

      <div className={styles.tabsContainer}>
        <DocumentationTabs tabs={tabs} />
      </div>
    </div>
  );
}