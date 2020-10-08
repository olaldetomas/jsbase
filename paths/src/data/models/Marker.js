import mongoose from 'mongoose'

const MarkerSchema = new mongoose.Schema(
  {
    name: { type: String },
    color: { type: String },
  }
)

module.exports = mongoose.model('Marker', MarkerSchema)
