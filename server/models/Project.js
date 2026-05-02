import mongoose from 'mongoose'

const TimelineSchema = new mongoose.Schema({
  phase: { type: String, required: true },
  date: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, default: '' },
  highlights: [{ type: String }]
}, { _id: false })

const ProjectSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, default: '' },
  tags: [{ type: String }],
  techIcons: [{ type: String }],
  link: { type: String, default: '' },
  github: { type: String, default: '' },
  highlights: [{ type: String }],
  timeline: [TimelineSchema],
  order: { type: Number, default: 0 }
}, { timestamps: true })

export default mongoose.model('Project', ProjectSchema)
