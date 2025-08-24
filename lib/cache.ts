const cache = new Map<string, { data: unknown; expires: number }>();

export function setCache(key: string, data: unknown, ttl = 600_000) {
  cache.set(key, { data, expires: Date.now() + ttl });
}

export function getCache<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expires) {
    cache.delete(key);
    return null;
  }
  return entry.data as T;
}
