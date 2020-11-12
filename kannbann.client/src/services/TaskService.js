import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import { AppState } from '../AppState'
class TaskService {
  async createTask(listId, newTask) {
    try {
      newTask.listId = listId
      logger.log(newTask)
      const res = await api.post('api/tasks/', newTask)
      logger.log(res)
      this.getAllTasks()
    } catch (error) {
      logger.error(error)
    }
  }

  async getAllTasks() {
    try {
      const res = await api.get('api/tasks')
      AppState.tasks = res.data
      logger.log(res.data)
    } catch (error) {
      logger.error(error)
    }
  }

  async deleteTask(id) {
    try {
      const res = await api.delete('api/tasks/' + id)
      logger.log(res)
      this.getAllTasks()
    } catch (error) {
      logger.error(error)
    }
  }

  async editTask(newTask, id) {
    try {
      const res = await api.put('api/tasks/' + id, newTask)
      logger.log(res.data)
      this.getAllTasks()
    } catch (error) {
      logger.error(error)
    }
  }
}

export const taskService = new TaskService()
