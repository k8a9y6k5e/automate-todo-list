import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';

export class PatchUpdateDto {
  @IsOptional()
  @IsString()
  name!: string;

  @IsOptional()
  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  password!: string;
}
