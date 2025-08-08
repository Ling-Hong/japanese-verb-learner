import { Verb, VerbType } from '@/types/verb'

// Master verb list with 100+ common Japanese verbs
export const masterVerbList: Verb[] = 
  [
    { dictionary: '従う', meaning: 'to obey; to follow', type: 'godan', difficultyLevel: 'hard' },
    { dictionary: '蓄える', meaning: 'to store; to save up', type: 'ichidan', difficultyLevel: 'hard' },
    { dictionary: '避ける', meaning: 'to avoid', type: 'ichidan', difficultyLevel: 'hard' },
    { dictionary: '兼ねる', meaning: 'to serve two roles; to hesitate to', type: 'ichidan', difficultyLevel: 'hard' },
    { dictionary: '促す', meaning: 'to urge; to encourage', type: 'godan', difficultyLevel: 'hard' },
    { dictionary: '遂げる', meaning: 'to accomplish; to achieve', type: 'ichidan', difficultyLevel: 'hard' },
    { dictionary: '募る', meaning: 'to recruit; to grow in intensity', type: 'godan', difficultyLevel: 'hard' },
    { dictionary: '至る', meaning: 'to reach; to lead to', type: 'godan', difficultyLevel: 'hard' },
    { dictionary: '伴う', meaning: 'to accompany; to involve', type: 'godan', difficultyLevel: 'hard' },
    { dictionary: '図る', meaning: 'to plan; to attempt', type: 'godan', difficultyLevel: 'hard' },
    { dictionary: '損なう', meaning: 'to harm; to spoil', type: 'godan', difficultyLevel: 'hard' },
    { dictionary: '試みる', meaning: 'to attempt; to try', type: 'ichidan', difficultyLevel: 'hard' },
    { dictionary: '誓う', meaning: 'to swear; to vow', type: 'godan', difficultyLevel: 'hard' },
    { dictionary: '恵まれる', meaning: 'to be blessed with', type: 'ichidan', difficultyLevel: 'hard' },
    { dictionary: '拒む', meaning: 'to refuse', type: 'godan', difficultyLevel: 'hard' },
    { dictionary: '妨げる', meaning: 'to hinder; to obstruct', type: 'ichidan', difficultyLevel: 'hard' },
    { dictionary: '催す', meaning: 'to hold (an event); to feel', type: 'godan', difficultyLevel: 'hard' },
    { dictionary: '称する', meaning: 'to call oneself; to pretend', type: 'irregular', difficultyLevel: 'hard' },
    { dictionary: '控える', meaning: 'to refrain; to hold back', type: 'ichidan', difficultyLevel: 'hard' },
    { dictionary: '耐える', meaning: 'to endure', type: 'ichidan', difficultyLevel: 'hard' },
    { dictionary: '仕える', meaning: 'to serve', type: 'ichidan', difficultyLevel: 'hard' },
    { dictionary: '栄える', meaning: 'to prosper', type: 'ichidan', difficultyLevel: 'hard' },
    { dictionary: '脅かす', meaning: 'to threaten; to intimidate', type: 'godan', difficultyLevel: 'hard' },
    { dictionary: '及ぼす', meaning: 'to exert (influence); to cause', type: 'godan', difficultyLevel: 'hard' },
    { dictionary: '免れる', meaning: 'to escape; to avoid', type: 'ichidan', difficultyLevel: 'hard' },
    { dictionary: '滅びる', meaning: 'to perish; to be ruined', type: 'ichidan', difficultyLevel: 'hard' },
    { dictionary: '迫る', meaning: 'to approach; to press for', type: 'godan', difficultyLevel: 'hard' },
    { dictionary: '崩れる', meaning: 'to collapse; to crumble', type: 'ichidan', difficultyLevel: 'hard' },
    { dictionary: '覆う', meaning: 'to cover; to conceal', type: 'godan', difficultyLevel: 'hard' },
    { dictionary: '侵す', meaning: 'to invade; to violate', type: 'godan', difficultyLevel: 'hard' },
    { dictionary: '控える', meaning: 'to refrain; to reserve', type: 'ichidan', difficultyLevel: 'hard' },
    { dictionary: '訴える', meaning: 'to sue; to appeal', type: 'ichidan', difficultyLevel: 'hard' },
    { dictionary: '促す', meaning: 'to prompt; to stimulate', type: 'godan', difficultyLevel: 'hard' },
    { dictionary: '導く', meaning: 'to guide; to lead', type: 'godan', difficultyLevel: 'hard' },
    { dictionary: '携わる', meaning: 'to engage in; to be involved in', type: 'godan', difficultyLevel: 'hard' },
    { dictionary: '照らす', meaning: 'to shine on; to illuminate', type: 'godan', difficultyLevel: 'hard' },
    { dictionary: '踏まえる', meaning: 'to take into account; to base on', type: 'ichidan', difficultyLevel: 'hard' },
    { dictionary: '屈する', meaning: 'to yield; to give in', type: 'irregular', difficultyLevel: 'hard' },
    { dictionary: '遂げる', meaning: 'to carry out; to accomplish', type: 'ichidan', difficultyLevel: 'hard' },
    { dictionary: '挑む', meaning: 'to challenge; to attempt', type: 'godan', difficultyLevel: 'hard' },
    { dictionary: '遮る', meaning: 'to interrupt; to obstruct', type: 'godan', difficultyLevel: 'hard' },
    { dictionary: '顧みる', meaning: 'to look back; to reflect', type: 'ichidan', difficultyLevel: 'hard' },
    { dictionary: '催促する', meaning: 'to urge; to press', type: 'irregular', difficultyLevel: 'hard' },
    { dictionary: '駆使する', meaning: 'to make full use of', type: 'irregular', difficultyLevel: 'hard' },
    { dictionary: '誇る', meaning: 'to boast; to be proud of', type: 'godan', difficultyLevel: 'hard' },
    { dictionary: '貫く', meaning: 'to pierce; to carry out', type: 'godan', difficultyLevel: 'hard' },
    { dictionary: '悟る', meaning: 'to realize; to understand deeply', type: 'godan', difficultyLevel: 'hard' },
    { dictionary: '減る', meaning: 'to decrease', type: 'godan', difficultyLevel: 'hard' },
    { dictionary: '述べる', meaning: 'to state; to mention', type: 'ichidan', difficultyLevel: 'hard' },
    { dictionary: '承知する', meaning: 'to consent; to be aware', type: 'irregular', difficultyLevel: 'hard' },
    { dictionary: '応じる', meaning: 'to respond; to comply', type: 'ichidan', difficultyLevel: 'hard' },
    { dictionary: '改善する', meaning: 'to improve', type: 'irregular', difficultyLevel: 'hard' },
    { dictionary: '妥当する', meaning: 'to be appropriate', type: 'irregular', difficultyLevel: 'hard' },
    { dictionary: '維持する', meaning: 'to maintain; to preserve', type: 'irregular', difficultyLevel: 'hard' },
    { dictionary: '企てる', meaning: 'to plan; to scheme', type: 'ichidan', difficultyLevel: 'hard' },
    { dictionary: '扱う', meaning: 'to handle; to deal with', type: 'godan', difficultyLevel: 'hard' },
    { dictionary: '採用する', meaning: 'to employ; to adopt', type: 'irregular', difficultyLevel: 'hard' },
    { dictionary: '推進する', meaning: 'to promote; to propel', type: 'irregular', difficultyLevel: 'hard' },
    { dictionary: '設ける', meaning: 'to establish; to create', type: 'ichidan', difficultyLevel: 'hard' },
    { dictionary: '強調する', meaning: 'to emphasize', type: 'irregular', difficultyLevel: 'hard' },
    { dictionary: '超える', meaning: 'to exceed; to cross', type: 'ichidan', difficultyLevel: 'hard' },
    { dictionary: '改める', meaning: 'to change; to reform', type: 'ichidan', difficultyLevel: 'hard' },
    { dictionary: '述べ立てる', meaning: 'to elaborate; to expound', type: 'ichidan', difficultyLevel: 'hard' },
    { dictionary: '契約する', meaning: 'to contract; to make an agreement', type: 'irregular', difficultyLevel: 'hard' },
    { dictionary: '支配する', meaning: 'to control; to dominate', type: 'irregular', difficultyLevel: 'hard' },
    { dictionary: '負う', meaning: 'to bear; to take responsibility', type: 'godan', difficultyLevel: 'hard' }
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