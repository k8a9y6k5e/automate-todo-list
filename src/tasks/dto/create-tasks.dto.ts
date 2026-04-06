import { IsNotEmpty, IsString } from 'class-validator';

export class TasksCreateDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;
}
