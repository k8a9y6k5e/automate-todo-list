import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Task } from '../../tasks/entities/tasks.entities';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  @Exclude()
  passwordHash!: string;

  @CreateDateColumn({ name: 'created_at' })
  @Exclude()
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Exclude()
  updatedAt!: Date;

  @OneToMany(() => Task, (task) => task.user)
  tasks!: Task[];
}
