import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import {
  IUserObject,
  IUserCreate,
  IReturnAuthUser,
  IUserLogIn,
  IGetReturn,
} from './users.interface';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly authService: AuthService,
  ) {}

  async create(informations: IUserObject): Promise<IReturnAuthUser> {
    if (await this.userRepository.count('email', informations.email))
      throw new ConflictException('Email is already used');

    const salt = await bcrypt.genSalt(10);

    const passwordHash = await bcrypt.hash(informations.password, salt);

    const data: IUserCreate = {
      name: informations.name.trim(),
      email: informations.email.trim(),
      passwordHash: passwordHash,
    };

    const id = await this.userRepository.insert(data);

    const token: string = this.authService.login({
      id: id,
      email: informations.email,
    });

    return { id: id, token: token };
  }

  async logIn(informations: IUserLogIn): Promise<IReturnAuthUser> {
    const user = await this.userRepository.search('email', informations.email);

    const samePassword = await bcrypt.compare(
      informations.password,
      user.passwordHash,
    );

    if (!samePassword) throw new UnauthorizedException('Invalid Password');

    const token = this.authService.login({ id: user.id, email: user.email });

    return { id: user.id, token: token };
  }

  async get(id: number): Promise<IGetReturn> {
    const data = await this.userRepository.search('id', id);

    const tasksCreated = await this.userRepository.relationalCount(
      'id',
      id,
      'tasks',
    );

    return {
      name: data.name,
      email: data.email,
      tasksCreated: tasksCreated,
    };
  }

  async delete(id: number) {
    await this.userRepository.delete(id);
  }
}
