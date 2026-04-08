import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { IReturnTaskCreate, ISearch } from './tasks.interface';
import { TasksService } from './tasks.service';
import { TasksCreateDto } from './dto/create-tasks.dto';
import { JwtGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../users/current-user.decorator';
import type { IPayload } from '../auth/auth.interface';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  @Post()
  @UseGuards(JwtGuard)
  async create(
    @Body() body: TasksCreateDto,
    @CurrentUser() user: IPayload,
  ): Promise<IReturnTaskCreate> {
    return await this.tasksService.create(body, user.id);
  }

  @Get('/:id')
  @UseGuards(JwtGuard)
  async search(@Param() id: number): Promise<ISearch> {
    return await this.tasksService.searchTask(id);
  }
}

//both updates - put and patch
//list tasks
//delete task
