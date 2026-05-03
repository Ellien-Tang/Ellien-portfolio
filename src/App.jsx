import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import ProjectDetail from './components/ProjectDetail'
import ArticleDetail from './components/ArticleDetail'
import BlogList from './components/BlogList'
import AdminLayout from './admin/AdminLayout'
import Login, { isAdmin } from './admin/Login'
import { useState } from 'react'

function AdminGuard() {
  const [auth, setAuth] = useState(isAdmin())
  if (!auth) return <Login onLogin={() => setAuth(true)} />
  return <AdminLayout />
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects/:id" element={<ProjectDetail />} />
      <Route path="/blog" element={<BlogList />} />
      <Route path="/blog/:id" element={<ArticleDetail />} />
      <Route path="/admin/*" element={<AdminGuard />} />
    </Routes>
  )
}

export default App
