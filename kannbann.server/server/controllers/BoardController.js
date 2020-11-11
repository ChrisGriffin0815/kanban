import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { boardService } from '../services/BoardService'
import { listService } from '../services/ListService'
export class BoardController extends BaseController {
  constructor() {
    super('api/boards')
    this.router
      .get('', this.getAll)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:boardId', this.deleteBoard)
      .put('/:boardId', this.edit)
      .get('/:boardId/lists', this.getListByBoard)
  }

  async getListByBoard(req, res, next) {
    try {
      res.send(await listService.getAllLists(req.params.boardId))
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      res.send(await boardService.getAll(req.query))
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await boardService.create(req.body))
    } catch (error) {
      next(error)
    }
  }

  async deleteBoard(req, res, next) {
    try {
      const userId = req.userInfo.id
      res.send(await boardService.deleteBoard(req.params.boardId, userId))
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      const userId = req.userInfo.id
      res.send(await boardService.edit(req.params.boardId, req.body, userId))
    } catch (error) {
      next(error)
    }
  }
}
