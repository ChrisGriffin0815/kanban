import { dbContext } from '../db/DbContext'

class BoardService {
  async getAll(query = {}) {
    return await dbContext.Boards.find(query).populate('profile')
  }

  async create(body) {
    return await dbContext.Boards.create(body)
  }

  async delete(id) {
    return await dbContext.Boards.findByIdAndDelete(id)
  }

  async edit(id, newBoard) {
    return await dbContext.Boards.findByIdAndUpdate(id, newBoard)
  }
}

export const boardService = new BoardService()
