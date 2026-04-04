import { BadRequestException, Injectable } from '@nestjs/common';
import { IReturnTaskCreate, ITaskBody } from './tasks.interface';

@Injectable()
export class TasksService {
  async create(body: ITaskBody): Promise<IReturnTaskCreate> {
    for (const value of Object.values(body))
      if (!value) throw new BadRequestException('Null value entred');
  }
}
