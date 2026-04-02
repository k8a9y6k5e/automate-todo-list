import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import type { IReturnAuthUser } from './users.interface';
import { UsersCreateDto } from './dto/create-user.dto';
import { UsersLogInDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post('/signup')
  async create(@Body() body: UsersCreateDto): Promise<IReturnAuthUser> {
    return await this.service.create(body);
  }

  @Post('/login')
  async logIn(@Body() body: UsersLogInDto): Promise<IReturnAuthUser> {
    return await this.service.logIn(body);
  }
}
