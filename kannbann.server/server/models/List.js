import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const List = new Schema(
  {
    title: { type: String, required: true },
    boardId: { type: String, required: true, ref: 'Board' }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

export default List
