import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class TaskService {
  async deleteTasksByList(listId, userId) {
    const exists = await dbContext.Tasks.find(task => listId === task.listId)
    console.log(exists, userId)
    if (!exists) {
      throw new BadRequest('This Task does not exist')
      // @ts-ignore
    } else if (exists._doc.creatorId === userId) {
      // await dbContext.Tasks.findByIdAndDelete(task => listId === task.listId)
      return 'List and tasks have been delorted!'
    }
  }

  async create(body) {
    return await (await dbContext.Tasks.create(body))
  }

  async getAllTasksByList(listId) {
    return await dbContext.Tasks.find({ listId: listId }).populate('List').populate('Profile')
  }

  async getAllTasks(query = {}) {
    return await dbContext.Tasks.find(query).populate('Board').populate('Profile')
  }

  // NOTE verify that the user == creator
  async deleteTask(taskId, userId) {
    const exists = await dbContext.Tasks.findById(taskId)
    if (!exists) {
      throw new BadRequest('This Task does not exist')
    // @ts-ignore
    } else if (exists._doc.creatorId === userId) {
      await dbContext.Tasks.findByIdAndDelete(taskId)
      return 'Task has been delorted!'
    }
  }

  async editTask(taskId, editedTask, userId) {
    const exists = await dbContext.Tasks.findById(taskId)
    if (!exists) {
      throw new BadRequest('This Task does not exist')
    // @ts-ignore
    } else if (exists._doc.creatorId === userId) {
      await dbContext.Tasks.findByIdAndUpdate(taskId, editedTask)
      return 'Task has been updated!'
    }
  }
}

export const taskService = new TaskService()
