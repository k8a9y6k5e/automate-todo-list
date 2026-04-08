import {
  Injectable,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import {
  ICreateTask,
  IInformation,
  IReturnSearch,
  IReturnTaskCreate,
  ISearch,
  ITaskBody,
  IUpdateBody,
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

  async putUpdateTask(id: number, body: IUpdateBody) {
    const classificateData = await this.aiService.classificate({
      name: body.name!,
      description: body.description!,
    });

    for (const key of Object.keys(body)) {
      await this.tasksRepository.update(
        id,
        key as keyof IUpdateBody,
        body[key],
      );
    }

    for (const key of Object.keys(classificateData)) {
      await this.tasksRepository.update(
        id,
        key as keyof IUpdateBody,
        classificateData[key],
      );
    }
  }

  async patchUpdateTask(id: number, body: IUpdateBody) {
    if (Object.keys(body).length === 0)
      throw new BadRequestException('None value to update');

    const classificateData = await this.aiService.classificate({
      name: body.name!,
      description: body.description!,
    });

    if (classificateData.category)
      await this.tasksRepository.update(id, 'category', body.category);
    if (body.complete)
      await this.tasksRepository.update(id, 'complete', body.complete);
    if (body.description)
      await this.tasksRepository.update(id, 'description', body.description);
    if (classificateData.importance)
      await this.tasksRepository.update(id, 'importance', body.importance);
    if (body.name) await this.tasksRepository.update(id, 'name', body.name);
    if (body.user) await this.tasksRepository.update(id, 'user', body.user);
  }
}
