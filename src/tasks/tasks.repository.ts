import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/tasks.entities';
import { Repository } from 'typeorm';
import type { ICreateTask, ISearch } from './tasks.interface';

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

  async countGroupBy(key: keyof Task, value: string | number): Promise<number> {
    const result = await this.taskRepository.countBy({ [key]: value });

    return result;
  }

  async search(id: number): Promise<ISearch> {
    const result = (await this.taskRepository.findOne({
      where: { id: id },
      select: {
        id: true,
        name: true,
        description: true,
        category: true,
        importance: true,
        user: true,
      },
      relations: ['user'],
    })) as ISearch;

    if (!result) throw new NotFoundException('Task(s) not founded');

    return result;
  }

  async list(
    take: number,
    page: number,
    sort: keyof Task = 'importance',
  ): Promise<[ISearch[], number]> {
    const skip = (page - 1) * take;

    const result = await this.taskRepository.findAndCount({
      take: take,
      skip: skip,
      order: { [sort]: 'ASC' },
      relations: ['user'],
    });

    return result;
  }

  async delete(id: number) {
    await this.taskRepository.delete({ id: id });
  }
}
