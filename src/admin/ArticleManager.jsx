import { useState, useEffect } from 'react'

const API_BASE = import.meta.env.VITE_API_URL || ''

async function api(url, opts = {}) {
  const res = await fetch(`${API_BASE}${url}`, { headers: { 'Content-Type': 'application/json' }, ...opts })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export default function ArticleManager() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ id: '', title: '', summary: '', content: '', tags: '', date: '', readTime: '' })

  const load = () => {
    setLoading(true)
    api('/api/articles')
      .then(setItems)
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const reset = () => {
    setEditing(null)
    setForm({ id: '', title: '', summary: '', content: '', tags: '', date: '', readTime: '' })
  }

  const edit = (item) => {
    setEditing(item.id)
    setForm({
      id: item.id,
      title: item.title,
      summary: item.summary,
      content: item.content || '',
      tags: (item.tags || []).join(', '),
      date: item.date,
      readTime: item.readTime,
    })
  }

  const save = async () => {
    const body = {
      id: form.id,
      title: form.title,
      summary: form.summary,
      content: form.content,
      tags: form.tags.split(',').map(s => s.trim()).filter(Boolean),
      date: form.date,
      readTime: form.readTime,
    }
    if (editing) {
      await api(`/api/articles/${editing}`, { method: 'PUT', body: JSON.stringify(body) })
    } else {
      await api('/api/articles', { method: 'POST', body: JSON.stringify(body) })
    }
    reset()
    load()
  }

  const del = async (id) => {
    if (!confirm('确定删除？')) return
    await api(`/api/articles/${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">文章管理</h2>
        <button onClick={reset} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">+ 新增文章</button>
      </div>

      <div className="bg-white rounded-xl border p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input placeholder="ID（英文，唯一标识）" value={form.id} onChange={e => setForm({...form, id: e.target.value})} disabled={!!editing} className="px-3 py-2 border rounded-lg text-sm disabled:bg-gray-100" />
          <input placeholder="标题" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="px-3 py-2 border rounded-lg text-sm" />
          <input placeholder="摘要" value={form.summary} onChange={e => setForm({...form, summary: e.target.value})} className="px-3 py-2 border rounded-lg text-sm md:col-span-2" />
          <input placeholder="日期，如 2025-05-03" value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="px-3 py-2 border rounded-lg text-sm" />
          <input placeholder="阅读时间，如 8 min" value={form.readTime} onChange={e => setForm({...form, readTime: e.target.value})} className="px-3 py-2 border rounded-lg text-sm" />
          <input placeholder="标签，逗号分隔" value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} className="px-3 py-2 border rounded-lg text-sm md:col-span-2" />
          <textarea placeholder="Markdown 正文内容" value={form.content} onChange={e => setForm({...form, content: e.target.value})} rows={10} className="px-3 py-2 border rounded-lg text-sm font-mono md:col-span-2" />
        </div>
        <div className="flex gap-3 mt-4">
          <button onClick={save} className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">{editing ? '保存修改' : '创建文章'}</button>
          {editing && <button onClick={reset} className="px-5 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200">取消</button>}
        </div>
      </div>

      {loading ? <p className="text-gray-500">加载中...</p> : (
        <div className="bg-white rounded-xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-700">ID</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700">标题</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700">日期</th>
                <th className="text-right px-4 py-3 font-medium text-gray-700">操作</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-600">{item.id}</td>
                  <td className="px-4 py-3 font-medium">{item.title}</td>
                  <td className="px-4 py-3 text-gray-500">{item.date}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => edit(item)} className="text-blue-600 hover:underline mr-3">编辑</button>
                    <button onClick={() => del(item.id)} className="text-red-500 hover:underline">删除</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
