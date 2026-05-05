const API_BASE = import.meta.env.VITE_API_URL || ''

export async function uploadImage(file) {
  const formData = new FormData()
  formData.append('file', file)
  const res = await fetch(`${API_BASE}/api/upload`, {
    method: 'POST',
    body: formData,
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(err || `HTTP ${res.status}`)
  }
  const data = await res.json()
  return data.url
}

export function insertAtCursor(textarea, text) {
  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const value = textarea.value
  const before = value.substring(0, start)
  const after = value.substring(end)
  textarea.value = before + text + after
  textarea.selectionStart = textarea.selectionEnd = start + text.length
  textarea.focus()
}

export function handlePasteImage(event, callback) {
  const items = event.clipboardData?.items
  if (!items) return false
  let handled = false
  for (const item of items) {
    if (item.type.startsWith('image/')) {
      const file = item.getAsFile()
      if (file) {
        handled = true
        callback(file)
      }
    }
  }
  return handled
}

export function handleDropImage(event, callback) {
  event.preventDefault()
  const files = event.dataTransfer?.files
  if (!files) return false
  let handled = false
  for (const file of files) {
    if (file.type.startsWith('image/')) {
      handled = true
      callback(file)
    }
  }
  return handled
}
