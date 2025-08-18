export type CorpusExample = { jp: string; en: string }

let cache: CorpusExample[] | null = null

export async function fetchCorpusExamples(): Promise<CorpusExample[]> {
  if (cache) return cache
  try {
    const res = await fetch('/api/corpus', { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch corpus')
    const data = await res.json()
    cache = (data.examples || []) as CorpusExample[]
    return cache
  } catch (e) {
    console.error('fetchCorpusExamples error', e)
    cache = []
    return []
  }
}

export function getRandomCorpusExample(): CorpusExample | null {
  if (!cache || cache.length === 0) return null
  const idx = Math.floor(Math.random() * cache.length)
  return cache[idx]
}

export function findCorpusExampleContaining(substring: string): CorpusExample | null {
  if (!cache || cache.length === 0) return null
  const sub = substring.trim()
  if (!sub) return null
  const matches = cache.filter(ex => ex.jp.includes(sub))
  if (matches.length === 0) return null
  // pick one deterministically-ish
  return matches[Math.floor(Math.random() * matches.length)]
}
