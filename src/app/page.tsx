'use client'

import { useState } from 'react'
import VerbPractice from '@/components/VerbPractice'
import Header from '@/components/Header'

export default function Home() {
  const [currentMode, setCurrentMode] = useState<'practice' | 'learn'>('learn')

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Japanese Verb Conjugation Learner
            </h1>
            <p className="text-lg text-gray-600">
              Master Japanese verb conjugations through interactive practice
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-center mb-6">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setCurrentMode('learn')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    currentMode === 'learn'
                      ? 'bg-white shadow-sm text-blue-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Learn
                </button>
                <button
                  onClick={() => setCurrentMode('practice')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    currentMode === 'practice'
                      ? 'bg-white shadow-sm text-blue-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Practice
                </button>
              </div>
            </div>
            
            <VerbPractice mode={currentMode} />
          </div>
        </div>
      </div>
    </main>
  )
} 