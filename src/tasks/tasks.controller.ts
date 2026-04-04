import { Body, Controller, Post } from '@nestjs/common';
import { IReturnTaskCreate } from './tasks.interface';

@Controller('tasks')
export class TasksController {
  @Post()
  async create(@Body() body): Promise<IReturnTaskCreate> {}
}
