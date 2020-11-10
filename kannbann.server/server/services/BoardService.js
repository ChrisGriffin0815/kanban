import { dbContext } from '../db/DbContext'

class BoardService {
  async getAll(query = {}) {
    return await dbContext.Boards.find(query).populate('profile')
  }

  async create(body) {
    return await dbContext.Boards.create(body)
  }
}

export const boardService = new BoardService()
