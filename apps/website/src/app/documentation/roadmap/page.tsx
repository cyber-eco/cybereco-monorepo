'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useI18n } from '@cybereco/i18n';
import parentStyles from '../page.module.css';
import styles from './page.module.css';

export default function RoadmapPage() {
  const { t } = useI18n();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={parentStyles.container}>Loading...</div>;
  }

  return (
    <div className={parentStyles.container}>
      <div className={parentStyles.pageHeader}>
        <h1 className={parentStyles.title}>{t('documentation:documentationPage.roadmapDocTitle') || 'Development Roadmap'}</h1>
        <p className={parentStyles.subtitle}>{t('documentation:documentationPage.roadmapDocSummary') || 'Our journey towards a decentralized, human-centered digital ecosystem'}</p>
      </div>

      <div className={parentStyles.docGrid}>
        <nav className={parentStyles.sidebar}>
          <div className={parentStyles.navSection}>
            <h3>{t('documentation:documentationPage.tableOfContents') || 'Table of Contents'}</h3>
            <ul>
              <li>
                <a href="#vision-overview" className={parentStyles.navLink}>🌟 Vision Overview</a>
              </li>
              <li>
                <a href="#current-status" className={parentStyles.navLink}>🎯 Current Status</a>
              </li>
              <li>
                <a href="#phase-2" className={parentStyles.navLink}>🔥 Phase 2: Stabilization</a>
              </li>
              <li>
                <a href="#phase-3" className={parentStyles.navLink}>🔄 Phase 3: Integration & MVPs</a>
              </li>
              <li>
                <a href="#phase-4" className={parentStyles.navLink}>🌱 Phase 4: Green Impact</a>
              </li>
              <li>
                <a href="#phase-5" className={parentStyles.navLink}>🎨 Phase 5: Personalization</a>
              </li>
              <li>
                <a href="#phase-6" className={parentStyles.navLink}>🌐 Phase 6: Platform Integration</a>
              </li>
              <li>
                <a href="#phase-7" className={parentStyles.navLink}>🔮 Phase 7: Decentralized Transition</a>
              </li>
              <li>
                <a href="#phase-8" className={parentStyles.navLink}>🌐 Phase 8: Full Decentralization</a>
              </li>
              <li>
                <a href="#success-metrics" className={parentStyles.navLink}>📊 Success Metrics</a>
              </li>
              <li>
                <a href="#how-to-contribute" className={parentStyles.navLink}>🤝 How to Contribute</a>
              </li>
            </ul>
          </div>
        </nav>

        <main className={parentStyles.content}>
          <section id="vision-overview" className={parentStyles.contentSection}>
            <h2>🌟 Vision Overview</h2>
            <p>
              CyberEco's development follows a <strong>three-phase evolution</strong>:
            </p>
            <ol className={parentStyles.numberedList}>
              <li>
                <strong>🏗️ Centralized Foundation (2025-2026)</strong> - Build robust applications on traditional infrastructure
              </li>
              <li>
                <strong>🔄 Hybrid Transition (2030-2035)</strong> - Introduce decentralized features while maintaining compatibility
              </li>
              <li>
                <strong>🌐 Decentralized Ecosystem (2035+)</strong> - Full peer-to-peer, blockchain-native architecture
              </li>
            </ol>
            <p>
              This roadmap ensures we deliver value immediately while building toward our revolutionary future.
            </p>
          </section>

          <section id="current-status" className={parentStyles.contentSection}>
            <h2>🎯 Current Status</h2>
            
            <div className={styles.phaseCard}>
              <h3>✅ Phase 1: Foundation (Completed)</h3>
              <ul className={styles.checkList}>
                <li className={styles.completed}>NX monorepo setup with proper configuration</li>
                <li className={styles.completed}>Basic Hub and JustSplit application structure</li>
                <li className={styles.completed}>Shared libraries (types, Firebase config, UI components)</li>
                <li className={styles.completed}>Firebase emulator integration</li>
                <li className={styles.completed}>Development workflow and comprehensive documentation</li>
                <li className={styles.completed}>Platform branding and architecture documentation</li>
                <li className={styles.completed}>Multi-project Firebase setup for centralized authentication</li>
              </ul>
            </div>
          </section>

          <section id="phase-2" className={parentStyles.contentSection}>
            <h2>🔥 Phase 2: Stabilization (Current Priority)</h2>
            <div className={styles.phaseInfo}>
              <p><strong>Timeline:</strong> Next 1-2 Months</p>
              <p><strong>Goal:</strong> Make core applications stable, usable and production-ready</p>
            </div>

            <h3>🚨 Critical Issues (Fix First)</h3>
            
            <div className={parentStyles.subsection}>
              <h4>JustSplit Runtime Fixes</h4>
              <ul className={styles.todoList}>
                <li>
                  <strong>Fix component prop type errors</strong>
                  <ul>
                    <li>Update DashboardHeader props interface</li>
                    <li>Fix RecentSettlements component props</li>
                    <li>Resolve TypeScript compilation errors</li>
                  </ul>
                </li>
                <li>
                  <strong>Implement proper data flow</strong>
                  <ul>
                    <li>Fix useEffect infinite loops</li>
                    <li>Add proper loading states</li>
                    <li>Handle empty/undefined data gracefully</li>
                  </ul>
                </li>
                <li>
                  <strong>Add error boundaries</strong>
                  <ul>
                    <li>Wrap components in error boundaries</li>
                    <li>Add fallback UI for errors</li>
                    <li>Implement proper error logging</li>
                  </ul>
                </li>
              </ul>
            </div>

            <div className={parentStyles.subsection}>
              <h4>Hub Application Core Features</h4>
              <ul className={styles.checkList}>
                <li className={styles.completed}>
                  <strong>Enhanced Landing Page</strong>
                  <ul>
                    <li className={styles.completed}>Modern hero section with statistics</li>
                    <li className={styles.completed}>Feature showcase</li>
                    <li className={styles.completed}>App discovery section</li>
                    <li className={styles.completed}>Developer-friendly documentation</li>
                  </ul>
                </li>
                <li className={styles.completed}>
                  <strong>Intelligent Proxy System</strong>
                  <ul>
                    <li className={styles.completed}>Automatic routing to ecosystem apps</li>
                    <li className={styles.completed}>Security header injection</li>
                    <li className={styles.completed}>CORS handling</li>
                    <li className={styles.completed}>Coming soon pages for future apps</li>
                  </ul>
                </li>
                <li className={styles.completed}>
                  <strong>Authentication system</strong>
                  <ul>
                    <li className={styles.completed}>User registration form</li>
                    <li className={styles.completed}>Login form with validation</li>
                    <li className={styles.completed}>Password reset functionality</li>
                    <li className={styles.completed}>Basic user profile management</li>
                  </ul>
                </li>
              </ul>
            </div>

            <div className={styles.codeBlock}>
              <h4>📋 Detailed Action Items</h4>
              <pre>
                <code>{`# Week 1: JustSplit Stabilization
- Day 1-2: Fix Type Errors
  - Fix src/app/page.tsx component prop issues
  - Update component interfaces in Dashboard components
  - Resolve import path issues

- Day 3-4: Data Flow
  - Fix useEffect dependencies in page.tsx
  - Add proper state management for dashboard data
  - Implement loading states for all components

- Day 5-7: Testing & Polish
  - Add unit tests for fixed components
  - Test all pages and navigation
  - Fix any remaining runtime errors

# Week 2: Hub Development
- Day 1-3: Authentication Forms
  - Create registration form component
  - Create login form component
  - Add form validation and error handling

- Day 4-5: Dashboard
  - Build app launcher dashboard
  - Add navigation to JustSplit
  - Implement user profile basics

- Day 6-7: Integration Testing
  - Test Hub to JustSplit navigation
  - Ensure authentication flow works
  - Fix any integration issues`}</code>
              </pre>
            </div>
          </section>

          <section id="phase-3" className={parentStyles.contentSection}>
            <h2>🔄 Phase 3: Integration & Priority MVPs (Next 2-4 Months)</h2>
            <div className={styles.phaseInfo}>
              <p><strong>Timeline:</strong> Months 3-6</p>
              <p><strong>Goal:</strong> Create seamless cross-app experience and launch priority applications</p>
            </div>

            <h3>Strategic Milestones</h3>
            <ul className={styles.milestoneList}>
              <li><strong>Month 3-4:</strong> Launch Demos MVP for community governance validation</li>
              <li><strong>Month 4:</strong> Integrate EthicalAds for sustainable monetization</li>
              <li><strong>Month 5:</strong> Release Conciliation MVP with AI-assisted legal workflows</li>
              <li><strong>Month 6:</strong> Complete CyberEco Hub v1 integration with all core apps</li>
            </ul>

            <div className={parentStyles.subsection}>
              <h4>Cross-App Authentication</h4>
              <ul className={styles.todoList}>
                <li>
                  <strong>Token-based authentication</strong>
                  <ul>
                    <li>Implement JWT token generation in Hub</li>
                    <li>Add token verification in JustSplit</li>
                    <li>Create secure token exchange mechanism</li>
                  </ul>
                </li>
                <li>
                  <strong>User session management</strong>
                  <ul>
                    <li>Persistent login across apps</li>
                    <li>Automatic token refresh</li>
                    <li>Secure logout from all apps</li>
                  </ul>
                </li>
              </ul>
            </div>
          </section>

          <section id="phase-4" className={parentStyles.contentSection}>
            <h2>🌱 Phase 4: Green Impact & Wellness (Months 7-10)</h2>
            <div className={styles.phaseInfo}>
              <p><strong>Timeline:</strong> Months 7-10</p>
              <p><strong>Goal:</strong> Launch sustainability and wellness applications with community focus</p>
            </div>

            <h3>Strategic Applications Launch</h3>
            <ul className={styles.milestoneList}>
              <li><strong>Month 7:</strong> Launch Plantopia MVP (IoT + plant database + community)</li>
              <li><strong>Month 8:</strong> Deploy EcoTul (sustainable product recommendations)</li>
              <li><strong>Month 9:</strong> Release Healthy (habit tracking + wellness community)</li>
              <li><strong>Month 10:</strong> Launch EducationHub (modular learning paths)</li>
            </ul>

            <div className={parentStyles.subsection}>
              <h4>Infrastructure Developments</h4>
              <ul className={styles.todoList}>
                <li>
                  <strong>Privacy Layer Implementation</strong>
                  <ul>
                    <li>Deploy identity privacy controls</li>
                    <li>User data sovereignty features</li>
                    <li>Granular permission management</li>
                  </ul>
                </li>
                <li>
                  <strong>Community Workshop Program</strong>
                  <ul>
                    <li>First community engagement workshop</li>
                    <li>User feedback integration system</li>
                    <li>Community governance validation</li>
                  </ul>
                </li>
              </ul>
            </div>
          </section>

          <section id="phase-5" className={parentStyles.contentSection}>
            <h2>🎨 Phase 5: Personalization & Extended Community (Months 11-14)</h2>
            <div className={styles.phaseInfo}>
              <p><strong>Timeline:</strong> Months 11-14</p>
              <p><strong>Goal:</strong> Build identity-based tools and personal digital empowerment</p>
            </div>

            <h3>Personal Empowerment Suite</h3>
            <ul className={styles.milestoneList}>
              <li><strong>Month 11:</strong> Launch MyProjects & MyCareer (professional tracking)</li>
              <li><strong>Month 12:</strong> Deploy DigitalMe (public/private profiles with digital footprint control)</li>
              <li><strong>Month 13:</strong> Release Somos (family roots explorer)</li>
              <li><strong>Month 14:</strong> Launch RememberMe (personal storytelling and emotional archive)</li>
            </ul>

            <div className={parentStyles.subsection}>
              <h4>Advanced Features</h4>
              <ul className={styles.todoList}>
                <li>
                  <strong>DAO Governance Testing</strong>
                  <ul>
                    <li>First decentralized governance prototype</li>
                    <li>Community voting mechanisms</li>
                    <li>Transparent decision-making processes</li>
                  </ul>
                </li>
                <li>
                  <strong>Global Expansion Preparation</strong>
                  <ul>
                    <li>Internationalization infrastructure</li>
                    <li>Multi-language support framework</li>
                    <li>Cultural adaptation guidelines</li>
                  </ul>
                </li>
              </ul>
            </div>
          </section>

          <section id="phase-6" className={parentStyles.contentSection}>
            <h2>🌐 Phase 6: Platform Integration & Marketplace (Months 15-18)</h2>
            <div className={styles.phaseInfo}>
              <p><strong>Timeline:</strong> Months 15-18</p>
              <p><strong>Goal:</strong> Create unified ecosystem with B2B capabilities and ethical marketplace</p>
            </div>

            <h3>Platform Consolidation</h3>
            <ul className={styles.milestoneList}>
              <li><strong>Month 15:</strong> Product integration through shared events and data</li>
              <li><strong>Month 16:</strong> B2B integration (universities, cooperatives, municipalities)</li>
              <li><strong>Month 17:</strong> Launch CyberEco One-Subscription Model</li>
              <li><strong>Month 18:</strong> Public launch as complete digital life operating system</li>
            </ul>

            <div className={parentStyles.subsection}>
              <h4>Ecosystem Expansion</h4>
              <ul className={styles.todoList}>
                <li>
                  <strong>Ethical Marketplace</strong>
                  <ul>
                    <li>Marketplace for ethical modules and extensions</li>
                    <li>Community-driven application development</li>
                    <li>Revenue sharing with creators</li>
                  </ul>
                </li>
                <li>
                  <strong>Enterprise Integration</strong>
                  <ul>
                    <li>API gateway for third-party integrations</li>
                    <li>White-label solutions for organizations</li>
                    <li>Compliance frameworks for institutional use</li>
                  </ul>
                </li>
              </ul>
            </div>
          </section>

          <section id="phase-7" className={parentStyles.contentSection}>
            <h2>🔮 Phase 7: Decentralized Transition (Year 5-10)</h2>
            <div className={styles.phaseInfo}>
              <p><strong>Timeline:</strong> Years 5-10 (2030-2035)</p>
              <p><strong>Goal:</strong> Begin transition to decentralized architecture</p>
            </div>

            <h3>Blockchain Foundation</h3>
            <div className={parentStyles.subsection}>
              <h4>Identity Layer Development</h4>
              <ul className={styles.todoList}>
                <li>Implement decentralized identity (DID) system</li>
                <li>Create cryptographic key management</li>
                <li>Design self-sovereign identity flows</li>
                <li>Build identity recovery mechanisms</li>
              </ul>
            </div>

            <div className={parentStyles.subsection}>
              <h4>Data Sovereignty Infrastructure</h4>
              <ul className={styles.todoList}>
                <li>Develop client-side encryption protocols</li>
                <li>Implement zero-knowledge proof system</li>
                <li>Create selective data sharing mechanisms</li>
                <li>Build user-controlled access management</li>
              </ul>
            </div>

            <h3>P2P Network Prototype</h3>
            <div className={parentStyles.subsection}>
              <h4>Mobile Node Architecture</h4>
              <ul className={styles.todoList}>
                <li>Design mobile device node software</li>
                <li>Implement peer discovery protocols</li>
                <li>Create data synchronization system</li>
                <li>Build incentive mechanism prototype</li>
              </ul>
            </div>

            <div className={parentStyles.subsection}>
              <h4>Hybrid Mode Implementation</h4>
              <ul className={styles.todoList}>
                <li>Run parallel centralized/decentralized systems</li>
                <li>Create migration tools for existing data</li>
                <li>Implement user choice between modes</li>
                <li>Test network resilience and performance</li>
              </ul>
            </div>
          </section>

          <section id="phase-8" className={parentStyles.contentSection}>
            <h2>🌐 Phase 8: Full Decentralization (Year 10+)</h2>
            <div className={styles.phaseInfo}>
              <p><strong>Timeline:</strong> Year 10+ (2035+)</p>
              <p><strong>Goal:</strong> Complete transition to decentralized ecosystem</p>
            </div>

            <h3>Network Maturation</h3>
            <div className={parentStyles.subsection}>
              <h4>Scalable P2P Infrastructure</h4>
              <ul className={styles.todoList}>
                <li>Launch production P2P network</li>
                <li>Implement advanced consensus mechanisms</li>
                <li>Deploy automatic load balancing</li>
                <li>Create network governance protocols</li>
              </ul>
            </div>

            <div className={parentStyles.subsection}>
              <h4>Economic Model Implementation</h4>
              <ul className={styles.todoList}>
                <li>Launch platform token system</li>
                <li>Implement participation rewards</li>
                <li>Create decentralized governance</li>
                <li>Build sustainable tokenomics</li>
              </ul>
            </div>

            <h3>Advanced Features</h3>
            <div className={parentStyles.subsection}>
              <h4>AI-Powered Insights</h4>
              <ul className={styles.todoList}>
                <li>Privacy-preserving analytics</li>
                <li>Decentralized machine learning</li>
                <li>Personalized recommendations</li>
                <li>Collective intelligence features</li>
              </ul>
            </div>

            <div className={styles.platformDiagram}>
              <h4>Full Platform Application Suite (2035+)</h4>
              <pre className={styles.asciiDiagram}>
{`┌──────────────────────────────────────────────────────────────────────┐
│                         CYBERECO PLATFORM                            │
├──────────────┬──────────────┬───────────────┬────────────────────────┤
│ COMMUNITY &  │ FINANCE &    │ IDENTITY &   │ LIFESTYLE &            │
│ GOVERNANCE   │ ECONOMY      │ SECURITY     │ WELLBEING              │
├──────────────┼──────────────┼───────────────┼────────────────────────┤
│ ✓ Demos      │ ✓ JustSplit  │ ✓ Hub        │ ✓ Plantopia           │
│ ✓ Somos      │   MyWealth   │   MyData     │   Healthy             │
│   Community  │   MyBusiness │   DigitalMe  │   PetPal              │
│   Manager    │   CrowdFund  │   MyDocs     │   TimeSync            │
│   MyCommunity│   OfferMe    │   GovAccess  │   Education Hub       │
│   Conciliation   CrowdPool  │   LawPal     │   OneStep             │
└──────────────┴──────────────┴───────────────┴────────────────────────┘
          |             |              |              |
          v             v              v              v
┌─────────────────────────────────────────────────────────────────────┐
│                      DECENTRALIZED INFRASTRUCTURE                   │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────┐  ┌───────────┐  │
│  │ Self-       │  │ Distributed  │  │ Zero-      │  │ Token     │  │
│  │ Sovereign   │  │ Data Storage │  │ Knowledge  │  │ Incentive │  │
│  │ Identity    │  │ Layer        │  │ Proofs     │  │ System    │  │
│  └─────────────┘  └──────────────┘  └────────────┘  └───────────┘  │
└─────────────────────────────────────────────────────────────────────┘`}
              </pre>
            </div>
          </section>

          <section id="success-metrics" className={parentStyles.contentSection}>
            <h2>📊 Success Metrics</h2>
            
            <div className={styles.metricsGrid}>
              <div className={styles.metricCard}>
                <h3>Phase 2 (Stabilization)</h3>
                <ul className={styles.checkList}>
                  <li>Zero runtime errors in both applications</li>
                  <li>All TypeScript compilation errors resolved</li>
                  <li>Basic authentication working in Hub</li>
                  <li>Navigation between Hub and JustSplit functional</li>
                </ul>
              </div>

              <div className={styles.metricCard}>
                <h3>Phase 3 (Integration)</h3>
                <ul className={styles.checkList}>
                  <li>Cross-app authentication working</li>
                  <li>Production Firebase setup complete</li>
                  <li>Test coverage &gt;70%</li>
                  <li>E2E tests covering main user flows</li>
                </ul>
              </div>

              <div className={styles.metricCard}>
                <h3>Phase 4 (Enhancement)</h3>
                <ul className={styles.checkList}>
                  <li>Performance score &gt;90 in Lighthouse</li>
                  <li>CI/CD pipeline fully automated</li>
                  <li>Error tracking and monitoring active</li>
                  <li>JustSplit feature-complete</li>
                </ul>
              </div>

              <div className={styles.metricCard}>
                <h3>Phase 5 (Expansion)</h3>
                <ul className={styles.checkList}>
                  <li>Three priority applications launched</li>
                  <li>Platform-wide features implemented</li>
                  <li>User base growth &gt;500 active users</li>
                  <li>Community contributions active</li>
                </ul>
              </div>

              <div className={styles.metricCard}>
                <h3>Phase 6 (Consolidation)</h3>
                <ul className={styles.checkList}>
                  <li>Mobile applications for core platform apps</li>
                  <li>All planned secondary applications launched</li>
                  <li>API gateway operational</li>
                  <li>User base growth &gt;50k active users</li>
                  <li>Economic sustainability</li>
                  <li>Real World Impact</li>
                  <li>20+ open source collaborations</li>
                </ul>
              </div>

              <div className={styles.metricCard}>
                <h3>Phase 7 Success Criteria (2037)</h3>
                <ul className={styles.checkList}>
                  <li>1,000+ active nodes in P2P network</li>
                  <li>Zero data breaches with new architecture</li>
                  <li>50%+ user adoption of decentralized features</li>
                  <li>Sub-second response times on mobile nodes</li>
                </ul>
              </div>

              <div className={styles.metricCard}>
                <h3>Phase 8 Success Criteria (2040)</h3>
                <ul className={styles.checkList}>
                  <li>100% user data sovereignty achieved</li>
                  <li>Network operates without central infrastructure</li>
                  <li>Sustainable token economy established</li>
                  <li>Active developer ecosystem (10+ third-party apps)</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="how-to-contribute" className={parentStyles.contentSection}>
            <h2>🤝 How to Contribute</h2>
            
            <div className={parentStyles.subsection}>
              <h3>For Current Phase (Stabilization)</h3>
              <ol className={parentStyles.numberedList}>
                <li>
                  <strong>Pick an issue from "Critical Issues" section</strong>
                </li>
                <li>
                  <strong>Create a branch:</strong> <code>git checkout -b fix/issue-name</code>
                </li>
                <li>
                  <strong>Make changes and test thoroughly</strong>
                </li>
                <li>
                  <strong>Submit PR with clear description</strong>
                </li>
              </ol>
            </div>

            <div className={parentStyles.subsection}>
              <h3>For Future Phases</h3>
              <ol className={parentStyles.numberedList}>
                <li>
                  <strong>Review upcoming features in later phases</strong>
                </li>
                <li>
                  <strong>Discuss ideas in GitHub discussions</strong>
                </li>
                <li>
                  <strong>Create feature proposals</strong>
                </li>
                <li>
                  <strong>Help with documentation and testing</strong>
                </li>
              </ol>
            </div>
          </section>

          <section className={parentStyles.contentSection}>
            <h2>🚀 Innovation Drivers</h2>

            <div className={parentStyles.subsection}>
              <h3>Technology Enablers</h3>
              <ol className={parentStyles.numberedList}>
                <li><strong>Mobile Hardware Advancement</strong> - Increasing computational power of smartphones</li>
                <li><strong>5G/6G Networks</strong> - Higher bandwidth enabling device-to-device communication</li>
                <li><strong>Battery Technology</strong> - Longer battery life supporting continuous network participation</li>
                <li><strong>Cryptographic Advances</strong> - More efficient zero-knowledge proofs and encryption</li>
                <li><strong>Edge Computing</strong> - Distributed computational capabilities at network edges</li>
              </ol>
            </div>

            <div className={parentStyles.subsection}>
              <h3>Market Opportunity</h3>
              <ul className={styles.featureList}>
                <li><strong>Data Privacy Concerns</strong> - Growing user demand for data sovereignty</li>
                <li><strong>Platform Dependence</strong> - Desire to escape big tech monopolies</li>
                <li><strong>Economic Participation</strong> - Users want to earn from their data and participation</li>
                <li><strong>Global Accessibility</strong> - Need for censorship-resistant, globally accessible platforms</li>
                <li><strong>Digital Wellbeing Movement</strong> - Growing demand for ethical technology design</li>
              </ul>
            </div>
          </section>

          <section className={parentStyles.contentSection}>
            <h2>💡 Key Architectural Decisions</h2>

            <div className={parentStyles.subsection}>
              <h3>Hybrid-First Approach</h3>
              <ul className={styles.featureList}>
                <li>Users can choose centralized or decentralized modes</li>
                <li>Gradual migration path reduces user friction</li>
                <li>Compatibility maintained during transition</li>
                <li>Risk mitigation through parallel systems</li>
              </ul>
            </div>

            <div className={parentStyles.subsection}>
              <h3>Mobile-Native Design</h3>
              <ul className={styles.featureList}>
                <li>Smartphones as primary network nodes</li>
                <li>Optimized for battery and bandwidth constraints</li>
                <li>Seamless offline/online operation</li>
                <li>Progressive Web App architecture</li>
              </ul>
            </div>

            <div className={parentStyles.subsection}>
              <h3>Privacy by Design</h3>
              <ul className={styles.featureList}>
                <li>Zero-knowledge proofs for all sensitive operations</li>
                <li>Client-side encryption as default</li>
                <li>Minimal data collection principles</li>
                <li>User-controlled granular permissions</li>
              </ul>
            </div>
          </section>

          <section className={parentStyles.contentSection}>
            <h2>🛣️ Migration Strategy</h2>

            <div className={parentStyles.subsection}>
              <h3>Data Migration Path</h3>
              <ol className={parentStyles.numberedList}>
                <li><strong>Phase 7:</strong> Dual-mode operation (centralized + decentralized)</li>
                <li><strong>User Choice:</strong> Opt-in to decentralized features</li>
                <li><strong>Gradual Transition:</strong> Move services piece by piece</li>
                <li><strong>Phase 8:</strong> Full decentralization with legacy support</li>
              </ol>
            </div>

            <div className={parentStyles.subsection}>
              <h3>User Education & Onboarding</h3>
              <ul className={styles.featureList}>
                <li><strong>Educational Content:</strong> Explain benefits of decentralization</li>
                <li><strong>Gradual Introduction:</strong> Start with simple privacy features</li>
                <li><strong>Incentive Alignment:</strong> Reward early adopters</li>
                <li><strong>Community Building:</strong> Foster user-to-user education</li>
              </ul>
            </div>
          </section>

          <section className={parentStyles.contentSection}>
            <h2>🔗 Integration Points</h2>

            <div className={parentStyles.subsection}>
              <h3>Current Architecture → Decentralized</h3>
              <ul className={styles.featureList}>
                <li><strong>Firebase Auth</strong> → Self-Sovereign Identity</li>
                <li><strong>Firestore Database</strong> → Distributed Data Layer</li>
                <li><strong>Cloud Functions</strong> → Smart Contracts</li>
                <li><strong>Firebase Hosting</strong> → P2P Content Distribution</li>
              </ul>
            </div>

            <div className={parentStyles.subsection}>
              <h3>Backward Compatibility</h3>
              <ul className={styles.featureList}>
                <li>API gateways for legacy applications</li>
                <li>Data export/import tools</li>
                <li>User migration assistants</li>
                <li>Gradual feature deprecation timeline</li>
              </ul>
            </div>
          </section>

          <div className={styles.callToAction}>
            <h2>📝 This roadmap bridges our immediate development needs with our transformative long-term vision</h2>
            <p>💬 Each phase builds toward user sovereignty, privacy, and community empowerment</p>
          </div>

          <div className={parentStyles.codeSection}>
            <h3>{t('documentation:documentationPage.nextSteps') || 'Next Steps'}</h3>
            <div className={parentStyles.featureGrid}>
              <Link href="/documentation/philosophy" className={parentStyles.featureCard}>
                <div className={parentStyles.featureIcon}>📜</div>
                <div>
                  <h4>{t('documentation:documentationPage.philosophyDocTitle') || 'Philosophy'}</h4>
                  <p>Understanding our core principles</p>
                </div>
              </Link>
              <Link href="/documentation/vision" className={parentStyles.featureCard}>
                <div className={parentStyles.featureIcon}>🔮</div>
                <div>
                  <h4>{t('documentation:documentationPage.visionDocTitle') || 'Vision'}</h4>
                  <p>Our decentralized future</p>
                </div>
              </Link>
              <Link href="/documentation/portfolio" className={parentStyles.featureCard}>
                <div className={parentStyles.featureIcon}>💼</div>
                <div>
                  <h4>{t('documentation:documentationPage.portfolioDocTitle') || 'Portfolio'}</h4>
                  <p>Explore our application suite</p>
                </div>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}