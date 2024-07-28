export const transactionEndpoints = {
    getTransaction: (id: string) => `/transaction/${id}`,
    approveTransaction: (id: string) => `/transaction/${id}/approve`,
    rejectTransaction: (id: string) => `/transaction/${id}/reject`,
    validateTransaction: (id: string) => `/transaction/${id}/validate`,
};