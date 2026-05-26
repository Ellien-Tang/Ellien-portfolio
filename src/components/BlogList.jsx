import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Clock, Calendar, Search, X} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { api } from '../services/api'
import { cn } from '../lib/utils'

export default function BlogList() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState(null)

  useEffect(() => {
    api.getArticles()
      .then(data => setArticles(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const allTags = useMemo(() => {
    const tags = new Set()
    articles.forEach(article => article.tags?.forEach(tag => tags.add(tag)))
    return Array.from(tags).sort()
  }, [articles])

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const tagMatch = !selectedTag || article.tags?.includes(selectedTag)
      const query = searchQuery.toLowerCase().trim()
      const searchMatch = !query || 
        article.title?.toLowerCase().includes(query) ||
        article.summary?.toLowerCase().includes(query) ||
        article.tags?.some(tag => tag.toLowerCase().includes(query))
      return tagMatch && searchMatch
    })
  }, [searchQuery, selectedTag, articles])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedTag(null)
  }

  const hasFilters = searchQuery || selectedTag

  if (loading) {
    return (
      <div className="min-h-screen bg-surface pt-24 text-center text-secondary">
        加载中...
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-surface pt-24 text-center text-red-500">
        加载失败: {error}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-xl border-b-2 border-black">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center">
          <Link to="/" className="flex items-center gap-2 text-secondary hover:text-primary transition-colors">
            <ArrowLeft size={20} />
            <span className="font-medium">返回首页</span>
          </Link>
        </div>
      </nav>

      <div className="pt-32 pb-16 px-6 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold text-primary mb-8">全部文章</h1>

          <div className="relative mb-6">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" />
            <input
              type="text"
              placeholder="搜索文章标题、内容或标签..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3 rounded-xl bg-white border-2 border-black focus:border-black focus:outline-none transition-all text-primary placeholder:text-secondary/50"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary hover:text-primary">
                <X size={16} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setSelectedTag(null)}
              className={cn('px-3 py-1.5 rounded-full text-sm font-medium transition-all border-2', !selectedTag ? 'border-black bg-black text-white' : 'border-black bg-transparent text-secondary hover:text-primary')}
            >
              全部
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={cn('px-3 py-1.5 rounded-full text-sm font-medium transition-all border', selectedTag === tag ? 'border-primary bg-primary text-white' : 'border-2 border-black bg-transparent text-secondary hover:text-primary')}
              >
                {tag}
              </button>
            ))}
          </div>

          {hasFilters && (
            <div className="flex items-center justify-between mb-6 text-sm">
              <span className="text-secondary">找到 {filteredArticles.length} 篇文章</span>
              <button onClick={clearFilters} className="text-primary hover:underline flex items-center gap-1">
                <X size={14} /> 清除筛选
              </button>
            </div>
          )}

          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <Link to={`/blog/${article.id}`} className="block p-6 rounded-2xl bg-white border-2 border-black hover:border-black transition-all group">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h2 className="text-lg font-bold text-primary group-hover:text-primary transition-colors mb-2 truncate">{article.title}</h2>
                        <p className="text-secondary text-sm leading-relaxed mb-3 line-clamp-2">{article.summary}</p>
                        <div className="flex items-center gap-4 flex-wrap">
                          <span className="flex items-center gap-1 text-xs text-secondary/70">
                            <Calendar size={12} /> {article.date}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-secondary/70">
                            <Clock size={12} /> {article.readTime}
                          </span>
                          <div className="flex gap-1.5">
                            {article.tags?.map(tag => (
                              <span key={tag} className={cn('px-2 py-0.5 rounded text-xs font-medium border-2', selectedTag === tag ? 'border-black text-black' : 'border-black text-secondary')}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="shrink-0 mt-1 text-secondary/30 group-hover:text-primary transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </AnimatePresence>

            {filteredArticles.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                <p className="text-secondary mb-2">没有找到匹配的文章</p>
                <button onClick={clearFilters} className="text-primary hover:underline text-sm">清除筛选条件</button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
