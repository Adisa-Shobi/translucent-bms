import { AxiosRequestConfig } from "axios";
import { deleteRequest, getRequest, postRequest } from "../remote";
import { CreateBudgetDto } from "./budgetDto";
import { budgetEndpoints } from "./budgetEndpoints";
import { InviteMemberDto } from "@/types/budget";

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

export const getUserExpenditure = (id: string, params: any) => {
  return getRequest(budgetEndpoints.getUserExpenditure(id), { params });
};

export const getTransactions = (id: string, params: any) => {
  return getRequest(budgetEndpoints.getTransactions(id), { params });
};

export const createTransaction = (id: string, data: any) => {
  return postRequest(budgetEndpoints.createTransaction(id), data);
};

export const addMember = (id: string, data: InviteMemberDto) => {
  return postRequest(budgetEndpoints.member.add(id), data);
};

export const removeMember = (id: string, data: any) => {
  return deleteRequest(budgetEndpoints.member.remove(id), { data });
};

export const getMembers = (id: string) => {
  return getRequest(budgetEndpoints.member.get(id));
};

export const addAdmin = (id: string, data: any) => {
  return postRequest(budgetEndpoints.admin.add(id), data);
};

export const getAdmins = (id: string) => {
  return getRequest(budgetEndpoints.admin.get(id));
};

export const removeAdmin = (id: string, data: any) => {
  return deleteRequest(budgetEndpoints.admin.remove(id), { data });
};

export const deleteBudget = (id: string) => {
  return deleteRequest(budgetEndpoints.budget.delete(id));
};

export const getBudget = (id: string) => {
  return getRequest(budgetEndpoints.budget.get(id));
};
