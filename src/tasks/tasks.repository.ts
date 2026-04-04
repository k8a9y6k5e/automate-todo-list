import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/tasks.entities';
import { Repository } from 'typeorm';
import { ICreateTask } from './tasks.interface';

@Injectable()
export class TasksRepository {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async insert(body: ICreateTask): Promise<number> {
    const user = await this.taskRepository.save(body);

    return user.id;
  }
}
