import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TasksPutUpdateDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNumber()
  @IsNotEmpty()
  users!: number;

  @IsBoolean()
  @IsNotEmpty()
  complete!: boolean;
}
