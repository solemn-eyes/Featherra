const configuredBase = import.meta.env.VITE_API_BASE_URL

/** API origin. Empty string = same host (production behind Django). */
export const API_BASE =
  configuredBase !== undefined
    ? String(configuredBase).replace(/\/$/, '')
    : 'http://127.0.0.1:8000'

export function apiUrl(path) {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${API_BASE}${normalized}`
}
