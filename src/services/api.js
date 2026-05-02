const API_BASE = import.meta.env.VITE_API_URL || ''

async function fetchJSON(url, options = {}) {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(err || `HTTP ${res.status}`)
  }
  return res.json()
}

export const api = {
  // Projects
  getProjects: () => fetchJSON('/api/projects'),
  getProject: (id) => fetchJSON(`/api/projects/${id}`),

  // Articles
  getArticles: () => fetchJSON('/api/articles'),
  getArticle: (id) => fetchJSON(`/api/articles/${id}`),
}
