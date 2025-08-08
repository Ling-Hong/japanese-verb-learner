'use client'

import { useState, useEffect } from 'react'
import { Worksheet, WorksheetExercise, ConjugationType } from '@/types/verb'
import { getConjugationDisplayName } from '@/utils/verbUtils'
import { masteryTracker } from '@/utils/masteryTracker'

interface WorksheetPracticeProps {
  worksheet: Worksheet
  onComplete: (worksheet: Worksheet) => void
  onBack: () => void
}

export default function WorksheetPractice({ worksheet, onComplete, onBack }: WorksheetPracticeProps) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({})
  const [showFeedback, setShowFeedback] = useState(false)
  const [sessionStartTime] = useState<Date>(new Date())
  const [isCompleted, setIsCompleted] = useState(false)

  const currentExercise = worksheet.exercises[currentExerciseIndex]
  const totalExercises = worksheet.exercises.length
  const progress = ((currentExerciseIndex + 1) / totalExercises) * 100

  const handleSubmit = () => {
    const userAnswer = userAnswers[currentExerciseIndex] || ''
    const isCorrect = userAnswer.toLowerCase() === currentExercise.correctAnswer?.toLowerCase()
    
    // Update mastery immediately
    masteryTracker.updateMastery(
      currentExercise.verb.dictionary,
      currentExercise.targetForm,
      isCorrect,
      0
    )

    setShowFeedback(true)
    
    setTimeout(() => {
      setShowFeedback(false)
      
      if (currentExerciseIndex < totalExercises - 1) {
        setCurrentExerciseIndex(prev => prev + 1)
      } else {
        // Complete worksheet
        const timeSpent = Math.floor((Date.now() - sessionStartTime.getTime()) / 1000)
        const completedWorksheet = masteryTracker.completeWorksheet(worksheet.id, userAnswers, timeSpent)
        if (completedWorksheet) {
          setIsCompleted(true)
          onComplete(completedWorksheet)
        }
      }
    }, 2000)
  }

  const handleNext = () => {
    if (currentExerciseIndex < totalExercises - 1) {
      setCurrentExerciseIndex(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(prev => prev - 1)
    }
  }

  const getMasteryColor = (verbId: string, form: ConjugationType) => {
    const mastery = masteryTracker.getMastery(verbId)
    const formScore = mastery.formScores[form] || 0
    
    if (formScore >= 80) return 'text-green-600'
    if (formScore >= 50) return 'text-yellow-600'
    return 'text-red-600'
  }

  if (isCompleted) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Worksheet Complete!</h2>
          <p className="text-gray-600 mb-6">
            Great job completing today's practice session.
          </p>
          <button
            onClick={onBack}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Study Plan
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← Back to Study Plan
          </button>
          <div className="text-right">
            <div className="text-sm text-gray-600">
              Exercise {currentExerciseIndex + 1} of {totalExercises}
            </div>
            <div className="text-lg font-semibold text-gray-800">
              {worksheet.title}
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Exercise */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Conjugate this verb to {getConjugationDisplayName(currentExercise.targetForm)}:
          </h3>
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {currentExercise.verb.dictionary}
          </div>
          <p className="text-gray-600 mb-2">{currentExercise.verb.meaning}</p>
          <div className="text-sm text-gray-500">
            Type: {currentExercise.verb.type} • Difficulty: {currentExercise.verb.difficultyLevel}
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
              value={userAnswers[currentExerciseIndex] || ''}
              onChange={(e) => setUserAnswers(prev => ({
                ...prev,
                [currentExerciseIndex]: e.target.value
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the conjugated form..."
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              disabled={showFeedback}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={showFeedback || !userAnswers[currentExerciseIndex]}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Check Answer
          </button>
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className={`mt-4 p-4 rounded-md ${
            userAnswers[currentExerciseIndex]?.toLowerCase() === currentExercise.correctAnswer?.toLowerCase()
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {userAnswers[currentExerciseIndex]?.toLowerCase() === currentExercise.correctAnswer?.toLowerCase() ? (
              <div>
                <p className="font-semibold">Correct! 🎉</p>
                <p>The answer is: {currentExercise.correctAnswer}</p>
              </div>
            ) : (
              <div>
                <p className="font-semibold">Incorrect</p>
                <p>The correct answer is: {currentExercise.correctAnswer}</p>
                <p>Your answer: {userAnswers[currentExerciseIndex]}</p>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrevious}
            disabled={currentExerciseIndex === 0}
            className={`px-4 py-2 rounded-md transition-colors ${
              currentExerciseIndex === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-600 text-white hover:bg-gray-700'
            }`}
          >
            Previous
          </button>
          
          <button
            onClick={handleNext}
            disabled={currentExerciseIndex === totalExercises - 1}
            className={`px-4 py-2 rounded-md transition-colors ${
              currentExerciseIndex === totalExercises - 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Mastery Info */}
      <div className="bg-gray-50 rounded-lg p-4 mt-6">
        <h4 className="font-semibold text-gray-800 mb-2">Mastery Information</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Overall Mastery:</span>
            <span className={`ml-2 font-semibold ${getMasteryColor(currentExercise.verb.dictionary, currentExercise.targetForm)}`}>
              {masteryTracker.getMastery(currentExercise.verb.dictionary).masteryScore}%
            </span>
          </div>
          <div>
            <span className="text-gray-600">Form Mastery:</span>
            <span className={`ml-2 font-semibold ${getMasteryColor(currentExercise.verb.dictionary, currentExercise.targetForm)}`}>
              {masteryTracker.getMastery(currentExercise.verb.dictionary).formScores[currentExercise.targetForm] || 0}%
            </span>
          </div>
          <div>
            <span className="text-gray-600">Practice Count:</span>
            <span className="ml-2 font-semibold">
              {masteryTracker.getMastery(currentExercise.verb.dictionary).practiceCount}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Accuracy:</span>
            <span className="ml-2 font-semibold">
              {masteryTracker.getMastery(currentExercise.verb.dictionary).totalAttempts > 0
                ? Math.round((masteryTracker.getMastery(currentExercise.verb.dictionary).correctAnswers / masteryTracker.getMastery(currentExercise.verb.dictionary).totalAttempts) * 100)
                : 0}%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
} 