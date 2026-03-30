import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { IUserCreate } from './users.interface';

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
}
