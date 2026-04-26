import { motion } from 'framer-motion'
import { Clock, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ArticleCard({ article }) {
  return (
    <Link to={`/blog/${article.id}`}>
      <motion.div
        whileHover={{ y: -4 }}
        className="w-[320px] p-5 rounded-2xl bg-white border border-muted/50 shadow-sm hover:shadow-lg hover:border-accent/20 transition-all duration-300 cursor-pointer group"
      >
        {/* 标题 */}
        <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-accent transition-colors line-clamp-1">
          {article.title}
        </h3>
        
        {/* 摘要 */}
        <p className="text-sm text-secondary leading-relaxed mb-4 line-clamp-2">
          {article.summary}
        </p>
        
        {/* 底部信息 */}
        <div className="flex items-center justify-between text-xs text-secondary/70">
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>{article.readTime}</span>
          </div>
          <div className="flex items-center gap-1 text-accent opacity-0 group-hover:opacity-100 transition-opacity">
            <span>阅读</span>
            <ArrowRight size={12} />
          </div>
        </div>
      </motion.div>
    </Link>
  )
}