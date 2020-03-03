import { User } from './User';
import { Post } from './Post';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  BaseEntity,
} from "typeorm";

@Entity("Hashtag")
export class Hashtag extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 20 })
  name: string;

  @Column('timestamp')
  @CreateDateColumn()
  created_at!: Date;

  @Column('timestamp')
  @UpdateDateColumn()
  updated_at!: Date;
}
