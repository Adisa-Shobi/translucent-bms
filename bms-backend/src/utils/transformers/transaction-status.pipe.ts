import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { TRANSACTION_STATUSES } from "../../constants";

@Injectable()
export class ParseTransactionStatus implements PipeTransform {
  readonly allowedStatus = TRANSACTION_STATUSES

  private isStatusValid(status: string) {
    const idx = this.allowedStatus.indexOf(status?.toUpperCase());
    return idx !== -1;
  }

  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      return null;
    }
    if (!this.isStatusValid(value)) {
      throw new BadRequestException("Please provide a valid transaction status. ( PENDING | APPROVED | REJECTED | VALIDATED )");
    }
    return value?.toUpperCase();
  }
}