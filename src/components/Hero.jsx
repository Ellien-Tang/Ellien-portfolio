import { motion } from 'framer-motion'

import { ChevronDown } from 'lucide-react'
import {  useState, useEffect } from 'react'

const GitHubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

// 信封图标
const EnvelopeIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M2 4h20v14H2V4zm2 2v10h16V6l-8 6-8-6z" />
  </svg>
);

// 掘金图标（六边形宝石造型，代表掘金社区）
const JuejinIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L22 8L22 16L12 22L2 16L2 8L12 2Z" />
  </svg>
);

// 社交链接数据
const socialLinks = [
  {
    name: 'GitHub',
    icon: GitHubIcon,
    href: 'https://github.com/Ellien-Tang',      // 改成你的
    color: 'hover:text-gray-900'
  },
  {
    name: '掘金',
    icon: JuejinIcon,
    href: 'https://juejin.cn/user/yourid',      // 改成你的
    color: 'hover:text-blue-600'
  },
  {
    name: '邮箱',
    icon: EnvelopeIcon,
    href: '1143271551@qq.com',         // 改成你的
    color: 'hover:text-red-500'
  }
]

// 动画配置
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,    // 子元素依次出现，间隔0.15秒
      delayChildren: 0.3          // 容器出现后延迟0.3秒开始
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]  // 优雅的缓动曲线
    }
  }
}

export default function Hero() {
  // 滚动到项目区域
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 背景装饰 -  subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-muted opacity-50" />
      
      {/* 内容容器 */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-6 max-w-3xl mx-auto"
      >
        {/* 标签 */}
        <motion.div variants={itemVariants}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
            👋 你好，我是
          </span>
        </motion.div>

        {/* 主标题 */}
        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
        >
          <span className="text-primary">Ellien</span>
          <span className="text-accent">.</span>
        </motion.h1>

        {/* 副标题 / 打字机效果 */}
        <motion.div variants={itemVariants} className="mb-8">
          <TypewriterText 
            texts={[
              '前端开发工程师',
              'React / Vue 开发者',
              '热爱开源与技术分享',
              '正在寻找实习机会'
            ]}
          />
        </motion.div>

        {/* 简介文字 */}
        <motion.p 
          variants={itemVariants}
          className="text-lg text-secondary leading-relaxed mb-10 max-w-xl mx-auto"
        >
          本科就读于安徽大学计算机科学与技术专业。
          具备 Vue / React 全栈开发能力。有过低代码平台与知识库 Agent 系统的开发实践，
          正在系统学习前端工程化与性能优化，期待在实践中持续成长。
        </motion.p>

        {/* 社交图标 */}
        <motion.div 
          variants={itemVariants}
          className="flex items-center justify-center gap-6 mb-12"
        >
          {socialLinks.map((link) => {
            const Icon = link.icon
            return (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-xl bg-muted text-secondary transition-all duration-300 ${link.color} hover:bg-white hover:shadow-lg`}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                title={link.name}
              >
                <Icon size={22} />
              </motion.a>
            )
          })}
        </motion.div>

        {/* CTA 按钮 */}
        <motion.div variants={itemVariants}>
          <motion.button
            onClick={scrollToProjects}
            className="px-8 py-3 rounded-full bg-accent text-white font-medium shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            查看我的项目
          </motion.button>
        </motion.div>
      </motion.div>

      {/* 向下滚动提示 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-secondary cursor-pointer"
          onClick={scrollToProjects}
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  )
}

// 打字机效果组件
function TypewriterText({ texts }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const text = texts[currentIndex]
    const speed = isDeleting ? 50 : 100  // 删除速度更快

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // 正在打字
        if (currentText.length < text.length) {
          setCurrentText(text.slice(0, currentText.length + 1))
        } else {
          // 打完了，暂停一下开始删除
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        // 正在删除
        if (currentText.length > 0) {
          setCurrentText(text.slice(0, currentText.length - 1))
        } else {
          // 删完了，切换到下一句
          setIsDeleting(false)
          setCurrentIndex((prev) => (prev + 1) % texts.length)
        }
      }
    }, speed)

    return () => clearTimeout(timer)
  }, [currentText, isDeleting, currentIndex, texts])

  return (
    <div className="h-8">
      <span className="text-xl md:text-2xl text-secondary font-medium">
        {currentText}
        <span className="inline-block w-0.5 h-6 bg-accent ml-1 animate-pulse" />
      </span>
    </div>
  )
}