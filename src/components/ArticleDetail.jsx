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
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-secondary">加载中...</p>
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-secondary">{error || '文章不存在'}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={handleBack} className="flex items-center gap-2 text-secondary hover:text-primary transition-colors">
            <ArrowLeft size={20} />
            <span className="font-medium">返回</span>
          </button>
          <span className="text-sm text-secondary">{article.readTime}</span>
        </div>
      </nav>

      <header className="pt-32 pb-12 px-6 max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags?.map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">{tag}</span>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 leading-tight">{article.title}</h1>
          <div className="flex items-center gap-4 text-sm text-secondary">
            <span className="flex items-center gap-1"><Calendar size={14} /> {article.date}</span>
            <span className="flex items-center gap-1"><Clock size={14} /> {article.readTime}</span>
          </div>
        </motion.div>
      </header>

      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="px-6 pb-24 max-w-3xl mx-auto"
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
                    <div className="absolute right-3 top-2 text-xs text-secondary/50 opacity-0 group-hover:opacity-100 transition-opacity">{match[1]}</div>
                    <pre className={className}><code className={className} {...props}>{children}</code></pre>
                  </div>
                ) : (
                  <code className="px-1.5 py-0.5 rounded bg-muted text-accent text-sm font-mono" {...props}>{children}</code>
                )
              },
              h2({ children }) {
                return <h2 className="text-2xl font-bold text-primary mt-12 mb-4 pb-2 border-b border-muted">{children}</h2>
              },
              h3({ children }) {
                return <h3 className="text-xl font-bold text-primary mt-8 mb-3">{children}</h3>
              },
              table({ children }) {
                return <div className="overflow-x-auto my-6"><table className="w-full text-sm border-collapse">{children}</table></div>
              },
              th({ children }) {
                return <th className="px-4 py-3 text-left font-semibold text-primary bg-muted border-b-2 border-muted">{children}</th>
              },
              td({ children }) {
                return <td className="px-4 py-3 text-secondary border-b border-muted/50">{children}</td>
              },
              blockquote({ children }) {
                return <blockquote className="pl-4 border-l-4 border-accent bg-accent/5 py-3 pr-4 rounded-r-lg my-6 text-secondary italic">{children}</blockquote>
              },
              ul({ children }) {
                return <ul className="space-y-2 my-4 ml-4">{children}</ul>
              },
              li({ children }) {
                return <li className="flex items-start gap-2 text-secondary"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" /><span>{children}</span></li>
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
