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
  Delete,
  HttpCode,
  Put,
  Patch,
} from '@nestjs/common';
import { IReturnSearch, IReturnTaskCreate, ISearch } from './tasks.interface';
import { TasksService } from './tasks.service';
import { TasksCreateDto } from './dto/create-tasks.dto';
import { JwtGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../users/current-user.decorator';
import type { IPayload } from '../auth/auth.interface';
import { StatusCodes } from 'http-status-codes';
import { TasksPutUpdateDto } from './dto/put-update-tasks.dto';
import { TasksPatchUpdateDto } from './dto/patch-update-tasks.dto';

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
  async search(@Param() params: { id: number }): Promise<ISearch> {
    return await this.tasksService.searchTask(params.id);
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

  @Delete('/:id')
  @UseGuards(JwtGuard)
  @HttpCode(StatusCodes.NO_CONTENT)
  async delete(@Param() params: { id: number }) {
    await this.tasksService.deleteTask(params.id);
  }

  @Put()
  @UseGuards(JwtGuard)
  @HttpCode(StatusCodes.NO_CONTENT)
  async putUpdate(
    @Param() params: { id: number },
    @Body() body: TasksPutUpdateDto,
  ) {
    await this.tasksService.putUpdateTask(params.id, body);
  }

  @Patch()
  @UseGuards(JwtGuard)
  @HttpCode(StatusCodes.NO_CONTENT)
  async patchUpdate(
    @Param() params: { id: number },
    @Body() body: TasksPatchUpdateDto,
  ) {
    await this.tasksService.patchUpdateTask(params.id, body);
  }
}
