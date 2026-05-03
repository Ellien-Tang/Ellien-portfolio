import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url'

import projectRoutes from './routes/projects.js'
import articleRoutes from './routes/articles.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// API Routes
app.use('/api/projects', projectRoutes)
app.use('/api/articles', articleRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' })
})

// Serve static files from React build
const distPath = path.join(__dirname, '../dist')
app.use(express.static(distPath))

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'))
})

// Connect MongoDB and start server
let MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio'
// Auto-append standard params if missing
if (MONGODB_URI && !MONGODB_URI.includes('?')) {
  MONGODB_URI += '?retryWrites=true&w=majority'
}

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch(err => {
    console.error('MongoDB connection error:', err)
    // Still start server even if DB fails, so health check works
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} (without DB)`)
    })
  })
