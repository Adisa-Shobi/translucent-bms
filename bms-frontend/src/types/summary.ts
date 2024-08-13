import { Currency } from "./currency";

interface Aggregates {
  totalExpenses: number;
  pendingExpenses: number;
  weeklyAvgExpense: number;
  prevWeeklyAvgExpense: number;
  balance: number;
}

interface Budget {
  id: string;
  title: string;
  amount: number;
  description: string;
  isFrozen: boolean;
  currencyId: number;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  endAt: string;
  currency: Currency;
}

export interface BudgetSummaryType {
  aggregates: Aggregates;
  budget: Budget;
}
