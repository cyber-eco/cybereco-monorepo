import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  query, 
  where,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { getHubFirestore } from '@cybereco/firebase-config';
import { createLogger, ValidationError, validate, emailSchema } from '@cybereco/auth';

const logger = createLogger('SubscriptionService');

export interface EmailSubscription {
  email: string;
  appId: string;
  subscribedAt: Date;
  verified: boolean;
  source: 'coming-soon' | 'landing' | 'other';
  metadata?: {
    userAgent?: string;
    ipAddress?: string;
    referrer?: string;
  };
}

class SubscriptionService {
  private readonly collection = 'emailSubscriptions';

  /**
   * Subscribe an email for app updates
   */
  async subscribe(
    email: string, 
    appId: string, 
    source: EmailSubscription['source'] = 'coming-soon',
    metadata?: EmailSubscription['metadata']
  ): Promise<{ success: boolean; message: string }> {
    try {
      // Validate email
      validate(emailSchema, email);
      
      const db = getHubFirestore();
      
      // Check if already subscribed
      const existingQuery = query(
        collection(db, this.collection),
        where('email', '==', email.toLowerCase()),
        where('appId', '==', appId)
      );
      
      const existing = await getDocs(existingQuery);
      
      if (!existing.empty) {
        logger.info('Email already subscribed', { email, appId });
        return {
          success: true,
          message: 'You are already subscribed for updates!'
        };
      }
      
      // Create subscription
      const subscriptionId = `${email.toLowerCase()}_${appId}`.replace(/[^a-zA-Z0-9_]/g, '_');
      const subscription: Partial<EmailSubscription> = {
        email: email.toLowerCase(),
        appId,
        subscribedAt: new Date(),
        verified: false,
        source,
        metadata
      };
      
      await setDoc(
        doc(db, this.collection, subscriptionId),
        {
          ...subscription,
          subscribedAt: serverTimestamp()
        }
      );
      
      logger.info('Email subscribed successfully', { email, appId, source });
      
      // In production, you would send a verification email here
      // await this.sendVerificationEmail(email, appId);
      
      return {
        success: true,
        message: 'Successfully subscribed! We\'ll notify you when the app launches.'
      };
    } catch (error) {
      if (error instanceof ValidationError) {
        return {
          success: false,
          message: 'Please enter a valid email address.'
        };
      }
      
      logger.error('Failed to subscribe email', { error, email, appId });
      return {
        success: false,
        message: 'Failed to subscribe. Please try again.'
      };
    }
  }

  /**
   * Unsubscribe an email
   */
  async unsubscribe(email: string, appId: string): Promise<boolean> {
    try {
      const db = getHubFirestore();
      const subscriptionId = `${email.toLowerCase()}_${appId}`.replace(/[^a-zA-Z0-9_]/g, '_');
      
      await setDoc(
        doc(db, this.collection, subscriptionId),
        { unsubscribedAt: serverTimestamp() },
        { merge: true }
      );
      
      logger.info('Email unsubscribed', { email, appId });
      return true;
    } catch (error) {
      logger.error('Failed to unsubscribe email', { error, email, appId });
      return false;
    }
  }

  /**
   * Get all subscriptions for an app
   */
  async getAppSubscriptions(appId: string): Promise<EmailSubscription[]> {
    try {
      const db = getHubFirestore();
      const subscriptionsQuery = query(
        collection(db, this.collection),
        where('appId', '==', appId),
        where('verified', '==', true)
      );
      
      const snapshot = await getDocs(subscriptionsQuery);
      
      return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          subscribedAt: data.subscribedAt?.toDate() || new Date()
        } as EmailSubscription;
      });
    } catch (error) {
      logger.error('Failed to get app subscriptions', { error, appId });
      return [];
    }
  }

  /**
   * Check if email is subscribed to an app
   */
  async isSubscribed(email: string, appId: string): Promise<boolean> {
    try {
      const db = getHubFirestore();
      const subscriptionId = `${email.toLowerCase()}_${appId}`.replace(/[^a-zA-Z0-9_]/g, '_');
      
      const docRef = doc(db, this.collection, subscriptionId);
      const docSnap = await getDocs(query(collection(db, this.collection), where('email', '==', email.toLowerCase()), where('appId', '==', appId)));
      
      return !docSnap.empty;
    } catch (error) {
      logger.error('Failed to check subscription', { error, email, appId });
      return false;
    }
  }
}

// Export singleton instance
export const subscriptionService = new SubscriptionService();