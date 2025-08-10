import { Verb, VerbType } from '@/types/verb'
import defaultList from '@/data/verb-lists/default.json'

// Load master verb list from JSON (swap the file to change vocabulary sets)
export const masterVerbList: Verb[] = (defaultList as Verb[]).map(v => ({ ...v }))

  

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