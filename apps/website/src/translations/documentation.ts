// Documentation page translations
export const documentationTranslations = {
  en: {
    documentationPage: {
      title: 'Documentation',
      subtitle: 'Comprehensive guides and technical documentation for the CyberEco digital ecosystem',
      searchPlaceholder: 'Search documentation...',
      
      // Navigation sections
      gettingStartedNavTitle: 'Getting Started',
      introductionNavItem: 'Introduction',
      coreDocumentationTitle: 'Core Documentation',
      applicationsNavTitle: 'Solution Categories',
      userResourcesNavTitle: 'User Resources',
      developerNavTitle: 'Developer',
      
      // Navigation items
      apiReferenceNavItem: 'API Reference',
      userGuidesNavItem: 'User Guides',
      faqNavItem: 'FAQ',
      troubleshootingNavItem: 'Troubleshooting',
      communityNavItem: 'Community & Support',
      developmentNavItem: 'Development Setup',
      architectureNavItem: 'System Architecture',
      jwtAuthNavItem: 'JWT Authentication',
      ssoIntegrationNavItem: 'SSO Integration',
      authLoggingNavItem: 'Auth Logging',
      authenticationNavItem: 'Authentication Integration',
      dataArchitectureNavItem: 'Data Layer Architecture',
      hubGatewayNavItem: 'Hub Gateway & Proxy',
      
      // Solution categories
      communityGovernanceNavItem: 'Community & Governance',
      financeEconomyNavItem: 'Finance & Economy',
      sustainabilityHomeNavItem: 'Sustainability & Home',
      educationGrowthNavItem: 'Education & Growth',
      
      // Core documentation titles
      philosophyDocTitle: 'Platform Philosophy',
      visionDocTitle: 'Decentralized Future Vision',
      roadmapDocTitle: 'Development Roadmap',
      portfolioDocTitle: 'Solutions Portfolio',
      
      // Getting started section
      gettingStartedTitle: 'Getting Started with CyberEco',
      introductionTitle: 'Introduction',
      introductionText: 'Welcome to CyberEco documentation! This guide will help you get started with our digital ecosystem. CyberEco offers a suite of digital solutions designed to enhance financial collaboration, community engagement, and social connectivity, all within a human-centered framework for conscious, connected, and sustainable living.',
      
      // Quick start
      quickStartTitle: 'Quick Start',
      quickStartLabel: '📍 Quick Start Guide',
      quickStartTime: '⏱️ 5 minutes',
      step1Title: 'Create Your Account',
      step1Desc: 'Sign up for a CyberEco Hub account to access all applications with a single identity.',
      step2Title: 'Explore Applications',
      step2Desc: 'Start with JustSplit for expense sharing, then discover our growing ecosystem.',
      step3Title: 'Join the Community',
      step3Desc: 'Connect with other users and contribute to our human-centered technology vision.',
      signUpNow: 'Sign Up Now',
      exploreApps: 'Explore Apps',
      joinCommunity: 'Join Community',
      
      // Key concepts
      keyConceptsTitle: 'Key Concepts & Architecture',
      digitalSovereigntyConceptTitle: 'Digital Sovereignty',
      digitalSovereigntyConceptText: 'At the core of CyberEco is the principle of digital sovereignty - the idea that individuals should own and control their digital identity and data. Our architecture ensures that:',
      digitalSovereigntyPoint1: 'Users maintain ownership of their personal data',
      digitalSovereigntyPoint2: 'Applications are designed to be interoperable and user-controlled',
      digitalSovereigntyPoint3: 'No single entity has monopolistic control over user information',
      digitalSovereigntyPoint4: 'Privacy is built into the core design, not added as an afterthought',
      
      // JWT Documentation
      jwt: {
        title: 'JWT Authentication',
        overview: {
          title: 'Overview',
          description: 'CyberEco uses JSON Web Tokens (JWT) for secure authentication across all applications. This modern approach provides better security, scalability, and features compared to traditional session-based authentication.'
        },
        features: {
          title: 'Key Features',
          secure: 'Secure token generation with HS256 algorithm',
          shortLived: 'Short-lived access tokens (1 hour) with refresh tokens (7 days)',
          crossApp: 'Cross-application authentication with shared audience claims',
          csrf: 'CSRF protection for form submissions',
          autoRefresh: 'Automatic token refresh before expiry',
          secureCookie: 'Secure cookie management with HttpOnly and SameSite flags'
        },
        structure: {
          title: 'Token Structure',
          description: 'JWT tokens consist of three parts: header, payload, and signature. Here\'s what our tokens contain:',
          accessToken: 'Access Token Payload'
        },
        flow: {
          title: 'Authentication Flow',
          step1: { title: 'Initial Login', description: 'User logs in with Firebase Auth credentials' },
          step2: { title: 'Token Generation', description: 'Server generates JWT access and refresh tokens' },
          step3: { title: 'Token Storage', description: 'Tokens stored securely in sessionStorage/cookies' },
          step4: { title: 'Cross-App Navigation', description: 'Tokens used for seamless SSO between applications' },
          step5: { title: 'Token Refresh', description: 'Automatic refresh when access token expires' }
        },
        security: {
          title: 'Security Best Practices',
          storage: {
            title: 'Token Storage',
            access: 'Access tokens: sessionStorage or memory',
            refresh: 'Refresh tokens: httpOnly cookies',
            never: 'Never store in localStorage for production'
          },
          expiry: {
            title: 'Token Expiry',
            access: 'Access tokens: 1 hour',
            refresh: 'Refresh tokens: 7 days',
            check: 'Always verify before use'
          },
          csrf: {
            title: 'CSRF Protection',
            generate: 'Generate tokens for forms',
            verify: 'Verify on submission',
            samesite: 'Use SameSite cookies'
          }
        },
        implementation: { title: 'Implementation Example' },
        migration: {
          title: 'Migration Guide',
          description: 'If you\'re migrating from the old token system to JWT:',
          aspect: 'Aspect',
          old: 'Old System',
          new: 'JWT System',
          format: 'Token Format',
          expiry: 'Expiry',
          validation: 'Validation',
          storage: 'Storage'
        },
        resources: {
          title: 'Additional Resources',
          api: 'API Reference',
          sso: 'SSO Integration Guide',
          logging: 'Authentication Logging',
          troubleshooting: 'Troubleshooting Guide'
        }
      },
      
      // SSO Documentation
      sso: {
        title: 'Single Sign-On (SSO) Integration',
        overview: {
          title: 'Overview',
          description: 'CyberEco\'s Single Sign-On (SSO) system allows users to authenticate once through the Hub and seamlessly access all ecosystem applications without re-entering credentials.'
        },
        benefits: {
          title: 'Benefits',
          seamless: 'Seamless user experience across all applications',
          security: 'Enhanced security with centralized authentication',
          management: 'Simplified user account management',
          consistent: 'Consistent login experience',
          reduced: 'Reduced password fatigue'
        },
        architecture: {
          title: 'Architecture',
          description: 'The SSO system is built on these key components:',
          hub: { title: 'CyberEco Hub', description: 'Central authentication provider that manages user sessions and issues JWT tokens for other applications.' },
          jwt: { title: 'JWT Tokens', description: 'Secure tokens containing user identity and permissions, valid across all ecosystem applications.' },
          shared: { title: 'Shared Auth State', description: 'Cross-app authentication state management for seamless navigation between applications.' },
          firebase: { title: 'Firebase Auth', description: 'Underlying authentication service providing secure user management and multiple auth providers.' }
        },
        flow: {
          title: 'SSO Flow',
          step1: { title: 'User Login', description: 'User authenticates at the Hub using email/password or social providers' },
          step2: { title: 'Token Generation', description: 'Hub generates JWT access and refresh tokens with user permissions' },
          step3: { title: 'App Navigation', description: 'User navigates to another app (e.g., JustSplit) with auth token' },
          step4: { title: 'Token Verification', description: 'Target app verifies token and creates local session' }
        },
        implementation: {
          title: 'Implementation Guide',
          hub: { title: '1. Hub Setup (Authentication Provider)' },
          app: { title: '2. Application Setup (SSO Consumer)' },
          middleware: { title: '3. Middleware Protection' }
        },
        development: {
          title: 'Development Environment',
          description: 'In development, SSO works across different ports using shared authentication state:',
          ports: { title: 'Application Ports' },
          note: {
            title: 'Development Note',
            description: 'Firebase Auth tokens are origin-specific. In development, we use shared localStorage state to simulate SSO across different ports. In production, use proper subdomain configuration with shared cookies.'
          }
        },
        production: {
          title: 'Production Setup',
          domains: { title: 'Domain Configuration' },
          firebase: {
            title: 'Firebase Configuration',
            domains: 'Add all subdomains to Firebase authorized domains',
            cors: 'Configure CORS for cross-subdomain requests',
            cookies: 'Enable cross-subdomain cookie sharing'
          }
        },
        security: {
          title: 'Security Considerations',
          tokens: {
            title: 'Token Security',
            https: 'Always use HTTPS in production',
            expiry: 'Implement short token expiry times',
            rotation: 'Rotate refresh tokens on use'
          },
          validation: {
            title: 'Token Validation',
            signature: 'Verify JWT signature',
            audience: 'Check audience claims',
            expiry: 'Validate expiry time'
          },
          session: {
            title: 'Session Management',
            logout: 'Implement global logout',
            monitor: 'Monitor active sessions',
            revoke: 'Allow token revocation'
          }
        },
        troubleshooting: {
          title: 'Troubleshooting',
          loops: {
            title: 'Authentication Loops',
            description: 'If users experience redirect loops:',
            check1: 'Verify token validation logic',
            check2: 'Check redirect URLs',
            check3: 'Ensure cookies are properly set'
          },
          cors: {
            title: 'CORS Issues',
            description: 'For cross-origin authentication:',
            headers: 'Configure proper CORS headers',
            credentials: 'Enable credentials in requests',
            origins: 'Whitelist allowed origins'
          }
        },
        resources: {
          title: 'Related Documentation',
          jwt: 'JWT Authentication Guide',
          logging: 'Authentication Logging',
          api: 'API Reference',
          examples: 'Example Implementations'
        }
      },
      
      // Auth Logging Documentation
      authLogging: {
        title: 'Authentication Logging & Monitoring',
        overview: {
          title: 'Overview',
          description: 'CyberEco\'s authentication system includes comprehensive logging and monitoring capabilities to track authentication events, detect security issues, and analyze user behavior across the ecosystem.'
        },
        features: {
          title: 'Key Features',
          realtime: 'Real-time event logging for all authentication activities',
          structured: 'Structured logging with consistent event types',
          performance: 'Performance metrics tracking',
          error: 'Comprehensive error tracking',
          session: 'Session management and tracking',
          export: 'Export capabilities for audit'
        },
        events: {
          title: 'Event Types',
          event: 'Event',
          description: 'Description',
          level: 'Level',
          auth: {
            title: 'Authentication Events',
            attempt: 'User attempts to log in',
            success: 'Successful login',
            failure: 'Failed login attempt',
            logout: 'User logs out'
          },
          token: {
            title: 'Token Events',
            generated: 'New token created',
            verified: 'Token verified',
            expired: 'Token expired',
            refresh: 'Token refreshed'
          }
        },
        usage: {
          title: 'Usage Examples',
          login: { title: 'Logging Login Flow' },
          sso: { title: 'Logging SSO Navigation' }
        },
        metrics: {
          title: 'Metrics & Analytics',
          example: 'Getting Metrics',
          login: {
            title: 'Login Metrics',
            attempts: 'Total login attempts',
            success: 'Success rate',
            average: 'Average login time',
            failures: 'Failure reasons'
          },
          token: {
            title: 'Token Metrics',
            active: 'Active tokens',
            refresh: 'Refresh count',
            expired: 'Expired tokens',
            invalid: 'Invalid attempts'
          },
          sso: {
            title: 'SSO Metrics',
            navigation: 'Cross-app navigations',
            apps: 'Most used apps',
            flow: 'Flow completion rate',
            errors: 'SSO errors'
          }
        },
        dashboard: {
          title: 'Monitoring Dashboard',
          description: 'The Hub provides an authentication monitoring dashboard for administrators at /auth-logs.',
          features: {
            title: 'Dashboard Features',
            realtime: { title: 'Real-time Updates', description: 'Live metrics refresh every 10 seconds' },
            filtering: { title: 'Log Filtering', description: 'Filter by level, user, or event type' },
            export: { title: 'Export Logs', description: 'Download logs as JSON for analysis' },
            reports: { title: 'Generate Reports', description: 'Create detailed authentication reports' }
          }
        },
        querying: {
          title: 'Querying Logs',
          recent: { title: 'Get Recent Logs' },
          reports: { title: 'Generate Reports' }
        },
        security: {
          title: 'Security Considerations',
          privacy: {
            title: 'Data Privacy',
            passwords: 'Never log passwords or tokens',
            sanitize: 'Sanitize user input',
            hash: 'Hash sensitive identifiers'
          },
          retention: {
            title: 'Log Retention',
            memory: '1000 entries in memory',
            storage: '100 entries in localStorage',
            archive: 'Archive for compliance'
          },
          access: {
            title: 'Access Control',
            admin: 'Admin-only dashboard',
            export: 'Restricted exports',
            monitor: 'Monitor log access'
          }
        },
        integration: {
          title: 'External Integrations',
          sentry: { title: 'Sentry Integration' },
          cloudwatch: { title: 'CloudWatch Metrics' }
        },
        troubleshooting: {
          title: 'Troubleshooting',
          persist: { title: 'Logs Not Persisting', solution: 'Check localStorage quota and permissions' },
          session: { title: 'Missing Session IDs', solution: 'Ensure logger is initialized early in app lifecycle' },
          performance: { title: 'Performance Impact', solution: 'Reduce log verbosity in production' },
          memory: { title: 'Memory Usage', solution: 'Implement log rotation for long-running sessions' }
        },
        resources: {
          title: 'Related Resources',
          jwt: 'JWT Authentication',
          sso: 'SSO Integration Guide',
          api: 'API Reference',
          security: 'Security Best Practices'
        }
      },
      
      // Privacy Documentation
      privacy: {
        title: 'Privacy Controls & GDPR Compliance',
        subtitle: 'Comprehensive privacy features that put you in control of your data',
        description: 'GDPR compliance and privacy controls',
        overview: {
          title: 'Overview',
          description: 'CyberEco implements a comprehensive privacy-first architecture that ensures users maintain complete control over their personal data. Our privacy controls are built into every layer of the platform, from data collection to processing and sharing.'
        },
        features: {
          granularConsent: {
            title: 'Granular Consent',
            description: 'Control exactly how your data is used with purpose-specific consent options'
          },
          visibilityControls: {
            title: 'Visibility Controls',
            description: 'Decide who can see your data with profile and activity-level privacy settings'
          },
          dataAnonymization: {
            title: 'Data Anonymization',
            description: 'Automatic anonymization protects your identity based on privacy preferences'
          },
          gdprCompliance: {
            title: 'GDPR Compliance',
            description: 'Full compliance with data protection regulations including right to erasure'
          }
        },
        consent: {
          title: 'Consent Management',
          types: {
            title: 'Consent Types',
            description: 'CyberEco uses a granular consent system with five distinct categories:'
          },
          banner: {
            title: 'Consent Banner',
            description: 'New users are presented with a consent banner that clearly explains data usage:',
            keyFeatures: 'Key Features:',
            feature1: 'Clear explanation of each consent type',
            feature2: 'Granular opt-in/opt-out controls',
            feature3: 'Easy access to privacy policy',
            feature4: 'Persistent preferences across sessions'
          },
          managing: {
            title: 'Managing Consent'
          }
        },
        settings: {
          title: 'Privacy Settings',
          profileVisibility: {
            title: 'Profile Visibility',
            description: 'Control who can see your profile information:',
            public: 'Public',
            publicDesc: 'Anyone can view your profile',
            friends: 'Friends Only',
            friendsDesc: 'Only approved connections can see your profile',
            private: 'Private',
            privateDesc: 'Profile is hidden from all users'
          },
          activityVisibility: {
            title: 'Activity Visibility',
            description: 'Fine-grained control over different types of activities:'
          },
          dataSharing: {
            title: 'Data Sharing Preferences',
            analytics: 'Analytics Data',
            analyticsDesc: 'Help improve our services',
            ads: 'Personalized Ads',
            adsDesc: 'Relevant advertisements',
            thirdParty: 'Third-Party Apps',
            thirdPartyDesc: 'Share data with connected applications'
          }
        },
        dataVisibility: {
          title: 'Data Visibility Controls',
          queries: {
            title: 'Privacy-Aware Queries',
            description: 'All data queries automatically respect privacy settings:'
          },
          anonymization: {
            title: 'Data Anonymization',
            description: 'Personal information is automatically anonymized based on privacy settings:',
            fields: 'Anonymized Fields:',
            field1: 'Display names → "Anonymous User"',
            field2: 'Email addresses → "hidden@example.com"',
            field3: 'Profile photos → Removed',
            field4: 'Phone numbers → Removed'
          },
          auditLogging: {
            title: 'Audit Logging',
            description: 'All data access is logged for security and compliance:'
          }
        },
        gdpr: {
          title: 'GDPR Rights Implementation',
          rightToAccess: {
            title: 'Right to Access',
            description: 'Users can request and download all their personal data:'
          },
          rightToErasure: {
            title: 'Right to Erasure',
            description: 'Users can request complete deletion of their personal data:',
            process: 'Deletion Process:',
            step1: 'User submits deletion request',
            step2: 'Request is logged with timestamp and reason',
            step3: 'Grace period for user to reconsider (configurable)',
            step4: 'Automated data anonymization',
            step5: 'Removal from search indices',
            step6: 'Confirmation sent to user'
          },
          rightToPortability: {
            title: 'Right to Data Portability'
          },
          rightToRectification: {
            title: 'Right to Rectification',
            description: 'Users can update their personal information at any time through the profile settings.'
          }
        },
        implementation: {
          title: 'Implementation Guide',
          step1: {
            title: '1. Initialize Privacy Services'
          },
          step2: {
            title: '2. Implement Consent Checks'
          },
          step3: {
            title: '3. Apply Privacy Filters'
          },
          step4: {
            title: '4. Set Up Middleware'
          }
        },
        api: {
          title: 'API Reference',
          method: 'Method',
          description: 'Description',
          parameters: 'Parameters',
          privacyService: {
            title: 'Privacy Service Methods',
            getUserPrivacySettings: 'Get user\'s privacy settings',
            updatePrivacySettings: 'Update privacy preferences',
            canViewData: 'Check if viewer can access data',
            filterResults: 'Filter results based on privacy',
            anonymizeData: 'Anonymize personal information'
          },
          gdprService: {
            title: 'GDPR Service Methods',
            recordConsent: 'Record user consent',
            getUserConsent: 'Get consent status',
            requestDataDeletion: 'Request data erasure',
            requestDataPortability: 'Export user data',
            generatePrivacyReport: 'Generate privacy report'
          }
        }
      },
      
      // Data Export Documentation
      dataExport: {
        title: 'Data Export Guide',
        description: 'Export and portability features'
      },
      
      // Two-Factor Documentation
      twoFactor: {
        title: 'Two-Factor Authentication',
        description: '2FA setup and configuration'
      },
      
      // Authentication Documentation
      authentication: {
        subtitle: 'Secure, centralized authentication for the entire CyberEco ecosystem',
        tabs: {
          overview: 'Overview',
          quickstart: 'Quick Start',
          architecture: 'Architecture',
          api: 'API Reference',
          examples: 'Examples'
        },
        overview: {
          title: 'Unified Authentication System',
          description: 'CyberEco\'s authentication system provides a single sign-on experience across all applications, with centralized user management, permission control, and secure session handling.'
        },
        features: {
          sso: {
            title: 'Single Sign-On',
            description: 'One account for all CyberEco applications. Sign in once, access everything.'
          },
          profiles: {
            title: 'Centralized Profiles',
            description: 'User profiles managed in Hub, accessible across all connected applications.'
          },
          permissions: {
            title: 'Permission Control',
            description: 'Fine-grained permissions for app access, features, and resource-level control.'
          }
        },
        benefits: {
          title: 'Key Benefits',
          benefit1: 'Seamless user experience across applications',
          benefit2: 'Reduced authentication complexity for developers',
          benefit3: 'Enhanced security with centralized access control',
          benefit4: 'Cross-tab and cross-app session synchronization',
          benefit5: 'Support for social login providers',
          benefit6: 'Built-in permission and role management'
        },
        quickstart: {
          title: 'Quick Start Guide',
          step1: {
            title: 'Install Dependencies'
          },
          step2: {
            title: 'Define Your User Type'
          },
          step3: {
            title: 'Create Auth Context'
          },
          step4: {
            title: 'Wrap Your App'
          },
          step5: {
            title: 'Use in Components'
          }
        },
        architecture: {
          title: 'System Architecture',
          hub: {
            title: 'Hub (Central Auth)',
            item1: 'User registration & sign-in',
            item2: 'Profile management',
            item3: 'Permission control',
            item4: 'Token generation'
          },
          libraries: {
            title: 'Shared Libraries'
          },
          applications: {
            title: 'Applications'
          },
          flow: {
            title: 'Authentication Flow',
            step1: 'User accesses app without auth',
            step2: 'App redirects to Hub sign-in',
            step3: 'User authenticates at Hub',
            step4: 'Hub generates auth token',
            step5: 'Redirect back to app with token',
            step6: 'App validates token & creates session'
          },
          models: {
            title: 'Data Models',
            baseUser: 'Core user fields shared across all apps',
            appPermission: 'Permission configuration per app',
            sharedUserProfile: 'Extended profile with cross-app data'
          }
        },
        api: {
          title: 'API Reference',
          coreFunctions: 'Core Functions',
          createAuthContext: 'Factory function for creating type-safe auth contexts',
          useAuth: 'Hook to access authentication state and methods',
          usePermissions: 'Check user permissions for features and roles',
          useSessionSync: 'Synchronize auth state across tabs and apps',
          utilityFunctions: 'Utility Functions',
          validateEmail: 'Validate email format',
          validatePassword: 'Check password strength',
          generateAuthRedirectUrl: 'Create auth redirect URLs',
          getAuthErrorMessage: 'User-friendly error messages'
        },
        examples: {
          title: 'Implementation Examples',
          protectedRoute: {
            title: 'Protected Route Component'
          },
          crossApp: {
            title: 'Cross-App Navigation'
          },
          permissions: {
            title: 'Permission-Based Features'
          },
          errorHandling: {
            title: 'Error Handling'
          }
        }
      },
      
      // Key Concepts translations
      ecosystemArchitectureTitle: 'Ecosystem Architecture',
      ecosystemArchitectureText: 'CyberEco is built as a modular ecosystem where each application serves a specific purpose while contributing to the greater whole:',
      architecturePoint1: 'Hub: Central authentication and identity management',
      architecturePoint2: 'Application Layer: Specialized apps for different life domains',
      architecturePoint3: 'Data Layer: User-controlled data storage and sharing',
      architecturePoint4: 'Integration Layer: APIs and protocols for seamless interaction',
      
      humanCenteredDesignTitle: 'Human-Centered Design',
      humanCenteredDesignText: 'Every application in the CyberEco ecosystem is designed with human well-being and authentic connection at its center. This means:',
      humanCenteredPoint1: 'Minimizing addictive design patterns',
      humanCenteredPoint2: 'Promoting real-world relationships and activities',
      humanCenteredPoint3: 'Supporting individual growth and community building',
      humanCenteredPoint4: 'Respecting human attention and mental health',
      
      communityDrivenTitle: 'Community-Driven Development',
      communityDrivenText: 'Our development process is guided by actual community needs rather than profit maximization. We prioritize:',
      communityDrivenPoint1: 'Open-source development where possible',
      communityDrivenPoint2: 'Community feedback and involvement in feature development',
      communityDrivenPoint3: 'Transparent roadmaps and decision-making processes',
      communityDrivenPoint4: 'Sustainable business models that align with user interests',
      
      // Learning paths
      learningPathTitle: 'Choose Your Learning Path',
      businessUserPath: 'Business User',
      businessUserDesc: 'Learn to use applications for team collaboration and expense management.',
      fiveTopics: '📚 5 topics',
      developerPath: 'Developer',
      developerDesc: 'Technical integration, API usage, and platform architecture.',
      twelveTopics: '📚 12 topics',
      communityPath: 'Community Leader',
      communityDesc: 'Governance, digital sovereignty, and platform philosophy.',
      eightTopics: '📚 8 topics',
      
      // Core Documentation
      coreDocument: 'Core Document',
      philosophyDocSummary: 'The foundational principles and values that guide the CyberEco ecosystem',
      keyPrinciples: 'Key Principles',
      digitalSovereigntyPrinciple: 'Digital Sovereignty',
      digitalSovereigntyDesc: 'You own your data, identity, and digital relationships',
      humanCenteredPrinciple: 'Human-Centered',
      humanCenteredDesc: 'Technology that serves human flourishing, not addiction',
      sustainablePrinciple: 'Sustainable',
      sustainableDesc: 'Built for long-term value, not short-term profit',
      philosophyDocPreview: 'Our platform philosophy is grounded in the belief that technology should empower individuals and communities, not exploit them. We reject surveillance capitalism and embrace a model where users maintain sovereignty over their digital lives.',
      completePhilosophyDoc: 'Complete Philosophy Document',
      completePhilosophyDesc: 'Read our full philosophical manifesto and understand why we\'re building differently',
      viewFullPhilosophy: 'View Full Philosophy',
      
      // Vision Document
      futureVision: 'Future Vision',
      visionDocSummary: 'Our long-term vision for a decentralized, user-owned digital ecosystem',
      visionComponents: 'Vision Components',
      mobileP2PComponent: 'Mobile P2P Networks',
      mobileP2PDesc: 'Serverless communication directly between devices',
      dataSovereigntyComponent: 'Data Sovereignty',
      dataSovereigntyDesc: 'Complete user control over personal information',
      tokenEconomicsComponent: 'Token Economics',
      tokenEconomicsDesc: 'Fair value distribution through blockchain technology',
      globalAccessComponent: 'Global Access',
      globalAccessDesc: 'Inclusive design for worldwide adoption',
      visionDocPreview: 'We envision a future where digital infrastructure is as decentralized as the internet itself was meant to be. Through mobile peer-to-peer networks, blockchain technology, and user-centric design, we\'re building the foundation for true digital sovereignty.',
      completeVisionDoc: 'Complete Vision Document',
      completeVisionDesc: 'Explore our detailed vision for the future of decentralized technology',
      viewFullVision: 'View Full Vision',
      
      // Vision Page
      vision: {
        title: 'Decentralized Future Vision',
        subtitle: 'Transitioning from centralized cloud infrastructure to a distributed, privacy-first, blockchain-based ecosystem',
        executiveSummary: {
          title: 'Executive Summary',
          description: 'The CyberEco Platform envisions a future where digital lifestyle management operates on a decentralized network powered by mobile devices, secured by blockchain technology, and governed by cryptographic privacy principles. This approach will transform how users interact with their data, shifting from traditional cloud dependency to a user-owned, privacy-preserving ecosystem.'
        },
        visionOverview: {
          title: 'Vision Overview',
          currentState: 'Current State',
          futureState: 'Future State'
        },
        architecture: {
          title: 'Decentralized Architecture Vision',
          mobileP2P: {
            title: 'Mobile-First P2P Network',
            deviceParticipation: 'Device Participation Model',
            personalNodes: 'Personal Nodes',
            contributionIncentives: 'Contribution Incentives',
            dynamicLoadBalancing: 'Dynamic Load Balancing',
            offlineFirst: 'Offline-First Design'
          },
          blockchain: {
            title: 'Blockchain Integration Strategy',
            onChain: 'On-Chain Components',
            offChain: 'Off-Chain Components',
            hybrid: 'Hybrid Approach (Transition Phase)'
          },
          privacy: {
            title: 'Privacy-Preserving Cryptography',
            zeroKnowledge: 'Zero-Knowledge Architecture',
            selectiveDisclosure: 'Selective Disclosure',
            proofGeneration: 'Proof Generation',
            granularPermissions: 'Granular Permissions'
          }
        },
        roadmap: {
          title: 'Technical Implementation Roadmap',
          phases: {
            hybrid: 'Phase 1: Hybrid Foundation (2025-2026)',
            network: 'Phase 2: Network Foundation (2026-2027)',
            full: 'Phase 3: Full Decentralization (2027-2028)'
          }
        },
        economics: {
          title: 'Economic Model & Incentives',
          tokenEconomics: 'Token Economics (Future CyberEco Token - CYE)',
          utilityFunctions: 'Utility Functions',
          networkRewards: 'Network Participation Rewards',
          privacyIncentives: 'Data Privacy Incentives',
          applicationAccess: 'Application Access'
        },
        migration: {
          title: 'Migration Strategy',
          gradualTransition: 'Gradual Transition Approach',
          phaseA: 'Phase A: Hybrid Operation',
          phaseB: 'Phase B: Primary Decentralization',
          phaseC: 'Phase C: Full Decentralization'
        },
        impact: {
          title: 'Global Impact & Benefits',
          forUsers: 'For Individual Users',
          forSociety: 'For Society',
          digitalRights: 'Digital Rights',
          economicDemocratization: 'Economic Democratization'
        },
        security: {
          title: 'Security & Risk Mitigation',
          guarantees: 'Security Guarantees',
          technicalSecurity: 'Technical Security',
          economicSecurity: 'Economic Security',
          riskAssessment: 'Risk Assessment & Mitigation'
        },
        longTerm: {
          title: 'Long-Term Vision (2030+)',
          expandedEcosystem: 'Expanded Ecosystem',
          interoperability: 'Interoperability',
          globalNetwork: 'Global Network Vision'
        },
        getInvolved: {
          title: 'Getting Involved',
          forDevelopers: 'For Developers',
          forUsers: 'For Users',
          forOrganizations: 'For Organizations'
        },
        callToAction: {
          title: 'Call to Action',
          description: 'The future of digital privacy and data sovereignty starts with the choices we make today. CyberEco\'s decentralized vision represents more than just a technical upgrade—it\'s a fundamental shift toward user empowerment and digital rights.'
        }
      },
      
      // Roadmap Document
      developmentPlan: 'Development Plan',
      roadmapDocSummary: 'Our phased approach to building the complete CyberEco ecosystem',
      developmentPhases: 'Development Phases',
      foundationPhase: 'Foundation Phase',
      foundationDesc: 'Core infrastructure, authentication, and initial applications',
      growthPhase: 'Growth Phase',
      growthDesc: 'Expanding application suite and user adoption',
      integrationPhase: 'Integration Phase',
      integrationDesc: 'Cross-app synergies and ecosystem effects',
      decentralizationPhase: 'Decentralization Phase',
      decentralizationDesc: 'Transition to fully distributed infrastructure',
      completeRoadmapDoc: 'Complete Roadmap',
      completeRoadmapDesc: 'View our detailed development timeline and upcoming features',
      viewFullRoadmap: 'View Full Roadmap',
      
      // Portfolio Document
      solutionsOverview: 'Solutions Overview',
      portfolioDocSummary: 'Our comprehensive suite of applications covering all aspects of digital life',
      solutionCategories: 'Solution Categories',
      currentSolutions: 'Current Solutions',
      priorityApplications: 'Priority Applications',
      inDevelopment: 'In Development',
      futureEcosystem: 'Future Ecosystem',
      thirtyPlusApplications: '30+ planned applications',
      portfolioDocPreview: 'The CyberEco ecosystem includes applications for finance, community, sustainability, education, health, and more. Each app is designed to work seamlessly with others while respecting user privacy and autonomy.',
      completeSolutionsPortfolio: 'Complete Solutions Portfolio',
      completeSolutionsDesc: 'Explore all current and planned applications in the CyberEco ecosystem',
      viewFullPortfolio: 'View Full Portfolio',
      
      // Navigation items
      privacyControlsNavItem: 'Privacy Controls & GDPR',
      twoFactorAuthNavItem: 'Two-Factor Authentication',
      dataExportNavItem: 'Data Export & Portability',
      
      // Documentation descriptions
      apiReference: {
        description: 'Complete API documentation and endpoints'
      },
      development: {
        description: 'Get your local environment running'
      },
      community: {
        description: 'Join our developer community'
      },
      
      // Common Documentation Elements
      tableOfContents: 'Table of Contents',
      nextSteps: 'Next Steps'
    }
  },
  
  es: {
    documentationPage: {
      title: 'Documentación',
      subtitle: 'Guías completas y documentación técnica para el ecosistema digital CyberEco',
      searchPlaceholder: 'Buscar documentación...',
      
      // Navigation sections
      gettingStartedNavTitle: 'Primeros Pasos',
      introductionNavItem: 'Introducción',
      coreDocumentationTitle: 'Documentación Principal',
      applicationsNavTitle: 'Categorías de Soluciones',
      userResourcesNavTitle: 'Recursos del Usuario',
      developerNavTitle: 'Desarrollador',
      
      // Navigation items
      apiReferenceNavItem: 'Referencia de API',
      userGuidesNavItem: 'Guías de Usuario',
      faqNavItem: 'Preguntas Frecuentes',
      troubleshootingNavItem: 'Solución de Problemas',
      communityNavItem: 'Comunidad y Soporte',
      developmentNavItem: 'Configuración de Desarrollo',
      architectureNavItem: 'Arquitectura del Sistema',
      jwtAuthNavItem: 'Autenticación JWT',
      ssoIntegrationNavItem: 'Integración SSO',
      authLoggingNavItem: 'Registro de Auth',
      authenticationNavItem: 'Integración de Autenticación',
      dataArchitectureNavItem: 'Arquitectura de Capa de Datos',
      hubGatewayNavItem: 'Hub Gateway y Proxy',
      
      // Solution categories
      communityGovernanceNavItem: 'Comunidad y Gobernanza',
      financeEconomyNavItem: 'Finanzas y Economía',
      sustainabilityHomeNavItem: 'Sostenibilidad y Hogar',
      educationGrowthNavItem: 'Educación y Crecimiento',
      
      // Core documentation titles
      philosophyDocTitle: 'Filosofía de la Plataforma',
      visionDocTitle: 'Visión del Futuro Descentralizado',
      roadmapDocTitle: 'Hoja de Ruta de Desarrollo',
      portfolioDocTitle: 'Portafolio de Soluciones',
      
      // Getting started section
      gettingStartedTitle: 'Comenzando con CyberEco',
      introductionTitle: 'Introducción',
      introductionText: '¡Bienvenido a la documentación de CyberEco! Esta guía te ayudará a comenzar con nuestro ecosistema digital. CyberEco ofrece un conjunto de soluciones digitales diseñadas para mejorar la colaboración financiera, el compromiso comunitario y la conectividad social, todo dentro de un marco centrado en el ser humano para una vida consciente, conectada y sostenible.',
      
      // Quick start
      quickStartTitle: 'Inicio Rápido',
      quickStartLabel: '📍 Guía de Inicio Rápido',
      quickStartTime: '⏱️ 5 minutos',
      step1Title: 'Crea Tu Cuenta',
      step1Desc: 'Regístrate para una cuenta de CyberEco Hub para acceder a todas las aplicaciones con una sola identidad.',
      step2Title: 'Explora Aplicaciones',
      step2Desc: 'Comienza con JustSplit para compartir gastos, luego descubre nuestro creciente ecosistema.',
      step3Title: 'Únete a la Comunidad',
      step3Desc: 'Conéctate con otros usuarios y contribuye a nuestra visión de tecnología centrada en el ser humano.',
      signUpNow: 'Registrarse Ahora',
      exploreApps: 'Explorar Apps',
      joinCommunity: 'Unirse a la Comunidad',
      
      // Key concepts
      keyConceptsTitle: 'Conceptos Clave y Arquitectura',
      digitalSovereigntyConceptTitle: 'Soberanía Digital',
      digitalSovereigntyConceptText: 'En el centro de CyberEco está el principio de soberanía digital: la idea de que las personas deben poseer y controlar su identidad y datos digitales. Nuestra arquitectura garantiza que:',
      digitalSovereigntyPoint1: 'Los usuarios mantienen la propiedad de sus datos personales',
      digitalSovereigntyPoint2: 'Las aplicaciones están diseñadas para ser interoperables y controladas por el usuario',
      digitalSovereigntyPoint3: 'Ninguna entidad tiene control monopolístico sobre la información del usuario',
      digitalSovereigntyPoint4: 'La privacidad está integrada en el diseño central, no añadida como una ocurrencia tardía',
      
      // JWT Documentation
      jwt: {
        title: 'Autenticación JWT',
        overview: {
          title: 'Visión General',
          description: 'CyberEco utiliza JSON Web Tokens (JWT) para autenticación segura en todas las aplicaciones. Este enfoque moderno proporciona mejor seguridad, escalabilidad y características comparado con la autenticación tradicional basada en sesiones.'
        },
        features: {
          title: 'Características Clave',
          secure: 'Generación segura de tokens con algoritmo HS256',
          shortLived: 'Tokens de acceso de corta duración (1 hora) con tokens de actualización (7 días)',
          crossApp: 'Autenticación entre aplicaciones con reclamaciones de audiencia compartidas',
          csrf: 'Protección CSRF para envíos de formularios',
          autoRefresh: 'Actualización automática de tokens antes del vencimiento',
          secureCookie: 'Gestión segura de cookies con flags HttpOnly y SameSite'
        },
        structure: {
          title: 'Estructura del Token',
          description: 'Los tokens JWT constan de tres partes: encabezado, carga útil y firma. Esto es lo que contienen nuestros tokens:',
          accessToken: 'Carga Útil del Token de Acceso'
        },
        flow: {
          title: 'Flujo de Autenticación',
          step1: { title: 'Inicio de Sesión Inicial', description: 'El usuario inicia sesión con credenciales de Firebase Auth' },
          step2: { title: 'Generación de Token', description: 'El servidor genera tokens JWT de acceso y actualización' },
          step3: { title: 'Almacenamiento de Token', description: 'Los tokens se almacenan de forma segura en sessionStorage/cookies' },
          step4: { title: 'Navegación Entre Aplicaciones', description: 'Los tokens se usan para SSO sin problemas entre aplicaciones' },
          step5: { title: 'Actualización de Token', description: 'Actualización automática cuando expira el token de acceso' }
        },
        security: {
          title: 'Mejores Prácticas de Seguridad',
          storage: {
            title: 'Almacenamiento de Tokens',
            access: 'Tokens de acceso: sessionStorage o memoria',
            refresh: 'Tokens de actualización: cookies httpOnly',
            never: 'Nunca almacenar en localStorage para producción'
          },
          expiry: {
            title: 'Vencimiento de Token',
            access: 'Tokens de acceso: 1 hora',
            refresh: 'Tokens de actualización: 7 días',
            check: 'Siempre verificar antes de usar'
          },
          csrf: {
            title: 'Protección CSRF',
            generate: 'Generar tokens para formularios',
            verify: 'Verificar al enviar',
            samesite: 'Usar cookies SameSite'
          }
        },
        implementation: { title: 'Ejemplo de Implementación' },
        migration: {
          title: 'Guía de Migración',
          description: 'Si estás migrando del sistema de tokens antiguo a JWT:',
          aspect: 'Aspecto',
          old: 'Sistema Antiguo',
          new: 'Sistema JWT',
          format: 'Formato de Token',
          expiry: 'Vencimiento',
          validation: 'Validación',
          storage: 'Almacenamiento'
        },
        resources: {
          title: 'Recursos Adicionales',
          api: 'Referencia de API',
          sso: 'Guía de Integración SSO',
          logging: 'Registro de Autenticación',
          troubleshooting: 'Guía de Solución de Problemas'
        }
      },
      
      // SSO Documentation
      sso: {
        title: 'Integración de Single Sign-On (SSO)',
        overview: {
          title: 'Visión General',
          description: 'El sistema de Single Sign-On (SSO) de CyberEco permite a los usuarios autenticarse una vez a través del Hub y acceder sin problemas a todas las aplicaciones del ecosistema sin volver a ingresar credenciales.'
        },
        benefits: {
          title: 'Beneficios',
          seamless: 'Experiencia de usuario fluida en todas las aplicaciones',
          security: 'Seguridad mejorada con autenticación centralizada',
          management: 'Gestión simplificada de cuentas de usuario',
          consistent: 'Experiencia de inicio de sesión consistente',
          reduced: 'Fatiga de contraseña reducida'
        },
        architecture: {
          title: 'Arquitectura',
          description: 'El sistema SSO está construido sobre estos componentes clave:',
          hub: { title: 'CyberEco Hub', description: 'Proveedor de autenticación central que gestiona sesiones de usuario y emite tokens JWT para otras aplicaciones.' },
          jwt: { title: 'Tokens JWT', description: 'Tokens seguros que contienen identidad y permisos del usuario, válidos en todas las aplicaciones del ecosistema.' },
          shared: { title: 'Estado de Auth Compartido', description: 'Gestión del estado de autenticación entre aplicaciones para navegación fluida entre aplicaciones.' },
          firebase: { title: 'Firebase Auth', description: 'Servicio de autenticación subyacente que proporciona gestión segura de usuarios y múltiples proveedores de autenticación.' }
        },
        flow: {
          title: 'Flujo SSO',
          step1: { title: 'Inicio de Sesión del Usuario', description: 'El usuario se autentica en el Hub usando email/contraseña o proveedores sociales' },
          step2: { title: 'Generación de Token', description: 'Hub genera tokens JWT de acceso y actualización con permisos de usuario' },
          step3: { title: 'Navegación de Aplicación', description: 'El usuario navega a otra aplicación (ej. JustSplit) con token de autenticación' },
          step4: { title: 'Verificación de Token', description: 'La aplicación destino verifica el token y crea una sesión local' }
        },
        implementation: {
          title: 'Guía de Implementación',
          hub: { title: '1. Configuración del Hub (Proveedor de Autenticación)' },
          app: { title: '2. Configuración de Aplicación (Consumidor SSO)' },
          middleware: { title: '3. Protección de Middleware' }
        },
        development: {
          title: 'Entorno de Desarrollo',
          description: 'En desarrollo, SSO funciona a través de diferentes puertos usando estado de autenticación compartido:',
          ports: { title: 'Puertos de Aplicación' },
          note: {
            title: 'Nota de Desarrollo',
            description: 'Los tokens de Firebase Auth son específicos del origen. En desarrollo, usamos estado compartido en localStorage para simular SSO entre diferentes puertos. En producción, usa configuración adecuada de subdominios con cookies compartidas.'
          }
        },
        production: {
          title: 'Configuración de Producción',
          domains: { title: 'Configuración de Dominios' },
          firebase: {
            title: 'Configuración de Firebase',
            domains: 'Añadir todos los subdominios a los dominios autorizados de Firebase',
            cors: 'Configurar CORS para solicitudes entre subdominios',
            cookies: 'Habilitar compartición de cookies entre subdominios'
          }
        },
        security: {
          title: 'Consideraciones de Seguridad',
          tokens: {
            title: 'Seguridad de Tokens',
            https: 'Siempre usar HTTPS en producción',
            expiry: 'Implementar tiempos cortos de vencimiento de tokens',
            rotation: 'Rotar tokens de actualización al usar'
          },
          validation: {
            title: 'Validación de Token',
            signature: 'Verificar firma JWT',
            audience: 'Verificar reclamaciones de audiencia',
            expiry: 'Validar tiempo de vencimiento'
          },
          session: {
            title: 'Gestión de Sesión',
            logout: 'Implementar cierre de sesión global',
            monitor: 'Monitorear sesiones activas',
            revoke: 'Permitir revocación de tokens'
          }
        },
        troubleshooting: {
          title: 'Solución de Problemas',
          loops: {
            title: 'Bucles de Autenticación',
            description: 'Si los usuarios experimentan bucles de redirección:',
            check1: 'Verificar lógica de validación de tokens',
            check2: 'Verificar URLs de redirección',
            check3: 'Asegurar que las cookies estén configuradas correctamente'
          },
          cors: {
            title: 'Problemas CORS',
            description: 'Para autenticación entre orígenes:',
            headers: 'Configurar encabezados CORS adecuados',
            credentials: 'Habilitar credenciales en solicitudes',
            origins: 'Lista blanca de orígenes permitidos'
          }
        },
        resources: {
          title: 'Documentación Relacionada',
          jwt: 'Guía de Autenticación JWT',
          logging: 'Registro de Autenticación',
          api: 'Referencia de API',
          examples: 'Implementaciones de Ejemplo'
        }
      },
      
      // Auth Logging Documentation
      authLogging: {
        title: 'Registro y Monitoreo de Autenticación',
        overview: {
          title: 'Visión General',
          description: 'El sistema de autenticación de CyberEco incluye capacidades integrales de registro y monitoreo para rastrear eventos de autenticación, detectar problemas de seguridad y analizar el comportamiento del usuario en todo el ecosistema.'
        },
        features: {
          title: 'Características Clave',
          realtime: 'Registro de eventos en tiempo real para todas las actividades de autenticación',
          structured: 'Registro estructurado con tipos de eventos consistentes',
          performance: 'Seguimiento de métricas de rendimiento',
          error: 'Seguimiento integral de errores',
          session: 'Gestión y seguimiento de sesiones',
          export: 'Capacidades de exportación para auditoría'
        },
        events: {
          title: 'Tipos de Eventos',
          event: 'Evento',
          description: 'Descripción',
          level: 'Nivel',
          auth: {
            title: 'Eventos de Autenticación',
            attempt: 'El usuario intenta iniciar sesión',
            success: 'Inicio de sesión exitoso',
            failure: 'Intento de inicio de sesión fallido',
            logout: 'El usuario cierra sesión'
          },
          token: {
            title: 'Eventos de Token',
            generated: 'Nuevo token creado',
            verified: 'Token verificado',
            expired: 'Token expirado',
            refresh: 'Token actualizado'
          }
        },
        usage: {
          title: 'Ejemplos de Uso',
          login: { title: 'Registrando Flujo de Inicio de Sesión' },
          sso: { title: 'Registrando Navegación SSO' }
        },
        metrics: {
          title: 'Métricas y Análisis',
          example: 'Obteniendo Métricas',
          login: {
            title: 'Métricas de Inicio de Sesión',
            attempts: 'Total de intentos de inicio de sesión',
            success: 'Tasa de éxito',
            average: 'Tiempo promedio de inicio de sesión',
            failures: 'Razones de fallo'
          },
          token: {
            title: 'Métricas de Token',
            active: 'Tokens activos',
            refresh: 'Conteo de actualizaciones',
            expired: 'Tokens expirados',
            invalid: 'Intentos inválidos'
          },
          sso: {
            title: 'Métricas SSO',
            navigation: 'Navegaciones entre aplicaciones',
            apps: 'Aplicaciones más usadas',
            flow: 'Tasa de finalización de flujo',
            errors: 'Errores SSO'
          }
        },
        dashboard: {
          title: 'Panel de Monitoreo',
          description: 'El Hub proporciona un panel de monitoreo de autenticación para administradores en /auth-logs.',
          features: {
            title: 'Características del Panel',
            realtime: { title: 'Actualizaciones en Tiempo Real', description: 'Las métricas en vivo se actualizan cada 10 segundos' },
            filtering: { title: 'Filtrado de Registros', description: 'Filtrar por nivel, usuario o tipo de evento' },
            export: { title: 'Exportar Registros', description: 'Descargar registros como JSON para análisis' },
            reports: { title: 'Generar Informes', description: 'Crear informes detallados de autenticación' }
          }
        },
        querying: {
          title: 'Consultando Registros',
          recent: { title: 'Obtener Registros Recientes' },
          reports: { title: 'Generar Informes' }
        },
        security: {
          title: 'Consideraciones de Seguridad',
          privacy: {
            title: 'Privacidad de Datos',
            passwords: 'Nunca registrar contraseñas o tokens',
            sanitize: 'Sanitizar entrada de usuario',
            hash: 'Hash de identificadores sensibles'
          },
          retention: {
            title: 'Retención de Registros',
            memory: '1000 entradas en memoria',
            storage: '100 entradas en localStorage',
            archive: 'Archivar para cumplimiento'
          },
          access: {
            title: 'Control de Acceso',
            admin: 'Panel solo para administradores',
            export: 'Exportaciones restringidas',
            monitor: 'Monitorear acceso a registros'
          }
        },
        integration: {
          title: 'Integraciones Externas',
          sentry: { title: 'Integración con Sentry' },
          cloudwatch: { title: 'Métricas de CloudWatch' }
        },
        troubleshooting: {
          title: 'Solución de Problemas',
          persist: { title: 'Registros No Persisten', solution: 'Verificar cuota y permisos de localStorage' },
          session: { title: 'IDs de Sesión Faltantes', solution: 'Asegurar que el registrador se inicialice temprano en el ciclo de vida de la aplicación' },
          performance: { title: 'Impacto en el Rendimiento', solution: 'Reducir verbosidad de registros en producción' },
          memory: { title: 'Uso de Memoria', solution: 'Implementar rotación de registros para sesiones de larga duración' }
        },
        resources: {
          title: 'Recursos Relacionados',
          jwt: 'Autenticación JWT',
          sso: 'Guía de Integración SSO',
          api: 'Referencia de API',
          security: 'Mejores Prácticas de Seguridad'
        }
      },
      
      // Privacy Documentation
      privacy: {
        title: 'Controles de Privacidad y Cumplimiento GDPR',
        subtitle: 'Características integrales de privacidad que te dan control sobre tus datos',
        description: 'Cumplimiento GDPR y controles de privacidad',
        overview: {
          title: 'Visión General',
          description: 'CyberEco implementa una arquitectura integral centrada en la privacidad que garantiza que los usuarios mantengan control completo sobre sus datos personales. Nuestros controles de privacidad están integrados en cada capa de la plataforma, desde la recolección de datos hasta el procesamiento y compartir.'
        },
        features: {
          granularConsent: {
            title: 'Consentimiento Granular',
            description: 'Controla exactamente cómo se usan tus datos con opciones de consentimiento específicas por propósito'
          },
          visibilityControls: {
            title: 'Controles de Visibilidad',
            description: 'Decide quién puede ver tus datos con configuraciones de privacidad a nivel de perfil y actividad'
          },
          dataAnonymization: {
            title: 'Anonimización de Datos',
            description: 'La anonimización automática protege tu identidad basada en preferencias de privacidad'
          },
          gdprCompliance: {
            title: 'Cumplimiento GDPR',
            description: 'Cumplimiento total con regulaciones de protección de datos incluyendo derecho al olvido'
          }
        },
        consent: {
          title: 'Gestión de Consentimiento',
          types: {
            title: 'Tipos de Consentimiento',
            description: 'CyberEco usa un sistema de consentimiento granular con cinco categorías distintas:'
          },
          banner: {
            title: 'Banner de Consentimiento',
            description: 'Los nuevos usuarios ven un banner de consentimiento que explica claramente el uso de datos:',
            keyFeatures: 'Características Clave:',
            feature1: 'Explicación clara de cada tipo de consentimiento',
            feature2: 'Controles granulares de aceptar/rechazar',
            feature3: 'Acceso fácil a la política de privacidad',
            feature4: 'Preferencias persistentes entre sesiones'
          },
          managing: {
            title: 'Gestionando el Consentimiento'
          }
        },
        settings: {
          title: 'Configuración de Privacidad',
          profileVisibility: {
            title: 'Visibilidad del Perfil',
            description: 'Controla quién puede ver tu información de perfil:',
            public: 'Público',
            publicDesc: 'Cualquiera puede ver tu perfil',
            friends: 'Solo Amigos',
            friendsDesc: 'Solo conexiones aprobadas pueden ver tu perfil',
            private: 'Privado',
            privateDesc: 'El perfil está oculto para todos los usuarios'
          },
          activityVisibility: {
            title: 'Visibilidad de Actividad',
            description: 'Control detallado sobre diferentes tipos de actividades:'
          },
          dataSharing: {
            title: 'Preferencias de Compartir Datos',
            analytics: 'Datos de Análisis',
            analyticsDesc: 'Ayuda a mejorar nuestros servicios',
            ads: 'Anuncios Personalizados',
            adsDesc: 'Publicidad relevante',
            thirdParty: 'Aplicaciones de Terceros',
            thirdPartyDesc: 'Compartir datos con aplicaciones conectadas'
          }
        },
        dataVisibility: {
          title: 'Controles de Visibilidad de Datos',
          queries: {
            title: 'Consultas Conscientes de Privacidad',
            description: 'Todas las consultas de datos respetan automáticamente la configuración de privacidad:'
          },
          anonymization: {
            title: 'Anonimización de Datos',
            description: 'La información personal se anonimiza automáticamente según la configuración de privacidad:',
            fields: 'Campos Anonimizados:',
            field1: 'Nombres de usuario → "Usuario Anónimo"',
            field2: 'Direcciones de email → "oculto@example.com"',
            field3: 'Fotos de perfil → Eliminadas',
            field4: 'Números de teléfono → Eliminados'
          },
          auditLogging: {
            title: 'Registro de Auditoría',
            description: 'Todo acceso a datos se registra para seguridad y cumplimiento:'
          }
        },
        gdpr: {
          title: 'Implementación de Derechos GDPR',
          rightToAccess: {
            title: 'Derecho de Acceso',
            description: 'Los usuarios pueden solicitar y descargar todos sus datos personales:'
          },
          rightToErasure: {
            title: 'Derecho al Olvido',
            description: 'Los usuarios pueden solicitar la eliminación completa de sus datos personales:',
            process: 'Proceso de Eliminación:',
            step1: 'El usuario envía solicitud de eliminación',
            step2: 'La solicitud se registra con marca de tiempo y razón',
            step3: 'Período de gracia para que el usuario reconsidere (configurable)',
            step4: 'Anonimización automatizada de datos',
            step5: 'Eliminación de índices de búsqueda',
            step6: 'Confirmación enviada al usuario'
          },
          rightToPortability: {
            title: 'Derecho a la Portabilidad de Datos'
          },
          rightToRectification: {
            title: 'Derecho de Rectificación',
            description: 'Los usuarios pueden actualizar su información personal en cualquier momento a través de la configuración del perfil.'
          }
        },
        implementation: {
          title: 'Guía de Implementación',
          step1: {
            title: '1. Inicializar Servicios de Privacidad'
          },
          step2: {
            title: '2. Implementar Verificaciones de Consentimiento'
          },
          step3: {
            title: '3. Aplicar Filtros de Privacidad'
          },
          step4: {
            title: '4. Configurar Middleware'
          }
        },
        api: {
          title: 'Referencia de API',
          method: 'Método',
          description: 'Descripción',
          parameters: 'Parámetros',
          privacyService: {
            title: 'Métodos del Servicio de Privacidad',
            getUserPrivacySettings: 'Obtener configuración de privacidad del usuario',
            updatePrivacySettings: 'Actualizar preferencias de privacidad',
            canViewData: 'Verificar si el visor puede acceder a los datos',
            filterResults: 'Filtrar resultados basados en privacidad',
            anonymizeData: 'Anonimizar información personal'
          },
          gdprService: {
            title: 'Métodos del Servicio GDPR',
            recordConsent: 'Registrar consentimiento del usuario',
            getUserConsent: 'Obtener estado del consentimiento',
            requestDataDeletion: 'Solicitar eliminación de datos',
            requestDataPortability: 'Exportar datos del usuario',
            generatePrivacyReport: 'Generar informe de privacidad'
          }
        }
      },
      
      // Data Export Documentation
      dataExport: {
        title: 'Guía de Exportación de Datos',
        description: 'Características de exportación y portabilidad'
      },
      
      // Two-Factor Documentation
      twoFactor: {
        title: 'Autenticación de Dos Factores',
        description: 'Configuración y setup de 2FA'
      },
      
      // Authentication Documentation
      authentication: {
        subtitle: 'Autenticación segura y centralizada para todo el ecosistema CyberEco',
        tabs: {
          overview: 'Visión General',
          quickstart: 'Inicio Rápido',
          architecture: 'Arquitectura',
          api: 'Referencia de API',
          examples: 'Ejemplos'
        },
        overview: {
          title: 'Sistema de Autenticación Unificado',
          description: 'El sistema de autenticación de CyberEco proporciona una experiencia de inicio de sesión único en todas las aplicaciones, con gestión centralizada de usuarios, control de permisos y manejo seguro de sesiones.'
        },
        features: {
          sso: {
            title: 'Inicio de Sesión Único',
            description: 'Una cuenta para todas las aplicaciones CyberEco. Inicia sesión una vez, accede a todo.'
          },
          profiles: {
            title: 'Perfiles Centralizados',
            description: 'Perfiles de usuario gestionados en Hub, accesibles en todas las aplicaciones conectadas.'
          },
          permissions: {
            title: 'Control de Permisos',
            description: 'Permisos detallados para acceso a aplicaciones, características y control a nivel de recursos.'
          }
        },
        benefits: {
          title: 'Beneficios Clave',
          benefit1: 'Experiencia de usuario fluida entre aplicaciones',
          benefit2: 'Complejidad de autenticación reducida para desarrolladores',
          benefit3: 'Seguridad mejorada con control de acceso centralizado',
          benefit4: 'Sincronización de sesión entre pestañas y aplicaciones',
          benefit5: 'Soporte para proveedores de inicio de sesión social',
          benefit6: 'Gestión integrada de permisos y roles'
        },
        quickstart: {
          title: 'Guía de Inicio Rápido',
          step1: {
            title: 'Instalar Dependencias'
          },
          step2: {
            title: 'Definir Tu Tipo de Usuario'
          },
          step3: {
            title: 'Crear Contexto de Autenticación'
          },
          step4: {
            title: 'Envolver Tu Aplicación'
          },
          step5: {
            title: 'Usar en Componentes'
          }
        },
        architecture: {
          title: 'Arquitectura del Sistema',
          hub: {
            title: 'Hub (Autenticación Central)',
            item1: 'Registro e inicio de sesión de usuarios',
            item2: 'Gestión de perfiles',
            item3: 'Control de permisos',
            item4: 'Generación de tokens'
          },
          libraries: {
            title: 'Bibliotecas Compartidas'
          },
          applications: {
            title: 'Aplicaciones'
          },
          flow: {
            title: 'Flujo de Autenticación',
            step1: 'Usuario accede a app sin autenticación',
            step2: 'App redirige a inicio de sesión del Hub',
            step3: 'Usuario se autentica en el Hub',
            step4: 'Hub genera token de autenticación',
            step5: 'Redirige de vuelta a la app con token',
            step6: 'App valida token y crea sesión'
          },
          models: {
            title: 'Modelos de Datos',
            baseUser: 'Campos de usuario principales compartidos en todas las apps',
            appPermission: 'Configuración de permisos por app',
            sharedUserProfile: 'Perfil extendido con datos entre aplicaciones'
          }
        },
        api: {
          title: 'Referencia de API',
          coreFunctions: 'Funciones Principales',
          createAuthContext: 'Función factory para crear contextos de autenticación con tipos seguros',
          useAuth: 'Hook para acceder al estado y métodos de autenticación',
          usePermissions: 'Verificar permisos de usuario para características y roles',
          useSessionSync: 'Sincronizar estado de autenticación entre pestañas y apps',
          utilityFunctions: 'Funciones de Utilidad',
          validateEmail: 'Validar formato de email',
          validatePassword: 'Verificar fortaleza de contraseña',
          generateAuthRedirectUrl: 'Crear URLs de redirección de autenticación',
          getAuthErrorMessage: 'Mensajes de error amigables'
        },
        examples: {
          title: 'Ejemplos de Implementación',
          protectedRoute: {
            title: 'Componente de Ruta Protegida'
          },
          crossApp: {
            title: 'Navegación Entre Aplicaciones'
          },
          permissions: {
            title: 'Características Basadas en Permisos'
          },
          errorHandling: {
            title: 'Manejo de Errores'
          }
        }
      },
      
      // Key Concepts translations
      ecosystemArchitectureTitle: 'Arquitectura del Ecosistema',
      ecosystemArchitectureText: 'CyberEco está construido como un ecosistema modular donde cada aplicación sirve un propósito específico mientras contribuye al todo mayor:',
      architecturePoint1: 'Hub: Gestión central de autenticación e identidad',
      architecturePoint2: 'Capa de Aplicaciones: Apps especializadas para diferentes dominios de vida',
      architecturePoint3: 'Capa de Datos: Almacenamiento y compartición de datos controlados por el usuario',
      architecturePoint4: 'Capa de Integración: APIs y protocolos para interacción fluida',
      
      humanCenteredDesignTitle: 'Diseño Centrado en el Humano',
      humanCenteredDesignText: 'Cada aplicación en el ecosistema CyberEco está diseñada con el bienestar humano y la conexión auténtica en su centro. Esto significa:',
      humanCenteredPoint1: 'Minimizar patrones de diseño adictivos',
      humanCenteredPoint2: 'Promover relaciones y actividades del mundo real',
      humanCenteredPoint3: 'Apoyar el crecimiento individual y la construcción de comunidad',
      humanCenteredPoint4: 'Respetar la atención humana y la salud mental',
      
      communityDrivenTitle: 'Desarrollo Impulsado por la Comunidad',
      communityDrivenText: 'Nuestro proceso de desarrollo está guiado por las necesidades reales de la comunidad en lugar de la maximización de ganancias. Priorizamos:',
      communityDrivenPoint1: 'Desarrollo de código abierto cuando sea posible',
      communityDrivenPoint2: 'Retroalimentación e involucramiento de la comunidad en el desarrollo de características',
      communityDrivenPoint3: 'Hojas de ruta transparentes y procesos de toma de decisiones',
      communityDrivenPoint4: 'Modelos de negocio sostenibles que se alinean con los intereses del usuario',
      
      // Learning paths
      learningPathTitle: 'Elige Tu Ruta de Aprendizaje',
      businessUserPath: 'Usuario de Negocios',
      businessUserDesc: 'Aprende a usar aplicaciones para colaboración en equipo y gestión de gastos.',
      fiveTopics: '📚 5 temas',
      developerPath: 'Desarrollador',
      developerDesc: 'Integración técnica, uso de API y arquitectura de plataforma.',
      twelveTopics: '📚 12 temas',
      communityPath: 'Líder Comunitario',
      communityDesc: 'Gobernanza, soberanía digital y filosofía de la plataforma.',
      eightTopics: '📚 8 temas',
      
      // Core Documentation
      coreDocument: 'Documento Principal',
      philosophyDocSummary: 'Los principios y valores fundamentales que guían el ecosistema CyberEco',
      keyPrinciples: 'Principios Clave',
      digitalSovereigntyPrinciple: 'Soberanía Digital',
      digitalSovereigntyDesc: 'Tú eres dueño de tus datos, identidad y relaciones digitales',
      humanCenteredPrinciple: 'Centrado en el Humano',
      humanCenteredDesc: 'Tecnología que sirve al florecimiento humano, no a la adicción',
      sustainablePrinciple: 'Sostenible',
      sustainableDesc: 'Construido para valor a largo plazo, no ganancias a corto plazo',
      philosophyDocPreview: 'Nuestra filosofía de plataforma se basa en la creencia de que la tecnología debe empoderar a individuos y comunidades, no explotarlos. Rechazamos el capitalismo de vigilancia y adoptamos un modelo donde los usuarios mantienen soberanía sobre sus vidas digitales.',
      completePhilosophyDoc: 'Documento Completo de Filosofía',
      completePhilosophyDesc: 'Lee nuestro manifiesto filosófico completo y entiende por qué estamos construyendo de manera diferente',
      viewFullPhilosophy: 'Ver Filosofía Completa',
      
      // Vision Document
      futureVision: 'Visión del Futuro',
      visionDocSummary: 'Nuestra visión a largo plazo para un ecosistema digital descentralizado y propiedad del usuario',
      visionComponents: 'Componentes de la Visión',
      mobileP2PComponent: 'Redes P2P Móviles',
      mobileP2PDesc: 'Comunicación sin servidor directamente entre dispositivos',
      dataSovereigntyComponent: 'Soberanía de Datos',
      dataSovereigntyDesc: 'Control completo del usuario sobre información personal',
      tokenEconomicsComponent: 'Economía de Tokens',
      tokenEconomicsDesc: 'Distribución justa de valor a través de tecnología blockchain',
      globalAccessComponent: 'Acceso Global',
      globalAccessDesc: 'Diseño inclusivo para adopción mundial',
      visionDocPreview: 'Imaginamos un futuro donde la infraestructura digital es tan descentralizada como el internet mismo estaba destinado a ser. A través de redes móviles peer-to-peer, tecnología blockchain y diseño centrado en el usuario, estamos construyendo la base para la verdadera soberanía digital.',
      completeVisionDoc: 'Documento Completo de Visión',
      completeVisionDesc: 'Explora nuestra visión detallada para el futuro de la tecnología descentralizada',
      viewFullVision: 'Ver Visión Completa',
      
      // Vision Page
      vision: {
        title: 'Visión del Futuro Descentralizado',
        subtitle: 'Transición de infraestructura en la nube centralizada a un ecosistema distribuido, privacidad primero y basado en blockchain',
        executiveSummary: {
          title: 'Resumen Ejecutivo',
          description: 'La Plataforma CyberEco visualiza un futuro donde la gestión del estilo de vida digital opera en una red descentralizada impulsada por dispositivos móviles, asegurada por tecnología blockchain y gobernada por principios de privacidad criptográfica. Este enfoque transformará cómo los usuarios interactúan con sus datos, cambiando de la dependencia tradicional de la nube a un ecosistema propiedad del usuario que preserva la privacidad.'
        },
        visionOverview: {
          title: 'Visión General',
          currentState: 'Estado Actual',
          futureState: 'Estado Futuro'
        },
        architecture: {
          title: 'Visión de Arquitectura Descentralizada',
          mobileP2P: {
            title: 'Red P2P Móvil Primero',
            deviceParticipation: 'Modelo de Participación de Dispositivos',
            personalNodes: 'Nodos Personales',
            contributionIncentives: 'Incentivos de Contribución',
            dynamicLoadBalancing: 'Equilibrio de Carga Dinámico',
            offlineFirst: 'Diseño Fuera de Línea Primero'
          },
          blockchain: {
            title: 'Estrategia de Integración Blockchain',
            onChain: 'Componentes En Cadena',
            offChain: 'Componentes Fuera de Cadena',
            hybrid: 'Enfoque Híbrido (Fase de Transición)'
          },
          privacy: {
            title: 'Criptografía que Preserva la Privacidad',
            zeroKnowledge: 'Arquitectura de Conocimiento Cero',
            selectiveDisclosure: 'Divulgación Selectiva',
            proofGeneration: 'Generación de Pruebas',
            granularPermissions: 'Permisos Granulares'
          }
        },
        roadmap: {
          title: 'Hoja de Ruta de Implementación Técnica',
          phases: {
            hybrid: 'Fase 1: Fundación Híbrida (2025-2026)',
            network: 'Fase 2: Fundación de Red (2026-2027)',
            full: 'Fase 3: Descentralización Completa (2027-2028)'
          }
        },
        economics: {
          title: 'Modelo Económico e Incentivos',
          tokenEconomics: 'Economía de Tokens (Futuro Token CyberEco - CYE)',
          utilityFunctions: 'Funciones de Utilidad',
          networkRewards: 'Recompensas de Participación en la Red',
          privacyIncentives: 'Incentivos de Privacidad de Datos',
          applicationAccess: 'Acceso a Aplicaciones'
        },
        migration: {
          title: 'Estrategia de Migración',
          gradualTransition: 'Enfoque de Transición Gradual',
          phaseA: 'Fase A: Operación Híbrida',
          phaseB: 'Fase B: Descentralización Primaria',
          phaseC: 'Fase C: Descentralización Completa'
        },
        impact: {
          title: 'Impacto Global y Beneficios',
          forUsers: 'Para Usuarios Individuales',
          forSociety: 'Para la Sociedad',
          digitalRights: 'Derechos Digitales',
          economicDemocratization: 'Democratización Económica'
        },
        security: {
          title: 'Seguridad y Mitigación de Riesgos',
          guarantees: 'Garantías de Seguridad',
          technicalSecurity: 'Seguridad Técnica',
          economicSecurity: 'Seguridad Económica',
          riskAssessment: 'Evaluación y Mitigación de Riesgos'
        },
        longTerm: {
          title: 'Visión a Largo Plazo (2030+)',
          expandedEcosystem: 'Ecosistema Expandido',
          interoperability: 'Interoperabilidad',
          globalNetwork: 'Visión de Red Global'
        },
        getInvolved: {
          title: 'Cómo Involucrarse',
          forDevelopers: 'Para Desarrolladores',
          forUsers: 'Para Usuarios',
          forOrganizations: 'Para Organizaciones'
        },
        callToAction: {
          title: 'Llamado a la Acción',
          description: 'El futuro de la privacidad digital y la soberanía de datos comienza con las decisiones que tomamos hoy. La visión descentralizada de CyberEco representa más que una actualización técnica: es un cambio fundamental hacia el empoderamiento del usuario y los derechos digitales.'
        }
      },
      
      // Roadmap Document
      developmentPlan: 'Plan de Desarrollo',
      roadmapDocSummary: 'Nuestro enfoque por fases para construir el ecosistema completo de CyberEco',
      developmentPhases: 'Fases de Desarrollo',
      foundationPhase: 'Fase de Fundación',
      foundationDesc: 'Infraestructura central, autenticación y aplicaciones iniciales',
      growthPhase: 'Fase de Crecimiento',
      growthDesc: 'Expansión del conjunto de aplicaciones y adopción de usuarios',
      integrationPhase: 'Fase de Integración',
      integrationDesc: 'Sinergias entre aplicaciones y efectos del ecosistema',
      decentralizationPhase: 'Fase de Descentralización',
      decentralizationDesc: 'Transición a infraestructura completamente distribuida',
      completeRoadmapDoc: 'Hoja de Ruta Completa',
      completeRoadmapDesc: 'Ver nuestra línea de tiempo detallada de desarrollo y características próximas',
      viewFullRoadmap: 'Ver Hoja de Ruta Completa',
      
      // Portfolio Document
      solutionsOverview: 'Resumen de Soluciones',
      portfolioDocSummary: 'Nuestro conjunto integral de aplicaciones que cubren todos los aspectos de la vida digital',
      solutionCategories: 'Categorías de Soluciones',
      currentSolutions: 'Soluciones Actuales',
      priorityApplications: 'Aplicaciones Prioritarias',
      inDevelopment: 'En Desarrollo',
      futureEcosystem: 'Ecosistema Futuro',
      thirtyPlusApplications: '30+ aplicaciones planificadas',
      portfolioDocPreview: 'El ecosistema CyberEco incluye aplicaciones para finanzas, comunidad, sostenibilidad, educación, salud y más. Cada aplicación está diseñada para funcionar sin problemas con otras mientras respeta la privacidad y autonomía del usuario.',
      completeSolutionsPortfolio: 'Portafolio Completo de Soluciones',
      completeSolutionsDesc: 'Explora todas las aplicaciones actuales y planificadas en el ecosistema CyberEco',
      viewFullPortfolio: 'Ver Portafolio Completo',
      
      // Navigation items
      privacyControlsNavItem: 'Controles de Privacidad y GDPR',
      twoFactorAuthNavItem: 'Autenticación de Dos Factores',
      dataExportNavItem: 'Exportación y Portabilidad de Datos',
      
      // Documentation descriptions
      apiReference: {
        description: 'Documentación completa de API y endpoints'
      },
      development: {
        description: 'Configura tu entorno local'
      },
      community: {
        description: 'Únete a nuestra comunidad de desarrolladores'
      },
      
      // Common Documentation Elements
      tableOfContents: 'Tabla de Contenidos',
      nextSteps: 'Siguientes Pasos'
    }
  }
};