import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { listService } from '../services/ListService'
import { taskService } from '../services/TaskService'

export class ListController extends BaseController {
  constructor() {
    super('api/lists')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:listId', this.deleteList)
      .get('/:listId/tasks', this.getTasksByList)
      .get('', this.getAllLists)
  }

  async getAllLists(req, res, next) {
    try {
      res.send(await listService.getAllLists(req.query))
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await listService.create(req.body))
    } catch (error) {
      next(error)
    }
  }

  async deleteList(req, res, next) {
    try {
      const userId = req.userInfo.id
      res.send(await listService.deleteList(req.params.listId, userId))
    } catch (error) {
      next(error)
    }
  }

  async getTasksByList(req, res, next) {
    try {
      res.send(await taskService.getAllTasksByList(req.params.listId))
    } catch (error) {
      next(error)
    }
  }
}
