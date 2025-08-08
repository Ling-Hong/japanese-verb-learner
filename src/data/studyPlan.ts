import { StudyDay, StudyCycle, ConjugationType } from '@/types/verb'

export const studyPlan: StudyCycle[] = [
  {
    week: 1,
    days: [
      {
        day: 1,
        title: "Basic & Polite Forms",
        description: "Master the fundamental forms: dictionary, polite present, and past forms",
        forms: ['masu', 'masu_past', 'ta'],
        drillPattern: "dictionary → masu → past polite → past plain",
        application: "3 sentences in plain form, 3 in polite form"
      },
      {
        day: 2,
        title: "Te-form & Progressive",
        description: "Learn te-form and how to express ongoing actions",
        forms: ['te', 'te_iru'],
        drillPattern: "dictionary → te-form → progressive (〜ている)",
        application: "3 'right now' sentences"
      },
      {
        day: 3,
        title: "Negative Forms",
        description: "Master negative present and past forms",
        forms: ['nai', 'nai_past'],
        drillPattern: "dictionary → negative present (ない) → negative past (なかった)",
        application: "3 'don't do' sentences, 3 'didn't do' sentences"
      },
      {
        day: 4,
        title: "Potential & Volitional",
        description: "Learn to express ability and intention",
        forms: ['potential', 'volitional'],
        drillPattern: "dictionary → potential (can) → volitional (let's)",
        application: "3 'can do' sentences, 3 'let's do' sentences"
      },
      {
        day: 5,
        title: "Passive & Causative",
        description: "Learn passive voice and causative forms",
        forms: ['passive', 'causative'],
        drillPattern: "dictionary → passive → causative",
        application: "2 sentences for each form"
      },
      {
        day: 6,
        title: "Review Week 1",
        description: "Comprehensive review of all forms learned this week",
        forms: ['masu', 'masu_past', 'ta', 'te', 'te_iru', 'nai', 'nai_past', 'potential', 'volitional', 'passive', 'causative'],
        drillPattern: "Take each verb through all forms from Days 1–5",
        application: "Complete conjugation practice with all forms"
      },
      {
        day: 7,
        title: "Context Practice",
        description: "Apply learned forms in real context",
        forms: ['masu', 'masu_past', 'ta', 'te', 'te_iru', 'nai', 'nai_past', 'potential', 'volitional', 'passive', 'causative'],
        drillPattern: "Contextual application",
        application: "Write a short diary entry using at least 8 of the forms covered this week"
      }
    ]
  },
  {
    week: 2,
    days: [
      {
        day: 8,
        title: "Causative-Passive",
        description: "Learn the complex causative-passive form",
        forms: ['causative_passive'],
        drillPattern: "dictionary → causative-passive",
        application: "2 sentences about 'being made to do something'"
      },
      {
        day: 9,
        title: "Imperative & Prohibitive",
        description: "Learn commands and prohibitions",
        forms: ['imperative', 'prohibitive'],
        drillPattern: "dictionary → imperative → prohibitive (〜な)",
        application: "2 command sentences, 2 'don't do' sentences"
      },
      {
        day: 10,
        title: "Conditional Forms",
        description: "Master conditional expressions with たら and ば",
        forms: ['ta', 'conditional_tara', 'conditional_ba'],
        drillPattern: "past tense → たら, dictionary → ば",
        application: "3 'if' sentences for each type"
      },
      {
        day: 11,
        title: "Conjectural Forms",
        description: "Learn to express probability and presumption",
        forms: ['conjectural'],
        drillPattern: "dictionary → でしょう / だろう",
        application: "3 'probably' sentences"
      },
      {
        day: 12,
        title: "Desire & Ease Forms",
        description: "Learn to express desires and ease/difficulty",
        forms: ['desire', 'ease_yasui', 'ease_nikui'],
        drillPattern: "dictionary → たい-form, → 〜やすい, → 〜にくい",
        application: "1 sentence for each variation"
      },
      {
        day: 13,
        title: "Review Week 2",
        description: "Comprehensive review of all advanced forms",
        forms: ['masu', 'masu_past', 'ta', 'te', 'te_iru', 'nai', 'nai_past', 'potential', 'volitional', 'passive', 'causative', 'causative_passive', 'imperative', 'prohibitive', 'conditional_tara', 'conditional_ba', 'conjectural', 'desire', 'ease_yasui', 'ease_nikui'],
        drillPattern: "Run every verb through all 17 forms without notes",
        application: "Complete conjugation practice with all forms"
      },
      {
        day: 14,
        title: "Full Cycle Challenge",
        description: "Final challenge using all learned forms",
        forms: ['masu', 'masu_past', 'ta', 'te', 'te_iru', 'nai', 'nai_past', 'potential', 'volitional', 'passive', 'causative', 'causative_passive', 'imperative', 'prohibitive', 'conditional_tara', 'conditional_ba', 'conjectural', 'desire', 'ease_yasui', 'ease_nikui'],
        drillPattern: "Pick 5 random verbs → run all 17 forms",
        application: "Write a short story using at least 10 different conjugations"
      }
    ]
  }
]

export function getCurrentDay(progress: { currentDay: number; currentWeek: number }): StudyDay | null {
  const week = studyPlan.find(w => w.week === progress.currentWeek)
  if (!week) return null
  
  return week.days.find(d => d.day === progress.currentDay) || null
}

export function getNextDay(progress: { currentDay: number; currentWeek: number }): StudyDay | null {
  const currentWeek = studyPlan.find(w => w.week === progress.currentWeek)
  if (!currentWeek) return null
  
  const currentDayIndex = currentWeek.days.findIndex(d => d.day === progress.currentDay)
  if (currentDayIndex === -1) return null
  
  // Check if there's a next day in the same week
  if (currentDayIndex + 1 < currentWeek.days.length) {
    return currentWeek.days[currentDayIndex + 1]
  }
  
  // Check if there's a next week
  const nextWeek = studyPlan.find(w => w.week === progress.currentWeek + 1)
  if (nextWeek) {
    return nextWeek.days[0]
  }
  
  return null
}

export function getPreviousDay(progress: { currentDay: number; currentWeek: number }): StudyDay | null {
  const currentWeek = studyPlan.find(w => w.week === progress.currentWeek)
  if (!currentWeek) return null
  
  const currentDayIndex = currentWeek.days.findIndex(d => d.day === progress.currentDay)
  if (currentDayIndex === -1) return null
  
  // Check if there's a previous day in the same week
  if (currentDayIndex > 0) {
    return currentWeek.days[currentDayIndex - 1]
  }
  
  // Check if there's a previous week
  const previousWeek = studyPlan.find(w => w.week === progress.currentWeek - 1)
  if (previousWeek) {
    return previousWeek.days[previousWeek.days.length - 1]
  }
  
  return null
}

export function getTotalDays(): number {
  return studyPlan.reduce((total, week) => total + week.days.length, 0)
}

export function getWeekProgress(week: number): number {
  const weekData = studyPlan.find(w => w.week === week)
  return weekData ? weekData.days.length : 0
} 