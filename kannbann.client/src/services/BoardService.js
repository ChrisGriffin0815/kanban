import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import { AppState } from '../AppState'
class BoardService {
  async createBoard(newBoard) {
    try {
      const res = await api.post('api/boards/', newBoard)
      logger.log(res.data)
    } catch (error) {
      logger.error(error)
    }
  }

  async getAllBoards() {
    try {
      const res = await api.get('api/boards')
      AppState.boards = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async deleteBoard(id) {
    try {
      const res = await api.delete('api/boards/' + id)
      logger.log(res)
      this.getAllBoards()
    } catch (error) {
      logger.error(error)
    }
  }

  async editBoard(newBoard, id) {
    try {
      const res = await api.put('api/boards/' + id, newBoard)
      logger.log(res.data)
      this.getAllBoards()
    } catch (error) {
      logger.error(error)
    }
  }
}

export const boardService = new BoardService()
