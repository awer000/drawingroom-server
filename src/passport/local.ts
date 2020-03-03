import * as passport from 'passport';
import { Strategy } from 'passport-local'
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../repository/user';

export default () => {
  const userRepository = new UserRepository();

  passport.use(new Strategy({
    usernameField: 'userId',
    passwordField: 'password'
  }, async (id, password, done) => {
    try {
      const user = await userRepository.checkAlreadyExistUserByUserId(id)

      if (!user) {
        return done(null, false, { message: '존재하지 않는 사용자' })
      }
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        return done(null, user)
      }
      return done(null, false, { message: '비밀번호 오류' })
    } catch (e) {
      console.error(e)
      return done(e)
    }
  }))
}