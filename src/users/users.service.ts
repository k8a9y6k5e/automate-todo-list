import { ConflictException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { IUserObject, IUserCreate, IReturnCreateUser } from './users.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async create(informations: IUserObject): Promise<IReturnCreateUser> {
    if (await this.userRepository.count('email', informations.email))
      throw new ConflictException('Email is already used');

    const salt = await bcrypt.genSalt(10);

    const password_hash = await bcrypt.hash(informations.password, salt);

    const data: IUserCreate = {
      name: informations.name.trim(),
      email: informations.email.trim(),
      password_hash: password_hash,
    };

    const id = await this.userRepository.insert(data);

    //creation of token with a event emitter

    const token: string = 'a'; //temp

    return { id: id, token: token };
  }
}
