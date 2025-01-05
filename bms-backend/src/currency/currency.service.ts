import { Injectable } from "@nestjs/common";
import { skip } from "node:test";
import { DatabaseService } from "src/database/database.service";
import { Pagination } from "src/global-validators";

@Injectable()
export class CurrencyService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getCurrencies(pagination: Pagination) {
    return this.databaseService.client.currency.findMany(
      {
        skip: pagination.skip,
        take: pagination.limit,
      },
    );
  }

  async getCurrencyById(id: number) {
    return this.databaseService.client.currency.findUnique({ where: { id } });
  }
}
