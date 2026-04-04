import { IsNumber, IsString } from 'class-validator';

export class TasksCreateDto {
  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsNumber()
  userId!: number;
}
