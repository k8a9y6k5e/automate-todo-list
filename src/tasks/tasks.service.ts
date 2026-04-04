import { BadRequestException, Injectable } from '@nestjs/common';
import {
  ICreateTask,
  IInformation,
  IReturnTaskCreate,
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
  async create(body: ITaskBody): Promise<IReturnTaskCreate> {
    for (const value of Object.values(body))
      if (!value) throw new BadRequestException('Null value entred');

    const informations: IInformation = await this.aiService.classificate(body);

    const data: ICreateTask = {
      name: body.name,
      description: body.description,
      userIdId: body.userId,
      importance: informations.importance,
      category: informations.category,
    };

    const id = await this.tasksRepository.insert(data);

    return { id: id };
  }
}
