import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [UsersService, UsersRepository],
  controllers: [UsersController],
  imports: [AuthModule],
})
export class UsersModule {}
