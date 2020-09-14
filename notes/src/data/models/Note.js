import mongoose from 'mongoose'

const NoteSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
}, { timestamps: true })

module.exports = mongoose.model('Note', NoteSchema)