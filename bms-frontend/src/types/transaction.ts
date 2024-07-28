export interface Transaction {
  id: string;
  purpose: string;
  transactionId: string;
  status: TransactionStatus;
  amount: number;
  createdAt: string;
}

interface TransactionAggregate {
  count: number;
  total: number;
}

export interface TransactionResponse {
  aggregates: TransactionAggregate;
  transactions: Transaction[];
}

export enum TransactionStatus {
  VALIDATED = "VALIDATED",
  REJECTED = "REJECTED",
  PENDING = "PENDING",
  APPROVED = "APPROVED",
}

// {
// 	"aggregates": {
// 		"count": 3,
// 		"total": 110000
// 	},
// 	"transactions": [
// 		{
// 			"id": "708a205d-8c33-4e87-b903-0cca7d84952f",
// 			"purpose": "More cleaning stuff",
// 			"transactionId": "SHB-1720950681003",
// 			"status": "VALIDATED",
// 			"amount": 50000,
// 			"createdAt": "2024-07-14T09:51:21.004Z"
// 		},
// 		{
// 			"id": "aefe0128-0feb-4bab-83bb-e6abbd82cf8c",
// 			"purpose": "New cleaning stuff",
// 			"transactionId": "SHB-1720948309602",
// 			"status": "REJECTED",
// 			"amount": 10000,
// 			"createdAt": "2024-07-14T09:11:49.622Z"
// 		},
// 		{
// 			"id": "ecfef942-400d-4e76-81b6-0f1b5e24807b",
// 			"purpose": "More cleaning stuff",
// 			"transactionId": "SHB-1720952115159",
// 			"status": "VALIDATED",
// 			"amount": 50000,
// 			"createdAt": "2024-07-14T10:15:15.164Z"
// 		}
// 	]
// }
