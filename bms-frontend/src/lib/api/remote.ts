import { toast } from "@/components/ui/use-toast";
import { apiInstance } from "./api";
import { AxiosRequestConfig, AxiosResponse } from "axios";

export const getRequest = async (
  url: string,
  config: AxiosRequestConfig = {},
) => {
  try {
    const api = await apiInstance();
    const response: AxiosResponse = await api.get(url, config);
    return response.data;
  } catch (error: any) {
    return null;
  }
};

export const postRequest = async (
  url: string,
  data: any,
  config: AxiosRequestConfig = {},
) => {
  try {
    const api = await apiInstance();
    const response: AxiosResponse = await api.post(
      url,
      data,
      config,
    );
    return response.data;
  } catch (error: any) {
    return null;
  }
};

export const patchRequest = async (
  url: string,
  data: any,
  config: AxiosRequestConfig = {},
) => {
  try {
    const api = await apiInstance();
    const response: AxiosResponse = await api.patch(
      url,
      data,
      config,
    );
    return response.data;
  } catch (error: any) {
    return null;
  }
};

export const deleteRequest = async (
  url: string,
  config: AxiosRequestConfig = {},
) => {
  try {
    const api = await apiInstance();
    const response: AxiosResponse = await api.delete(url, config);
    return response.data;
  } catch (error: any) {
    return null;
  }
};
