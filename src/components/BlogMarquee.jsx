import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
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
      <section id="blog" className="py-24 px-6 bg-surface">
        <div className="max-w-6xl mx-auto text-center text-secondary">加载中...</div>
      </section>
    )
  }

  const firstHalf = articles.slice(0, Math.ceil(articles.length / 2))
  const secondHalf = articles.slice(Math.ceil(articles.length / 2))

  return (
    <section id="blog" className="py-24 px-6 bg-surface overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            技术博客
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">文章与思考</h2>
          <p className="text-secondary max-w-xl mx-auto">
            记录学习过程中的关键知识点与踩坑经验
          </p>
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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-end mt-8"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-black text-sm font-medium text-secondary hover:text-primary hover:border-black transition-all"
          >
            全部文章
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
