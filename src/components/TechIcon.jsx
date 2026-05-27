import {
  SiReact, SiVuedotjs, SiTypescript, SiVite,
  SiNodedotjs, SiTailwindcss, SiOpenai, SiFramer,
  SiJavascript, SiHtml5, SiCss, SiPython, SiGit,
  SiDocker, SiLinux, SiNextdotjs, SiWebpack, SiRedux,
  SiPinia, SiAntdesign, SiMysql, SiMongodb
} from 'react-icons/si'
import { cn } from '../lib/utils'

const iconMap = {
  react: { Icon: SiReact, color: 'text-[#61DAFB]', name: 'React' },
  vue: { Icon: SiVuedotjs, color: 'text-[#4FC08D]', name: 'Vue' },
  typescript: { Icon: SiTypescript, color: 'text-[#3178C6]', name: 'TypeScript' },
  vite: { Icon: SiVite, color: 'text-[#646CFF]', name: 'Vite' },
  nodejs: { Icon: SiNodedotjs, color: 'text-[#339933]', name: 'Node.js' },
  tailwind: { Icon: SiTailwindcss, color: 'text-[#06B6D4]', name: 'Tailwind' },
  openai: { Icon: SiOpenai, color: 'text-[#412991]', name: 'OpenAI' },
  framer: { Icon: SiFramer, color: 'text-[#0055FF]', name: 'Framer Motion' },
  javascript: { Icon: SiJavascript, color: 'text-[#F7DF1E]', name: 'JavaScript' },
  html5: { Icon: SiHtml5, color: 'text-[#E34F26]', name: 'HTML5' },
  css3: { Icon: SiCss, color: 'text-[#1572B6]', name: 'CSS3' },
  python: { Icon: SiPython, color: 'text-[#3776AB]', name: 'Python' },
  git: { Icon: SiGit, color: 'text-[#F05032]', name: 'Git' },
  docker: { Icon: SiDocker, color: 'text-[#2496ED]', name: 'Docker' },
  linux: { Icon: SiLinux, color: 'text-[#FCC624]', name: 'Linux' },
  nextjs: { Icon: SiNextdotjs, color: 'text-white', name: 'Next.js' },
  webpack: { Icon: SiWebpack, color: 'text-[#8DD6F9]', name: 'Webpack' },
  redux: { Icon: SiRedux, color: 'text-[#764ABC]', name: 'Redux' },
  pinia: { Icon: SiPinia, color: 'text-[#FFE066]', name: 'Pinia' },
  antdesign: { Icon: SiAntdesign, color: 'text-[#0170FE]', name: 'Ant Design' },
  mysql: { Icon: SiMysql, color: 'text-[#4479A1]', name: 'MySQL' },
  mongodb: { Icon: SiMongodb, color: 'text-[#47A248]', name: 'MongoDB' }
}

export default function TechIcon({ name, size = 20, className, iconClassName }) {
  const config = iconMap[name]
  if (!config) return null

  const { Icon, color } = config
  return (
    <div className={cn('flex items-center justify-center', className)} title={config.name}>
      <Icon size={size} className={cn(color, iconClassName)} />
    </div>
  )
}