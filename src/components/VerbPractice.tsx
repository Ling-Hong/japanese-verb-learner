'use client'

import { useState, useEffect } from 'react'
import { getRandomVerb, conjugateVerb, getConjugationDisplayName } from '@/utils/verbUtils'
import { Verb, ConjugationType } from '@/types/verb'
import { masteryTracker } from '@/utils/masteryTracker'

export default function VerbPractice() {
  const [currentVerb, setCurrentVerb] = useState<Verb | null>(null)
  const [conjugationType, setConjugationType] = useState<ConjugationType>('dictionary')
  const [userAnswer, setUserAnswer] = useState('')
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [totalAttempts, setTotalAttempts] = useState(0)

  useEffect(() => {
    loadNewVerb()
  }, [])

  const loadNewVerb = () => {
    const verb = getRandomVerb()
    setCurrentVerb(verb)
    setUserAnswer('')
    setIsCorrect(null)
  }

  const handleSubmit = () => {
    if (!currentVerb) return

    const correctAnswer = conjugateVerb(currentVerb, conjugationType)
    const isAnswerCorrect = userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase()
    
    // Update mastery tracking
    masteryTracker.updateMastery(currentVerb.dictionary, conjugationType, isAnswerCorrect)
    
    setIsCorrect(isAnswerCorrect)
    setTotalAttempts(prev => prev + 1)
    
    if (isAnswerCorrect) {
      setScore(prev => prev + 1)
    }
  }

  const handleNext = () => {
    loadNewVerb()
  }



  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Practice Mode</h2>
        <div className="flex justify-center space-x-4 text-sm text-gray-600">
          <span>Score: {score}/{totalAttempts}</span>
          <span>Accuracy: {totalAttempts > 0 ? Math.round((score / totalAttempts) * 100) : 0}%</span>
        </div>
      </div>

      {currentVerb && (
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Conjugate this verb to {getConjugationDisplayName(conjugationType)}:
            </h3>
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {currentVerb.dictionary}
            </div>
            <p className="text-gray-600">{currentVerb.meaning}</p>
          </div>

          <div className="flex flex-col space-y-4">
            <div>
              <label htmlFor="conjugation-type" className="block text-sm font-medium text-gray-700 mb-1">
                Conjugation Type:
              </label>
              <select
                id="conjugation-type"
                value={conjugationType}
                onChange={(e) => {
                  setConjugationType(e.target.value as ConjugationType)
                  setUserAnswer('') // Clear input when conjugation type changes
                  setIsCorrect(null) // Reset answer state
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
              >
                <option value="dictionary">基本形 (Dictionary)</option>
                <option value="masu">ます形 (Polite Present)</option>
                <option value="masu_past">ました (Polite Past)</option>
                <option value="ta">た形 (Plain Past)</option>
                <option value="te">て形 (Te-form)</option>
                <option value="nai">ない形 (Negative Present)</option>
                <option value="nai_past">なかった (Negative Past)</option>
                <option value="te_iru">〜ている (Progressive)</option>
                <option value="potential">可能形 (Potential)</option>
                <option value="volitional">意向形 (Volitional)</option>
                <option value="passive">受け身形 (Passive)</option>
                <option value="causative">使役形 (Causative)</option>
                <option value="causative_passive">使役受け身形 (Causative-Passive)</option>
                <option value="imperative">命令形 (Imperative)</option>
                <option value="prohibitive">〜な (Prohibitive)</option>
                <option value="conditional_tara">〜たら (Conditional)</option>
                <option value="conditional_ba">〜ば (Conditional)</option>
                <option value="conjectural">〜だろう (Conjectural)</option>
                <option value="desire">〜たい (Desire)</option>
                <option value="ease_yasui">〜やすい (Easy)</option>
                <option value="ease_nikui">〜にくい (Difficult)</option>
              </select>
            </div>

            <div>
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
                  <p>The answer is: {conjugateVerb(currentVerb, conjugationType)}</p>
                </div>
              ) : (
                <div>
                  <p className="font-semibold">Incorrect</p>
                  <p>The correct answer is: {conjugateVerb(currentVerb, conjugationType)}</p>
                </div>
              )}
              <button
                onClick={handleNext}
                className="mt-2 bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700 transition-colors"
              >
                Next Verb
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
} 