import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { IReturnSearch, IReturnTaskCreate, ISearch } from './tasks.interface';
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
  @UseInterceptors(ClassSerializerInterceptor)
  async search(@Param() param: { id: number }): Promise<ISearch> {
    return await this.tasksService.searchTask(param.id);
  }

  @Get()
  @UseGuards(JwtGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async list(
    @Query('page', ParseIntPipe) page: number,
    @Query('take', ParseIntPipe) take: number,
    @Query('sort') sort: keyof ISearch,
  ): Promise<IReturnSearch> {
    return await this.tasksService.listTasks(take, page, sort);
  }
}

//both updates - put and patch
//delete task
