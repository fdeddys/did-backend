import { IsEmail, IsOptional, IsString, MinLength, isString, minLength } from "class-validator";


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

    @IsOptional()
    @IsString()
    role?: string;

}
