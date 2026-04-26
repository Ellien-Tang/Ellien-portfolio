import { 
  SiReact, SiVuedotjs, SiTypescript, SiVite, 
  SiNodedotjs, SiTailwindcss, SiOpenai, SiFramer 
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
  framer: { Icon: SiFramer, color: 'text-[#0055FF]', name: 'Framer Motion' }
}

export default function TechIcon({ name, size = 20, className }) {
  const config = iconMap[name]
  if (!config) return null
  
  const { Icon, color } = config
  return (
    <div className={cn('flex items-center justify-center', className)} title={config.name}>
      <Icon size={size} className={color} />
    </div>
  )
}