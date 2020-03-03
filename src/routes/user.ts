import * as express from 'express';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../repository/user';
import * as passport from 'passport'
import { PostsRepository } from '../repository/posts';

const router = express.Router();
const userRepository = new UserRepository()
const postsRepository = new PostsRepository();

router.get('/', (req, res) => {
  if (!req.user) {
    return res.send('로그인이 필요합니다.')
  }
  const user = Object.assign({}, req.user as any)
  delete user.password;
  return res.json(user)
})

router.post('/', async (req, res) => {
  // 회원가입
  try {
    const exUser = await userRepository.checkAlreadyExistUserByUserId(req.body.userId)

    if (exUser) {
      return res.status(403).send('이미 사용중인 유저입니다.')
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12)
    const newUser = await userRepository.postJoinNewUser({
      nickname: req.body.nickname,
      userId: req.body.userId,
      password: hashedPassword,
      email: req.body.email
    })
    return res.json(newUser)
  } catch (e) {
    console.error(e)
  }
})
router.get('/:id', async (req, res, next) => {
  try {
    const user = await userRepository.findUserInfomationByUserId(req.params.id)
    res.json(user)
  } catch (e) {
    console.error(e)
    next(e)
  }
})
router.post('/logout', (req, res, next) => {
  req.logout();
  req.session.destroy((err) => {
    console.error(err)
    return next()
  });
  res.send('로그아웃 성공')
})
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err)
      return next(err)
    }
    if (info) {
      return res.status(401).send(info.message)
    }
    return req.login(user, (loginErr) => {
      if (loginErr) {
        return next(loginErr)
      }
      const filteredUser = Object.assign({}, user);
      delete filteredUser.password;
      return res.send(filteredUser);
    })
  })(req, res, next)
})
router.get('/:id/follow', (req, res) => {

})
router.post('/:id/follow', (req, res) => {

})
router.delete('/:id/follower', (req, res) => {

})
router.get('/:id/posts', async (req, res, next) => {
  try {
    const posts = await postsRepository.findPostsByUserId(req.params.id)
    res.json(posts)
  } catch (e) {
    console.error(e)
    next(e)
  }
})

export default router