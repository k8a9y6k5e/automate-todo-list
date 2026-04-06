import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';

export class UsersCreateDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;
}
