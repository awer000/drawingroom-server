import { Hashtag } from './Hashtag';
import { Post } from './Post';
import { User } from './User';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
  PrimaryColumn,
} from "typeorm";

@Entity("Follow")
export class Follow extends BaseEntity {
  @Column('timestamp')
  @CreateDateColumn()
  created_at!: Date;

  @Column('timestamp')
  @UpdateDateColumn()
  updated_at!: Date;

  @PrimaryColumn()
  followerId!: number;
  @ManyToOne(type => User, { cascade: true, eager: true })
  @JoinColumn({ name: 'followerId' })
  follower!: User;

  @PrimaryColumn()
  followingId!: number;
  @ManyToOne(type => User, { cascade: true })
  @JoinColumn({ name: 'followingId' })
  following!: User;
}
