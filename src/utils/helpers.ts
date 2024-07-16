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