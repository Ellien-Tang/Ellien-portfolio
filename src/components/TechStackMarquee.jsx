import TechIcon from './TechIcon'

const techs = [
  'react',
  'vue',
  'typescript',
  'javascript',
  'html5',
  'css3',
  'nextjs',
  'vite',
  'tailwind',
  'redux',
  'pinia',
  'nodejs',
  'python',
  'docker',
  'git',
  'webpack',
  'antdesign',
  'mysql',
  'mongodb',
  'linux',
]

export default function TechStackMarquee() {
  const items = [...techs, ...techs, ...techs, ...techs]

  return (
    <div className="overflow-hidden">
      <div className="relative overflow-hidden bg-black py-14 -rotate-[5deg] mt-24 mb-12 min-w-[120vw] -mx-[10vw] left-0">
        <div className="flex items-center gap-20 animate-marquee whitespace-nowrap [--duration:30s] [--gap:5rem]">
          {items.map((tech, index) => (
            <div key={index} className="flex items-center gap-3 shrink-0">
              <TechIcon name={tech} size={32} iconClassName="text-white" />
              <span className="text-white text-lg font-bold whitespace-nowrap">{tech.charAt(0).toUpperCase() + tech.slice(1)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
