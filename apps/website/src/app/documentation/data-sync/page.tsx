'use client';

import React from 'react';
import { useI18n } from '@cybereco/i18n';
import { DocumentationHero, DocumentationTabs } from '../components';
import type { Tab } from '../components';
import { 
  FaSync,
  FaNetworkWired,
  FaCodeBranch,
  FaHandshake,
  FaCogs,
  FaShieldAlt,
  FaBolt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaCubes,
  FaUser,
  FaEdit,
  FaBell,
  FaSignature
} from 'react-icons/fa';
import styles from './page.module.css';

export default function DataSyncPage() {
  const { t } = useI18n();

  const renderOverviewTab = () => (
    <div className={styles.tabContent}>
      <section className={styles.syncSection}>
        <h2 className={styles.sectionTitle}>
          {t('documentation:dataSync.overview.title') || 'Decentralized Synchronization'}
        </h2>
        <p className={styles.sectionDescription}>
          {t('documentation:dataSync.overview.description') || 
          'CyberEco\'s synchronization protocol ensures data consistency across multiple owners while respecting sovereignty. Using advanced techniques like CRDTs and vector clocks, we enable real-time collaboration without central servers.'}
        </p>

        <div className={styles.syncPrinciples}>
          <div className={styles.principleCard}>
            <div className={styles.principleIcon}>
              <FaBolt />
            </div>
            <h3>{t('documentation:dataSync.overview.principles.realtime.title') || 'Real-time Updates'}</h3>
            <p>{t('documentation:dataSync.overview.principles.realtime.description') || 
              'Changes propagate instantly across all participants without delays or polling.'}</p>
          </div>

          <div className={styles.principleCard}>
            <div className={styles.principleIcon}>
              <FaShieldAlt />
            </div>
            <h3>{t('documentation:dataSync.overview.principles.secure.title') || 'End-to-End Security'}</h3>
            <p>{t('documentation:dataSync.overview.principles.secure.description') || 
              'All synchronization happens over encrypted channels with cryptographic verification.'}</p>
          </div>

          <div className={styles.principleCard}>
            <div className={styles.principleIcon}>
              <FaCodeBranch />
            </div>
            <h3>{t('documentation:dataSync.overview.principles.conflict.title') || 'Automatic Conflict Resolution'}</h3>
            <p>{t('documentation:dataSync.overview.principles.conflict.description') || 
              'Smart algorithms resolve conflicts without human intervention when possible.'}</p>
          </div>

          <div className={styles.principleCard}>
            <div className={styles.principleIcon}>
              <FaNetworkWired />
            </div>
            <h3>{t('documentation:dataSync.overview.principles.offline.title') || 'Offline-First'}</h3>
            <p>{t('documentation:dataSync.overview.principles.offline.description') || 
              'Work offline and sync when reconnected. No data loss, no conflicts.'}</p>
          </div>
        </div>

        <div className={styles.architectureDiagram}>
          <h3>{t('documentation:dataSync.overview.architecture.title') || 'Sync Architecture'}</h3>
          <div className={styles.diagramContainer}>
            <div className={styles.syncNode}>
              <div className={styles.nodeIcon}><FaUser /></div>
              <span>{t('documentation:dataSync.overview.architecture.user1') || 'User A'}</span>
            </div>
            <div className={styles.syncFlow}>
              <div className={styles.flowLine}></div>
              <div className={styles.flowLabel}>{t('documentation:dataSync.overview.architecture.sync') || 'Sync Protocol'}</div>
              <div className={styles.flowLine}></div>
            </div>
            <div className={styles.syncNode}>
              <div className={styles.nodeIcon}><FaUser /></div>
              <span>{t('documentation:dataSync.overview.architecture.user2') || 'User B'}</span>
            </div>
            <div className={styles.syncFlow}>
              <div className={styles.flowLine}></div>
              <div className={styles.flowLabel}>{t('documentation:dataSync.overview.architecture.sync') || 'Sync Protocol'}</div>
              <div className={styles.flowLine}></div>
            </div>
            <div className={styles.syncNode}>
              <div className={styles.nodeIcon}><FaUser /></div>
              <span>{t('documentation:dataSync.overview.architecture.user3') || 'User C'}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderCRDTTab = () => (
    <div className={styles.tabContent}>
      <section className={styles.syncSection}>
        <h2 className={styles.sectionTitle}>
          <FaCubes /> {t('documentation:dataSync.crdt.title') || 'Conflict-Free Replicated Data Types'}
        </h2>

        <div className={styles.conceptExplanation}>
          <h3>{t('documentation:dataSync.crdt.concept.title') || 'What are CRDTs?'}</h3>
          <p>{t('documentation:dataSync.crdt.concept.description') || 
            'CRDTs are data structures that automatically resolve conflicts when multiple users edit the same data simultaneously. They guarantee eventual consistency without requiring coordination between nodes.'}</p>
        </div>

        <div className={styles.crdtTypes}>
          <h3>{t('documentation:dataSync.crdt.types.title') || 'CRDT Types Used in CyberEco'}</h3>
          
          <div className={styles.crdtGrid}>
            <div className={styles.crdtCard}>
              <h4>{t('documentation:dataSync.crdt.types.lww.title') || 'Last-Write-Wins Register'}</h4>
              <p>{t('documentation:dataSync.crdt.types.lww.description') || 'For simple values where the latest update should win'}</p>
              <div className={styles.codeSnippet}>
                <code>profile.name = "Alice" // Timestamp: 1000</code>
                <code>profile.name = "Bob"   // Timestamp: 1001 ✓</code>
              </div>
            </div>

            <div className={styles.crdtCard}>
              <h4>{t('documentation:dataSync.crdt.types.counter.title') || 'PN-Counter'}</h4>
              <p>{t('documentation:dataSync.crdt.types.counter.description') || 'For numerical values that can increase or decrease'}</p>
              <div className={styles.codeSnippet}>
                <code>balance += 100 // User A</code>
                <code>balance -= 50  // User B</code>
                <code>// Result: +50</code>
              </div>
            </div>

            <div className={styles.crdtCard}>
              <h4>{t('documentation:dataSync.crdt.types.set.title') || 'OR-Set'}</h4>
              <p>{t('documentation:dataSync.crdt.types.set.description') || 'For collections where items can be added/removed'}</p>
              <div className={styles.codeSnippet}>
                <code>tags.add("urgent")    // User A</code>
                <code>tags.add("important") // User B</code>
                <code>// Result: ["urgent", "important"]</code>
              </div>
            </div>

            <div className={styles.crdtCard}>
              <h4>{t('documentation:dataSync.crdt.types.map.title') || 'OR-Map'}</h4>
              <p>{t('documentation:dataSync.crdt.types.map.description') || 'For complex objects with nested properties'}</p>
              <div className={styles.codeSnippet}>
                <code>doc.title = "Draft"    // User A</code>
                <code>doc.author = "Alice"   // User B</code>
                <code>// Both changes preserved</code>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.codeExample}>
          <h3>{t('documentation:dataSync.crdt.implementation.title') || 'CRDT Implementation Example'}</h3>
          <pre>
            <code>{`// CRDT-based shared document
class CRDTDocument {
  constructor(id, userId) {
    this.id = id;
    this.userId = userId;
    this.state = new ORMap();
    this.vectorClock = new VectorClock();
  }

  // Update with automatic conflict resolution
  update(field, value) {
    // Increment vector clock for this user
    this.vectorClock.increment(this.userId);
    
    // Create operation with causal context
    const operation = {
      type: 'update',
      field: field,
      value: value,
      timestamp: this.vectorClock.toArray(),
      userId: this.userId
    };
    
    // Apply locally
    this.state.set(field, value, operation.timestamp);
    
    // Broadcast to peers
    this.broadcast(operation);
  }

  // Merge remote operations
  merge(remoteOp) {
    // Update vector clock
    this.vectorClock.merge(remoteOp.timestamp);
    
    // Apply CRDT merge semantics
    const currentValue = this.state.get(remoteOp.field);
    
    if (!currentValue || 
        this.vectorClock.compare(
          remoteOp.timestamp, 
          currentValue.timestamp
        ) > 0) {
      // Remote operation is newer
      this.state.set(
        remoteOp.field, 
        remoteOp.value, 
        remoteOp.timestamp
      );
    }
  }
  
  // Get consistent view
  toJSON() {
    return this.state.toJSON();
  }
}`}</code>
          </pre>
        </div>

        <div className={styles.benefitsSection}>
          <h3>{t('documentation:dataSync.crdt.benefits.title') || 'Benefits of CRDTs'}</h3>
          <div className={styles.benefitsGrid}>
            <div className={styles.benefitCard}>
              <FaCheckCircle className={styles.benefitIcon} />
              <h4>{t('documentation:dataSync.crdt.benefits.consistency.title') || 'Strong Consistency'}</h4>
              <p>{t('documentation:dataSync.crdt.benefits.consistency.description') || 'Guarantees all nodes converge to the same state'}</p>
            </div>
            <div className={styles.benefitCard}>
              <FaCheckCircle className={styles.benefitIcon} />
              <h4>{t('documentation:dataSync.crdt.benefits.availability.title') || 'High Availability'}</h4>
              <p>{t('documentation:dataSync.crdt.benefits.availability.description') || 'Works even during network partitions'}</p>
            </div>
            <div className={styles.benefitCard}>
              <FaCheckCircle className={styles.benefitIcon} />
              <h4>{t('documentation:dataSync.crdt.benefits.automatic.title') || 'Automatic Resolution'}</h4>
              <p>{t('documentation:dataSync.crdt.benefits.automatic.description') || 'No manual conflict resolution needed'}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderConsensusTab = () => (
    <div className={styles.tabContent}>
      <section className={styles.syncSection}>
        <h2 className={styles.sectionTitle}>
          <FaHandshake /> {t('documentation:dataSync.consensus.title') || 'Multi-Signature Consensus'}
        </h2>

        <div className={styles.conceptExplanation}>
          <h3>{t('documentation:dataSync.consensus.concept.title') || 'When Consensus is Required'}</h3>
          <p>{t('documentation:dataSync.consensus.concept.description') || 
            'Some operations require explicit agreement from multiple parties. CyberEco implements a flexible consensus mechanism that supports various agreement patterns while maintaining security and transparency.'}</p>
        </div>

        <div className={styles.consensusFlow}>
          <h3>{t('documentation:dataSync.consensus.flow.title') || 'Consensus Flow'}</h3>
          <div className={styles.flowDiagram}>
            <div className={styles.flowStep}>
              <div className={styles.stepIcon}><FaEdit /></div>
              <h4>{t('documentation:dataSync.consensus.flow.propose') || 'Propose'}</h4>
              <p>{t('documentation:dataSync.consensus.flow.proposeDesc') || 'User proposes a change'}</p>
            </div>
            <div className={styles.flowArrow}>→</div>
            <div className={styles.flowStep}>
              <div className={styles.stepIcon}><FaBell /></div>
              <h4>{t('documentation:dataSync.consensus.flow.notify') || 'Notify'}</h4>
              <p>{t('documentation:dataSync.consensus.flow.notifyDesc') || 'All parties are notified'}</p>
            </div>
            <div className={styles.flowArrow}>→</div>
            <div className={styles.flowStep}>
              <div className={styles.stepIcon}><FaSignature /></div>
              <h4>{t('documentation:dataSync.consensus.flow.sign') || 'Sign'}</h4>
              <p>{t('documentation:dataSync.consensus.flow.signDesc') || 'Parties review and sign'}</p>
            </div>
            <div className={styles.flowArrow}>→</div>
            <div className={styles.flowStep}>
              <div className={styles.stepIcon}><FaCheckCircle /></div>
              <h4>{t('documentation:dataSync.consensus.flow.execute') || 'Execute'}</h4>
              <p>{t('documentation:dataSync.consensus.flow.executeDesc') || 'Change is applied'}</p>
            </div>
          </div>
        </div>

        <div className={styles.codeExample}>
          <h3>{t('documentation:dataSync.consensus.implementation.title') || 'Consensus Implementation'}</h3>
          <pre>
            <code>{`// Multi-signature consensus for shared data
class ConsensusManager {
  constructor(dataId, owners, rules) {
    this.dataId = dataId;
    this.owners = owners;
    this.rules = rules;
    this.proposals = new Map();
  }

  // Create a new proposal
  async createProposal(proposerId, changes) {
    if (!this.owners.includes(proposerId)) {
      throw new Error('Only owners can propose changes');
    }

    const proposal = {
      id: generateUUID(),
      dataId: this.dataId,
      proposer: proposerId,
      changes: changes,
      signatures: new Map(),
      status: 'pending',
      created: Date.now(),
      expires: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
    };

    // Proposer automatically signs
    const signature = await this.signData(changes, proposerId);
    proposal.signatures.set(proposerId, signature);

    this.proposals.set(proposal.id, proposal);

    // Notify other owners
    await this.notifyOwners(proposal);

    return proposal;
  }

  // Sign a proposal
  async signProposal(proposalId, ownerId) {
    const proposal = this.proposals.get(proposalId);
    
    if (!proposal) {
      throw new Error('Proposal not found');
    }

    if (proposal.status !== 'pending') {
      throw new Error('Proposal is not pending');
    }

    if (!this.owners.includes(ownerId)) {
      throw new Error('Only owners can sign');
    }

    // Generate signature
    const signature = await this.signData(
      proposal.changes, 
      ownerId
    );
    
    proposal.signatures.set(ownerId, signature);

    // Check if we have consensus
    if (this.hasConsensus(proposal)) {
      await this.executeProposal(proposal);
    }

    return proposal;
  }

  // Check consensus based on rules
  hasConsensus(proposal) {
    const signatureCount = proposal.signatures.size;
    const totalOwners = this.owners.length;

    switch(this.rules.consensus) {
      case 'unanimous':
        return signatureCount === totalOwners;
      
      case 'majority':
        return signatureCount > totalOwners / 2;
      
      case 'threshold':
        return signatureCount >= Math.ceil(
          totalOwners * this.rules.threshold
        );
      
      case 'custom':
        return this.rules.customLogic(
          proposal, 
          this.owners
        );
      
      default:
        return false;
    }
  }

  // Execute approved proposal
  async executeProposal(proposal) {
    // Verify all signatures
    for (const [ownerId, signature] of proposal.signatures) {
      const valid = await this.verifySignature(
        proposal.changes,
        signature,
        ownerId
      );
      
      if (!valid) {
        throw new Error('Invalid signature detected');
      }
    }

    // Apply changes
    await this.applyChanges(proposal.changes);

    // Update proposal status
    proposal.status = 'executed';
    proposal.executed = Date.now();

    // Notify all owners
    await this.notifyExecution(proposal);
  }
}`}</code>
          </pre>
        </div>

        <div className={styles.consensusPatterns}>
          <h3>{t('documentation:dataSync.consensus.patterns.title') || 'Common Consensus Patterns'}</h3>
          <div className={styles.patternGrid}>
            <div className={styles.patternCard}>
              <h4>{t('documentation:dataSync.consensus.patterns.financial.title') || 'Financial Transactions'}</h4>
              <p>{t('documentation:dataSync.consensus.patterns.financial.description') || 'Require unanimous consent from all parties'}</p>
              <code>consensus: 'unanimous'</code>
            </div>
            <div className={styles.patternCard}>
              <h4>{t('documentation:dataSync.consensus.patterns.governance.title') || 'Governance Decisions'}</h4>
              <p>{t('documentation:dataSync.consensus.patterns.governance.description') || 'Simple majority for most decisions'}</p>
              <code>consensus: 'majority'</code>
            </div>
            <div className={styles.patternCard}>
              <h4>{t('documentation:dataSync.consensus.patterns.emergency.title') || 'Emergency Actions'}</h4>
              <p>{t('documentation:dataSync.consensus.patterns.emergency.description') || 'Lower threshold for urgent matters'}</p>
              <code>threshold: 0.33</code>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderProtocolTab = () => (
    <div className={styles.tabContent}>
      <section className={styles.syncSection}>
        <h2 className={styles.sectionTitle}>
          <FaNetworkWired /> {t('documentation:dataSync.protocol.title') || 'Synchronization Protocol'}
        </h2>

        <div className={styles.protocolOverview}>
          <h3>{t('documentation:dataSync.protocol.overview.title') || 'Protocol Design'}</h3>
          <p>{t('documentation:dataSync.protocol.overview.description') || 
            'CyberEco\'s sync protocol combines peer-to-peer communication, cryptographic verification, and intelligent routing to ensure efficient and secure data synchronization across all participants.'}</p>
        </div>

        <div className={styles.protocolLayers}>
          <h3>{t('documentation:dataSync.protocol.layers.title') || 'Protocol Layers'}</h3>
          <div className={styles.layerStack}>
            <div className={styles.protocolLayer}>
              <h4>{t('documentation:dataSync.protocol.layers.application') || 'Application Layer'}</h4>
              <p>{t('documentation:dataSync.protocol.layers.applicationDesc') || 'High-level sync APIs and data models'}</p>
            </div>
            <div className={styles.protocolLayer}>
              <h4>{t('documentation:dataSync.protocol.layers.consensus') || 'Consensus Layer'}</h4>
              <p>{t('documentation:dataSync.protocol.layers.consensusDesc') || 'Multi-signature and agreement protocols'}</p>
            </div>
            <div className={styles.protocolLayer}>
              <h4>{t('documentation:dataSync.protocol.layers.sync') || 'Sync Layer'}</h4>
              <p>{t('documentation:dataSync.protocol.layers.syncDesc') || 'CRDT operations and conflict resolution'}</p>
            </div>
            <div className={styles.protocolLayer}>
              <h4>{t('documentation:dataSync.protocol.layers.transport') || 'Transport Layer'}</h4>
              <p>{t('documentation:dataSync.protocol.layers.transportDesc') || 'Encrypted peer-to-peer communication'}</p>
            </div>
          </div>
        </div>

        <div className={styles.codeExample}>
          <h3>{t('documentation:dataSync.protocol.sync.title') || 'Sync Protocol Implementation'}</h3>
          <pre>
            <code>{`// Core synchronization protocol
class SyncProtocol {
  constructor(userId, vault) {
    this.userId = userId;
    this.vault = vault;
    this.peers = new Map();
    this.syncState = new Map();
  }

  // Initialize sync for shared data
  async initSync(dataId, owners) {
    const syncChannel = {
      dataId: dataId,
      owners: owners,
      localVersion: 0,
      remoteVersions: new Map(),
      pendingOps: [],
      active: true
    };

    this.syncState.set(dataId, syncChannel);

    // Connect to peers
    for (const owner of owners) {
      if (owner !== this.userId) {
        await this.connectPeer(owner);
      }
    }

    // Start sync process
    this.startSyncLoop(dataId);
  }

  // Sync loop for a data item
  async startSyncLoop(dataId) {
    const channel = this.syncState.get(dataId);
    
    while (channel.active) {
      try {
        // 1. Fetch local changes
        const localOps = await this.getLocalOperations(
          dataId, 
          channel.localVersion
        );

        // 2. Exchange with peers
        for (const [peerId, peer] of this.peers) {
          if (channel.owners.includes(peerId)) {
            await this.exchangeOperations(
              peer, 
              dataId, 
              localOps
            );
          }
        }

        // 3. Process received operations
        await this.processReceivedOps(dataId);

        // 4. Update local version
        channel.localVersion = await this.getLatestVersion(dataId);

        // 5. Wait before next sync
        await this.wait(1000); // 1 second

      } catch (error) {
        console.error('Sync error:', error);
        await this.handleSyncError(dataId, error);
      }
    }
  }

  // Exchange operations with a peer
  async exchangeOperations(peer, dataId, localOps) {
    // Send our operations
    const response = await peer.send({
      type: 'sync',
      dataId: dataId,
      operations: localOps,
      vectorClock: this.getVectorClock(dataId)
    });

    // Receive their operations
    if (response.operations.length > 0) {
      const channel = this.syncState.get(dataId);
      channel.pendingOps.push(...response.operations);
    }

    // Update remote version tracking
    this.updateRemoteVersion(
      dataId, 
      peer.id, 
      response.vectorClock
    );
  }

  // Process received operations
  async processReceivedOps(dataId) {
    const channel = this.syncState.get(dataId);
    const pending = channel.pendingOps;
    channel.pendingOps = [];

    // Sort by vector clock for causal ordering
    pending.sort((a, b) => 
      this.compareVectorClocks(a.vectorClock, b.vectorClock)
    );

    // Apply operations
    for (const op of pending) {
      await this.applyOperation(dataId, op);
    }
  }

  // Handle offline/online transitions
  async handleConnectivityChange(online) {
    if (online) {
      // Resume all sync channels
      for (const [dataId, channel] of this.syncState) {
        if (!channel.active) {
          channel.active = true;
          this.startSyncLoop(dataId);
        }
      }
    } else {
      // Pause sync but keep collecting local changes
      for (const channel of this.syncState.values()) {
        channel.active = false;
      }
    }
  }
}`}</code>
          </pre>
        </div>

        <div className={styles.performanceSection}>
          <h3>{t('documentation:dataSync.protocol.performance.title') || 'Performance Optimizations'}</h3>
          <div className={styles.optimizationGrid}>
            <div className={styles.optimizationCard}>
              <FaBolt className={styles.optimizationIcon} />
              <h4>{t('documentation:dataSync.protocol.performance.delta.title') || 'Delta Sync'}</h4>
              <p>{t('documentation:dataSync.protocol.performance.delta.description') || 'Only sync changes, not entire documents'}</p>
            </div>
            <div className={styles.optimizationCard}>
              <FaCogs className={styles.optimizationIcon} />
              <h4>{t('documentation:dataSync.protocol.performance.compression.title') || 'Compression'}</h4>
              <p>{t('documentation:dataSync.protocol.performance.compression.description') || 'Compress data before transmission'}</p>
            </div>
            <div className={styles.optimizationCard}>
              <FaNetworkWired className={styles.optimizationIcon} />
              <h4>{t('documentation:dataSync.protocol.performance.batching.title') || 'Batching'}</h4>
              <p>{t('documentation:dataSync.protocol.performance.batching.description') || 'Group multiple operations together'}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderExamplesTab = () => (
    <div className={styles.tabContent}>
      <section className={styles.syncSection}>
        <h2 className={styles.sectionTitle}>
          <FaCogs /> {t('documentation:dataSync.examples.title') || 'Real-World Examples'}
        </h2>

        <div className={styles.exampleSection}>
          <h3>{t('documentation:dataSync.examples.justsplit.title') || 'JustSplit: Shared Expense Management'}</h3>
          <p>{t('documentation:dataSync.examples.justsplit.description') || 
            'See how JustSplit uses multi-party synchronization to manage shared expenses with real-time updates and consensus-based settlement.'}</p>

          <div className={styles.codeExample}>
            <pre>
              <code>{`// JustSplit expense synchronization
class JustSplitSync {
  // Create a shared expense
  async createSharedExpense(expense, participants) {
    // Initialize shared data structure
    const sharedExpense = {
      id: generateUUID(),
      type: 'SHARED_EXPENSE',
      data: expense,
      owners: participants.map(p => p.userId),
      state: 'draft',
      rules: {
        modify: 'all',     // Everyone must agree
        settle: 'any',     // Anyone can mark as paid
        delete: 'creator'  // Only creator can delete
      }
    };

    // Create CRDT for expense data
    const expenseCRDT = new ORMap();
    expenseCRDT.set('amount', expense.amount);
    expenseCRDT.set('description', expense.description);
    expenseCRDT.set('splits', expense.splits);

    // Initialize sync for all participants
    await this.syncProtocol.initSync(
      sharedExpense.id,
      sharedExpense.owners
    );

    // Notify participants
    await this.notifyParticipants(
      participants,
      'New shared expense',
      sharedExpense
    );

    return sharedExpense;
  }

  // Update expense with consensus
  async updateExpense(expenseId, changes, userId) {
    // Create proposal for changes
    const proposal = await this.consensus.createProposal(
      userId,
      {
        type: 'UPDATE_EXPENSE',
        expenseId: expenseId,
        changes: changes
      }
    );

    // Wait for other participants to review
    await this.waitForConsensus(proposal);

    // Apply changes using CRDT
    const expenseCRDT = await this.getCRDT(expenseId);
    
    for (const [key, value] of Object.entries(changes)) {
      expenseCRDT.set(key, value);
    }

    // Sync with all participants
    await this.syncProtocol.broadcastUpdate(
      expenseId,
      changes
    );
  }

  // Real-time expense tracking
  subscribeToExpense(expenseId, callback) {
    // Listen for CRDT changes
    this.syncProtocol.on(
      \`update:\${expenseId}\`,
      (update) => {
        const expense = this.getExpenseView(expenseId);
        callback(expense);
      }
    );

    // Listen for consensus events
    this.consensus.on(
      \`proposal:\${expenseId}\`,
      (proposal) => {
        callback({
          type: 'PROPOSAL',
          proposal: proposal
        });
      }
    );
  }
}`}</code>
            </pre>
          </div>
        </div>

        <div className={styles.exampleSection}>
          <h3>{t('documentation:dataSync.examples.demos.title') || 'Demos: Community Governance'}</h3>
          <p>{t('documentation:dataSync.examples.demos.description') || 
            'Learn how Demos implements democratic decision-making with transparent voting and immutable records.'}</p>

          <div className={styles.codeExample}>
            <pre>
              <code>{`// Demos voting synchronization
class DemosVoting {
  // Create community proposal
  async createProposal(proposal, community) {
    const votingData = {
      id: generateUUID(),
      type: 'COMMUNITY_PROPOSAL',
      proposal: proposal,
      community: community.id,
      votes: new CRDTCounter(),
      comments: new ORSet(),
      state: 'open',
      rules: {
        vote: 'community_member',
        comment: 'any_user',
        close: 'auto_after_period'
      }
    };

    // Initialize immutable vote ledger
    const voteLedger = new ImmutableLog();
    
    // Set up real-time sync
    await this.syncProtocol.initSync(
      votingData.id,
      community.members
    );

    return votingData;
  }

  // Cast vote with verification
  async castVote(proposalId, vote, userId) {
    // Verify voter eligibility
    const eligible = await this.verifyEligibility(
      userId,
      proposalId
    );
    
    if (!eligible) {
      throw new Error('Not eligible to vote');
    }

    // Create signed vote
    const signedVote = {
      proposalId: proposalId,
      voter: userId,
      choice: vote,
      timestamp: Date.now(),
      signature: await this.signVote(vote, userId)
    };

    // Add to immutable ledger
    await this.voteLedger.append(signedVote);

    // Update vote count (CRDT)
    const proposal = await this.getProposal(proposalId);
    proposal.votes.increment(vote);

    // Broadcast to community
    await this.syncProtocol.broadcast({
      type: 'VOTE_CAST',
      proposalId: proposalId,
      vote: signedVote
    });
  }
}`}</code>
            </pre>
          </div>
        </div>

        <div className={styles.integrationGuide}>
          <h3>{t('documentation:dataSync.examples.integration.title') || 'Integration Guide'}</h3>
          <div className={styles.integrationSteps}>
            <div className={styles.integrationStep}>
              <div className={styles.stepNumber}>1</div>
              <h4>{t('documentation:dataSync.examples.integration.step1') || 'Define Data Model'}</h4>
              <p>{t('documentation:dataSync.examples.integration.step1Desc') || 'Choose ownership type and sync requirements'}</p>
            </div>
            <div className={styles.integrationStep}>
              <div className={styles.stepNumber}>2</div>
              <h4>{t('documentation:dataSync.examples.integration.step2') || 'Select CRDT Type'}</h4>
              <p>{t('documentation:dataSync.examples.integration.step2Desc') || 'Pick appropriate CRDT for your use case'}</p>
            </div>
            <div className={styles.integrationStep}>
              <div className={styles.stepNumber}>3</div>
              <h4>{t('documentation:dataSync.examples.integration.step3') || 'Implement Sync'}</h4>
              <p>{t('documentation:dataSync.examples.integration.step3Desc') || 'Use SyncProtocol class for automatic sync'}</p>
            </div>
            <div className={styles.integrationStep}>
              <div className={styles.stepNumber}>4</div>
              <h4>{t('documentation:dataSync.examples.integration.step4') || 'Handle Conflicts'}</h4>
              <p>{t('documentation:dataSync.examples.integration.step4Desc') || 'Define resolution strategies for edge cases'}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const tabs: Tab[] = [
    {
      id: 'overview',
      label: t('documentation:dataSync.tabs.overview') || 'Overview',
      content: renderOverviewTab()
    },
    {
      id: 'crdt',
      label: t('documentation:dataSync.tabs.crdt') || 'CRDTs',
      content: renderCRDTTab()
    },
    {
      id: 'consensus',
      label: t('documentation:dataSync.tabs.consensus') || 'Consensus',
      content: renderConsensusTab()
    },
    {
      id: 'protocol',
      label: t('documentation:dataSync.tabs.protocol') || 'Protocol',
      content: renderProtocolTab()
    },
    {
      id: 'examples',
      label: t('documentation:dataSync.tabs.examples') || 'Examples',
      content: renderExamplesTab()
    }
  ];

  return (
    <div className={styles.pageContainer}>
      <DocumentationHero
        icon={<FaSync />}
        title={t('documentation:dataSync.title') || 'Data Synchronization'}
        subtitle={t('documentation:dataSync.subtitle') || 'Real-time, conflict-free synchronization for decentralized collaboration'}
        gradient="linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #8b5cf6 100%)"
      />

      <div className={styles.tabsContainer}>
        <DocumentationTabs tabs={tabs} />
      </div>
    </div>
  );
}