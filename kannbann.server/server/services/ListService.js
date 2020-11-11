import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
class ListService {
  async create(body) {
    return await (await dbContext.Lists.create(body))
  }

  async getAllLists(boardId) {
    return await dbContext.Lists.find({ boardId: boardId }).populate('Board').populate('Profile')
  }

  // NOTE verify that the user == creator
  async deleteList(listId, userId) {
    const exists = await dbContext.Lists.findById(listId)
    if (!exists) {
      throw new BadRequest('This List does not exist')
    // @ts-ignore
    } else if (exists._doc.creatorId === userId) {
      await dbContext.Lists.findByIdAndDelete(listId)
      return 'List has been delorted!'
    }
  }
}

export const listService = new ListService()
