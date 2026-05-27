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
      <div className="min-h-screen bg-white pt-24 text-center text-[#717171] text-xl">
        加载中...
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white pt-24 text-center text-red-500 text-xl">
        加载失败: {error}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white border-b-[3px] border-black">
        <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center">
          <Link to="/" className="flex items-center gap-2 text-black hover:opacity-70 transition-opacity text-lg font-bold">
            <ArrowLeft size={24} />
            <span>返回首页</span>
          </Link>
        </div>
      </nav>

      <div className="pt-16 pb-16 px-6 max-w-[1440px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-10">全部文章</h1>

          <div className="relative mb-8">
            <Search size={22} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#717171]" />
            <input
              type="text"
              placeholder="搜索文章标题、内容或标签..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-12 py-4 rounded-xl bg-white border-[3px] border-black focus:border-black focus:outline-none transition-all text-black text-lg placeholder:text-[#717171]"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-5 top-1/2 -translate-y-1/2 text-[#717171] hover:text-black">
                <X size={20} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={() => setSelectedTag(null)}
              className={cn('px-4 py-2 rounded-full text-base font-bold transition-all border-[3px]', !selectedTag ? 'border-black bg-black text-white' : 'border-black bg-transparent text-black hover:bg-black hover:text-white')}
            >
              全部
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={cn('px-4 py-2 rounded-full text-base font-bold transition-all border-[3px]', selectedTag === tag ? 'border-black bg-black text-white' : 'border-black bg-transparent text-black hover:bg-black hover:text-white')}
              >
                {tag}
              </button>
            ))}
          </div>

          {hasFilters && (
            <div className="flex items-center justify-between mb-8 text-base">
              <span className="text-[#717171]">找到 {filteredArticles.length} 篇文章</span>
              <button onClick={clearFilters} className="text-black font-bold hover:underline flex items-center gap-1">
                <X size={16} /> 清除筛选
              </button>
            </div>
          )}

          <div className="space-y-5">
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
                  <Link to={`/blog/${article.id}`} className="block p-8 rounded-[24px] bg-white border-[3px] border-black hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all group">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h2 className="text-xl font-bold text-black transition-colors mb-3 truncate">{article.title}</h2>
                        <p className="text-[#717171] text-base leading-relaxed mb-4 line-clamp-2">{article.summary}</p>
                        <div className="flex items-center gap-4 flex-wrap">
                          <span className="flex items-center gap-1 text-sm text-[#717171]">
                            <Calendar size={14} /> {article.date}
                          </span>
                          <span className="flex items-center gap-1 text-sm text-[#717171]">
                            <Clock size={14} /> {article.readTime}
                          </span>
                          <div className="flex gap-2">
                            {article.tags?.map(tag => (
                              <span key={tag} className={cn('px-3 py-1 rounded text-sm font-bold border-[3px]', selectedTag === tag ? 'border-black text-black' : 'border-black text-[#717171]')}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="shrink-0 mt-1 text-[#717171] group-hover:text-black transition-colors">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                <p className="text-[#717171] mb-2 text-lg">没有找到匹配的文章</p>
                <button onClick={clearFilters} className="text-black font-bold hover:underline text-base">清除筛选条件</button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
