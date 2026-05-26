import { useState, useEffect } from 'react'
import { Home, Folder, FileText } from 'lucide-react'
// import { FaGithub } from 'react-icons/fa'
// import { SiJuejin } from 'react-icons/si'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../lib/utils'


// 在 Navbar.jsx 里定义一个 GitHubIcon 组件
const GitHubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const navItems = [
  { name: '首页', href: '#hero', icon: Home },
  { name: '项目', href: '#projects', icon: Folder },
  { name: '博客', href: '#blog', icon: FileText },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  // 监听滚动，更新液态玻璃效果
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 监听当前可视区域，更新导航高亮
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 }
    )

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  // 平滑滚动到锚点
  const scrollToSection = (href) => {
    const id = href.replace('#', '')
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-white/70 backdrop-blur-xl shadow-sm border-b border-white/20'
          : 'bg-transparent'
      )}
    >
      <nav className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        {/* Logo - 点击回到顶部 */}
        <button 
          onClick={() => scrollToSection('#hero')}
          className="text-xl font-bold tracking-tight"
        >
          Ellien<span className="text-accent">.</span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.href.replace('#', '')
            
            return (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className={cn(
                  'relative flex items-center gap-2 text-sm font-medium transition-colors cursor-pointer',
                  isActive ? 'text-accent' : 'text-secondary hover:text-primary'
                )}
              >
                <Icon size={16} />
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Social Links */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://github.com/Ellien-Tang"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:text-primary transition-colors"
          >
            <GitHubIcon size={20} />
          </a>
          {/* <a
            href="https://juejin.cn/user/yourid"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:text-primary transition-colors"
          >
            <SiJuejin size={20} />
          </a> */}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className="w-5 h-0.5 bg-primary mb-1.5"></div>
          <div className="w-5 h-0.5 bg-primary mb-1.5"></div>
          <div className="w-5 h-0.5 bg-primary"></div>
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/80 backdrop-blur-xl border-b"
          >
            <div className="px-6 py-4 space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left text-secondary hover:text-primary"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}