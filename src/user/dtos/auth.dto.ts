import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Matches, IsEnum, IsOptional
} from "class-validator";
import {} from 'class-transformer';
import { UserType } from "@prisma/client";

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, {
    message: 'Phone must be a valid phone number',
  })
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  productKey?: string;
}

export class SigninDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class GenerateProductKetDto {
  @IsEmail()
  email: string;

  @IsEnum(UserType)
  userType: UserType;
}
