import { IsNotEmpty, IsUUID, Min, MinLength } from "class-validator";

export class CreateTransactionDto {
  @IsNotEmpty()
  @MinLength(3)
  purpose: string;

  @IsNotEmpty()
  @Min(1)
  amount: number;

  // @IsNotEmpty()
  // @IsUUID()
  // budget: string;
}
