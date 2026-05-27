import { motion } from 'framer-motion'
import { Clock, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ArticleCard({ article }) {
  return (
    <Link to={`/blog/${article.id}`}>
      <motion.div
        whileHover={{ y: -4 }}
        className="w-[380px] p-6 rounded-[24px] bg-white border-[3px] border-black hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 cursor-pointer group"
      >
        {/* 标题 */}
        <h3 className="text-xl font-bold text-black mb-3 transition-colors line-clamp-1">
          {article.title}
        </h3>

        {/* 摘要 */}
        <p className="text-base text-[#717171] leading-relaxed mb-5 line-clamp-2">
          {article.summary}
        </p>

        {/* 底部信息 */}
        <div className="flex items-center justify-between text-sm text-[#717171]">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{article.readTime}</span>
          </div>
          <div className="flex items-center gap-1 text-black opacity-0 group-hover:opacity-100 transition-opacity">
            <span>阅读</span>
            <ArrowRight size={14} />
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
