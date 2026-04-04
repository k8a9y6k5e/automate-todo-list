import { Body, Controller, Post } from '@nestjs/common';
import { IReturnTaskCreate } from './tasks.interface';
import { TasksService } from './tasks.service';
import { TasksCreateDto } from './dto/create-tasks.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  @Post()
  async create(@Body() body: TasksCreateDto): Promise<IReturnTaskCreate> {
    return await this.tasksService.create(body);
  }
}
