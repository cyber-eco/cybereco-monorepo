/**
 * Expense service for JustSplit
 * Manages app-specific data, references Hub users by ID
 */

import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  query, 
  where, 
  getDocs,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../firebase/config';

export interface Expense {
  id: string;
  hubUserId: string;        // References Hub user ID
  groupId: string;
  amount: number;
  currency: string;
  description: string;
  category: string;
  paidBy: string;           // Hub user ID
  splitBetween: string[];   // Array of Hub user IDs
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ExpenseGroup {
  id: string;
  name: string;
  createdBy: string;        // Hub user ID
  members: string[];        // Array of Hub user IDs
  currency: string;
  createdAt: Timestamp;
}

export class ExpenseService {
  /**
   * Create a new expense
   * Note: User info comes from Hub auth token
   */
  static async createExpense(
    hubUserId: string,
    expense: Omit<Expense, 'id' | 'hubUserId' | 'createdAt' | 'updatedAt'>
  ): Promise<string> {
    const expenseRef = doc(collection(db, 'expenses'));
    const now = Timestamp.now();
    
    const expenseData: Expense = {
      id: expenseRef.id,
      hubUserId,
      ...expense,
      createdAt: now,
      updatedAt: now
    };

    await setDoc(expenseRef, expenseData);
    return expenseRef.id;
  }

  /**
   * Get expenses for a user
   */
  static async getUserExpenses(hubUserId: string): Promise<Expense[]> {
    const expensesQuery = query(
      collection(db, 'expenses'),
      where('hubUserId', '==', hubUserId)
    );
    
    const snapshot = await getDocs(expensesQuery);
    return snapshot.docs.map(doc => doc.data() as Expense);
  }

  /**
   * Get expenses for a group
   */
  static async getGroupExpenses(groupId: string): Promise<Expense[]> {
    const expensesQuery = query(
      collection(db, 'expenses'),
      where('groupId', '==', groupId)
    );
    
    const snapshot = await getDocs(expensesQuery);
    return snapshot.docs.map(doc => doc.data() as Expense);
  }

  /**
   * Calculate balances for a group
   * This is pure compute logic, no user management
   */
  static calculateBalances(expenses: Expense[]): Map<string, number> {
    const balances = new Map<string, number>();
    
    for (const expense of expenses) {
      const amountPerPerson = expense.amount / expense.splitBetween.length;
      
      // Payer is owed money
      const currentPayerBalance = balances.get(expense.paidBy) || 0;
      balances.set(expense.paidBy, currentPayerBalance + expense.amount - amountPerPerson);
      
      // Others owe money
      for (const userId of expense.splitBetween) {
        if (userId !== expense.paidBy) {
          const currentBalance = balances.get(userId) || 0;
          balances.set(userId, currentBalance - amountPerPerson);
        }
      }
    }
    
    return balances;
  }

  /**
   * Get optimal settlements for a group
   * Pure compute function
   */
  static calculateSettlements(balances: Map<string, number>): Array<{
    from: string;
    to: string;
    amount: number;
  }> {
    const settlements = [];
    const creditors = [];
    const debtors = [];
    
    // Separate creditors and debtors
    for (const [userId, balance] of balances.entries()) {
      if (balance > 0.01) {
        creditors.push({ userId, amount: balance });
      } else if (balance < -0.01) {
        debtors.push({ userId, amount: -balance });
      }
    }
    
    // Sort for optimal settlements
    creditors.sort((a, b) => b.amount - a.amount);
    debtors.sort((a, b) => b.amount - a.amount);
    
    // Calculate settlements
    let i = 0, j = 0;
    while (i < creditors.length && j < debtors.length) {
      const settlementAmount = Math.min(creditors[i].amount, debtors[j].amount);
      
      settlements.push({
        from: debtors[j].userId,
        to: creditors[i].userId,
        amount: Math.round(settlementAmount * 100) / 100
      });
      
      creditors[i].amount -= settlementAmount;
      debtors[j].amount -= settlementAmount;
      
      if (creditors[i].amount < 0.01) i++;
      if (debtors[j].amount < 0.01) j++;
    }
    
    return settlements;
  }
}