import { Post } from './Post';
import { Comment } from './Comment';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  BaseEntity,
} from "typeorm";

@Entity("User")
export class User extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true, length: 20 })
  userId!: string;

  @Column({ unique: true, length: 255 })
  nickname: string;

  @Column({ length: 100 })
  password: string;

  @Column({ unique: true, length: 255 })
  email!: string;

  @Column({ default: false })
  is_certified!: boolean;

  @Column('timestamp')
  @CreateDateColumn()
  created_at!: Date;

  @Column('timestamp')
  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(type => Post, post => post.user)
  posts: Post[];
  @OneToMany(type => Comment, comment => comment.user)
  comments: Comment[];

  @ManyToMany(type => Post)
  likedPosts: Post[];
  @ManyToMany(type => User)
  followings: User[];
  @ManyToMany(type => User)
  @JoinTable({
    name: "Follow",
    joinColumn: {
      name: 'followingId'
    },
    inverseJoinColumn: {
      name: 'followerId'
    }
  })
  followers: User[];
}
