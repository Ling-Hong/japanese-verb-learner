'use client'

import { useState } from 'react'
import VerbPractice from '@/components/VerbPractice'
import StructuredStudy from '@/components/StructuredStudy'
import MasteryDashboard from '@/components/MasteryDashboard'
import Header from '@/components/Header'

type AppMode = 'menu' | 'learn' | 'practice' | 'structured' | 'mastery'

export default function Home() {
  const [currentMode, setCurrentMode] = useState<AppMode>('menu')

  if (currentMode === 'structured') {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <StructuredStudy onBack={() => setCurrentMode('menu')} />
        </div>
      </main>
    )
  }

  if (currentMode === 'mastery') {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <MasteryDashboard onClose={() => setCurrentMode('menu')} />
        </div>
      </main>
    )
  }

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
          
          {currentMode === 'menu' ? (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Choose Your Learning Mode</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg text-center hover:bg-blue-100 transition-colors cursor-pointer" onClick={() => setCurrentMode('learn')}>
                  <div className="text-3xl mb-4">📚</div>
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Learn</h3>
                  <p className="text-blue-700 text-sm">Study verb types and conjugation rules</p>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg text-center hover:bg-green-100 transition-colors cursor-pointer" onClick={() => setCurrentMode('practice')}>
                  <div className="text-3xl mb-4">🎯</div>
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Practice</h3>
                  <p className="text-green-700 text-sm">Free practice with any conjugation form</p>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg text-center hover:bg-purple-100 transition-colors cursor-pointer" onClick={() => setCurrentMode('structured')}>
                  <div className="text-3xl mb-4">📅</div>
                  <h3 className="text-lg font-semibold text-purple-800 mb-2">Structured Study</h3>
                  <p className="text-purple-700 text-sm">Follow the 2-week comprehensive study plan</p>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg text-center hover:bg-orange-100 transition-colors cursor-pointer" onClick={() => setCurrentMode('mastery')}>
                  <div className="text-3xl mb-4">📊</div>
                  <h3 className="text-lg font-semibold text-orange-800 mb-2">Mastery Dashboard</h3>
                  <p className="text-orange-700 text-sm">Track your progress and mastery scores</p>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">🎯 Recommended: Structured Study</h4>
                <p className="text-yellow-700 text-sm">
                  Follow our comprehensive 2-week cycle covering all 18 conjugation forms. 
                  Each day focuses on specific forms with targeted practice and real-world application.
                </p>
              </div>
            </div>
          ) : (
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
              
              <VerbPractice mode={currentMode === 'learn' ? 'learn' : 'practice'} />
            </div>
          )}
        </div>
      </div>
    </main>
  )
} 