import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import type { IReturnCreateUser } from './users.interface';
import { UsersCreateDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post('/signup')
  async create(@Body() body: UsersCreateDto): Promise<IReturnCreateUser> {
    return await this.service.create(body);
  }
}
