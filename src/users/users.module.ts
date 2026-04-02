import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  providers: [UsersService, UsersRepository],
  controllers: [UsersController],
  imports: [AuthModule, TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
