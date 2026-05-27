import { motion } from 'framer-motion'
import { Mail, FolderOpen } from 'lucide-react'

export default function Hero() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-[1440px] mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* 左侧文字 */}
        <div className="space-y-8">
          <h1 className="text-[56px] leading-[64px] md:text-[88px] font-bold md:leading-[100px]">
            我是 <span className="bg-[#FF6B7A] text-white px-3 py-1 inline-block">Ellien</span>，一名来自{" "}
            <span className="bg-[#2F81F7] text-white px-3 py-1 inline-block">安徽大学</span> 的前端开发者
          </h1>

          <p className="text-[#393939] text-[18px] md:text-[20px] font-medium leading-[30px] md:leading-[34px] max-w-xl">
            本科就读于计算机科学与技术专业，具备 Vue / React 全栈开发能力。
            有过低代码平台与知识库 Agent 系统的开发实践，正在系统学习前端工程化与性能优化。
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-7 pt-4">
            <a
              href="mailto:1143271551@qq.com"
              className="inline-flex items-center justify-center gap-2 bg-[#0B0B0B] text-white hover:bg-black/90 rounded-xl py-5 px-8 md:py-6 md:px-[72px] text-lg md:text-xl font-semibold h-auto w-full sm:w-auto sm:min-w-[280px]"
            >
              <Mail className="w-5 h-5" />
              联系我
            </a>
            <button
              onClick={scrollToProjects}
              className="inline-flex items-center justify-center gap-2 bg-white border-[3px] border-black hover:bg-gray-50 rounded-xl py-5 px-8 md:py-6 md:px-[72px] text-lg md:text-xl font-semibold h-auto w-full sm:w-auto sm:min-w-[280px]"
            >
              <FolderOpen className="w-5 h-5" />
              查看项目
            </button>
          </div>
        </div>

        {/* 右侧图片卡片 */}
        <div className="flex justify-center md:justify-end">
          <div className="relative w-full max-w-lg aspect-square bg-[#FDB927] border-[3px] border-black rounded-[32px] overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <img
              src="/images/hero-portrait.png"
              alt="个人肖像"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
