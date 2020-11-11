import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { taskService } from '../services/TaskService'

export class TaskController extends BaseController {
  constructor() {
    super('api/tasks')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:taskId', this.deleteTask)
      .put('/:taskId', this.editTask)
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await taskService.create(req.body))
    } catch (error) {
      next(error)
    }
  }

  async deleteTask(req, res, next) {
    try {
      const userID = req.userInfo.id
      res.send(await taskService.deleteTask(req.params.taskId, userID))
    } catch (error) {
      next(error)
    }
  }

  async editTask(req, res, next) {
    try {
      const userId = req.userInfo.id
      res.send(await taskService.editTask(req.params.taskId, req.body, userId))
    } catch (error) {
      next(error)
    }
  }
}
