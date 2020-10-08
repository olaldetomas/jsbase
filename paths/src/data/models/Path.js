import mongoose from 'mongoose'
const Schema = mongoose.Schema

const PathSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    isFavourite: { type: Schema.Types.Boolean, default: false }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Path', PathSchema)
