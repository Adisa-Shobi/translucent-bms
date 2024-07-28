import { getRequest } from "../remote";
import { currencyEndpoints } from "./currencyEnpoints";

export const getAllCurrency = () => {
  return getRequest(currencyEndpoints.getCurrency);
};
