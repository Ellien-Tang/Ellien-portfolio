import { useState } from 'react'

const ADMIN_KEY = 'portfolio-admin-auth'
const ADMIN_PWD = 'admin123'

export function isAdmin() {
  return localStorage.getItem(ADMIN_KEY) === '1'
}

export default function Login({ onLogin }) {
  const [pwd, setPwd] = useState('')
  const [err, setErr] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (pwd === ADMIN_PWD) {
      localStorage.setItem(ADMIN_KEY, '1')
      onLogin()
    } else {
      setErr('密码错误')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={submit} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">后台管理</h1>
        <input
          type="password"
          placeholder="输入密码"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none mb-4"
        />
        {err && <p className="text-red-500 text-sm mb-4">{err}</p>}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
        >
          进入
        </button>
      </form>
    </div>
  )
}
