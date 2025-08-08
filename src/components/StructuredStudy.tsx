'use client'

import { useState, useEffect } from 'react'
import { getRandomVerb, conjugateVerb, getConjugationDisplayName } from '@/utils/verbUtils'
import { studyPlan, getCurrentDay, getNextDay, getPreviousDay } from '@/data/studyPlan'
import { Verb, ConjugationType, StudyProgress, Worksheet } from '@/types/verb'
import ProgressTracker from './ProgressTracker'
import WorksheetPractice from './WorksheetPractice'
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
    timeRecords: {}
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
  const [currentWorksheet, setCurrentWorksheet] = useState<Worksheet | null>(null)
  const [showWorksheet, setShowWorksheet] = useState(false)

  const currentDayData = getCurrentDay(progress)
  const nextDayData = getNextDay(progress)
  const previousDayData = getPreviousDay(progress)

  useEffect(() => {
    if (currentDayData) {
      // Initialize cycle with selected verbs if not already done
      if (progress.selectedVerbs.length === 0) {
        const selectedVerbs = masteryTracker.selectVerbsForCycle(progress.cycleNumber)
        setProgress(prev => ({
          ...prev,
          selectedVerbs
        }))
      }
      
      loadNewVerb()
      setSessionStartTime(new Date())
    }
  }, [currentDayData, progress.selectedVerbs.length, progress.cycleNumber])

  const loadNewVerb = () => {
    const verb = progress.selectedVerbs.length > 0 
      ? progress.selectedVerbs[Math.floor(Math.random() * progress.selectedVerbs.length)]
      : getRandomVerb()
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

    // Move to next form or complete drill
    if (currentFormIndex < currentDayData.forms.length - 1) {
      setTimeout(() => {
        setCurrentFormIndex(prev => prev + 1)
        setCurrentForm(currentDayData.forms[currentFormIndex + 1])
        setUserAnswer('')
        setIsCorrect(null)
      }, 2000)
    } else {
      // Drill completed
      setTimeout(() => {
        setShowDrill(true)
      }, 2000)
    }
  }

  const handleNextVerb = () => {
    loadNewVerb()
    setDrillResults({})
    setShowDrill(false)
  }

  const handleCompleteDay = () => {
    const sessionTime = sessionStartTime ? Math.floor((Date.now() - sessionStartTime.getTime()) / 1000) : 0
    const dayScore = Object.values(drillResults).filter(Boolean).length
    
    setProgress(prev => ({
      ...prev,
      completedDays: [...prev.completedDays, prev.currentDay],
      scores: { ...prev.scores, [prev.currentDay]: dayScore },
      timeRecords: { ...prev.timeRecords, [prev.currentDay]: sessionTime }
    }))
  }

  const handleStartWorksheet = () => {
    if (!currentDayData || progress.selectedVerbs.length === 0) return
    
    const worksheet = masteryTracker.generateWorksheet(
      progress.cycleNumber,
      progress.currentDay,
      progress.selectedVerbs,
      currentDayData.forms
    )
    
    setCurrentWorksheet(worksheet)
    setShowWorksheet(true)
  }

  const handleWorksheetComplete = (completedWorksheet: Worksheet) => {
    setShowWorksheet(false)
    setCurrentWorksheet(null)
    
    // Update progress with worksheet results
    setProgress(prev => ({
      ...prev,
      completedDays: [...prev.completedDays, prev.currentDay],
      scores: { ...prev.scores, [prev.currentDay]: completedWorksheet.score || 0 },
      timeRecords: { ...prev.timeRecords, [prev.currentDay]: completedWorksheet.exercises.reduce((sum, ex) => sum + (ex.timeSpent || 0), 0) },
      worksheetId: completedWorksheet.id
    }))
  }

  const handleNextDay = () => {
    if (nextDayData) {
      setProgress(prev => ({
        ...prev,
        currentDay: nextDayData.day,
        currentWeek: nextDayData.day <= 7 ? 1 : 2
      }))
    }
  }

  const handlePreviousDay = () => {
    if (previousDayData) {
      setProgress(prev => ({
        ...prev,
        currentDay: previousDayData.day,
        currentWeek: previousDayData.day <= 7 ? 1 : 2
      }))
    }
  }

  const getProgressPercentage = () => {
    const totalDays = studyPlan.reduce((total, week) => total + week.days.length, 0)
    return Math.round((progress.completedDays.length / totalDays) * 100)
  }

  if (showWorksheet && currentWorksheet) {
    return (
      <WorksheetPractice
        worksheet={currentWorksheet}
        onComplete={handleWorksheetComplete}
        onBack={() => setShowWorksheet(false)}
      />
    )
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
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              📊 Progress
            </button>
            <div className="text-right">
              <div className="text-sm text-gray-600">Week {progress.currentWeek}, Day {progress.currentDay}</div>
              <div className="text-lg font-semibold text-gray-800">{currentDayData.title}</div>
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-4">
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

        {/* Day Description */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Today's Focus</h3>
          <p className="text-blue-700 mb-2">{currentDayData.description}</p>
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
              Form {currentFormIndex + 1} of {currentDayData.forms.length}
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            
                      <div className="flex justify-center space-x-4">
            <button
              onClick={handleNextVerb}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Practice Another Verb
            </button>
            <button
              onClick={handleStartWorksheet}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
            >
              Start Worksheet
            </button>
            <button
              onClick={handleCompleteDay}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Complete Day
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