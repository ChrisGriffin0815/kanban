import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import { AppState } from '../AppState'
class CommentService {
  async addComment(taskId, newComment) {
    try {
      newComment.taskId = taskId
      logger.log(newComment)
      const res = await api.post('api/comments/', newComment)
      logger.log(res)
      this.getAllComments()
    } catch (error) {
      logger.error(error)
    }
  }

  async getAllComments() {
    try {
      const res = await api.get('api/comments')
      AppState.comments = res.data
      logger.log(res.data)
    } catch (error) {
      logger.error(error)
    }
  }

  async deleteComment(id) {
    try {
      const res = await api.delete('api/comments/' + id)
      logger.log(res)
      this.getAllComments()
    } catch (error) {
      logger.error(error)
    }
  }

  async editComment(newComment, id) {
    try {
      const res = await api.put('api/comments/' + id, newComment)
      logger.log(res.data)
      this.getAllComments()
    } catch (error) {
      logger.error(error)
    }
  }
}

export const commentService = new CommentService()
