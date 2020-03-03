import { Hashtag } from './Hashtag';
import { Post } from './Post';
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

@Entity("PostHashtag")
export class PostHashtag extends BaseEntity {
  @Column('timestamp')
  @CreateDateColumn()
  created_at!: Date;

  @Column('timestamp')
  @UpdateDateColumn()
  updated_at!: Date;

  @PrimaryColumn()
  hashtagId!: number;
  @ManyToOne(type => Hashtag, { cascade: true, eager: true })
  @JoinColumn({ name: 'hashtagId' })
  hashtag!: Hashtag;

  @PrimaryColumn()
  postId!: number;
  @ManyToOne(type => Post, { cascade: true })
  @JoinColumn({ name: 'postId' })
  post!: Post;
}
