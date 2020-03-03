import { getManager, getConnection, createQueryBuilder } from "typeorm";
import { Post } from '../entity/Post';
import { Hashtag } from '../entity/Hashtag';
import { PostHashtag } from '../entity/PostHashtag';
import { HashtagRepository } from './hashtag';

export class PostRepository {
  async postNewPost(content, userId) {
    const hashtagRepository = new HashtagRepository();
    const hashtags = content.match(/#[^\s]+/g)

    const post = await Post.create({ content, user: userId }).save()

    if (hashtags) {
      await Promise.all(hashtags.map((tag: string) => hashtagRepository.upsertHashtag(tag.slice(1).toLowerCase())))
      const hashtagList = await Promise.all(hashtags.map(tag => hashtagRepository.findHashtagByName(tag.slice(1).toLowerCase())))
      await Promise.all(hashtagList.map((hashtag: Hashtag) => PostHashtag.create({ postId: post.id, hashtagId: hashtag.id }).save()))
    }

    const postWithUserInfomation: any = await createQueryBuilder("Post")
      .leftJoinAndSelect("Post.user", "User")
      .where("post.id = :id", { id: post.id })
      .getOne();
    delete postWithUserInfomation.user.password;

    return postWithUserInfomation
  }

  async checkAlreadyExistPostById(id: Number) {
    const post: Post = await getManager().getRepository(Post).findOne({ where: { id } });
    return post
  }
}
