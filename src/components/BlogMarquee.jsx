import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Pencil } from 'lucide-react'
import { api } from '../services/api'
import ArticleCard from './ArticleCard'
import { Marquee } from "@/components/ui/marquee"

export default function BlogMarquee() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getArticles()
      .then(data => setArticles(data))
      .catch(err => console.error('Failed to load articles:', err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <section id="blog" className="py-24 px-4 bg-white">
        <div className="max-w-[1440px] mx-auto text-center text-[#717171] text-xl">加载中...</div>
      </section>
    )
  }

  const firstHalf = articles.slice(0, Math.ceil(articles.length / 2))
  const secondHalf = articles.slice(Math.ceil(articles.length / 2))

  return (
    <section id="blog" className="py-16 md:py-24 px-4 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-[64px] font-bold leading-tight">文章与思考</h2>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 border-[3px] border-black rounded-xl px-6 py-5 hover:bg-black hover:text-white bg-white font-semibold text-base md:text-lg w-full sm:w-auto transition-colors"
          >
            <Pencil className="w-5 h-5" />
            浏览全部文章
          </Link>
        </motion.div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <Marquee pauseOnHover className="[--duration:20s]">
            {firstHalf.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:20s]">
            {secondHalf.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </Marquee>
          <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
          <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
        </div>
      </div>
    </section>
  )
}
