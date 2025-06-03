'use client';

import { 
  collection, 
  query, 
  where, 
  getDocs, 
  orderBy, 
  limit,
  Timestamp,
  startAfter,
  DocumentSnapshot,
  getFirestore
} from 'firebase/firestore';
import { getHubFirestore, getAppFirestore } from '@cybereco/firebase-config';

// Types for dashboard data
export interface DashboardMetric {
  id: string;
  label: string;
  value: number | string;
  change?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
    period: string;
  };
  icon?: React.ReactNode;
  format?: 'currency' | 'percentage' | 'number';
  color?: string;
  loading?: boolean;
}

export interface ActivityItem {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  type: 'success' | 'info' | 'warning' | 'error';
  icon?: React.ReactNode;
  metadata?: {
    badge?: string;
    appId?: string;
    [key: string]: any;
  };
}

// JustSplit data interfaces (matching the types)
interface JustSplitUser {
  id: string;
  name: string;
  email?: string;
  avatarUrl?: string;
  balance: number;
  friends?: string[];
}

interface JustSplitExpense {
  id: string;
  description: string;
  amount: number;
  currency: string;
  date: string;
  paidBy: string;
  participants: string[];
  eventId?: string;
  groupId?: string;
  settled: boolean;
  category?: string;
  createdAt: string;
}

interface JustSplitGroup {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  members: string[];
  eventIds: string[];
  expenseIds: string[];
}

interface JustSplitEvent {
  id: string;
  name: string;
  description?: string;
  date: string;
  startDate: string;
  endDate?: string;
  location?: string;
  createdAt: string;
  createdBy: string;
  members: string[];
  expenseIds: string[];
  groupId?: string;
}

interface JustSplitSettlement {
  id: string;
  fromUser: string;
  toUser: string;
  amount: number;
  currency: string;
  date: string;
  expenseIds: string[];
  eventId?: string;
  method?: string;
}

export class DashboardDataService {
  private static instance: DashboardDataService;
  private db: any;
  
  constructor() {
    // Delay database initialization until first use to avoid startup errors
    this.db = null;
  }

  private getDatabase() {
    if (!this.db) {
      try {
        // Use Hub Firestore (which connects to the same Firebase project as JustSplit)
        this.db = getHubFirestore();
        console.log('Successfully connected to Hub Firestore');
      } catch (error) {
        console.error('Failed to connect to Firestore:', error);
        throw new Error('Unable to connect to database. Please check your Firebase configuration.');
      }
    }
    return this.db;
  }
  
  static getInstance(): DashboardDataService {
    if (!DashboardDataService.instance) {
      DashboardDataService.instance = new DashboardDataService();
    }
    return DashboardDataService.instance;
  }

  // Helper function to convert Firestore timestamp to string
  private timestampToString(timestamp: any): string {
    if (timestamp && timestamp.toDate) {
      return timestamp.toDate().toISOString();
    }
    if (timestamp instanceof Date) {
      return timestamp.toISOString();
    }
    return timestamp || new Date().toISOString();
  }

  // Get user's JustSplit data
  async getUserJustSplitData(userId: string): Promise<{
    expenses: JustSplitExpense[];
    groups: JustSplitGroup[];
    events: JustSplitEvent[];
    settlements: JustSplitSettlement[];
    userProfile?: JustSplitUser;
  }> {
    try {
      // Check if we have a valid auth state before querying
      const { getCurrentUser } = await import('@cybereco/firebase-config');
      const currentUser = await getCurrentUser();
      
      if (!currentUser || currentUser.uid !== userId) {
        console.log('No valid auth state for dashboard data fetch');
        return {
          expenses: [],
          groups: [],
          events: [],
          settlements: []
        };
      }
      
      console.log('Fetching JustSplit data for user:', userId);

      // Fetch user profile
      const db = this.getDatabase();
      const usersQuery = query(collection(db, 'users'), where('id', '==', userId));
      const usersSnapshot = await getDocs(usersQuery);
      const userProfile = usersSnapshot.docs[0]?.data() as JustSplitUser;
      
      if (!userProfile) {
        console.log('No JustSplit user profile found for user:', userId);
        // User may not have used JustSplit yet
      }

      // Fetch expenses where user is a participant or payer
      const expensesQuery = query(
        collection(db, 'expenses'),
        where('participants', 'array-contains', userId),
        orderBy('createdAt', 'desc'),
        limit(100)
      );
      const expensesSnapshot = await getDocs(expensesQuery);
      const expenses: JustSplitExpense[] = expensesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: this.timestampToString(doc.data().date),
        createdAt: this.timestampToString(doc.data().createdAt)
      } as JustSplitExpense));

      // Fetch groups where user is a member
      const groupsQuery = query(
        collection(db, 'groups'),
        where('members', 'array-contains', userId),
        orderBy('createdAt', 'desc'),
        limit(50)
      );
      const groupsSnapshot = await getDocs(groupsQuery);
      const groups: JustSplitGroup[] = groupsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: this.timestampToString(doc.data().createdAt)
      } as JustSplitGroup));

      // Fetch events where user is a member
      const eventsQuery = query(
        collection(db, 'events'),
        where('members', 'array-contains', userId),
        orderBy('createdAt', 'desc'),
        limit(50)
      );
      const eventsSnapshot = await getDocs(eventsQuery);
      const events: JustSplitEvent[] = eventsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: this.timestampToString(doc.data().date),
        startDate: this.timestampToString(doc.data().startDate),
        endDate: doc.data().endDate ? this.timestampToString(doc.data().endDate) : undefined,
        createdAt: this.timestampToString(doc.data().createdAt)
      } as JustSplitEvent));

      // Fetch settlements where user is involved
      const settlementsFromQuery = query(
        collection(db, 'settlements'),
        where('fromUser', '==', userId),
        orderBy('date', 'desc'),
        limit(25)
      );
      const settlementsToQuery = query(
        collection(db, 'settlements'),
        where('toUser', '==', userId),
        orderBy('date', 'desc'),
        limit(25)
      );

      const [settlementsFromSnapshot, settlementsToSnapshot] = await Promise.all([
        getDocs(settlementsFromQuery),
        getDocs(settlementsToQuery)
      ]);

      const settlements: JustSplitSettlement[] = [
        ...settlementsFromSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          date: this.timestampToString(doc.data().date)
        } as JustSplitSettlement)),
        ...settlementsToSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          date: this.timestampToString(doc.data().date)
        } as JustSplitSettlement))
      ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      console.log('JustSplit data fetched:', {
        expenses: expenses.length,
        groups: groups.length,
        events: events.length,
        settlements: settlements.length,
        userProfile: !!userProfile
      });

      return {
        expenses,
        groups,
        events,
        settlements,
        userProfile
      };
    } catch (error) {
      console.error('Error fetching JustSplit data:', error);
      return {
        expenses: [],
        groups: [],
        events: [],
        settlements: []
      };
    }
  }

  // Calculate dashboard metrics from real data
  calculateMetrics(data: {
    expenses: JustSplitExpense[];
    groups: JustSplitGroup[];
    events: JustSplitEvent[];
    settlements: JustSplitSettlement[];
  }): DashboardMetric[] {
    // Handle case where data might be empty
    if (!data.expenses) data.expenses = [];
    if (!data.groups) data.groups = [];
    if (!data.events) data.events = [];
    if (!data.settlements) data.settlements = [];
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const thisWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Calculate total expenses this month
    const thisMonthExpenses = data.expenses.filter(expense => 
      new Date(expense.createdAt) >= thisMonth
    );
    const totalExpensesThisMonth = thisMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);

    // Calculate last month expenses for comparison
    const lastMonthExpenses = data.expenses.filter(expense => {
      const expenseDate = new Date(expense.createdAt);
      return expenseDate >= lastMonth && expenseDate < thisMonth;
    });
    const totalExpensesLastMonth = lastMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);

    // Calculate expense change percentage
    const expenseChange = totalExpensesLastMonth > 0 
      ? ((totalExpensesThisMonth - totalExpensesLastMonth) / totalExpensesLastMonth) * 100
      : totalExpensesThisMonth > 0 ? 100 : 0;

    // Active groups (groups with activity in last 30 days)
    const activeGroups = data.groups.filter(group => {
      const groupExpenses = data.expenses.filter(expense => 
        expense.groupId === group.id && 
        new Date(expense.createdAt) >= lastMonth
      );
      return groupExpenses.length > 0;
    });

    // Recent activity (actions in the last week)
    const recentExpenses = data.expenses.filter(expense => 
      new Date(expense.createdAt) >= thisWeek
    );
    const recentSettlements = data.settlements.filter(settlement => 
      new Date(settlement.date) >= thisWeek
    );
    const recentGroups = data.groups.filter(group => 
      new Date(group.createdAt) >= thisWeek
    );
    const recentEvents = data.events.filter(event => 
      new Date(event.createdAt) >= thisWeek
    );

    const totalRecentActions = recentExpenses.length + recentSettlements.length + 
                              recentGroups.length + recentEvents.length;

    return [
      {
        id: 'total-apps',
        label: 'Active Applications',
        value: 1, // Currently only JustSplit is active
        change: { value: 0, direction: 'neutral', period: 'last month' },
        format: 'number',
        color: '#006241'
      },
      {
        id: 'total-expenses',
        label: 'Total Expenses (This Month)',
        value: totalExpensesThisMonth,
        change: { 
          value: Math.abs(Math.round(expenseChange)), 
          direction: expenseChange >= 0 ? 'up' : 'down', 
          period: 'last month' 
        },
        format: 'currency',
        color: '#6BBF59'
      },
      {
        id: 'active-groups',
        label: 'Active Groups',
        value: activeGroups.length,
        change: { value: 0, direction: 'neutral', period: 'this month' },
        format: 'number',
        color: '#28a745'
      },
      {
        id: 'recent-activity',
        label: 'Actions This Week',
        value: totalRecentActions,
        change: { value: 0, direction: 'neutral', period: 'last week' },
        format: 'number',
        color: '#f39c12'
      }
    ];
  }

  // Generate activity feed from real data
  generateActivityFeed(data: {
    expenses: JustSplitExpense[];
    groups: JustSplitGroup[];
    events: JustSplitEvent[];
    settlements: JustSplitSettlement[];
  }, userNames: Record<string, string> = {}): ActivityItem[] {
    const activities: ActivityItem[] = [];
    
    // Handle case where data might be empty
    if (!data.expenses) data.expenses = [];
    if (!data.groups) data.groups = [];
    if (!data.events) data.events = [];
    if (!data.settlements) data.settlements = [];

    // Add recent expenses
    data.expenses.slice(0, 10).forEach(expense => {
      const payerName = userNames[expense.paidBy] || 'Someone';
      activities.push({
        id: `expense-${expense.id}`,
        title: `New expense: ${expense.description}`,
        description: `${payerName} paid $${expense.amount.toFixed(2)} for ${expense.participants.length} people`,
        timestamp: expense.createdAt,
        type: 'success',
        metadata: { badge: 'JustSplit', appId: 'justsplit' }
      });
    });

    // Add recent settlements
    data.settlements.slice(0, 5).forEach(settlement => {
      const fromName = userNames[settlement.fromUser] || 'Someone';
      const toName = userNames[settlement.toUser] || 'Someone';
      activities.push({
        id: `settlement-${settlement.id}`,
        title: 'Settlement completed',
        description: `${fromName} paid $${settlement.amount.toFixed(2)} to ${toName}`,
        timestamp: settlement.date,
        type: 'success',
        metadata: { badge: 'JustSplit', appId: 'justsplit' }
      });
    });

    // Add recent groups
    data.groups.slice(0, 3).forEach(group => {
      activities.push({
        id: `group-${group.id}`,
        title: `New group created: ${group.name}`,
        description: `Group with ${group.members.length} members`,
        timestamp: group.createdAt,
        type: 'info',
        metadata: { badge: 'JustSplit', appId: 'justsplit' }
      });
    });

    // Add recent events
    data.events.slice(0, 3).forEach(event => {
      activities.push({
        id: `event-${event.id}`,
        title: `New event: ${event.name}`,
        description: `Event with ${event.members.length} participants`,
        timestamp: event.createdAt,
        type: 'info',
        metadata: { badge: 'JustSplit', appId: 'justsplit' }
      });
    });

    // Sort by timestamp (most recent first) and limit to 15
    return activities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 15);
  }

  // Get user names for display purposes
  async getUserNames(userIds: string[]): Promise<Record<string, string>> {
    if (userIds.length === 0) return {};

    try {
      const userNames: Record<string, string> = {};
      
      // Batch user queries to avoid too many individual requests
      const batchSize = 10;
      for (let i = 0; i < userIds.length; i += batchSize) {
        const batch = userIds.slice(i, i + batchSize);
        const db = this.getDatabase();
        const usersQuery = query(
          collection(db, 'users'),
          where('id', 'in', batch)
        );
        const usersSnapshot = await getDocs(usersQuery);
        
        usersSnapshot.docs.forEach(doc => {
          const userData = doc.data();
          userNames[userData.id] = userData.name || userData.displayName || 'Unknown User';
        });
      }

      return userNames;
    } catch (error) {
      console.error('Error fetching user names:', error);
      return {};
    }
  }
}