import { IsEmail, IsEmpty, IsNotEmpty, IsOptional, IsUrl, MinLength, isURL } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @MinLength(3)
    firstName: string
    
    @IsNotEmpty()
    @MinLength(3)
    lastName: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @MinLength(8)
    @IsNotEmpty()
    password: string

    @IsUrl()
    @IsOptional()
    profilePhoto?: string
}
