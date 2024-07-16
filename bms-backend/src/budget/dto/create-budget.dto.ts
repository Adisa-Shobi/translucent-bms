import { IsDateString, IsNotEmpty, MinLength } from "class-validator";

export class CreateBudgetDto {
    @MinLength(3)
    @IsNotEmpty()    
    title: string;

    @MinLength(10)
    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    amount: number;

    @IsNotEmpty()
    currencyId?: number;

    @IsNotEmpty()
    @IsDateString()
    endAt: Date;

}
