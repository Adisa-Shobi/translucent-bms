export interface CreateBudgetDto {
  title: string;
  description: string;
  amount: number;
  currencyId: number;
  endAt: string;
}

// 	{
// 		"id": "cb56d8a1-022b-4421-a587-b478f1112501",
// 		"firstName": "Margarett",
// 		"lastName": "Zboncak",
// 		"email": "s.oadisa.dev@gmail.com",
// 		"totalTransactions": 110000
// 	},

export interface UserExpenseItem {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  totalTransactions: number;
}
