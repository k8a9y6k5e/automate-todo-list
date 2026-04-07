import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class PutUpdateDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;
}
