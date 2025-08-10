import { Verb, ConjugationType } from '@/types/verb'
import { conjugateVerb } from './verbUtils'
import { examplePatternLibrary } from '@/data/examplePatterns'

export interface GeneratedExample {
  jp: string
  en: string
}

function randomPick<T>(arr: T[]): T | null {
  if (!arr || arr.length === 0) return null
  const idx = Math.floor(Math.random() * arr.length)
  return arr[idx]
}

// Generate an example sentence for a given verb and conjugation type.
// This uses general patterns per conjugation (not verb-specific hardcoding).
export function generateExampleSentence(verb: Verb, form: ConjugationType): GeneratedExample | null {
  const library = examplePatternLibrary[form]
  if (!library) return null

  const conj = conjugateVerb(verb, form)

  const jpTpl = randomPick(library.jp)
  const enTpl = randomPick(library.en)
  if (!jpTpl || !enTpl) return null

  const jp = jpTpl.replace('{verb}', conj)
  const en = enTpl.replace('{verb}', conjugationToEnglish(conj))
  return { jp, en }
}

// Very naive mapping of conjugated Japanese into English phrase input for the EN template.
// In practice, the EN template is generic enough that using the same conjugated string is acceptable.
function conjugationToEnglish(conjugated: string): string {
  // For now, return the conjugated placeholder as-is. The EN templates are written generically.
  return conjugated
}
