import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { ISearch, IUserCreate } from './users.interface';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async count(key: keyof User, value: string | number) {
    const result = await this.userRepository.count({
      where: { [key]: value },
    });

    return result;
  }

  async insert(informations: IUserCreate): Promise<number> {
    const user = await this.userRepository.save(informations);

    return user.id;
  }

  async search(key: keyof User, value: string | number): Promise<ISearch> {
    const user = (await this.userRepository.findOne({
      where: { [key]: value },
      select: {
        id: true,
        name: true,
        email: true,
        passwordHash: true,
      },
    })) as ISearch;

    if (!user) throw new NotFoundException('User not founded');

    return user;
  }

  async relationalCount(
    key: keyof User,
    value: string | number,
    relation: keyof User,
  ): Promise<number> {
    const data = await this.userRepository.findOne({
      where: { [key]: value },
      relations: {
        [relation]: true,
      },
    });

    if (!data) throw new NotFoundException('User not founded');

    return (data[relation] as any[]).length;
  }
}
