import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { listService } from '../services/ListService'

export class ListController extends BaseController {
  constructor() {
    super('api/lists')
    this.router
      .post('', this.create)
  }

  async create(req, res, next) {
    try {
      res.send(await listService.create(req.body))
    } catch (error) {
      next(error)
    }
  }

  async(req, res, next) {
    try {

    } catch (error) {
      next(error)
    }
  }

  async(req, res, next) {
    try {

    } catch (error) {
      next(error)
    }
  }

  async(req, res, next) {
    try {

    } catch (error) {
      next(error)
    }
  }

  async(req, res, next) {
    try {

    } catch (error) {
      next(error)
    }
  }
}
