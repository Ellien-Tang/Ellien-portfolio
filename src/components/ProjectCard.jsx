import Tilt from 'react-parallax-tilt'
import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import TechIcon from './TechIcon'

export default function ProjectCard({ index, id, name, description, source_code_link, live_demo_link, techIcons }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <Tilt
        tiltMaxAngleX={15}
        tiltMaxAngleY={15}
        scale={1.02}
        transitionSpeed={450}
        className="bg-white p-6 rounded-[32px] border-[3px] border-black hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 h-full"
      >
        <div className="h-full flex flex-col">
          {/* 图片区域 */}
          <div className="relative w-full h-[280px] group rounded-2xl overflow-hidden bg-[#EDEDED] flex-shrink-0 border-2 border-black">
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-black text-base font-bold">{name}</span>
            </div>

            {/* 悬浮按钮 */}
            <div className="absolute inset-0 flex justify-end m-3 gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(source_code_link, '_blank')
                }}
                className="w-12 h-12 rounded-full bg-black flex justify-center items-center cursor-pointer hover:scale-110 transition-transform"
              >
                <FaGithub size={24} className="text-white" />
              </div>
              {live_demo_link && (
                <div
                  onClick={(e) => {
                    e.stopPropagation()
                    window.open(live_demo_link, '_blank')
                  }}
                  className="w-12 h-12 rounded-full bg-black flex justify-center items-center cursor-pointer hover:scale-110 transition-transform"
                >
                  <FaExternalLinkAlt size={18} className="text-white" />
                </div>
              )}
            </div>
          </div>

          {/* 内容区域 */}
          <div className="mt-6 flex-1">
            <h3 className="text-black font-bold text-2xl">{name}</h3>
            <p className="mt-3 text-[#393939] text-base leading-relaxed line-clamp-2">
              {description}
            </p>
          </div>

          {/* 技术栈图标 */}
          <div className="mt-5 flex items-center gap-3 flex-wrap">
            <div className="flex gap-2">
              {techIcons.map((tag) => {
                return (
                  <div key={typeof tag === 'string' ? tag : tag.name} className="p-2 rounded-lg bg-[#EDEDED] border border-black">
                    <TechIcon name={tag} size={18} />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Read More */}
          <div className="mt-auto pt-5">
            <a
              href={`/projects/${id}`}
              className="inline-flex items-center gap-1 text-base font-bold text-black hover:gap-2 transition-all"
            >
              Read More →
            </a>
          </div>
        </div>
      </Tilt>
    </motion.div>
  )
}
