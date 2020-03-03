import { getManager, getConnection } from "typeorm";
import { User } from '../entity/User';

export class UserRepository {

  async checkAlreadyExistUserByUserId(userId: String) {
    const userInfo: User = await getManager().getRepository(User).findOne({ where: { userId } });
    return userInfo
  }

  async checkAlreadyExistUserByOriginId(id: String) {
    const userInfo: User = await getManager().getRepository(User).findOne({ where: { id }, select: ["id", "userId", "nickname", "email", "is_certified"] });
    return userInfo
  }

  postJoinNewUser({ nickname, userId, password, email }) {
    return getConnection().createQueryBuilder()
      .insert()
      .into(User)
      .values({
        nickname,
        userId,
        password,
        email,
      })
      .execute();
  }

  async findUserInfomationByUserId(id: String) {
    const userInfo: User[] = await getManager().getRepository(User)
      .createQueryBuilder().select(['User.userId', 'User.nickname', 'User.email', 'User.is_certified']).leftJoinAndSelect("User.posts", "Post").orderBy("Post.created_at", "DESC")
      .getMany()
    return userInfo
  }
}
