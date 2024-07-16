import axios from "axios";

export const api = axios.create({
  baseURL: process.env.API_ENDPOINT,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
