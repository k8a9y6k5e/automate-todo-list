import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Delete,
  Put,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import type { IReturnAuthUser, IGetReturn } from './users.interface';
import { UsersCreateDto } from './dto/create-user.dto';
import { UsersLogInDto } from './dto/login-user.dto';
import { JwtGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from './current-user.decorator';
import type { IPayload } from '../auth/auth.interface';
import { PutUpdateDto } from './dto/patch-update-user.dto';
import { PatchUpdateDto } from './dto/put-update-user.dto';

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

  @Get('/me')
  @UseGuards(JwtGuard)
  async getUser(@CurrentUser() user: IPayload): Promise<IGetReturn> {
    return await this.service.get(user.id);
  }

  @Delete('/me')
  @UseGuards(JwtGuard)
  async delete(@CurrentUser() user: IPayload) {
    await this.service.delete(user.id);
  }

  @Put('/me')
  @UseGuards(JwtGuard)
  async putUpdate(@CurrentUser() user: IPayload, @Body() body: PutUpdateDto) {
    await this.service.putUpdate(user.id, body);
  }

  @Patch('/me')
  @UseGuards(JwtGuard)
  async patchUpdate(
    @CurrentUser() user: IPayload,
    @Body() body: PatchUpdateDto,
  ) {
    await this.service.patchUpdate(user.id, body);
  }
}
