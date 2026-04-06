import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { IReturnTaskCreate } from './tasks.interface';
import { TasksService } from './tasks.service';
import { TasksCreateDto } from './dto/create-tasks.dto';
import { JwtGuard } from '../auth/jwt-auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  @Post()
  @UseGuards(JwtGuard)
  async create(@Body() body: TasksCreateDto): Promise<IReturnTaskCreate> {
    return await this.tasksService.create(body);
  }
}
