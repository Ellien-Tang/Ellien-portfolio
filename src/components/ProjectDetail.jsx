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
    return <div className="pt-24 text-center text-[#717171] text-xl">加载中...</div>
  }

  if (error || !project) {
    return <div className="pt-24 text-center text-red-500 text-xl">{error || '项目不存在'}</div>
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white border-b-[3px] border-black">
        <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center">
          <Link to="/" className="flex items-center gap-2 text-black hover:opacity-70 transition-opacity text-lg font-bold">
            <ArrowLeft size={24} />
            <span>返回首页</span>
          </Link>
        </div>
      </nav>

      <header className="pt-16 pb-16 px-6 max-w-[1440px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="inline-block px-4 py-1.5 rounded-full border-[3px] border-black text-black text-base font-bold mb-5">
            {project.tags?.[0]}
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-5">{project.title}</h1>
          <p className="text-xl text-[#717171] max-w-3xl leading-relaxed">{project.description}</p>
          <div className="flex gap-4 mt-8">
            {project.techIcons?.map(icon => (
              <div key={icon} className="p-3 rounded-lg border-[3px] border-black bg-[#EDEDED]">
                <TechIcon name={icon} size={28} />
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
    <div ref={containerRef} className="max-w-[1440px] mx-auto px-6 pb-32">
      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-[3px] bg-black -translate-x-1/2 hidden md:block" />
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
          animate={{ scale: isActive ? 1.2 : 1, backgroundColor: isActive ? '#0a0a0a' : '#e5e5e5' }}
          className="w-4 h-4 rounded-full border-[3px] border-white"
        />
      </div>
      <div className="flex-1">
        <div className="aspect-video rounded-[24px] border-[3px] border-black bg-[#EDEDED] overflow-hidden relative group">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-black font-bold text-lg">{item.phase} - {item.date}</span>
          </div>
          <motion.div className="absolute inset-0" whileHover={{ scale: 1.03 }} transition={{ duration: 0.4 }} />
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-3">
          <Calendar size={16} className="text-black" />
          <span className="text-base text-black font-bold">{item.date}</span>
          <span className="text-base text-[#717171]">· {item.phase}</span>
        </div>
        <h3 className="text-3xl font-bold text-black mb-4">{item.title}</h3>
        <p className="text-[#717171] text-lg leading-relaxed mb-5">{item.description}</p>
        <ul className="space-y-3">
          {item.highlights?.map((highlight, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-3 text-base text-[#717171]"
            >
              <CheckCircle size={20} className="text-black mt-0.5 shrink-0" />
              <span>{highlight}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}
