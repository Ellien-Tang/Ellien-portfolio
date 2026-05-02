import express from 'express'
import Article from '../models/Article.js'

const router = express.Router()

// GET /api/articles - 获取所有文章
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find().sort({ order: 1, createdAt: -1 })
    res.json(articles)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/articles/:id - 获取单篇文章
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findOne({ id: req.params.id })
    if (!article) return res.status(404).json({ error: 'Article not found' })
    res.json(article)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST /api/articles - 创建文章
router.post('/', async (req, res) => {
  try {
    const article = new Article(req.body)
    await article.save()
    res.status(201).json(article)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// PUT /api/articles/:id - 更新文章
router.put('/:id', async (req, res) => {
  try {
    const article = await Article.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    )
    if (!article) return res.status(404).json({ error: 'Article not found' })
    res.json(article)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// DELETE /api/articles/:id - 删除文章
router.delete('/:id', async (req, res) => {
  try {
    const article = await Article.findOneAndDelete({ id: req.params.id })
    if (!article) return res.status(404).json({ error: 'Article not found' })
    res.json({ message: 'Article deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
