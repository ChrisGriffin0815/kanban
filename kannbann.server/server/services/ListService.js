import { dbContext } from '../db/DbContext'

class ListService {
  async create(body) {
    return await (await dbContext.Lists.create(body))
  }

  async getAllLists(boardId) {
    return await dbContext.Lists.find({ boardId: boardId }).populate('Board')
  }
}

export const listService = new ListService()
