import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BoardService {
  async getAll(query = {}) {
    return await dbContext.Boards.find(query).populate('Profile')
  }

  async getActiveBoard(id) {
    return await dbContext.Boards.findById(id).populate('Profile')
  }

  async create(body) {
    return await dbContext.Boards.create(body)
  }

  async deleteBoard(boardId, userId) {
    const exists = await dbContext.Boards.findById(boardId)
    if (!exists) {
      throw new BadRequest('This board does not exist')
    // @ts-ignore
    } else if (exists._doc.creatorId === userId) {
      await dbContext.Boards.findByIdAndDelete(boardId)
      return 'Your Board has been deboarted!'
    }
  }

  async edit(boardId, newBoard, userId) {
    const exists = await dbContext.Boards.findById(boardId)
    if (!exists) {
      throw new BadRequest('This board does not exist')
    // @ts-ignore
    } else if (exists._doc.creatorId === userId) {
      await dbContext.Boards.findByIdAndUpdate(boardId, newBoard)
      return 'YOUR BOARD HAS BEEN EDITED!'
    }
  }
}

export const boardService = new BoardService()
