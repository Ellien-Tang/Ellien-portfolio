import express from 'express'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()
const resumePath = path.join(__dirname, '..', '..', 'public', 'resume.html')

// GET /api/resume - 获取当前简历内容
router.get('/', (req, res) => {
  try {
    const content = fs.readFileSync(resumePath, 'utf-8')
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.send(content)
  } catch (err) {
    res.status(404).json({ error: 'Resume not found' })
  }
})

// POST /api/resume/upload - 上传 HTML 文件
const storage = multer.memoryStorage()
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/html' || file.originalname.endsWith('.html')) {
      cb(null, true)
    } else {
      cb(new Error('只允许上传 HTML 文件'))
    }
  }
})

router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: '没有文件被上传' })
  }
  try {
    fs.writeFileSync(resumePath, req.file.buffer, 'utf-8')
    res.json({ message: '简历上传成功' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST /api/resume - 直接保存文本内容
router.post('/', express.text({ type: 'text/html', limit: '2mb' }), (req, res) => {
  try {
    fs.writeFileSync(resumePath, req.body, 'utf-8')
    res.json({ message: '简历保存成功' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 错误处理中间件
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: '文件大小不能超过 2MB' })
    }
    return res.status(400).json({ error: err.message })
  }
  if (err) {
    return res.status(400).json({ error: err.message })
  }
  next()
})

export default router
