import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Req,
  UsePipes,
} from "@nestjs/common";
import { CurrencyService } from "./currency.service";
import { retrievePagination } from "src/utils/helpers";
import { Request } from "express";

@Controller("currency")
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get()
  async getCurrencies(
    @Req() req: Request,
  ) {
    const pagination = retrievePagination(req);
    return this.currencyService.getCurrencies(pagination);
  }

  @Get(":id")
  @UsePipes()
  async findOne(
    @Param("id", ParseIntPipe) id: number,
  ) {
    return this.currencyService.getCurrencyById(id);
  }
}
