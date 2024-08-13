import { Currency } from "./currency";

export interface Transaction {
  id: string;
  purpose: string;
  transactionId: string;
  status: TransactionStatus;
  amount: number;
  createdAt: string;
  creator: TransactionCreator;
  budget: {
    currency: Currency;
  }
}

export interface TransactionCreator {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePhoto: string;
  createdAt: string;
  updatedAt: string;
}

interface TransactionAggregate {
  count: number;
  total: {
    amount: number;
    currency: Currency;
  };
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
  creator: TransactionCreator;
}

export interface CreateTransactionDto {
  purpose: string;
  amount: number;
}

interface Amount {
  amount: number;
}

export interface UserExpenditure {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  totalTransactions: TotalTransactions;
  profilePhoto: string;
  transactions: Amount[];
}

interface TotalTransactions {
  amount: number;
  currency: Currency;
}

interface ExpenditureAggregate {
  currency: Currency;
  avgUserExpenditure: number;
  totalCount: string;
}

export interface UserExpenditureResponse {
  expenditures: UserExpenditure[];
  aggregates: ExpenditureAggregate;
}
