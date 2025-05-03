import { IsEmail, IsString, IsEnum, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;


    // @IsEnum(["INTERN", "ADMIN"], {
    //     message: "role is requred"
    // })
    // role: "INTERN" | "ADMIN";
}

