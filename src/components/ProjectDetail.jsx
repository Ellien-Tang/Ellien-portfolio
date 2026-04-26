import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, CheckCircle } from 'lucide-react'
// import { motion, useScroll, useTransform } from 'framer-motion'
import { motion, useScroll } from 'framer-motion'

import { useRef, useState, useEffect } from 'react'
import { projects } from '../data/projects'
import TechIcon from './TechIcon'

export default function ProjectDetail() {
  const { id } = useParams()
  const project = projects.find(p => p.id === id)
  
  if (!project) {
    return <div className="pt-24 text-center">项目不存在</div>
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 顶部导航 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-secondary hover:text-primary transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">返回首页</span>
          </Link>
        </div>
      </nav>

      {/* 项目头部信息 */}
      <header className="pt-32 pb-16 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            {project.tags[0]}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            {project.title}
          </h1>
          <p className="text-lg text-secondary max-w-2xl leading-relaxed">
            {project.description}
          </p>
          
          {/* 技术栈图标 */}
          <div className="flex gap-3 mt-6">
            {project.techIcons.map(icon => (
              <div key={icon} className="p-2 rounded-lg bg-muted">
                <TechIcon name={icon} size={24} />
              </div>
            ))}
          </div>
        </motion.div>
      </header>

      {/* 时间线 */}
      <Timeline timeline={project.timeline} />
    </div>
  )
}

// 时间线组件
function Timeline({ timeline }) {
  const containerRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  
  // 监听滚动位置
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  // 根据滚动进度计算当前激活的节点
  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      const index = Math.min(
        Math.floor(latest * timeline.length),
        timeline.length - 1
      )
      setActiveIndex(index)
    })
  }, [scrollYProgress, timeline.length])

  return (
    <div ref={containerRef} className="max-w-6xl mx-auto px-6 pb-32">
      {/* 垂直线 */}
      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-muted -translate-x-1/2 hidden md:block" />
        
        {timeline.map((item, index) => (
          <TimelineNode
            key={index}
            item={item}
            index={index}
            isActive={index === activeIndex}
            isLeft={index % 2 === 0}  // 偶数在左，奇数在右
          />
        ))}
      </div>
    </div>
  )
}

// 单个时间线节点
// function TimelineNode({ item, index, isActive, isLeft }) {
function TimelineNode({ item,  isActive, isLeft }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`relative flex flex-col md:flex-row gap-8 md:gap-16 mb-16 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* 时间标记 - 中间圆点 */}
      <div className="hidden md:flex absolute left-1/2 top-8 -translate-x-1/2 z-10">
        <motion.div
          animate={{
            scale: isActive ? 1.2 : 1,
            backgroundColor: isActive ? '#2563eb' : '#e5e7eb'
          }}
          className="w-4 h-4 rounded-full border-4 border-white shadow-md"
        />
      </div>

      {/* 左侧/右侧：图片 */}
      <div className="flex-1">
        <div className="aspect-video rounded-2xl bg-muted overflow-hidden relative group">
          {/* 占位 */}
          <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
            <span className="text-secondary">{item.phase} - {item.date}</span>
          </div>
          
          {/* 实际图片（后面替换） */}
          {/* <img src={item.image} alt={item.title} className="w-full h-full object-cover" /> */}
          
          {/* Hover 放大 */}
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* 右侧/左侧：文字内容 */}
      <div className="flex-1 flex flex-col justify-center">
        {/* 日期标签 */}
        <div className="flex items-center gap-2 mb-3">
          <Calendar size={14} className="text-accent" />
          <span className="text-sm text-accent font-medium">{item.date}</span>
          <span className="text-sm text-secondary">· {item.phase}</span>
        </div>

        {/* 标题 */}
        <h3 className="text-2xl font-bold text-primary mb-3">{item.title}</h3>

        {/* 描述 */}
        <p className="text-secondary leading-relaxed mb-4">{item.description}</p>

        {/* 亮点列表 */}
        <ul className="space-y-2">
          {item.highlights.map((highlight, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-2 text-sm text-secondary"
            >
              <CheckCircle size={16} className="text-accent mt-0.5 shrink-0" />
              <span>{highlight}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}