import { Request } from "express";
import { Pagination } from "src/global-validators";

export function retrievePagination(req: Request) {
  const { skip, limit } = req.query;
  const pagination: Pagination = {
    skip: parseInt(String(skip), 10) || 0,
    limit: parseInt(String(limit), 10) || 15,
  };
  return pagination;
}

export function generateTransactionID() {
  return `SHB-${Date.now()}`;
}

export function convertBigIntToString(obj: any): any {
  if (typeof obj === "bigint") {
    return obj.toString();
  }
  if (Array.isArray(obj)) {
    return obj.map(convertBigIntToString);
  }
  if (typeof obj === "object" && obj !== null) {
    return Object.fromEntries(
      Object.entries(obj).map((
        [key, value],
      ) => [key, convertBigIntToString(value)]),
    );
  }
  return obj;
}
