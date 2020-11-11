import mongoose from 'mongoose'
const Schema = mongoose.Schema

const List = new Schema(
  {
    title: { type: String, required: true },
    boardId: { type: String, required: true, ref: 'Board' },
    creatorId: { type: String, ref: 'Profile', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

export default List
