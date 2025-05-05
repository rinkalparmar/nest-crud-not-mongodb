import { IsEmail, IsString, IsNotEmpty, IsBoolean, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';


export class createUserSettingDto {

    @IsNotEmpty()
    @IsBoolean()
    receiveEmail: boolean;

    @IsNotEmpty()
    @IsBoolean()
    receiveSMS: boolean;
}

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsNotEmpty()
    @ValidateNested() //inside user [] have object so
    @Type(() => createUserSettingDto) //convert object to class
    settings: createUserSettingDto;

}

