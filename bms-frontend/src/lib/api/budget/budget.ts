import { AxiosRequestConfig } from "axios";
import { getRequest, postRequest } from "../remote";
import { CreateBudgetDto } from "./budgetDto";
import { budgetEndpoints } from "./budgetEndpoints";

export const freezeBudget = (id: string, data = {}) => {
  return postRequest(budgetEndpoints.freezeBudget(id), data);
};

export const unfreezeBudget = (id: string, data = {}) => {
  return postRequest(budgetEndpoints.unfreezeBudget(id), data);
};

export const getUserBudgets = (id: string, filters = {}) => {
  return getRequest(budgetEndpoints.getUserBudgets(id), { params: filters });
};

export const createBudget = (data: CreateBudgetDto) => {
  return postRequest(budgetEndpoints.budget.post, data);
};

export const getBudgetSummary = (id: string) => {
  return getRequest(budgetEndpoints.budget.summary.get(id));
};

export const getUserExpenditure = (id: string) => {
  return getRequest(budgetEndpoints.getUserExpenditure(id));
};

export const getTransactions = (id: string, params: any) => {
  return getRequest(budgetEndpoints.getTransactions(id), { params });
};
