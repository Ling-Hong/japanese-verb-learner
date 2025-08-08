import { Verb, VerbType, ConjugationType } from '@/types/verb'

// Sample verb data
const verbs: Verb[] = [
  { dictionary: '食べる', meaning: 'to eat', type: 'ichidan' },
  { dictionary: '見る', meaning: 'to see', type: 'ichidan' },
  { dictionary: '行く', meaning: 'to go', type: 'godan' },
  { dictionary: '話す', meaning: 'to speak', type: 'godan' },
  { dictionary: '書く', meaning: 'to write', type: 'godan' },
  { dictionary: '読む', meaning: 'to read', type: 'godan' },
  { dictionary: '飲む', meaning: 'to drink', type: 'godan' },
  { dictionary: 'する', meaning: 'to do', type: 'irregular' },
  { dictionary: '来る', meaning: 'to come', type: 'irregular' },
  { dictionary: '寝る', meaning: 'to sleep', type: 'ichidan' },
  { dictionary: '起きる', meaning: 'to wake up', type: 'ichidan' },
  { dictionary: '聞く', meaning: 'to listen', type: 'godan' },
  { dictionary: '買う', meaning: 'to buy', type: 'godan' },
  { dictionary: '売る', meaning: 'to sell', type: 'godan' },
  { dictionary: '作る', meaning: 'to make', type: 'godan' },
]

// Conjugation rules
const conjugationRules = {
  ichidan: {
    masu: (verb: string) => verb.replace('る', 'ます'),
    te: (verb: string) => verb.replace('る', 'て'),
    ta: (verb: string) => verb.replace('る', 'た'),
    nai: (verb: string) => verb.replace('る', 'ない'),
  },
  godan: {
    masu: (verb: string) => {
      const lastChar = verb.slice(-1)
      const stem = verb.slice(0, -1)
      const masuEndings: { [key: string]: string } = {
        'う': 'います',
        'く': 'きます',
        'ぐ': 'ぎます',
        'す': 'します',
        'つ': 'ちます',
        'ぬ': 'にます',
        'ぶ': 'びます',
        'む': 'みます',
        'る': 'ります',
      }
      return stem + (masuEndings[lastChar] || 'います')
    },
    te: (verb: string) => {
      const lastChar = verb.slice(-1)
      const stem = verb.slice(0, -1)
      const teEndings: { [key: string]: string } = {
        'う': 'って',
        'く': 'いて',
        'ぐ': 'いで',
        'す': 'して',
        'つ': 'って',
        'ぬ': 'んで',
        'ぶ': 'んで',
        'む': 'んで',
        'る': 'って',
      }
      return stem + (teEndings[lastChar] || 'って')
    },
    ta: (verb: string) => {
      const lastChar = verb.slice(-1)
      const stem = verb.slice(0, -1)
      const taEndings: { [key: string]: string } = {
        'う': 'った',
        'く': 'いた',
        'ぐ': 'いだ',
        'す': 'した',
        'つ': 'った',
        'ぬ': 'んだ',
        'ぶ': 'んだ',
        'む': 'んだ',
        'る': 'った',
      }
      return stem + (taEndings[lastChar] || 'った')
    },
    nai: (verb: string) => {
      const lastChar = verb.slice(-1)
      const stem = verb.slice(0, -1)
      const naiEndings: { [key: string]: string } = {
        'う': 'わない',
        'く': 'かない',
        'ぐ': 'がない',
        'す': 'さない',
        'つ': 'たない',
        'ぬ': 'なない',
        'ぶ': 'ばない',
        'む': 'まない',
        'る': 'らない',
      }
      return stem + (naiEndings[lastChar] || 'わない')
    },
  },
  irregular: {
    masu: (verb: string) => {
      if (verb === 'する') return 'します'
      if (verb === '来る') return '来ます'
      return verb + 'ます'
    },
    te: (verb: string) => {
      if (verb === 'する') return 'して'
      if (verb === '来る') return '来て'
      return verb + 'て'
    },
    ta: (verb: string) => {
      if (verb === 'する') return 'した'
      if (verb === '来る') return '来た'
      return verb + 'た'
    },
    nai: (verb: string) => {
      if (verb === 'する') return 'しない'
      if (verb === '来る') return '来ない'
      return verb + 'ない'
    },
  },
}

export function getRandomVerb(): Verb {
  const randomIndex = Math.floor(Math.random() * verbs.length)
  return verbs[randomIndex]
}

export function conjugateVerb(verb: Verb, conjugationType: ConjugationType): string {
  const rule = conjugationRules[verb.type]
  if (!rule) {
    throw new Error(`Unknown verb type: ${verb.type}`)
  }
  
  const conjugationFunction = rule[conjugationType]
  if (!conjugationFunction) {
    throw new Error(`Unknown conjugation type: ${conjugationType}`)
  }
  
  return conjugationFunction(verb.dictionary)
}

export function getAllVerbs(): Verb[] {
  return [...verbs]
}

export function getVerbsByType(type: VerbType): Verb[] {
  return verbs.filter(verb => verb.type === type)
} 