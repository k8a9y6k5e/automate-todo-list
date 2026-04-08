import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../users/entities/users.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  category!: string;

  @Column()
  importance!: string;

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'SET NULL' })
  user!: number;

  @CreateDateColumn()
  @Exclude()
  createdAt!: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt!: Date;
}
