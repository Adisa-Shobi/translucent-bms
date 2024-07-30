import axios from "axios";
import { getRequest, postRequest } from "../remote";
import { transactionEndpoints } from "./transactionEndpoints";

export const fetchTransaction = async (id: string) => {
  return getRequest(transactionEndpoints.getTransaction(id));
};

export const approveTransaction = async (id: string) => {
  return postRequest(transactionEndpoints.approveTransaction(id));
};

export const rejectTransaction = async (id: string) => {
  return postRequest(transactionEndpoints.rejectTransaction(id));
};

export const validateTransaction = async (id: string, data: FormData) => {
  return postRequest(transactionEndpoints.validateTransaction(id), data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  // axios.post(transactionEndpoints.validateTransaction(id))
};
