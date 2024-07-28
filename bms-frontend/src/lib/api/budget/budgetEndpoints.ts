export const budgetEndpoints = {
  freezeBudget: (id: string) => `/budget/${id}/freeze-budget`,
  unfreezeBudget: (id: string) => `/budget/${id}/unfreeze-budget`,
  // Move this to user endoints
  getUserBudgets: (id: string) => `/user/${id}/budgets`,
  getUserExpenditure: (id: string) => `/budget/${id}/user-expenditure`,
  getTransactions: (id: string) => `/budget/${id}/transaction`,
  createTransaction: (id: string) => `/budget/${id}/transaction`,
  addMember: (id: string) => `/budget/${id}/member`,
  budget: {
    summary: {
      get: (id: string) => `/budget/${id}/summary`,
    },
    post: "/budget",
  },
};
