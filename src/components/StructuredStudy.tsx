'use client'

import { useState, useEffect } from 'react'
import { getRandomVerb, conjugateVerb, getConjugationDisplayName } from '@/utils/verbUtils'
import { studyPlan, getCurrentDay, getNextDay, getPreviousDay } from '@/data/studyPlan'
import { Verb, ConjugationType, StudyProgress } from '@/types/verb'
import ProgressTracker from './ProgressTracker'
import { masteryTracker } from '@/utils/masteryTracker'

interface StructuredStudyProps {
  onBack: () => void
}

export default function StructuredStudy({ onBack }: StructuredStudyProps) {
  const [progress, setProgress] = useState<StudyProgress>({
    currentDay: 1,
    currentWeek: 1,
    cycleStartDate: new Date(),
    completedDays: [],
    scores: {},
    timeRecords: {},
    cycleNumber: 1,
    selectedVerbs: []
  })
  
  const [currentVerb, setCurrentVerb] = useState<Verb | null>(null)
  const [currentForm, setCurrentForm] = useState<ConjugationType>('masu')
  const [userAnswer, setUserAnswer] = useState('')
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [currentFormIndex, setCurrentFormIndex] = useState(0)
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null)
  const [showDrill, setShowDrill] = useState(false)
  const [drillResults, setDrillResults] = useState<{ [key: string]: boolean }>({})
  const [showProgress, setShowProgress] = useState(false)
  const [dailyProgress, setDailyProgress] = useState(0) // Track daily progress (words completed)
  const [currentWordIndex, setCurrentWordIndex] = useState(0) // Track current word (0-9 for 10 words per day)
  const [dayWords, setDayWords] = useState<Verb[]>([]) // 10 words for the current day

  const currentDayData = getCurrentDay(progress)
  const nextDayData = getNextDay(progress)
  const previousDayData = getPreviousDay(progress)

  useEffect(() => {
    if (currentDayData) {
      // Select words specifically for this day (not slicing from a small set)
      const wordsForDay = masteryTracker.selectVerbsForCycle(progress.cycleNumber, 10) // 10 words per day
      
      setDayWords(wordsForDay)
      setCurrentWordIndex(0)
      setDailyProgress(0)
      setSessionStartTime(new Date())
      setShowDrill(false)
      setDrillResults({})
      
      // Load the first word
      if (wordsForDay.length > 0) {
        setCurrentVerb(wordsForDay[0])
        setCurrentFormIndex(0)
        setUserAnswer('')
        setIsCorrect(null)
        if (currentDayData.forms.length > 0) {
          setCurrentForm(currentDayData.forms[0])
        }
      }
    }
  }, [currentDayData, progress.currentDay, progress.cycleNumber])

  const loadNewVerb = () => {
    if (dayWords.length === 0) return
    
    const verb = dayWords[currentWordIndex]
    setCurrentVerb(verb)
    setUserAnswer('')
    setIsCorrect(null)
    setCurrentFormIndex(0)
    if (currentDayData && currentDayData.forms.length > 0) {
      setCurrentForm(currentDayData.forms[0])
    }
  }

  const handleSubmit = () => {
    if (!currentVerb || !currentDayData) return

    const correctAnswer = conjugateVerb(currentVerb, currentForm)
    const isAnswerCorrect = userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase()
    
    setIsCorrect(isAnswerCorrect)
    
    // Update drill results
    setDrillResults(prev => ({
      ...prev,
      [`${currentVerb.dictionary}-${currentForm}`]: isAnswerCorrect
    }))

    // Move to next form or next word
    if (currentFormIndex < currentDayData.forms.length - 1) {
      // Move to next form for current word
      setTimeout(() => {
        setCurrentFormIndex(prev => prev + 1)
        setCurrentForm(currentDayData.forms[currentFormIndex + 1])
        setUserAnswer('')
        setIsCorrect(null)
      }, 2000)
    } else {
      // Completed all forms for current word
      if (currentWordIndex < dayWords.length - 1) {
        // Move to next word
        setTimeout(() => {
          const nextWordIndex = currentWordIndex + 1
          setCurrentWordIndex(nextWordIndex)
          setCurrentVerb(dayWords[nextWordIndex])
          setDailyProgress(prev => prev + 1)
          setCurrentFormIndex(0)
          setCurrentForm(currentDayData.forms[0])
          setUserAnswer('')
          setIsCorrect(null)
        }, 2000)
      } else {
        // Completed all words for the day
        const sessionTime = sessionStartTime ? Math.floor((Date.now() - sessionStartTime.getTime()) / 1000) : 0
        const dayScore = Object.values(drillResults).filter(Boolean).length + (isAnswerCorrect ? 1 : 0)
        
        setProgress(prev => ({
          ...prev,
          completedDays: [...prev.completedDays, prev.currentDay],
          scores: { ...prev.scores, [prev.currentDay]: dayScore },
          timeRecords: { ...prev.timeRecords, [prev.currentDay]: sessionTime }
        }))
        
        setTimeout(() => {
          setShowDrill(true)
        }, 2000)
      }
    }
  }

  const handleNextVerb = () => {
    // Reset to start of current day
    setCurrentWordIndex(0)
    setDailyProgress(0)
    setDrillResults({})
    setShowDrill(false)
    setSessionStartTime(new Date())
    
    // Load first word of the day
    if (dayWords.length > 0) {
      setCurrentVerb(dayWords[0])
      setCurrentFormIndex(0)
      if (currentDayData && currentDayData.forms.length > 0) {
        setCurrentForm(currentDayData.forms[0])
      }
    }
  }



  const handleNextDay = () => {
    if (nextDayData) {
      setProgress(prev => ({
        ...prev,
        currentDay: nextDayData.day,
        currentWeek: nextDayData.day <= 7 ? 1 : 2
      }))
      
      // Reset all states for the new day
      setDailyProgress(0)
      setCurrentWordIndex(0)
      setShowDrill(false)
      setDrillResults({})
      setUserAnswer('')
      setIsCorrect(null)
      setCurrentFormIndex(0)
      setSessionStartTime(new Date())
    }
  }

  const handlePreviousDay = () => {
    if (previousDayData) {
      setProgress(prev => ({
        ...prev,
        currentDay: previousDayData.day,
        currentWeek: previousDayData.day <= 7 ? 1 : 2
      }))
      
      // Reset all states for the new day
      setDailyProgress(0)
      setCurrentWordIndex(0)
      setShowDrill(false)
      setDrillResults({})
      setUserAnswer('')
      setIsCorrect(null)
      setCurrentFormIndex(0)
      setSessionStartTime(new Date())
    }
  }

  const getProgressPercentage = () => {
    const totalDays = studyPlan.reduce((total, week) => total + week.days.length, 0)
    return Math.round((progress.completedDays.length / totalDays) * 100)
  }



  if (!currentDayData) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Study Plan Complete!</h2>
        <p className="text-gray-600 mb-6">Congratulations on completing the 2-week cycle!</p>
        <button
          onClick={onBack}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Back to Main Menu
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Header */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← Back to Main Menu
          </button>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowProgress(true)}
              className="text-blue-600 hover:text-blue-800 transition-colors flex items-center space-x-2"
            >
              <span>📊</span>
              <span>Progress: {getProgressPercentage()}%</span>
              <span className="text-xs">({progress.completedDays.length}/14 days)</span>
            </button>
            <div className="text-right">
              <div className="text-sm text-gray-600">Week {progress.currentWeek}, Day {progress.currentDay}</div>
              <div className="text-lg font-semibold text-gray-800">{currentDayData.title}</div>
            </div>
          </div>
        </div>
        
        {/* Progress Bars */}
        <div className="mb-4 space-y-3">
          {/* Overall Progress */}
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Overall Progress</span>
              <span>{getProgressPercentage()}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
          </div>
          
          {/* Daily Progress */}
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Today's Progress</span>
              <span>{dailyProgress} / {dayWords.length} words</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(dailyProgress / dayWords.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Day Description */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Today's Focus</h3>
          <p className="text-blue-700 mb-2">{currentDayData.description}</p>
          <div className="text-sm text-blue-600">
            <strong>Words to Practice:</strong> {dayWords.length} words × {currentDayData.forms.length} forms each (Total: {dayWords.length * currentDayData.forms.length} exercises)
          </div>
          <div className="text-sm text-blue-600">
            <strong>Drill Pattern:</strong> {currentDayData.drillPattern}
          </div>
          <div className="text-sm text-blue-600">
            <strong>Application:</strong> {currentDayData.application}
          </div>
        </div>
      </div>

      {/* Practice Area */}
      {!showDrill && currentVerb && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Conjugate this verb to {getConjugationDisplayName(currentForm)}:
            </h3>
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {currentVerb.dictionary}
            </div>
            <p className="text-gray-600">{currentVerb.meaning}</p>
            <div className="text-sm text-gray-500 mt-2">
              Word {currentWordIndex + 1} of {dayWords.length} • Form {currentFormIndex + 1} of {currentDayData.forms.length} • Exercise {((currentWordIndex * currentDayData.forms.length) + currentFormIndex + 1)} of {dayWords.length * currentDayData.forms.length}
            </div>
          </div>

          <div className="max-w-md mx-auto">
            <div className="mb-4">
              <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-1">
                Your Answer:
              </label>
              <input
                type="text"
                id="answer"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                placeholder="Enter the conjugated form..."
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Check Answer
            </button>
          </div>

          {isCorrect !== null && (
            <div className={`mt-4 p-4 rounded-md ${
              isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {isCorrect ? (
                <div>
                  <p className="font-semibold">Correct! 🎉</p>
                  <p>The answer is: {conjugateVerb(currentVerb, currentForm)}</p>
                </div>
              ) : (
                <div>
                  <p className="font-semibold">Incorrect</p>
                  <p>The correct answer is: {conjugateVerb(currentVerb, currentForm)}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Drill Results */}
      {showDrill && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Drill Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {Object.entries(drillResults).map(([key, isCorrect]) => {
              const [verb, form] = key.split('-')
              return (
                <div key={key} className={`p-3 rounded-lg ${
                  isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  <div className="font-semibold">{verb}</div>
                  <div className="text-sm">{getConjugationDisplayName(form as ConjugationType)}</div>
                  <div className="text-xs">{isCorrect ? '✓ Correct' : '✗ Incorrect'}</div>
                </div>
              )
            })}
          </div>

          <div className="text-center">
            <div className="text-lg font-semibold text-gray-800 mb-4">
              Score: {Object.values(drillResults).filter(Boolean).length} / {Object.keys(drillResults).length}
            </div>
            
                      <div className="flex justify-center">
            <button
              onClick={handleNextVerb}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Practice Another Verb
            </button>
          </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handlePreviousDay}
          disabled={!previousDayData}
          className={`px-4 py-2 rounded-md transition-colors ${
            previousDayData 
              ? 'bg-gray-600 text-white hover:bg-gray-700' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Previous Day
        </button>
        
        <button
          onClick={handleNextDay}
          disabled={!nextDayData}
          className={`px-4 py-2 rounded-md transition-colors ${
            nextDayData 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Next Day
        </button>
      </div>
      
      {/* Progress Tracker Modal */}
      {showProgress && (
        <ProgressTracker 
          progress={progress} 
          onClose={() => setShowProgress(false)} 
        />
      )}
    </div>
  )
} 