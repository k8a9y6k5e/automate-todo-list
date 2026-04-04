import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { env } from 'process';
import * as dotenv from 'dotenv';
dotenv.config();

//entities
import { User } from '../users/entities/user.entity';
import { Task } from '../tasks/entities/tasks.entities';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: env.DB_HOST,
  port: Number(env.DB_PORT),
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  synchronize: false,
  logging: false,
  entities: [User, Task],
  migrations: [__dirname + '/migrations/*.ts'],
  subscribers: [],
});
