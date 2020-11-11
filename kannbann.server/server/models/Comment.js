import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Comment = new Schema(
  {
    title: { type: String, required: true },
    taskId: { type: String, required: true, ref: 'Task' },
    creatorId: { type: String, ref: 'Profile', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

export default Comment
