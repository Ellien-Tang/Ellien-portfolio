import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import ProjectDetail from './components/ProjectDetail'
import ArticleDetail from './components/ArticleDetail'
import BlogList from './components/BlogList'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects/:id" element={<ProjectDetail />} />
      <Route path="/blog" element={<BlogList />} />
      <Route path="/blog/:id" element={<ArticleDetail />} />
    </Routes>
  )
}

export default App