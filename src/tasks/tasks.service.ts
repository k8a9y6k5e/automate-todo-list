import {
  Injectable,
  HttpException,
  HttpStatus,
  BadRequestException,
  NotFoundException,
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
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class TasksService {
  constructor(
    private readonly aiService: AiService,
    private readonly tasksRepository: TasksRepository,
    private readonly usersRepository: UsersRepository,
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
    if ((await this.usersRepository.count('id', body.user!)) === 0)
      throw new NotFoundException('User not founded to update');

    if ((await this.tasksRepository.countGroupBy('user', body.user!)) >= 3)
      throw new HttpException(
        'User had exceted the tasks limit',
        HttpStatus.TOO_MANY_REQUESTS,
      );

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
    if (!body || Object.keys(body).length === 0)
      throw new BadRequestException('None value to update');

    let updateConfirm: number = 0;

    if (body.complete !== null || body.complete !== undefined)
      await this.tasksRepository.update(id, 'complete', body.complete!);
    if (body.description) {
      await this.tasksRepository.update(id, 'description', body.description);
      updateConfirm++;
    }
    if (body.name) {
      await this.tasksRepository.update(id, 'name', body.name);
      updateConfirm++;
    }
    if (body.user) {
      if ((await this.usersRepository.count('id', body.user)) === 0)
        throw new NotFoundException('User not founded to update');

      await this.tasksRepository.update(id, 'user', body.user);
    }

    if (updateConfirm === 2) {
      const classificateData = await this.aiService.classificate({
        name: body.name!,
        description: body.description!,
      });

      await this.tasksRepository.update(
        id,
        'category',
        classificateData.category,
      );
      await this.tasksRepository.update(
        id,
        'importance',
        classificateData.importance,
      );
    }
  }
}
