import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { IUserObject } from './user.interfaces';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async count(key: keyof User, value: string) {
    const result = await this.userRepository.count({
      where: { [key]: value },
    });

    return result;
  }

  async create(informations: IUserObject): Promise<number> {
    const user = await this.userRepository.save(informations);

    return user.id;
  }
}
