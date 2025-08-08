export type VerbType = 'ichidan' | 'godan' | 'irregular'
export type ConjugationType = 
  | 'dictionary'      // 基本形
  | 'masu'           // ます形
  | 'masu_past'      // ました
  | 'ta'             // た形
  | 'te'             // て形
  | 'nai'            // ない形
  | 'nai_past'       // なかった
  | 'te_iru'         // 〜ている
  | 'potential'      // 可能形
  | 'volitional'     // 意向形
  | 'passive'        // 受け身形
  | 'causative'      // 使役形
  | 'causative_passive' // 使役受け身形
  | 'imperative'     // 命令形
  | 'prohibitive'    // 〜な
  | 'conditional_tara' // 〜たら
  | 'conditional_ba' // 〜ば
  | 'conjectural'    // 〜でしょう / 〜だろう
  | 'desire'         // 〜たい
  | 'ease_yasui'     // 〜やすい
  | 'ease_nikui'     // 〜にくい'

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

export interface StudyDay {
  day: number
  title: string
  description: string
  forms: ConjugationType[]
  drillPattern: string
  application: string
}

export interface StudyCycle {
  week: number
  days: StudyDay[]
}

export interface StudyProgress {
  currentDay: number
  currentWeek: number
  cycleStartDate: Date
  completedDays: number[]
  scores: { [day: number]: number }
  timeRecords: { [day: number]: number } // in seconds
} 