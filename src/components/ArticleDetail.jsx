import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock, Calendar} from 'lucide-react'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { useState, useEffect } from 'react'
import { api } from '../services/api'
import 'highlight.js/styles/github.css'

export default function ArticleDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    api.getArticle(id)
      .then(data => setArticle(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  const handleBack = () => {
    navigate(-1)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-[#717171] text-xl">加载中...</p>
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-[#717171] text-xl">{error || '文章不存在'}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white border-b-[3px] border-black">
        <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
          <button onClick={handleBack} className="flex items-center gap-2 text-black hover:opacity-70 transition-opacity text-lg font-bold">
            <ArrowLeft size={24} />
            <span>返回</span>
          </button>
          <span className="text-base text-[#717171]">{article.readTime}</span>
        </div>
      </nav>

      <header className="pt-16 pb-12 px-6 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex flex-wrap gap-2 mb-5">
            {article.tags?.map(tag => (
              <span key={tag} className="px-4 py-1.5 rounded-full border-[3px] border-black text-black text-sm font-bold">{tag}</span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-5 leading-tight">{article.title}</h1>
          <div className="flex items-center gap-5 text-base text-[#717171]">
            <span className="flex items-center gap-1"><Calendar size={16} /> {article.date}</span>
            <span className="flex items-center gap-1"><Clock size={16} /> {article.readTime}</span>
          </div>
        </motion.div>
      </header>

      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="px-6 pb-24 max-w-5xl mx-auto"
      >
        <div className="prose prose-slate max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <div className="relative group">
                    <div className="absolute right-3 top-2 text-sm text-[#717171] opacity-0 group-hover:opacity-100 transition-opacity">{match[1]}</div>
                    <pre className={className}><code className={className} {...props}>{children}</code></pre>
                  </div>
                ) : (
                  <code className="px-1.5 py-0.5 rounded border-[3px] border-black bg-[#f5f5f5] text-black text-sm font-mono" {...props}>{children}</code>
                )
              },
              h2({ children }) {
                return <h2 className="text-3xl font-bold text-black mt-12 mb-5 pb-2 border-b-[3px] border-black">{children}</h2>
              },
              h3({ children }) {
                return <h3 className="text-2xl font-bold text-black mt-8 mb-3">{children}</h3>
              },
              table({ children }) {
                return <div className="overflow-x-auto my-6"><table className="w-full text-sm border-collapse">{children}</table></div>
              },
              th({ children }) {
                return <th className="px-4 py-3 text-left font-bold text-black bg-[#f5f5f5] border-b-[3px] border-black">{children}</th>
              },
              td({ children }) {
                return <td className="px-4 py-3 text-[#717171] border-b-[3px] border-black">{children}</td>
              },
              blockquote({ children }) {
                return <blockquote className="pl-4 border-l-[4px] border-black bg-[#f5f5f5]/30 py-3 pr-4 rounded-r-lg my-6 text-[#717171] italic">{children}</blockquote>
              },
              img({ src, alt }) {
                return (
                  <img
                    src={src}
                    alt={alt}
                    className="rounded-xl my-6 max-w-full border-[3px] border-black"
                    loading="lazy"
                  />
                )
              },
              ul({ children }) {
                return <ul className="space-y-2 my-4 ml-4">{children}</ul>
              },
              li({ children }) {
                return <li className="flex items-start gap-2 text-[#717171]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-black shrink-0" /><span>{children}</span></li>
              }
            }}
          >
            {article.content || ''}
          </ReactMarkdown>
        </div>
      </motion.article>
    </div>
  )
}
