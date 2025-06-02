'use client';

import { useState } from 'react';
import { useLanguage, Card } from '@cybereco/ui-components';
import { useAuth } from '../../components/AuthContext';
import { FaCreditCard, FaDownload, FaCheckCircle } from 'react-icons/fa';
import styles from '../page.module.css';

export default function Billing() {
  const { userProfile: user, isLoading: loading } = useAuth();
  const { t } = useLanguage();
  const [currentPlan] = useState('free');

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          {t('hub.loading') || 'Loading...'}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          {t('auth.signInError') || 'Please sign in to access billing information'}
        </div>
      </div>
    );
  }

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for personal use',
      features: [
        'Access to JustSplit',
        'Up to 3 expense groups',
        'Basic expense tracking',
        'Email support'
      ],
      current: currentPlan === 'free'
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$9.99',
      period: 'per month',
      description: 'Best for power users',
      features: [
        'Access to all apps',
        'Unlimited expense groups',
        'Advanced analytics',
        'Priority support',
        'Data export',
        'Custom categories'
      ],
      current: currentPlan === 'pro'
    },
    {
      id: 'team',
      name: 'Team',
      price: '$19.99',
      period: 'per month',
      description: 'Perfect for families and teams',
      features: [
        'Everything in Pro',
        'Team management',
        'Shared workspaces',
        'Admin controls',
        'SSO integration',
        'Custom branding'
      ],
      current: currentPlan === 'team'
    }
  ];

  const mockInvoices = [
    {
      id: 'inv_001',
      date: '2024-01-15',
      amount: '$0.00',
      status: 'paid',
      plan: 'Free Plan'
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            <FaCreditCard className={styles.titleIcon} />
            {t('footer.billing') || 'Billing'}
          </h1>
          <p className={styles.subtitle}>
            Manage your subscription and billing information
          </p>
        </header>

        <div className={styles.billingContainer}>
          <Card className={styles.currentPlanCard}>
            <h2 className={styles.cardTitle}>Current Plan</h2>
            <div className={styles.currentPlan}>
              <div className={styles.planInfo}>
                <h3 className={styles.planName}>Free Plan</h3>
                <p className={styles.planPrice}>$0.00 / month</p>
                <p className={styles.planDescription}>
                  You're currently on the free plan with access to basic features.
                </p>
              </div>
              <div className={styles.planActions}>
                <button className={styles.upgradeButton}>
                  Upgrade Plan
                </button>
              </div>
            </div>
          </Card>

          <Card className={styles.plansCard}>
            <h2 className={styles.cardTitle}>Available Plans</h2>
            <div className={styles.plansGrid}>
              {plans.map((plan) => (
                <div 
                  key={plan.id} 
                  className={`${styles.planCard} ${plan.current ? styles.currentPlanCard : ''}`}
                >
                  {plan.current && (
                    <div className={styles.currentBadge}>
                      <FaCheckCircle /> Current Plan
                    </div>
                  )}
                  
                  <div className={styles.planHeader}>
                    <h3 className={styles.planTitle}>{plan.name}</h3>
                    <div className={styles.planPricing}>
                      <span className={styles.planPrice}>{plan.price}</span>
                      <span className={styles.planPeriod}>/{plan.period}</span>
                    </div>
                    <p className={styles.planDesc}>{plan.description}</p>
                  </div>
                  
                  <ul className={styles.planFeatures}>
                    {plan.features.map((feature, index) => (
                      <li key={index} className={styles.planFeature}>
                        <FaCheckCircle className={styles.featureIcon} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className={styles.planAction}>
                    {plan.current ? (
                      <button className={styles.currentButton} disabled>
                        Current Plan
                      </button>
                    ) : (
                      <button className={styles.selectButton}>
                        {plan.id === 'free' ? 'Downgrade' : 'Upgrade'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className={styles.invoicesCard}>
            <h2 className={styles.cardTitle}>Billing History</h2>
            <div className={styles.invoicesTable}>
              <div className={styles.tableHeader}>
                <span>Invoice</span>
                <span>Date</span>
                <span>Amount</span>
                <span>Status</span>
                <span>Actions</span>
              </div>
              
              {mockInvoices.map((invoice) => (
                <div key={invoice.id} className={styles.tableRow}>
                  <span className={styles.invoiceId}>{invoice.id}</span>
                  <span>{new Date(invoice.date).toLocaleDateString()}</span>
                  <span className={styles.amount}>{invoice.amount}</span>
                  <span className={`${styles.status} ${styles[invoice.status]}`}>
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </span>
                  <button className={styles.downloadButton}>
                    <FaDownload /> Download
                  </button>
                </div>
              ))}
            </div>
          </Card>

          <Card className={styles.paymentMethodCard}>
            <h2 className={styles.cardTitle}>Payment Method</h2>
            <div className={styles.paymentMethod}>
              <p className={styles.noPaymentMethod}>
                No payment method on file. Add a payment method to upgrade your plan.
              </p>
              <button className={styles.addPaymentButton}>
                Add Payment Method
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}