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
  masteryScore?: number // 0-100, undefined means not practiced
  lastPracticed?: Date
  practiceCount?: number
}

export interface VerbMastery {
  verbId: string // dictionary form as ID
  masteryScore: number // 0-100
  lastPracticed: Date
  practiceCount: number
  correctAnswers: number
  totalAttempts: number
  formScores: { [key in ConjugationType]?: number } // Individual form mastery
  cycleHistory: {
    cycleNumber: number
    date: Date
    score: number
    formsPracticed: ConjugationType[]
  }[]
}

export interface VerbList {
  id: string
  name: string
  description: string
  verbs: Verb[]
  createdAt: Date
  lastUpdated: Date
  isActive: boolean
}

export interface Worksheet {
  id: string
  title: string
  description: string
  cycleNumber: number
  dayNumber: number
  exercises: WorksheetExercise[]
  createdAt: Date
  completedAt?: Date
  score?: number
}

export interface WorksheetExercise {
  verb: Verb
  targetForm: ConjugationType
  userAnswer?: string
  correctAnswer?: string
  isCorrect?: boolean
  timeSpent?: number // in seconds
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
  cycleNumber: number
  selectedVerbs: Verb[]
  worksheetId?: string
}

export interface CycleResult {
  cycleNumber: number
  startDate: Date
  endDate: Date
  selectedVerbs: Verb[]
  masteryUpdates: VerbMastery[]
  overallScore: number
  completedWorksheets: Worksheet[]
} 