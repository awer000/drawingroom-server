import { getManager, getConnection } from "typeorm";
import { Hashtag } from '../entity/Hashtag';

export class HashtagRepository {
  findHashtagByName(name) {
    return getManager().getRepository(Hashtag).findOne({ where: { name } });
  }
  async upsertHashtag(name) {
    const isAlreadyPostedHashtag = await this.findHashtagByName(name)
    if (isAlreadyPostedHashtag) {
      return
    }
    return getConnection().createQueryBuilder()
      .insert()
      .into(Hashtag)
      .values({ name })
      .execute();
  }
}
