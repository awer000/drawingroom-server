import * as passport from 'passport';
import { UserRepository } from '../repository/user';
import local from './local';

export default () => {
  passport.serializeUser((user: any, done) => {
    return done(null, user.id)
  })
  passport.deserializeUser(async (id, done) => {
    try {
      const userRepository = new UserRepository();
      const user = await userRepository.checkAlreadyExistUserByOriginId(id as string)
      return done(null, user)
    } catch (e) {
      console.error(e)
      return done(e)
    }
  })
  local();
}