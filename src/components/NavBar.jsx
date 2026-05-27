import { useState } from 'react'
import { Home, Folder, FileText } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const GitHubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const navItems = [
  { name: '首页', href: '#hero' },
  { name: '项目', href: '#projects' },
  { name: '博客', href: '#blog' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToSection = (href) => {
    const id = href.replace('#', '')
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  return (
    <div className="container mx-auto px-4 pt-8 pb-4">
      <nav className="flex items-center justify-between bg-white border-[3px] border-black rounded-xl px-6 py-4 max-w-3xl mx-auto shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        {/* Logo - 黑底白字圆形风格 */}
        <button
          onClick={() => scrollToSection('#hero')}
          className="flex items-center gap-3"
        >
          <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-base font-bold">E</span>
          </div>
          <span className="text-[20px] font-bold leading-[24px] text-black">Ellien</span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className="text-[20px] font-bold leading-[24px] hover:opacity-70 transition-opacity"
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Social Links */}
        <a
          href="https://github.com/Ellien-Tang"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex w-12 h-12 rounded-full bg-black text-white items-center justify-center hover:bg-black/90 transition-colors flex-shrink-0"
        >
          <GitHubIcon size={22} />
        </a>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className="w-6 h-[3px] bg-black mb-1.5"></div>
          <div className="w-6 h-[3px] bg-black mb-1.5"></div>
          <div className="w-6 h-[3px] bg-black"></div>
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden max-w-3xl mx-auto mt-2 bg-white border-[3px] border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="px-6 py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-4 py-3 text-black font-bold hover:bg-black hover:text-white rounded-lg transition-all text-lg"
                >
                  {item.name}
                </button>
              ))}
              <a
                href="https://github.com/Ellien-Tang"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 text-black font-bold hover:bg-black hover:text-white rounded-lg transition-all text-lg"
              >
                <GitHubIcon size={18} />
                GitHub
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
