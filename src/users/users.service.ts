import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { IUserObject } from './user.interfaces';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(informations: IUserObject) {
    if (await this.userRepository.count('email', informations.email))
      throw new Error('Email is already used');

    return await this.userRepository.create(informations);
  }
}
