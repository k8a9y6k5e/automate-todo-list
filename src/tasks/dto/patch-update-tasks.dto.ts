import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class TasksPatchUpdateDto {
  @IsString()
  @IsOptional()
  name!: string;

  @IsString()
  @IsOptional()
  description!: string;

  @IsNumber()
  @IsOptional()
  user!: number;

  @IsBoolean()
  @IsOptional()
  complete!: boolean;
}
