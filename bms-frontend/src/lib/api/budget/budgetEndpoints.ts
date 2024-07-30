import { get } from "http";

export const budgetEndpoints = {
  freezeBudget: (id: string) => `/budget/${id}/freeze-budget`,
  unfreezeBudget: (id: string) => `/budget/${id}/unfreeze-budget`,
  // Move this to user endoints
  getUserBudgets: (id: string) => `/user/${id}/budgets`,
  getUserExpenditure: (id: string) => `/budget/${id}/user-expenditure`,
  getTransactions: (id: string) => `/budget/${id}/transaction`,
  createTransaction: (id: string) => `/budget/${id}/transaction`,
  member: {
    remove: (id: string) => `/budget/${id}/member`,
    add: (id: string) => `/budget/${id}/member`,
    get: (id: string) => `/budget/${id}/members`,
  },
  admin: {
    get: (id: string) => `/budget/${id}/admins`,
    add: (id: string) => `/budget/${id}/admin`,
    remove: (id: string) => `/budget/${id}/admin`,
  },
  budget: {
    summary: {
      get: (id: string) => `/budget/${id}/summary`,
    },
    post: "/budget",
  },
};
