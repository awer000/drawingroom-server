import { getManager, getConnection, createQueryBuilder } from "typeorm";
import { Comment } from '../entity/Comment';

export class CommentRepository {
  async postNewComment(content, userId, postId) {
    const comment = await Comment.create({ content, user: userId, post: postId }).save()
    return comment
  }
  async findCommentByPostId(postId) {
    const posts = await getManager().getRepository(Comment).createQueryBuilder("Comment").leftJoinAndSelect("Comment.user", "user")
      .leftJoin("Comment.post", "post").orderBy("Comment.created_at", "ASC")
      .where("post.id = :id", { id: postId }).getMany();

    return posts.map(item => {
      delete item.user.password
      return { ...item }
    })
  }
}
