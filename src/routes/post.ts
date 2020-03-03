import * as express from 'express';
import { PostRepository } from '../repository/post';
import { CommentRepository } from '../repository/comment';
const router = express.Router();

const postRepository = new PostRepository()
const commentRepository = new CommentRepository();

router.post('/', async (req, res, next) => {
  // 게시글 작성
  try {
    const { content, userId } = req.body
    const newPost = postRepository.postNewPost(
      content,
      userId
    )

    res.json(newPost)
  } catch (e) {
    console.error(e)
    next(e)
  }
})

router.post('/images', (req, res) => {

})

router.get('/:id/comments', async (req, res, next) => {
  try {
    const post = await postRepository.checkAlreadyExistPostById(Number(req.params.id))
    if (!post) {
      return res.status(404).send('포스트가 존재하지 않습니다.')
    }
    const comments = await commentRepository.findCommentByPostId(req.params.id)
    res.json(comments)
  } catch (e) {
    console.error(e);
    next(e)
  }
})

router.post('/:id/comment', async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send('로그인이 필요합니다.')
    }
    const post = await postRepository.checkAlreadyExistPostById(Number(req.params.id))
    if (!post) {
      return res.status(404).send('포스트가 존재하지 않습니다.')
    }
    const newComment = await commentRepository.postNewComment(req.body.content, req.user.id, post.id)
    res.json(newComment)
  } catch (e) {
    console.error(e);
    next(e)
  }
})
export default router