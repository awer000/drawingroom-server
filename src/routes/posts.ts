import * as express from 'express';
import { PostsRepository } from '../repository/posts';
const router = express.Router();

router.get('/', async (req, res, next) => {
  const postsRepository = new PostsRepository()
  try {
    const posts = await postsRepository.findAllPosts()
    res.json(posts)
  } catch (e) {
    console.error(e)
    next(e)
  }
})
export default router