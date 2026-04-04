import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Module } from '@nestjs/common';
import { Task } from './entities/tasks.entities';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [AuthModule, TypeOrmModule.forFeature([Task])],
})
export class TasksModule {}
