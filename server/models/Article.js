import mongoose from 'mongoose'

const ArticleSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  summary: { type: String, required: true },
  content: { type: String, default: '' },
  tags: [{ type: String }],
  date: { type: String, required: true },
  readTime: { type: String, default: '5 min' },
  order: { type: Number, default: 0 }
}, { timestamps: true })

export default mongoose.model('Article', ArticleSchema)
