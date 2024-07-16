import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateBudgetDto } from './create-budget.dto';

export class UpdateBudgetDto extends PartialType(OmitType(CreateBudgetDto, ['amount', 'endAt', 'currencyId'])) {
    readonly amount?: number;
    readonly endAt?: Date;
    readonly currencyId?: number;
}
