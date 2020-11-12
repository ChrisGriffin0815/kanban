import mongoose from 'mongoose'
// import { dbContext } from '../db/DbContext'
const Schema = mongoose.Schema

const List = new Schema(
  {
    title: { type: String, required: true },
    boardId: { type: String, required: true, ref: 'Board' },
    creatorId: { type: String, ref: 'Profile', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
// List.pre('findByIdAndDelete', function(next) {

//   Promise.all([dbContext.Tasks.deleteMany({ listId: this._conditions._id })]).then(() => next()).catch(err => next(err))
// })

export default List
