import { BadRequestException, Injectable } from '@nestjs/common';
import { IInformation, IReturnTaskCreate, ITaskBody } from './tasks.interface';
import { AiService } from '../AI/AI.service';

@Injectable()
export class TasksService {
  constructor(private readonly aiService: AiService) {}
  async create(body: ITaskBody): Promise<IReturnTaskCreate> {
    for (const value of Object.values(body))
      if (!value) throw new BadRequestException('Null value entred');

    const informations: IInformation = await this.aiService.classificate(body);
  }
}
