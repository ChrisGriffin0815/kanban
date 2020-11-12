import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import { AppState } from '../AppState'
class ListService {
  async createList(boardId, newList) {
    try {
      newList.boardId = boardId
      logger.log(newList)
      const res = await api.post('api/lists/', newList)
      logger.log(res)
      this.getAllLists()
    } catch (error) {
      logger.error(error)
    }
  }

  async getAllLists() {
    try {
      const res = await api.get('api/lists')
      AppState.lists = res.data
      logger.log(res.data)
    } catch (error) {
      logger.error(error)
    }
  }

  async deleteList(id) {
    try {
      const res = await api.delete('api/lists/' + id)
      logger.log(res)
      this.getAllLists()
    } catch (error) {
      logger.error(error)
    }
  }

  async editList(newList, id) {
    try {
      const res = await api.put('api/lists/' + id, newList)
      logger.log(res.data)
      this.getAllLists()
    } catch (error) {
      logger.error(error)
    }
  }
}

export const listService = new ListService()
