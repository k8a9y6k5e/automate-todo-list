import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AiService } from './AI.service';

@Module({
  providers: [AiService],
  imports: [HttpModule, ConfigModule],
  exports: [AiService],
})
export class AIModule {}
