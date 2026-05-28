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
      <section id="projects" className="py-24 px-4 bg-white">
        <div className="max-w-[1440px] mx-auto text-center text-[#717171] text-xl">加载中...</div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="projects" className="py-24 px-4 bg-white">
        <div className="max-w-[1440px] mx-auto text-center text-red-500 text-xl">加载失败: {error}</div>
      </section>
    )
  }

  return (
    <section id="projects" className="py-16 md:py-24 px-4 bg-white">
      <div className="max-w-[1440px] mx-auto">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-[64px] font-bold mb-6 leading-tight">
            看看我的<br />
            <span className="bg-[#FFC224] text-black px-3 py-1 inline-block">项目作品集</span>
          </h2>
        </motion.div>

        {/* 卡片网格 */}
        <div className="flex md:flex-row flex-col gap-10 md:overflow-x-auto overflow-visible pb-4 hide-scrollbar">
          {projects.map((project, index) => (
            <div key={project.id} className="md:min-w-[440px] md:w-[440px] w-full">
              <ProjectCard index={index} {...project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
