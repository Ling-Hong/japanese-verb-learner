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
  { dictionary: '勉強する', meaning: 'to study', type: 'irregular' },
  { dictionary: '働く', meaning: 'to work', type: 'godan' },
  { dictionary: '遊ぶ', meaning: 'to play', type: 'godan' },
  { dictionary: '洗う', meaning: 'to wash', type: 'godan' },
  { dictionary: '掃除する', meaning: 'to clean', type: 'irregular' },
]

// Comprehensive conjugation rules
const conjugationRules = {
  ichidan: {
    dictionary: (verb: string) => verb,
    masu: (verb: string) => verb.replace('る', 'ます'),
    masu_past: (verb: string) => verb.replace('る', 'ました'),
    ta: (verb: string) => verb.replace('る', 'た'),
    te: (verb: string) => verb.replace('る', 'て'),
    nai: (verb: string) => verb.replace('る', 'ない'),
    nai_past: (verb: string) => verb.replace('る', 'なかった'),
    te_iru: (verb: string) => verb.replace('る', 'ている'),
    potential: (verb: string) => verb.replace('る', 'られる'),
    volitional: (verb: string) => verb.replace('る', 'よう'),
    passive: (verb: string) => verb.replace('る', 'られる'),
    causative: (verb: string) => verb.replace('る', 'させる'),
    causative_passive: (verb: string) => verb.replace('る', 'させられる'),
    imperative: (verb: string) => verb.replace('る', 'ろ'),
    prohibitive: (verb: string) => verb.replace('る', 'るな'),
    conditional_tara: (verb: string) => verb.replace('る', 'たら'),
    conditional_ba: (verb: string) => verb.replace('る', 'れば'),
    conjectural: (verb: string) => verb.replace('る', 'るだろう'),
    desire: (verb: string) => verb.replace('る', 'たい'),
    ease_yasui: (verb: string) => verb.replace('る', 'やすい'),
    ease_nikui: (verb: string) => verb.replace('る', 'にくい'),
  },
  godan: {
    dictionary: (verb: string) => verb,
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
    masu_past: (verb: string) => {
      const lastChar = verb.slice(-1)
      const stem = verb.slice(0, -1)
      const masuPastEndings: { [key: string]: string } = {
        'う': 'いました',
        'く': 'きました',
        'ぐ': 'ぎました',
        'す': 'しました',
        'つ': 'ちました',
        'ぬ': 'にました',
        'ぶ': 'びました',
        'む': 'みました',
        'る': 'りました',
      }
      return stem + (masuPastEndings[lastChar] || 'いました')
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
    nai_past: (verb: string) => {
      const lastChar = verb.slice(-1)
      const stem = verb.slice(0, -1)
      const naiPastEndings: { [key: string]: string } = {
        'う': 'わなかった',
        'く': 'かなかった',
        'ぐ': 'がなかった',
        'す': 'さなかった',
        'つ': 'たなかった',
        'ぬ': 'ななかった',
        'ぶ': 'ばなかった',
        'む': 'まなかった',
        'る': 'らなかった',
      }
      return stem + (naiPastEndings[lastChar] || 'わなかった')
    },
    te_iru: (verb: string) => {
      const teForm = conjugationRules.godan.te(verb)
      return teForm + 'いる'
    },
    potential: (verb: string) => {
      const lastChar = verb.slice(-1)
      const stem = verb.slice(0, -1)
      const potentialEndings: { [key: string]: string } = {
        'う': 'える',
        'く': 'ける',
        'ぐ': 'げる',
        'す': 'せる',
        'つ': 'てる',
        'ぬ': 'ねる',
        'ぶ': 'べる',
        'む': 'める',
        'る': 'れる',
      }
      return stem + (potentialEndings[lastChar] || 'える')
    },
    volitional: (verb: string) => {
      const lastChar = verb.slice(-1)
      const stem = verb.slice(0, -1)
      const volitionalEndings: { [key: string]: string } = {
        'う': 'おう',
        'く': 'こう',
        'ぐ': 'ごう',
        'す': 'そう',
        'つ': 'とう',
        'ぬ': 'のう',
        'ぶ': 'ぼう',
        'む': 'もう',
        'る': 'ろう',
      }
      return stem + (volitionalEndings[lastChar] || 'おう')
    },
    passive: (verb: string) => {
      const lastChar = verb.slice(-1)
      const stem = verb.slice(0, -1)
      const passiveEndings: { [key: string]: string } = {
        'う': 'われる',
        'く': 'かれる',
        'ぐ': 'がれる',
        'す': 'される',
        'つ': 'たれる',
        'ぬ': 'なれる',
        'ぶ': 'ばれる',
        'む': 'まれる',
        'る': 'られる',
      }
      return stem + (passiveEndings[lastChar] || 'われる')
    },
    causative: (verb: string) => {
      const lastChar = verb.slice(-1)
      const stem = verb.slice(0, -1)
      const causativeEndings: { [key: string]: string } = {
        'う': 'わせる',
        'く': 'かせる',
        'ぐ': 'がせる',
        'す': 'させる',
        'つ': 'たせる',
        'ぬ': 'なせる',
        'ぶ': 'ばせる',
        'む': 'ませる',
        'る': 'らせる',
      }
      return stem + (causativeEndings[lastChar] || 'わせる')
    },
    causative_passive: (verb: string) => {
      const causativeForm = conjugationRules.godan.causative(verb)
      return causativeForm.replace('せる', 'される')
    },
    imperative: (verb: string) => {
      const lastChar = verb.slice(-1)
      const stem = verb.slice(0, -1)
      const imperativeEndings: { [key: string]: string } = {
        'う': 'え',
        'く': 'け',
        'ぐ': 'げ',
        'す': 'せ',
        'つ': 'て',
        'ぬ': 'ね',
        'ぶ': 'べ',
        'む': 'め',
        'る': 'れ',
      }
      return stem + (imperativeEndings[lastChar] || 'え')
    },
    prohibitive: (verb: string) => verb + 'な',
    conditional_tara: (verb: string) => {
      const taForm = conjugationRules.godan.ta(verb)
      return taForm + 'ら'
    },
    conditional_ba: (verb: string) => {
      const lastChar = verb.slice(-1)
      const stem = verb.slice(0, -1)
      const baEndings: { [key: string]: string } = {
        'う': 'えば',
        'く': 'けば',
        'ぐ': 'げば',
        'す': 'せば',
        'つ': 'てば',
        'ぬ': 'ねば',
        'ぶ': 'べば',
        'む': 'めば',
        'る': 'れば',
      }
      return stem + (baEndings[lastChar] || 'えば')
    },
    conjectural: (verb: string) => verb + 'だろう',
    desire: (verb: string) => {
      const masuForm = conjugationRules.godan.masu(verb)
      return masuForm.replace('ます', 'たい')
    },
    ease_yasui: (verb: string) => {
      const masuForm = conjugationRules.godan.masu(verb)
      return masuForm.replace('ます', 'やすい')
    },
    ease_nikui: (verb: string) => {
      const masuForm = conjugationRules.godan.masu(verb)
      return masuForm.replace('ます', 'にくい')
    },
  },
  irregular: {
    dictionary: (verb: string) => verb,
    masu: (verb: string) => {
      if (verb === 'する') return 'します'
      if (verb === '来る') return '来ます'
      return verb + 'ます'
    },
    masu_past: (verb: string) => {
      if (verb === 'する') return 'しました'
      if (verb === '来る') return '来ました'
      return verb + 'ました'
    },
    ta: (verb: string) => {
      if (verb === 'する') return 'した'
      if (verb === '来る') return '来た'
      return verb + 'た'
    },
    te: (verb: string) => {
      if (verb === 'する') return 'して'
      if (verb === '来る') return '来て'
      return verb + 'て'
    },
    nai: (verb: string) => {
      if (verb === 'する') return 'しない'
      if (verb === '来る') return '来ない'
      return verb + 'ない'
    },
    nai_past: (verb: string) => {
      if (verb === 'する') return 'しなかった'
      if (verb === '来る') return '来なかった'
      return verb + 'なかった'
    },
    te_iru: (verb: string) => {
      const teForm = conjugationRules.irregular.te(verb)
      return teForm + 'いる'
    },
    potential: (verb: string) => {
      if (verb === 'する') return 'できる'
      if (verb === '来る') return '来られる'
      return verb + 'られる'
    },
    volitional: (verb: string) => {
      if (verb === 'する') return 'しよう'
      if (verb === '来る') return '来よう'
      return verb + 'よう'
    },
    passive: (verb: string) => {
      if (verb === 'する') return 'される'
      if (verb === '来る') return '来られる'
      return verb + 'られる'
    },
    causative: (verb: string) => {
      if (verb === 'する') return 'させる'
      if (verb === '来る') return '来させる'
      return verb + 'させる'
    },
    causative_passive: (verb: string) => {
      if (verb === 'する') return 'させられる'
      if (verb === '来る') return '来させられる'
      return verb + 'させられる'
    },
    imperative: (verb: string) => {
      if (verb === 'する') return 'しろ'
      if (verb === '来る') return '来い'
      return verb + 'ろ'
    },
    prohibitive: (verb: string) => verb + 'な',
    conditional_tara: (verb: string) => {
      const taForm = conjugationRules.irregular.ta(verb)
      return taForm + 'ら'
    },
    conditional_ba: (verb: string) => {
      if (verb === 'する') return 'すれば'
      if (verb === '来る') return '来れば'
      return verb + 'れば'
    },
    conjectural: (verb: string) => verb + 'だろう',
    desire: (verb: string) => {
      const masuForm = conjugationRules.irregular.masu(verb)
      return masuForm.replace('ます', 'たい')
    },
    ease_yasui: (verb: string) => {
      const masuForm = conjugationRules.irregular.masu(verb)
      return masuForm.replace('ます', 'やすい')
    },
    ease_nikui: (verb: string) => {
      const masuForm = conjugationRules.irregular.masu(verb)
      return masuForm.replace('ます', 'にくい')
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

export function getConjugationDisplayName(conjugationType: ConjugationType): string {
  const displayNames: { [key in ConjugationType]: string } = {
    dictionary: '基本形 (Dictionary)',
    masu: 'ます形 (Polite Present)',
    masu_past: 'ました (Polite Past)',
    ta: 'た形 (Plain Past)',
    te: 'て形 (Te-form)',
    nai: 'ない形 (Negative Present)',
    nai_past: 'なかった (Negative Past)',
    te_iru: '〜ている (Progressive)',
    potential: '可能形 (Potential)',
    volitional: '意向形 (Volitional)',
    passive: '受け身形 (Passive)',
    causative: '使役形 (Causative)',
    causative_passive: '使役受け身形 (Causative-Passive)',
    imperative: '命令形 (Imperative)',
    prohibitive: '〜な (Prohibitive)',
    conditional_tara: '〜たら (Conditional)',
    conditional_ba: '〜ば (Conditional)',
    conjectural: '〜だろう (Conjectural)',
    desire: '〜たい (Desire)',
    ease_yasui: '〜やすい (Easy)',
    ease_nikui: '〜にくい (Difficult)',
  }
  return displayNames[conjugationType]
} 