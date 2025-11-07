const API_BASE =
  (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, "") || "";

export function apiUrl(path: string) {
  return API_BASE ? `${API_BASE}${path}` : path;
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(apiUrl(path));
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<T>;
}

export function resolveMedia(url: string) {
  if (!url) return url;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return API_BASE ? `${API_BASE}${url}` : url;
}