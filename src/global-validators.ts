import { IsInt } from "class-validator"

export class Pagination {
    @IsInt()
    skip: number = 0
    
    @IsInt()
    limit?: number = 15
}