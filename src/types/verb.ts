export type VerbType = 'ichidan' | 'godan' | 'irregular'
export type ConjugationType = 'masu' | 'te' | 'ta' | 'nai'

export interface Verb {
  dictionary: string
  meaning: string
  type: VerbType
  reading?: string
}

export interface ConjugationRule {
  type: VerbType
  conjugations: {
    [key in ConjugationType]: (verb: string) => string
  }
} 