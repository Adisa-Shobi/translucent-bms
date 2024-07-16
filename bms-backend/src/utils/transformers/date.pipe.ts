import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import * as moment from "moment";

@Injectable()
export class ParseDatePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): Date {
    return value ? moment(value).startOf("day").toDate() : null;
  }
}


