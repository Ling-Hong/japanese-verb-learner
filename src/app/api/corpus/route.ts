import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export type CorpusExample = { jp: string; en: string }

export const runtime = 'nodejs'

export async function GET() {
  try {
    const csvPath = path.join(process.cwd(), 'src', 'data', 'verb-lists', 'corpus.csv')
    const raw = fs.readFileSync(csvPath, 'utf8')

    const lines = raw.split(/\r?\n/).filter(l => l.trim().length > 0)
    // Drop header if present
    const dataLines = lines[0].toLowerCase().startsWith('japanese') ? lines.slice(1) : lines

    const examples: CorpusExample[] = []
    for (const line of dataLines) {
      const idx = line.indexOf(',')
      if (idx === -1) continue
      const jp = line.slice(0, idx).trim()
      const en = line.slice(idx + 1).trim()
      if (jp && en) examples.push({ jp, en })
    }

    return NextResponse.json({ examples })
  } catch (e) {
    console.error('Failed to load corpus.csv', e)
    return NextResponse.json({ examples: [] as CorpusExample[] }, { status: 200 })
  }
}
