import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {
  ICreateTask,
  IInformation,
  IReturnSearch,
  IReturnTaskCreate,
  ISearch,
  ITaskBody,
} from './tasks.interface';
import { AiService } from '../AI/AI.service';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    private readonly aiService: AiService,
    private readonly tasksRepository: TasksRepository,
  ) {}
  async create(body: ITaskBody, userId: number): Promise<IReturnTaskCreate> {
    if ((await this.tasksRepository.countGroupBy('user', userId)) >= 3)
      throw new HttpException(
        'User had exceted the tasks limit',
        HttpStatus.TOO_MANY_REQUESTS,
      );

    const informations: IInformation = await this.aiService.classificate(body);

    const data: ICreateTask = {
      name: body.name,
      description: body.description,
      user: userId,
      importance: informations.importance,
      category: informations.category,
    };

    const id = await this.tasksRepository.insert(data);

    return { id: id };
  }

  async searchTask(id: number): Promise<ISearch> {
    const result = this.tasksRepository.search(id);

    return result;
  }

  async listTasks(
    take: number,
    page: number,
    sort?: keyof ISearch,
  ): Promise<IReturnSearch> {
    const result = await this.tasksRepository.list(take, page, sort);

    return {
      page: page,
      take: take,
      total: result[1],
      data: result[0],
    };
  }

  async deleteTask(id: number) {
    await this.tasksRepository.delete(id);
  }
}
