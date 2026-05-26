import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, CheckCircle } from 'lucide-react'
import { motion, useScroll } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { api } from '../services/api'
import TechIcon from './TechIcon'

export default function ProjectDetail() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    api.getProject(id)
      .then(data => setProject(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return <div className="pt-24 text-center text-secondary">加载中...</div>
  }

  if (error || !project) {
    return <div className="pt-24 text-center text-red-500">{error || '项目不存在'}</div>
  }

  return (
    <div className="min-h-screen bg-surface">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-xl border-b-2 border-black">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center">
          <Link to="/" className="flex items-center gap-2 text-secondary hover:text-primary transition-colors">
            <ArrowLeft size={20} />
            <span className="font-medium">返回首页</span>
          </Link>
        </div>
      </nav>

      <header className="pt-32 pb-16 px-6 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="inline-block px-3 py-1 rounded-full border-2 border-black text-primary text-sm font-medium mb-4">
            {project.tags?.[0]}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">{project.title}</h1>
          <p className="text-lg text-secondary max-w-2xl leading-relaxed">{project.description}</p>
          <div className="flex gap-3 mt-6">
            {project.techIcons?.map(icon => (
              <div key={icon} className="p-2 rounded-lg border-2 border-black">
                <TechIcon name={icon} size={24} />
              </div>
            ))}
          </div>
        </motion.div>
      </header>

      {project.timeline && project.timeline.length > 0 && (
        <Timeline timeline={project.timeline} />
      )}
    </div>
  )
}

function Timeline({ timeline }) {
  const containerRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start center", "end center"] })

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      const index = Math.min(Math.floor(latest * timeline.length), timeline.length - 1)
      setActiveIndex(index)
    })
  }, [scrollYProgress, timeline.length])

  return (
    <div ref={containerRef} className="max-w-6xl mx-auto px-6 pb-32">
      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-muted -translate-x-1/2 hidden md:block" />
        {timeline.map((item, index) => (
          <TimelineNode key={index} item={item} isActive={index === activeIndex} isLeft={index % 2 === 0} />
        ))}
      </div>
    </div>
  )
}

function TimelineNode({ item, isActive, isLeft }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`relative flex flex-col md:flex-row gap-8 md:gap-16 mb-16 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      <div className="hidden md:flex absolute left-1/2 top-8 -translate-x-1/2 z-10">
        <motion.div
          animate={{ scale: isActive ? 1.2 : 1, backgroundColor: isActive ? '#1a1a1a' : '#e5e7eb' }}
          className="w-4 h-4 rounded-full border-4 border-surface"
        />
      </div>
      <div className="flex-1">
        <div className="aspect-video rounded-2xl border-2 border-black bg-muted overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
            <span className="text-secondary">{item.phase} - {item.date}</span>
          </div>
          <motion.div className="absolute inset-0" whileHover={{ scale: 1.03 }} transition={{ duration: 0.4 }} />
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-3">
          <Calendar size={14} className="text-primary" />
          <span className="text-sm text-primary font-medium">{item.date}</span>
          <span className="text-sm text-secondary">· {item.phase}</span>
        </div>
        <h3 className="text-2xl font-bold text-primary mb-3">{item.title}</h3>
        <p className="text-secondary leading-relaxed mb-4">{item.description}</p>
        <ul className="space-y-2">
          {item.highlights?.map((highlight, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-2 text-sm text-secondary"
            >
              <CheckCircle size={16} className="text-primary mt-0.5 shrink-0" />
              <span>{highlight}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}
