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
  users!: number;

  @IsBoolean()
  @IsOptional()
  complete!: boolean;
}
