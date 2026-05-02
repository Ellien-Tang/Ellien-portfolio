import express from 'express'
import Project from '../models/Project.js'

const router = express.Router()

// GET /api/projects - 获取所有项目
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 })
    res.json(projects)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/projects/:id - 获取单个项目
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findOne({ id: req.params.id })
    if (!project) return res.status(404).json({ error: 'Project not found' })
    res.json(project)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST /api/projects - 创建项目
router.post('/', async (req, res) => {
  try {
    const project = new Project(req.body)
    await project.save()
    res.status(201).json(project)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// PUT /api/projects/:id - 更新项目
router.put('/:id', async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    )
    if (!project) return res.status(404).json({ error: 'Project not found' })
    res.json(project)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// DELETE /api/projects/:id - 删除项目
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({ id: req.params.id })
    if (!project) return res.status(404).json({ error: 'Project not found' })
    res.json({ message: 'Project deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
