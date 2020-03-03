import { Post } from '../entity/Post';
import { createQueryBuilder, getConnection, getRepository, getManager } from 'typeorm';

export class PostsRepository {
  async findAllPosts() {
    const posts = await Post.find({
      join: {
        alias: "Post",
        leftJoinAndSelect: {
          user: "Post.user",
          hashtags: "Post.hashtags",
        },
      },
      order: {
        id: "DESC",
      }
    })

    return posts.map(item => {
      delete item.user.password
      const hashtags = item.hashtags.map(item => item.name)
      return { ...item, hashtags }
    })
  }

  async findPostsByHashtag(hashtagName) {
    const posts = await getManager().getRepository(Post).createQueryBuilder("Post").leftJoinAndSelect("Post.hashtags", "hashtag")
      .where("hashtag.name = :name", { name: hashtagName }).getMany();

    return posts.map(item => {
      const hashtags = item.hashtags.map(item => item.name)
      return { ...item, hashtags }
    })
  }

  async findPostsByUserId(userId) {
    const posts = await getManager().getRepository(Post).createQueryBuilder("Post").leftJoinAndSelect("Post.user", "user").orderBy("Post.created_at", "DESC")
      .where("user.id = :id", { id: userId }).getMany();

    return posts.map(item => {
      delete item.user.password
      return { ...item }
    })
  }
}
