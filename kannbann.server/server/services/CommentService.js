import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class CommentService {
  async create(body) {
    return await (await dbContext.Comments.create(body))
  }

  async getAllCommentsByList(taskId) {
    return await dbContext.Comments.find({ taskId: taskId }).populate('Task').populate('Profile')
  }

  // NOTE verify that the user == creator
  async deleteComment(commentId, userId) {
    const exists = await dbContext.Comments.findById(commentId)
    if (!exists) {
      throw new BadRequest('This Comment does not exist')
    // @ts-ignore
    } else if (exists._doc.creatorId === userId) {
      await dbContext.Comments.findByIdAndDelete(commentId)
      return 'Comment has been delorted!'
    }
  }

  async editComment(commentId, editedComment, userId) {
    const exists = await dbContext.Comments.findById(commentId)
    if (!exists) {
      throw new BadRequest('This Comment does not exist')
    // @ts-ignore
    } else if (exists._doc.creatorId === userId) {
      await dbContext.Comments.findByIdAndUpdate(commentId, editedComment)
      return 'Comment has been updated!'
    }
  }
}

export const commentService = new CommentService()
