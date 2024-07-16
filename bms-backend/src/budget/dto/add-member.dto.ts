import { IsEmail } from "class-validator";

export class AddMemberOrAdminDto {
    @IsEmail()
    email: string;
}