import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Module } from '@nestjs/common';
import { Task } from './entities/tasks.entities';
import { AIModule } from '../AI/AI.module';
import { TasksRepository } from './tasks.repository';

@Module({
  controllers: [TasksController],
  providers: [TasksService, TasksRepository],
  imports: [AuthModule, TypeOrmModule.forFeature([Task]), AIModule],
})
export class TasksModule {}
