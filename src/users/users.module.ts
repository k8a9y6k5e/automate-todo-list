import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';

@Module({
  providers: [UsersService, UsersRepository],
  controllers: [UsersController],
  imports: [AuthModule, TypeOrmModule.forFeature([User])],
  exports: [UsersRepository],
})
export class UsersModule {}
