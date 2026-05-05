import { useState, useEffect, useRef, useCallback } from 'react'
import { uploadImage, handlePasteImage, handleDropImage } from './useImageUpload.js'

const API_BASE = import.meta.env.VITE_API_URL || ''

async function api(url, opts = {}) {
  const res = await fetch(`${API_BASE}${url}`, { headers: { 'Content-Type': 'application/json' }, ...opts })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export default function ProjectManager() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ id: '', title: '', description: '', image: '/project.jpg', tags: '', techIcons: '', github: '', highlights: '' })
  const [uploadingField, setUploadingField] = useState(null)
  const [dragOverField, setDragOverField] = useState(null)
  const imageInputRef = useRef(null)

  const load = () => {
    setLoading(true)
    api('/api/projects')
      .then(setItems)
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const reset = () => {
    setEditing(null)
    setForm({ id: '', title: '', description: '', image: '/project.jpg', tags: '', techIcons: '', github: '', highlights: '' })
  }

  const edit = (item) => {
    setEditing(item.id)
    setForm({
      id: item.id,
      title: item.title,
      description: item.description,
      image: item.image || '/project.jpg',
      tags: (item.tags || []).join(', '),
      techIcons: (item.techIcons || []).join(', '),
      github: item.github || '',
      highlights: (item.highlights || []).join('\n'),
    })
  }

  const save = async () => {
    const body = {
      id: form.id,
      title: form.title,
      description: form.description,
      image: form.image,
      tags: form.tags.split(',').map(s => s.trim()).filter(Boolean),
      techIcons: form.techIcons.split(',').map(s => s.trim()).filter(Boolean),
      github: form.github,
      highlights: form.highlights.split('\n').map(s => s.trim()).filter(Boolean),
    }
    if (editing) {
      await api(`/api/projects/${editing}`, { method: 'PUT', body: JSON.stringify(body) })
    } else {
      await api('/api/projects', { method: 'POST', body: JSON.stringify(body) })
    }
    reset()
    load()
  }

  const del = async (id) => {
    if (!confirm('确定删除？')) return
    await api(`/api/projects/${id}`, { method: 'DELETE' })
    load()
  }

  const doUpload = useCallback(async (file, field) => {
    setUploadingField(field)
    try {
      const url = await uploadImage(file)
      setForm(prev => ({ ...prev, [field]: url }))
    } catch (err) {
      alert('上传失败：' + err.message)
    } finally {
      setUploadingField(null)
    }
  }, [])

  const onPasteField = (e, field) => {
    const handled = handlePasteImage(e, (file) => doUpload(file, field))
    if (handled) {
      e.preventDefault()
    }
  }

  const onDropField = (e, field) => {
    setDragOverField(null)
    const handled = handleDropImage(e, (file) => doUpload(file, field))
    if (handled) {
      e.preventDefault()
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">项目管理</h2>
        <button onClick={reset} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">+ 新增项目</button>
      </div>

      <div className="bg-white rounded-xl border p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input placeholder="ID（英文，唯一标识）" value={form.id} onChange={e => setForm({...form, id: e.target.value})} disabled={!!editing} className="px-3 py-2 border rounded-lg text-sm disabled:bg-gray-100" />
          <input placeholder="标题" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="px-3 py-2 border rounded-lg text-sm" />
          <input placeholder="描述" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="px-3 py-2 border rounded-lg text-sm md:col-span-2" />

          <div
            className={`relative md:col-span-2 border rounded-lg px-3 py-2 transition-colors ${dragOverField === 'image' ? 'border-blue-500 bg-blue-50' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setDragOverField('image') }}
            onDragLeave={() => setDragOverField(null)}
            onDrop={(e) => onDropField(e, 'image')}
          >
            <label className="block text-xs text-gray-500 mb-1">封面图路径（支持粘贴 / 拖拽上传图片）</label>
            <input
              ref={imageInputRef}
              placeholder="封面图路径，如 /project.jpg 或粘贴图片"
              value={form.image}
              onChange={e => setForm({...form, image: e.target.value})}
              onPaste={(e) => onPasteField(e, 'image')}
              className="w-full text-sm bg-transparent outline-none"
            />
            {uploadingField === 'image' && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-blue-600">上传中...</span>
            )}
          </div>

          <input placeholder="GitHub 地址" value={form.github} onChange={e => setForm({...form, github: e.target.value})} className="px-3 py-2 border rounded-lg text-sm" />
          <input placeholder="标签，逗号分隔，如 React, Node.js" value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} className="px-3 py-2 border rounded-lg text-sm" />
          <input placeholder="技术图标，逗号分隔" value={form.techIcons} onChange={e => setForm({...form, techIcons: e.target.value})} className="px-3 py-2 border rounded-lg text-sm" />
          <textarea placeholder="亮点，每行一个" value={form.highlights} onChange={e => setForm({...form, highlights: e.target.value})} rows={3} className="px-3 py-2 border rounded-lg text-sm md:col-span-2" />
        </div>
        <div className="flex gap-3 mt-4">
          <button onClick={save} className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">{editing ? '保存修改' : '创建项目'}</button>
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
                <th className="text-left px-4 py-3 font-medium text-gray-700">标签</th>
                <th className="text-right px-4 py-3 font-medium text-gray-700">操作</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-600">{item.id}</td>
                  <td className="px-4 py-3 font-medium">{item.title}</td>
                  <td className="px-4 py-3 text-gray-500">{(item.tags || []).join(', ')}</td>
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
