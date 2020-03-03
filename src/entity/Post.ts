import { User } from './User';
import { Comment } from './Comment';
import { Image } from './Image';
import { Hashtag } from './Hashtag';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  BaseEntity,
} from "typeorm";

@Entity("Post")
export class Post extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text' })
  content: string;

  @Column('timestamp')
  @CreateDateColumn()
  created_at!: Date;

  @Column('timestamp')
  @UpdateDateColumn()
  updated_at!: Date;

  @ManyToOne(type => User, user => user.posts, { nullable: false, onDelete: 'CASCADE' })
  user: User;
  userId: number;
  @OneToMany(type => Image, image => image.post)
  images: Image[];
  @OneToMany(type => Comment, comment => comment.post)
  comments: Comment[];
  @ManyToMany(type => Hashtag)
  @JoinTable({
    name: "PostHashtag",
    joinColumn: {
      name: 'postId'
    },
    inverseJoinColumn: {
      name: 'hashtagId'
    }
  })
  hashtags: Hashtag[];
  @ManyToMany(type => User)
  @JoinTable({
    name: "Like"
  })
  likedUsers: User[];
}
