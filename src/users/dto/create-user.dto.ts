import { IsEmail, IsOptional, IsString, IsUUID, MinLength, isString, isUUID, minLength } from "class-validator";


export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(3)
    name: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsOptional()
    @IsString()
    phone? : string;

    @IsUUID()
    roleId: string;

}
