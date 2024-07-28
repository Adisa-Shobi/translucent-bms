// "use server";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { getSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const buildHeadersWithAuth = async () => {
  const headers: any = { "Content-Type": "application/json" };
  const session = await getSession();
  if (session?.user) {
    headers["Authorization"] = `Bearer ${session?.user?.access_token}`;
  }
  return headers;
};

function safeErrorMessage(error: any): string {
  // Regular expression to match only letters and numbers
  const regex = /^[a-zA-Z0-9\s.]*$/;

  // Check if the error message matches the regular expression
  const message = error?.response?.data?.message;
  if (regex.test(message)) {
    return message; // Return the original error message if it only contains letters and numbers
  } else {
    return "Try again later"; // Return "Try again later" if it contains anything other than letters and numbers
  }
}

export const apiInstance = async () => {
  const headers = await buildHeadersWithAuth();
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
    timeout: 10000,
    headers,
  });
  api.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    // const router = useRouter();
    if (error?.response?.status === 403) {
      signOut();
      return;
    }
    if (error?.response?.status >= 400 && error?.response?.status < 500) {
      toast({
        variant: "destructive",
        title: "Oops! Something went wrong",
        description: safeErrorMessage(error),
        duration: 2000,
      });
    }
    return Promise.reject(error);
  });
  return api;
};

// export const apiInstance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
//   timeout: 10000,
//   headers: buildHeadersWithAuth(),
// });
