import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import type { IReturnCreateUser, IUserObject } from './user.interfaces';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  async create(@Body() req: IUserObject): Promise<IReturnCreateUser> {
    //validator
    const result = await this.service.create(req);

    return { work: true, data: result };
  }
}
