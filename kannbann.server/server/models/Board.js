import mongoose from 'mongoose'
const Schema = mongoose.Schema

// const ObjectId = Schema.Types.ObjectId
const Board = new Schema(
  {
    title: { type: String, required: true }
  },

  { timestamps: true, toJSON: { virtuals: true } }

)

Board.virtual('creator', {
  localField: 'profile',
  ref: 'Profile',
  foreignField: '_id',
  justOne: true
})

export default Board
