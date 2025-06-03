import Link from 'next/link';
import { FaRocket, FaShieldAlt, FaUsers, FaLock, FaGlobe, FaCode, FaChartLine, FaLeaf } from 'react-icons/fa';
import styles from './landing/page.module.css';

const features = [
  {
    icon: <FaShieldAlt />,
    title: 'Secure Authentication',
    description: 'Enterprise-grade security with OAuth2, SSO, and multi-factor authentication',
    color: '#006241'
  },
  {
    icon: <FaUsers />,
    title: 'Unified Access',
    description: 'One account for all CyberEco applications. Seamless navigation between apps',
    color: '#00A86B'
  },
  {
    icon: <FaLock />,
    title: 'Privacy First',
    description: 'Your data stays yours. End-to-end encryption and zero-knowledge architecture',
    color: '#228B22'
  },
  {
    icon: <FaGlobe />,
    title: 'Global Scale',
    description: 'Built for millions of users with automatic scaling and global CDN',
    color: '#50C878'
  }
];

const apps = [
  {
    id: 'justsplit',
    name: 'JustSplit',
    description: 'Smart expense splitting for groups',
    icon: '💰',
    href: '/app/justsplit',
    color: '#FFB800',
    status: 'live'
  },
  {
    id: 'somos',
    name: 'Somos',
    description: 'Explore your family roots and heritage',
    icon: '🌳',
    href: '/app/somos',
    color: '#8B4513',
    status: 'coming-soon'
  },
  {
    id: 'demos',
    name: 'Demos',
    description: 'Community governance made simple',
    icon: '🗳️',
    href: '/app/demos',
    color: '#4169E1',
    status: 'coming-soon'
  },
  {
    id: 'plantopia',
    name: 'Plantopia',
    description: 'Smart gardening companion',
    icon: '🌱',
    href: '/app/plantopia',
    color: '#00A86B',
    status: 'coming-soon'
  }
];

export default function StaticLandingPage() {
  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.heroGrid} />
        </div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Welcome to <span className={styles.brand}>CyberEco Hub</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Your gateway to a sustainable digital lifestyle. One account, endless possibilities.
          </p>
          <div className={styles.heroCta}>
            <Link href="/auth/signup" className={styles.ctaPrimary}>
              <FaRocket /> Get Started Free
            </Link>
            <Link href="/auth/signin" className={styles.ctaSecondary}>
              Sign In
            </Link>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>100K+</span>
              <span className={styles.statLabel}>Active Users</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>4+</span>
              <span className={styles.statLabel}>Connected Apps</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>99.9%</span>
              <span className={styles.statLabel}>Uptime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Why CyberEco Hub?</h2>
            <p className={styles.sectionSubtitle}>
              Built for the future of digital living with privacy, security, and sustainability at its core
            </p>
          </div>
          <div className={styles.featureGrid}>
            {features.map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <div className={styles.featureIcon} style={{ color: feature.color }}>
                  {feature.icon}
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apps Showcase */}
      <section className={styles.apps}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Connected Applications</h2>
            <p className={styles.sectionSubtitle}>
              Access all CyberEco applications with a single account
            </p>
          </div>
          <div className={styles.appsGrid}>
            {apps.map((app) => (
              <div 
                key={app.id} 
                className={`${styles.appCard} ${app.status === 'coming-soon' ? styles.comingSoon : ''}`}
              >
                <div className={styles.appIcon} style={{ backgroundColor: `${app.color}20` }}>
                  <span style={{ fontSize: '2.5rem' }}>{app.icon}</span>
                </div>
                <h3 className={styles.appName}>{app.name}</h3>
                <p className={styles.appDescription}>{app.description}</p>
                {app.status === 'coming-soon' && (
                  <span className={styles.comingSoonBadge}>Coming Soon</span>
                )}
                {app.status === 'live' && (
                  <Link href={app.href} className={styles.appLink}>
                    Access Now →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Features */}
      <section className={styles.technical}>
        <div className={styles.container}>
          <div className={styles.technicalGrid}>
            <div className={styles.technicalContent}>
              <h2 className={styles.technicalTitle}>Built for Developers</h2>
              <p className={styles.technicalDescription}>
                CyberEco Hub provides a robust authentication and proxy layer for all ecosystem applications
              </p>
              <ul className={styles.technicalFeatures}>
                <li><FaCode /> RESTful API with GraphQL support</li>
                <li><FaChartLine /> Real-time analytics and monitoring</li>
                <li><FaLeaf /> Carbon-neutral infrastructure</li>
                <li><FaGlobe /> Global CDN with edge computing</li>
              </ul>
              <Link href="/docs" className={styles.docsLink}>
                View Documentation →
              </Link>
            </div>
            <div className={styles.technicalVisual}>
              <div className={styles.codeBlock}>
                <pre>
                  <code>{`// Authenticate once, access everywhere
const auth = await cybereco.auth.signIn({
  email: 'user@example.com',
  password: '********'
});

// Seamless app switching
await cybereco.apps.navigate('justsplit');

// Unified data access
const profile = await cybereco.user.getProfile();`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to join the ecosystem?</h2>
            <p className={styles.ctaSubtitle}>
              Start your journey towards a more connected and sustainable digital lifestyle
            </p>
            <div className={styles.ctaButtons}>
              <Link href="/auth/signup" className={styles.ctaPrimary}>
                <FaRocket /> Create Free Account
              </Link>
              <Link href="/about" className={styles.ctaSecondary}>
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}