import { Verb, VerbType } from '@/types/verb'

// Master verb list with 100+ common Japanese verbs
export const masterVerbList: Verb[] = 
[
  { dictionary: '従う', reading: 'したがう', meaning: 'to obey; to follow', type: 'godan', difficultyLevel: 'hard' },
  { dictionary: '蓄える', reading: 'たくわえる', meaning: 'to store; to save up', type: 'ichidan', difficultyLevel: 'hard' },
  { dictionary: '避ける', reading: 'さける', meaning: 'to avoid', type: 'ichidan', difficultyLevel: 'hard' },
  { dictionary: '兼ねる', reading: 'かねる', meaning: 'to serve two roles; to hesitate to', type: 'ichidan', difficultyLevel: 'hard' },
  { dictionary: '促す', reading: 'うながす', meaning: 'to urge; to encourage', type: 'godan', difficultyLevel: 'hard' },
  { dictionary: '遂げる', reading: 'とげる', meaning: 'to accomplish; to achieve', type: 'ichidan', difficultyLevel: 'hard' },
  { dictionary: '募る', reading: 'つのる', meaning: 'to recruit; to grow in intensity', type: 'godan', difficultyLevel: 'hard' },
  { dictionary: '至る', reading: 'いたる', meaning: 'to reach; to lead to', type: 'godan', difficultyLevel: 'hard' },
  { dictionary: '伴う', reading: 'ともなう', meaning: 'to accompany; to involve', type: 'godan', difficultyLevel: 'hard' },
  { dictionary: '図る', reading: 'はかる', meaning: 'to plan; to attempt', type: 'godan', difficultyLevel: 'hard' },
  { dictionary: '損なう', reading: 'そこなう', meaning: 'to harm; to spoil', type: 'godan', difficultyLevel: 'hard' },
  { dictionary: '試みる', reading: 'こころみる', meaning: 'to attempt; to try', type: 'ichidan', difficultyLevel: 'hard' },
  { dictionary: '誓う', reading: 'ちかう', meaning: 'to swear; to vow', type: 'godan', difficultyLevel: 'hard' },
  { dictionary: '恵まれる', reading: 'めぐまれる', meaning: 'to be blessed with', type: 'ichidan', difficultyLevel: 'hard' },
  { dictionary: '拒む', reading: 'こばむ', meaning: 'to refuse', type: 'godan', difficultyLevel: 'hard' },
  { dictionary: '妨げる', reading: 'さまたげる', meaning: 'to hinder; to obstruct', type: 'ichidan', difficultyLevel: 'hard' },
  { dictionary: '催す', reading: 'もよおす', meaning: 'to hold (an event); to feel', type: 'godan', difficultyLevel: 'hard' },
  { dictionary: '称する', reading: 'しょうする', meaning: 'to call oneself; to pretend', type: 'irregular', difficultyLevel: 'hard' },
  { dictionary: '控える', reading: 'ひかえる', meaning: 'to refrain; to hold back', type: 'ichidan', difficultyLevel: 'hard' },
  { dictionary: '耐える', reading: 'たえる', meaning: 'to endure', type: 'ichidan', difficultyLevel: 'hard' },
  { dictionary: '仕える', reading: 'つかえる', meaning: 'to serve', type: 'ichidan', difficultyLevel: 'hard' },
  { dictionary: '栄える', reading: 'さかえる', meaning: 'to prosper', type: 'ichidan', difficultyLevel: 'hard' },
  { dictionary: '脅かす', reading: 'おびやかす', meaning: 'to threaten; to intimidate', type: 'godan', difficultyLevel: 'hard' },
  { dictionary: '及ぼす', reading: 'およぼす', meaning: 'to exert (influence); to cause', type: 'godan', difficultyLevel: 'hard' },
  { dictionary: '免れる', reading: 'まぬかれる', meaning: 'to escape; to avoid', type: 'ichidan', difficultyLevel: 'hard' },
  { dictionary: '滅びる', reading: 'ほろびる', meaning: 'to perish; to be ruined', type: 'ichidan', difficultyLevel: 'hard' },
  { dictionary: '迫る', reading: 'せまる', meaning: 'to approach; to press for', type: 'godan', difficultyLevel: 'hard' },
  { dictionary: '崩れる', reading: 'くずれる', meaning: 'to collapse; to crumble', type: 'ichidan', difficultyLevel: 'hard' },
  { dictionary: '覆う', reading: 'おおう', meaning: 'to cover; to conceal', type: 'godan', difficultyLevel: 'hard' },
  { dictionary: '侵す', reading: 'おかす', meaning: 'to invade; to violate', type: 'godan', difficultyLevel: 'hard' },
  { dictionary: '控える', reading: 'ひかえる', meaning: 'to refrain; to reserve', type: 'ichidan', difficultyLevel: 'hard' },
  { dictionary: '訴える', reading: 'うったえる', meaning: 'to sue; to appeal', type: 'ichidan', difficultyLevel: 'hard' },
  { dictionary: '促す', reading: 'うながす', meaning: 'to prompt; to stimulate', type: 'godan', difficultyLevel: 'hard' },
  { dictionary: '導く', reading: 'みちびく', meaning: 'to guide; to lead', type: 'godan', difficultyLevel: 'hard' },
  { dictionary: '携わる', reading: 'たずさわる', meaning: 'to engage in; to be involved in', type: 'godan', difficultyLevel: 'hard' },
  { dictionary: '照らす', reading: 'てらす', meaning: 'to shine on; to illuminate', type: 'godan', difficultyLevel: 'hard' },
  { dictionary: '踏まえる', reading: 'ふまえる', meaning: 'to take into account; to base on', type: 'ichidan', difficultyLevel: 'hard' },
  { dictionary: '屈する', reading: 'くっする', meaning: 'to yield; to give in', type: 'irregular', difficultyLevel: 'hard' },
  { dictionary: '遂げる', reading: 'とげる', meaning: 'to carry out; to accomplish', type: 'ichidan', difficultyLevel: 'hard' },
  { dictionary: '挑む', reading: 'いどむ', meaning: 'to challenge; to attempt', type: 'godan', difficultyLevel: 'hard' },
  { dictionary: '遮る', reading: 'さえぎる', meaning: 'to interrupt; to obstruct', type: 'godan', difficultyLevel: 'hard' },
  { dictionary: '顧みる', reading: 'かえりみる', meaning: 'to look back; to reflect', type: 'ichidan', difficultyLevel: 'hard' },
  { dictionary: '催促する', reading: 'さいそくする', meaning: 'to urge; to press', type: 'irregular', difficultyLevel: 'hard' },
  { dictionary: '駆使する', reading: 'くしする', meaning: 'to make full use of', type: 'irregular', difficultyLevel: 'hard' },
  { dictionary: '誇る', reading: 'ほこる', meaning: 'to boast; to be proud of', type: 'godan', difficultyLevel: 'hard' },
  { dictionary: '貫く', reading: 'つらぬく', meaning: 'to pierce; to carry out', type: 'godan', difficultyLevel: 'hard' },
  { dictionary: '悟る', reading: 'さとる', meaning: 'to realize; to understand deeply', type: 'godan', difficultyLevel: 'hard' },
  { dictionary: '減る', reading: 'へる', meaning: 'to decrease', type: 'godan', difficultyLevel: 'hard' },
  { dictionary: '述べる', reading: 'のべる', meaning: 'to state; to mention', type: 'ichidan', difficultyLevel: 'hard' },
  { dictionary: '承知する', reading: 'しょうちする', meaning: 'to consent; to be aware', type: 'irregular', difficultyLevel: 'hard' },
  { dictionary: '応じる', reading: 'おうじる', meaning: 'to respond; to comply', type: 'ichidan', difficultyLevel: 'hard' },
  { dictionary: '改善する', reading: 'かいぜんする', meaning: 'to improve', type: 'irregular', difficultyLevel: 'hard' },
  { dictionary: '妥当する', reading: 'だとうする', meaning: 'to be appropriate', type: 'irregular', difficultyLevel: 'hard' },
  { dictionary: '維持する', reading: 'いじする', meaning: 'to maintain; to preserve', type: 'irregular', difficultyLevel: 'hard' },
  { dictionary: '企てる', reading: 'くわだてる', meaning: 'to plan; to scheme', type: 'ichidan', difficultyLevel: 'hard' },
  { dictionary: '扱う', reading: 'あつかう', meaning: 'to handle; to deal with', type: 'godan', difficultyLevel: 'hard' },
  { dictionary: '採用する', reading: 'さいようする', meaning: 'to employ; to adopt', type: 'irregular', difficultyLevel: 'hard' },
  { dictionary: '推進する', reading: 'すいしんする', meaning: 'to promote; to propel', type: 'irregular', difficultyLevel: 'hard' },
  { dictionary: '設ける', reading: 'もうける', meaning: 'to establish; to create', type: 'ichidan', difficultyLevel: 'hard' },
  { dictionary: '強調する', reading: 'きょうちょうする', meaning: 'to emphasize', type: 'irregular', difficultyLevel: 'hard' },
  { dictionary: '超える', reading: 'こえる', meaning: 'to exceed; to cross', type: 'ichidan', difficultyLevel: 'hard' },
  { dictionary: '改める', reading: 'あらためる', meaning: 'to change; to reform', type: 'ichidan', difficultyLevel: 'hard' },
  { dictionary: '述べ立てる', reading: 'のべたてる', meaning: 'to elaborate; to expound', type: 'ichidan', difficultyLevel: 'hard' },
  { dictionary: '契約する', reading: 'けいやくする', meaning: 'to contract; to make an agreement', type: 'irregular', difficultyLevel: 'hard' },
  { dictionary: '支配する', reading: 'しはいする', meaning: 'to control; to dominate', type: 'irregular', difficultyLevel: 'hard' },
  { dictionary: '負う', reading: 'おう', meaning: 'to bear; to take responsibility', type: 'godan', difficultyLevel: 'hard' }
]

  

export function getVerbsByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): Verb[] {
  return masterVerbList.filter(verb => verb.difficultyLevel === difficulty)
}

export function getVerbsByType(type: VerbType): Verb[] {
  return masterVerbList.filter(verb => verb.type === type)
}

export function getRandomVerbs(count: number, excludeVerbs: string[] = []): Verb[] {
  const availableVerbs = masterVerbList.filter(verb => !excludeVerbs.includes(verb.dictionary))
  const shuffled = [...availableVerbs].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export function getVerbsByMasteryScore(minScore: number, maxScore: number): Verb[] {
  return masterVerbList.filter(verb => {
    const score = verb.masteryScore || 0
    return score >= minScore && score <= maxScore
  })
} 