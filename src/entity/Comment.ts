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

@Entity("Comment")
export class Comment extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text" })
  content: string;

  @Column('timestamp')
  @CreateDateColumn()
  created_at!: Date;

  @Column('timestamp')
  @UpdateDateColumn()
  updated_at!: Date;

  @ManyToOne(type => User, user => user.comments, { nullable: false, onDelete: 'CASCADE' })
  user: User;
  @ManyToOne(type => Post, post => post.comments, { nullable: false, onDelete: 'CASCADE' })
  post: Post;
}
