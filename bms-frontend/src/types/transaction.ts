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

interface Reciept {
  id: string;
  fileId: string;
  transactionId: string;
  createdAt: string;
  file: File;
}

interface File {
  id: string;
  name: string;
  url: string;
  markedDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionDetail extends Transaction {
  handlerId: string;
  creatorId: string;
  budgetId: string;
  updatedAt: string;
  reciept?: Reciept;
}

export interface CreateTransactionDto {
  purpose: string;
  amount: number;
}

// {
// 	"id": "708a205d-8c33-4e87-b903-0cca7d84952f",
// 	"transactionId": "SHB-1720950681003",
// 	"purpose": "More cleaning stuff",
// 	"amount": 50000,
// 	"status": "VALIDATED",
// 	"handlerId": "cb56d8a1-022b-4421-a587-b478f1112501",
// 	"creatorId": "cb56d8a1-022b-4421-a587-b478f1112501",
// 	"budgetId": "6d9cacac-ad32-4511-b30e-cad863bcd5df",
// 	"createdAt": "2024-07-14T09:51:21.004Z",
// 	"updatedAt": "2024-07-16T07:44:51.890Z",
// 	"reciept": {
// 		"id": "1ad02fe6-0a4e-4b32-b286-968a794b567f",
// 		"fileId": "da76f7e1-1468-47ca-9c63-d825a3ab229e",
// 		"transactionId": "708a205d-8c33-4e87-b903-0cca7d84952f",
// 		"createdAt": "2024-07-16T07:44:47.387Z",
// 		"updatedAt": "2024-07-16T07:44:47.387Z",
// 		"file": {
// 			"id": "da76f7e1-1468-47ca-9c63-d825a3ab229e",
// 			"name": "file",
// 			"url": "http://res.cloudinary.com/dw5nzq7kb/image/upload/v1721115886/jqvskfqbckgaxw5eql53.pdf",
// 			"markedDeleted": false,
// 			"createdAt": "2024-07-16T07:44:46.672Z",
// 			"updatedAt": "2024-07-16T07:44:46.672Z"
// 		}
// 	}
// }
