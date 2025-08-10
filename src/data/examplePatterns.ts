import { ConjugationType } from '@/types/verb'

// Lightweight, configurable pattern library per conjugation type.
// These are not per-verb hardcodes; they are generic frames that can be extended.
// jp: Japanese fragment templates. en: English translation fragments.
// Placeholders: {verb} is the conjugated verb form.
export const examplePatternLibrary: Record<ConjugationType, { jp: string[]; en: string[] }> = {
  dictionary: {
    jp: [
      '私は{verb}のが好きだ。',
      '{verb}のは大切だ。',
      'みんなはよく{verb}。'
    ],
    en: [
      'I like to {verb}.',
      'It is important to {verb}.',
      'People often {verb}.'
    ]
  },
  masu: {
    jp: [
      '私はよく{verb}。',
      '今、{verb}。',
      '毎日、学校で{verb}。'
    ],
    en: [
      'I often {verb}.',
      'I am now {verb}.',
      'Every day at school, I {verb}.'
    ]
  },
  masu_past: {
    jp: [
      '昨日、{verb}。',
      'さっき{verb}。',
      '先週、友達と{verb}。'
    ],
    en: [
      'Yesterday, I {verb}.',
      'I just {verb}.',
      'Last week, I {verb} with a friend.'
    ]
  },
  ta: {
    jp: [
      'もう{verb}。',
      'さっき{verb}。'
    ],
    en: [
      'I have already {verb}.',
      'I just {verb}.'
    ]
  },
  te: {
    jp: [
      '{verb}、映画を見た。',
      '{verb}から、休みます。'
    ],
    en: [
      'After {verb}, I watched a movie.',
      'Because I {verb}, I will take a break.'
    ]
  },
  nai: {
    jp: [
      '今日は{verb}。',
      '全然{verb}。'
    ],
    en: [
      'I do not {verb} today.',
      'I do not {verb} at all.'
    ]
  },
  nai_past: {
    jp: [
      '昨日は{verb}。',
      '前はよくしたが、今回は{verb}。'
    ],
    en: [
      'I did not {verb} yesterday.',
      'I used to do it, but this time I did not {verb}.'
    ]
  },
  te_iru: {
    jp: [
      '今、{verb}。',
      '毎朝、駅で{verb}。'
    ],
    en: [
      'I am {verb} now.',
      'Every morning at the station, I am {verb}.'
    ]
  },
  potential: {
    jp: [
      '私は上手に{verb}。',
      '練習すれば、もっと{verb}。'
    ],
    en: [
      'I can {verb} well.',
      'If I practice, I can {verb} more.'
    ]
  },
  volitional: {
    jp: [
      '一緒に{verb}！',
      '明日、早く{verb}。'
    ],
    en: [
      'Let’s {verb} together!',
      'Tomorrow, let’s {verb} early.'
    ]
  },
  passive: {
    jp: [
      '先生に{verb}。',
      '友達に{verb}ことになった。'
    ],
    en: [
      'I was {verb} by the teacher.',
      'I ended up being {verb} by a friend.'
    ]
  },
  causative: {
    jp: [
      '先生は学生に{verb}。',
      '母に{verb}られた。'
    ],
    en: [
      'The teacher makes the students {verb}.',
      'My mother made me {verb}.'
    ]
  },
  causative_passive: {
    jp: [
      '上司に{verb}。',
      '無理やり{verb}。'
    ],
    en: [
      'I was made to {verb} by my boss.',
      'I was forced to {verb}.'
    ]
  },
  imperative: {
    jp: [
      '早く{verb}！',
      '今すぐ{verb}！'
    ],
    en: [
      'Do it quickly!',
      'Do it right now!'
    ]
  },
  prohibitive: {
    jp: [
      '{verb}！',
      '絶対に{verb}！'
    ],
    en: [
      'Do not do it!',
      'Absolutely do not do it!'
    ]
  },
  conditional_tara: {
    jp: [
      '{verb}、連絡してください。',
      '{verb}ら、帰ります。'
    ],
    en: [
      'If/when you {verb}, please contact me.',
      'If I {verb}, I will go home.'
    ]
  },
  conditional_ba: {
    jp: [
      '{verb}、うれしい。',
      '{verb}ほど、上手になる。'
    ],
    en: [
      'If I {verb}, I am happy.',
      'The more I {verb}, the better I become.'
    ]
  },
  conjectural: {
    jp: [
      'たぶん{verb}。',
      '明日は{verb}と思う。'
    ],
    en: [
      'It will probably {verb}.',
      'I think it will {verb} tomorrow.'
    ]
  },
  desire: {
    jp: [
      '今日は{verb}。',
      '今すぐ{verb}。'
    ],
    en: [
      'I want to {verb} today.',
      'I want to {verb} right now.'
    ]
  },
  ease_yasui: {
    jp: [
      'この方法はとても{verb}。',
      '初心者でも{verb}。'
    ],
    en: [
      'This method is very easy to {verb}.',
      'Even beginners can easily {verb}.'
    ]
  },
  ease_nikui: {
    jp: [
      'この問題は{verb}。',
      '状況によっては{verb}。'
    ],
    en: [
      'This problem is hard to {verb}.',
      'Depending on the situation, it is difficult to {verb}.'
    ]
  },
}
