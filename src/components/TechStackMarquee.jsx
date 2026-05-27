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
      <div className="relative overflow-hidden bg-black py-16 -rotate-[5deg] mt-32 mb-16 min-w-[120vw] -mx-[10vw] left-0">
        <div className="flex items-center gap-16 animate-marquee whitespace-nowrap [--duration:30s] [--gap:4rem]">
          {items.map((tech, index) => (
            <div key={index} className="flex items-center gap-3 shrink-0">
              <TechIcon name={tech} size={48} iconClassName="text-white" />
              <span className="text-white text-xl font-bold whitespace-nowrap">{tech.charAt(0).toUpperCase() + tech.slice(1)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
