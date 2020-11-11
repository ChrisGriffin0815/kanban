import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { commentService } from '../services/CommentService'

export class CommentController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:commentId', this.deleteComment)
      .put('/:commentId', this.editComment)
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await commentService.create(req.body))
    } catch (error) {
      next(error)
    }
  }

  async deleteComment(req, res, next) {
    try {
      const userID = req.userInfo.id
      res.send(await commentService.deleteComment(req.params.commentId, userID))
    } catch (error) {
      next(error)
    }
  }

  async editComment(req, res, next) {
    try {
      const userId = req.userInfo.id
      res.send(await commentService.editComment(req.params.commentId, req.body, userId))
    } catch (error) {
      next(error)
    }
  }
}
