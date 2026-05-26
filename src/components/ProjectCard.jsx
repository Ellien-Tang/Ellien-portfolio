import Tilt from 'react-parallax-tilt'
import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import TechIcon from './TechIcon'



// export default function ProjectCard({ index, id, name, description, tags, image, source_code_link, live_demo_link }) {
  export default function ProjectCard({ index, id, name, description,source_code_link, live_demo_link, techIcons }) {
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
        className="bg-white p-5 rounded-2xl shadow-sm border border-muted/50 hover:shadow-xl hover:border-accent/20 transition-all duration-500 h-full"
      >
        <div className="h-full flex flex-col">
        {/* 图片区域 */}
        <div className="relative w-full h-[230px] group rounded-2xl overflow-hidden bg-muted flex-shrink-0">
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-secondary text-sm font-medium">{name}</span>
          </div>
          
          {/* 悬浮按钮 */}
          <div className="absolute inset-0 flex justify-end m-3 gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div
              onClick={(e) => {
                e.stopPropagation()
                window.open(source_code_link, '_blank')
              }}
              className="w-10 h-10 rounded-full bg-black/70 backdrop-blur-sm flex justify-center items-center cursor-pointer hover:bg-black transition-colors"
            >
              <FaGithub size={20} className="text-white" />
            </div>
            {live_demo_link && (
              <div
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(live_demo_link, '_blank')
                }}
                className="w-10 h-10 rounded-full bg-black/70 backdrop-blur-sm flex justify-center items-center cursor-pointer hover:bg-black transition-colors"
              >
                <FaExternalLinkAlt size={16} className="text-white" />
              </div>
            )}
          </div>
        </div>

        {/* 内容区域 */}
        <div className="mt-5 flex-1">
          <h3 className="text-primary font-bold text-xl">{name}</h3>
          <p className="mt-2 text-secondary text-sm leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        {/* 技术栈图标 + 标签 */}
        <div className="mt-4 flex items-center gap-3 flex-wrap">
          {/* 图标 */}
          <div className="flex gap-1.5">
            {techIcons.map((tag) => {
              return (
                <div key={typeof tag === 'string' ? tag : tag.name} className="p-1.5 rounded-md bg-muted/80">
                  <TechIcon name={tag} size={16} />
                </div>
              )
            })}
          </div>
          
          
        </div>

        {/* Read More */}
        <div className="mt-auto pt-4 border-t border-muted/50">
          <a
            href={`/projects/${id}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:gap-2 transition-all"
          >
            Read More →
          </a>
        </div>
        </div>
      </Tilt>
    </motion.div>
  )
}