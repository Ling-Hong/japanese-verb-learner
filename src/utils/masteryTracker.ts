import { Verb, VerbMastery, ConjugationType, Worksheet, WorksheetExercise } from '@/types/verb'
import { masterVerbList, getRandomVerbs, getVerbsByMasteryScore } from '@/data/masterVerbList'
import { conjugateVerb } from './verbUtils'

// Local storage keys
const MASTERY_DATA_KEY = 'japanese_verb_mastery'
const CYCLE_HISTORY_KEY = 'japanese_verb_cycles'
const WORKSHEET_HISTORY_KEY = 'japanese_verb_worksheets'

export class MasteryTracker {
  private masteryData: Map<string, VerbMastery> = new Map()
  private cycleHistory: any[] = []
  private worksheetHistory: Worksheet[] = []

  constructor() {
    this.loadFromStorage()
  }

  // Load data from localStorage
  private loadFromStorage() {
    try {
      const masteryData = localStorage.getItem(MASTERY_DATA_KEY)
      if (masteryData) {
        const parsed = JSON.parse(masteryData)
        this.masteryData = new Map(Object.entries(parsed))
      }

      const cycleData = localStorage.getItem(CYCLE_HISTORY_KEY)
      if (cycleData) {
        this.cycleHistory = JSON.parse(cycleData)
      }

      const worksheetData = localStorage.getItem(WORKSHEET_HISTORY_KEY)
      if (worksheetData) {
        this.worksheetHistory = JSON.parse(worksheetData)
      }
    } catch (error) {
      console.error('Error loading mastery data:', error)
    }
  }

  // Save data to localStorage
  private saveToStorage() {
    try {
      const masteryObject = Object.fromEntries(this.masteryData)
      localStorage.setItem(MASTERY_DATA_KEY, JSON.stringify(masteryObject))
      localStorage.setItem(CYCLE_HISTORY_KEY, JSON.stringify(this.cycleHistory))
      localStorage.setItem(WORKSHEET_HISTORY_KEY, JSON.stringify(this.worksheetHistory))
    } catch (error) {
      console.error('Error saving mastery data:', error)
    }
  }

  // Get or create mastery data for a verb
  getMastery(verbId: string): VerbMastery {
    if (!this.masteryData.has(verbId)) {
      this.masteryData.set(verbId, {
        verbId,
        masteryScore: 0,
        lastPracticed: new Date(),
        practiceCount: 0,
        correctAnswers: 0,
        totalAttempts: 0,
        formScores: {},
        cycleHistory: []
      })
    }
    return this.masteryData.get(verbId)!
  }

  // Update mastery score after practice
  updateMastery(verbId: string, form: ConjugationType, isCorrect: boolean, timeSpent: number = 0) {
    const mastery = this.getMastery(verbId)
    
    // Update basic stats
    mastery.practiceCount++
    mastery.totalAttempts++
    mastery.lastPracticed = new Date()
    
    if (isCorrect) {
      mastery.correctAnswers++
    }

    // Update form-specific score
    const currentFormScore = mastery.formScores[form] || 0
    const newFormScore = isCorrect 
      ? Math.min(100, currentFormScore + 10) 
      : Math.max(0, currentFormScore - 5)
    mastery.formScores[form] = newFormScore

    // Calculate overall mastery score
    const formScores = Object.values(mastery.formScores)
    const averageFormScore = formScores.length > 0 
      ? formScores.reduce((sum, score) => sum + score, 0) / formScores.length 
      : 0
    
    const accuracyScore = mastery.totalAttempts > 0 
      ? (mastery.correctAnswers / mastery.totalAttempts) * 100 
      : 0
    
    mastery.masteryScore = Math.round((averageFormScore + accuracyScore) / 2)

    this.saveToStorage()
    return mastery
  }

  // Select verbs for a new cycle based on mastery scores
  selectVerbsForCycle(cycleNumber: number, targetCount: number = 15): Verb[] {
    const allVerbs = [...masterVerbList]
    const selectedVerbs: Verb[] = []
    
    // Priority 1: Verbs with low mastery scores (0-30)
    const lowMasteryVerbs = allVerbs.filter(verb => {
      const mastery = this.getMastery(verb.dictionary)
      return mastery.masteryScore <= 30
    })
    
    // Priority 2: Verbs not practiced recently (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    const notRecentlyPracticed = allVerbs.filter(verb => {
      const mastery = this.getMastery(verb.dictionary)
      return mastery.lastPracticed < thirtyDaysAgo
    })
    
    // Priority 3: Medium mastery verbs (31-70)
    const mediumMasteryVerbs = allVerbs.filter(verb => {
      const mastery = this.getMastery(verb.dictionary)
      return mastery.masteryScore > 30 && mastery.masteryScore <= 70
    })
    
    // Priority 4: Random selection for variety
    const remainingVerbs = allVerbs.filter(verb => {
      const mastery = this.getMastery(verb.dictionary)
      return mastery.masteryScore > 70
    })
    
    // Combine and select
    const priorityList = [
      ...lowMasteryVerbs,
      ...notRecentlyPracticed,
      ...mediumMasteryVerbs,
      ...remainingVerbs
    ]
    
    // Remove duplicates and select
    const uniqueVerbs = priorityList.filter((verb, index, array) => 
      array.findIndex(v => v.dictionary === verb.dictionary) === index
    )
    
    // Select target count, ensuring variety
    const easyVerbs = uniqueVerbs.filter(v => v.difficultyLevel === 'easy')
    const mediumVerbs = uniqueVerbs.filter(v => v.difficultyLevel === 'medium')
    const hardVerbs = uniqueVerbs.filter(v => v.difficultyLevel === 'hard')
    
    // Distribute by difficulty
    const easyCount = Math.min(5, easyVerbs.length)
    const mediumCount = Math.min(7, mediumVerbs.length)
    const hardCount = Math.min(3, hardVerbs.length)
    
    selectedVerbs.push(
      ...easyVerbs.slice(0, easyCount),
      ...mediumVerbs.slice(0, mediumCount),
      ...hardVerbs.slice(0, hardCount)
    )
    
    // Fill remaining slots with random selection
    const remainingSlots = targetCount - selectedVerbs.length
    if (remainingSlots > 0) {
      const remainingVerbs = uniqueVerbs.filter(verb => 
        !selectedVerbs.some(selected => selected.dictionary === verb.dictionary)
      )
      selectedVerbs.push(...remainingVerbs.slice(0, remainingSlots))
    }
    
    return selectedVerbs.slice(0, targetCount)
  }

  // Generate worksheet for a specific day
  generateWorksheet(cycleNumber: number, dayNumber: number, selectedVerbs: Verb[], forms: ConjugationType[]): Worksheet {
    const worksheetId = `cycle_${cycleNumber}_day_${dayNumber}_${Date.now()}`
    const exercises: WorksheetExercise[] = []
    
    // Generate 3-5 exercises per verb for the day's forms
    selectedVerbs.forEach(verb => {
      forms.forEach(form => {
        exercises.push({
          verb,
          targetForm: form,
          correctAnswer: conjugateVerb(verb, form)
        })
      })
    })
    
    // Shuffle exercises for variety
    const shuffledExercises = exercises.sort(() => Math.random() - 0.5)
    
    const worksheet: Worksheet = {
      id: worksheetId,
      title: `Cycle ${cycleNumber}, Day ${dayNumber}`,
      description: `Practice with ${forms.length} forms for ${selectedVerbs.length} verbs`,
      cycleNumber,
      dayNumber,
      exercises: shuffledExercises,
      createdAt: new Date()
    }
    
    this.worksheetHistory.push(worksheet)
    this.saveToStorage()
    
    return worksheet
  }

  // Record worksheet completion
  completeWorksheet(worksheetId: string, userAnswers: { [exerciseId: number]: string }, timeSpent: number) {
    const worksheet = this.worksheetHistory.find(w => w.id === worksheetId)
    if (!worksheet) return null
    
    let correctCount = 0
    const totalExercises = worksheet.exercises.length
    
    worksheet.exercises.forEach((exercise, index) => {
      const userAnswer = userAnswers[index]
      exercise.userAnswer = userAnswer
      exercise.isCorrect = userAnswer?.toLowerCase() === exercise.correctAnswer?.toLowerCase()
      exercise.timeSpent = timeSpent / totalExercises
      
      if (exercise.isCorrect) {
        correctCount++
      }
      
      // Update mastery for this verb and form
      this.updateMastery(
        exercise.verb.dictionary,
        exercise.targetForm,
        exercise.isCorrect || false,
        exercise.timeSpent || 0
      )
    })
    
    worksheet.completedAt = new Date()
    worksheet.score = Math.round((correctCount / totalExercises) * 100)
    
    this.saveToStorage()
    return worksheet
  }

  // Get mastery statistics
  getMasteryStats() {
    const stats = {
      totalVerbs: this.masteryData.size,
      averageMastery: 0,
      masteryDistribution: {
        beginner: 0, // 0-30
        intermediate: 0, // 31-70
        advanced: 0, // 71-100
        notPracticed: 0
      },
      recentlyPracticed: 0,
      totalPracticeTime: 0
    }
    
    let totalMastery = 0
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    this.masteryData.forEach(mastery => {
      totalMastery += mastery.masteryScore
      
      if (mastery.masteryScore <= 30) stats.masteryDistribution.beginner++
      else if (mastery.masteryScore <= 70) stats.masteryDistribution.intermediate++
      else stats.masteryDistribution.advanced++
      
      if (mastery.lastPracticed > thirtyDaysAgo) stats.recentlyPracticed++
    })
    
    stats.averageMastery = this.masteryData.size > 0 
      ? Math.round(totalMastery / this.masteryData.size) 
      : 0
    
    stats.notPracticed = masterVerbList.length - this.masteryData.size
    
    return stats
  }

  // Get verbs that need practice
  getVerbsNeedingPractice(count: number = 10): Verb[] {
    const lowMasteryVerbs = masterVerbList.filter(verb => {
      const mastery = this.getMastery(verb.dictionary)
      return mastery.masteryScore <= 50
    })
    
    const notPracticedVerbs = masterVerbList.filter(verb => {
      const mastery = this.getMastery(verb.dictionary)
      return mastery.practiceCount === 0
    })
    
    const combined = [...lowMasteryVerbs, ...notPracticedVerbs]
    const unique = combined.filter((verb, index, array) => 
      array.findIndex(v => v.dictionary === verb.dictionary) === index
    )
    
    return unique.slice(0, count)
  }

  // Export mastery data
  exportMasteryData() {
    return {
      masteryData: Object.fromEntries(this.masteryData),
      cycleHistory: this.cycleHistory,
      worksheetHistory: this.worksheetHistory,
      stats: this.getMasteryStats()
    }
  }

  // Import mastery data
  importMasteryData(data: any) {
    if (data.masteryData) {
      this.masteryData = new Map(Object.entries(data.masteryData))
    }
    if (data.cycleHistory) {
      this.cycleHistory = data.cycleHistory
    }
    if (data.worksheetHistory) {
      this.worksheetHistory = data.worksheetHistory
    }
    this.saveToStorage()
  }

  // Reset all data
  resetData() {
    this.masteryData.clear()
    this.cycleHistory = []
    this.worksheetHistory = []
    this.saveToStorage()
  }
}

// Global instance
export const masteryTracker = new MasteryTracker() 