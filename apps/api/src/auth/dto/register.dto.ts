import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum } from 'class-validator';

// We define the enum here temporarily to avoid import issues, 
// or you can import it from your prisma service if preferred.
export enum UserRole {
  BUYER = 'BUYER',
  SELLER = 'SELLER',
  DEALER = 'DEALER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;
}