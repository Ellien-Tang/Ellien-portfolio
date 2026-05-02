import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { api } from '../services/api'
import ProjectCard from './ProjectCard'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    api.getProjects()
      .then(data => setProjects(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <section id="projects" className="py-24 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto text-center text-secondary">加载中...</div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="projects" className="py-24 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto text-center text-red-500">加载失败: {error}</div>
      </section>
    )
  }

  return (
    <section id="projects" className="py-24 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            项目经历
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            我的作品
          </h2>
          <p className="text-secondary max-w-xl mx-auto">
            从低代码平台到 AI 应用，探索前端技术的边界
          </p>
        </motion.div>

        {/* 卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} index={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  )
}
