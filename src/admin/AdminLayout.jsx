import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ProjectManager from './ProjectManager'
import ArticleManager from './ArticleManager'
import ResumeManager from './ResumeManager'

export default function AdminLayout() {
  const location = useLocation()
  const tab = location.hash.replace('#', '') || 'projects'

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="font-bold text-gray-900">管理后台</span>
            <Link to="/admin#projects" className={`text-sm ${tab === 'projects' ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>项目管理</Link>
            <Link to="/admin#articles" className={`text-sm ${tab === 'articles' ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>文章管理</Link>
            <Link to="/admin#resume" className={`text-sm ${tab === 'resume' ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>简历管理</Link>
          </div>
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-900">返回首页</Link>
        </div>
      </nav>
      <main className="max-w-6xl mx-auto px-6 py-8">
        {tab === 'projects' ? <ProjectManager /> : tab === 'articles' ? <ArticleManager /> : <ResumeManager />}
      </main>
    </div>
  )
}
