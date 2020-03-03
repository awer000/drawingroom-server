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
  ManyToOne,
  BaseEntity,
} from "typeorm";

@Entity("Image")
export class Image extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 300 })
  src!: string;

  @Column('timestamp')
  @CreateDateColumn()
  created_at!: Date;

  @Column('timestamp')
  @UpdateDateColumn()
  updated_at!: Date;

  @ManyToOne(type => Post, post => post.images, { nullable: false, onDelete: 'CASCADE' })
  post: Post;
}
