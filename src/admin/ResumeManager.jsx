import { useState, useEffect } from 'react'

const API_BASE = import.meta.env.VITE_API_URL || ''

export default function ResumeManager() {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch(`${API_BASE}/api/resume`)
      .then(res => res.text())
      .then(text => {
        setContent(text)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (!file.name.endsWith('.html')) {
      alert('请上传 HTML 文件')
      return
    }
    setSaving(true)
    setMessage('')
    const formData = new FormData()
    formData.append('file', file)
    try {
      const res = await fetch(`${API_BASE}/api/resume/upload`, {
        method: 'POST',
        body: formData,
      })
      if (!res.ok) throw new Error(await res.text())
      setMessage('上传成功')
      // 重新加载内容
      const textRes = await fetch(`${API_BASE}/api/resume`)
      const text = await textRes.text()
      setContent(text)
    } catch (err) {
      alert('上传失败：' + err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage('')
    try {
      const res = await fetch(`${API_BASE}/api/resume`, {
        method: 'POST',
        headers: { 'Content-Type': 'text/html' },
        body: content,
      })
      if (!res.ok) throw new Error(await res.text())
      setMessage('保存成功')
    } catch (err) {
      alert('保存失败：' + err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="text-gray-500">加载中...</p>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">简历管理</h2>
        <div className="flex gap-3">
          <label className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 cursor-pointer">
            {saving ? '上传中...' : '上传 HTML 文件'}
            <input type="file" accept=".html" onChange={handleFileUpload} className="hidden" />
          </label>
          <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 disabled:opacity-50">
            {saving ? '保存中...' : '保存修改'}
          </button>
        </div>
      </div>

      {message && (
        <div className="mb-4 px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm">
          {message}
        </div>
      )}

      <div className="bg-white rounded-xl border p-6">
        <label className="block text-xs text-gray-500 mb-1">resume.html 内容（可直接编辑）</label>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={30}
          className="w-full px-3 py-2 text-sm font-mono border rounded-lg resize-y focus:outline-none focus:border-blue-500"
          spellCheck={false}
        />
      </div>

      <div className="mt-4 text-sm text-gray-500">
        提示：直接编辑后点击"保存修改"，或从本地选择 HTML 文件上传。上传后会立即覆盖 public/resume.html。
      </div>
    </div>
  )
}
