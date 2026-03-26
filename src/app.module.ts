import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from 'process';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: env.DB_HOST,
      port: Number(env.DB_PORT),
      username: env.DB_USER,
      password: env.DB_PASSWORD,
      database: env.DB_DATABASE,
      entities: [__dirname + './database/entities'],
      synchronize: false,
      migrations: [__dirname + './database/migrations'],
      migrationsRun: true,
    }),
  ],
})
export class AppModule {}
