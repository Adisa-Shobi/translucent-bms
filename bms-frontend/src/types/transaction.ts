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
// 	"aggregates": {
// 		"avgUserExpenditure": 1333.3333333333333,
// 		"totalCount": 3
// 	},
// 	"expenditures": [
// 		{
// 			"id": "af8f8a03-9cbf-468c-96c5-509df52541a4",
// 			"firstName": "Ademola",
// 			"lastName": "Oshingbesan",
// 			"email": "a.oshingbes@alustuden.com",
// 			"profilePhoto": null,
// 			"transactions": [],
// 			"totalTransactions": 0
// 		},
// 		{
// 			"id": "b9f918d6-9c92-49ad-b733-d0fed3292446",
// 			"firstName": "Shobi",
// 			"lastName": "Ola-Adisa",
// 			"email": "johnadisa8@gmail.com",
// 			"profilePhoto": null,
// 			"transactions": [],
// 			"totalTransactions": 0
// 		},
// 		{
// 			"id": "cb56d8a1-022b-4421-a587-b478f1112501",
// 			"firstName": "Margarett",
// 			"lastName": "Zboncak",
// 			"email": "s.oadisa.dev@gmail.com",
// 			"profilePhoto": null,
// 			"transactions": [
// 				{
// 					"amount": 4000
// 				}
// 			],
// 			"totalTransactions": 4000
// 		}
// 	]
// }

interface Amount {
  amount: number;
}

export interface UserExpenditure {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  totalTransactions: number;
  profilePhoto: string;
  transactions: Amount[];
}

interface ExpenditureAggregate {
  avgUserExpenditure: number;
  totalCount: string;
}

export interface UserExpenditureResponse {
  expenditures: UserExpenditure[];
  aggregates: ExpenditureAggregate;
}
