'use client'

import { useState, useEffect } from 'react'
import { masteryTracker } from '@/utils/masteryTracker'
import { masterVerbList } from '@/data/masterVerbList'
import { Verb, ConjugationType } from '@/types/verb'
import { getConjugationDisplayName } from '@/utils/verbUtils'

interface MasteryDashboardProps {
  onClose: () => void
}

export default function MasteryDashboard({ onClose }: MasteryDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'verbs' | 'forms' | 'export'>('overview')
  const [selectedVerb, setSelectedVerb] = useState<Verb | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  // Force refresh when component mounts
  useEffect(() => {
    setRefreshKey(prev => prev + 1)
  }, [])

  const stats = masteryTracker.getMasteryStats()
  const verbsNeedingPractice = masteryTracker.getVerbsNeedingPractice(10)

  const getMasteryColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 50) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getMasteryBarColor = (score: number) => {
    if (score >= 80) return 'bg-green-500'
    if (score >= 50) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const exportData = () => {
    const data = masteryTracker.exportMasteryData()
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `japanese-verb-mastery-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        masteryTracker.importMasteryData(data)
        window.location.reload() // Refresh to show updated data
      } catch (error) {
        alert('Error importing data. Please check the file format.')
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Mastery Dashboard</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b mb-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'overview'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('verbs')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'verbs'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Verb Mastery
            </button>
            <button
              onClick={() => setActiveTab('forms')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'forms'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Form Analysis
            </button>
            <button
              onClick={() => setActiveTab('export')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'export'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Export/Import
            </button>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">{stats.totalVerbs}</div>
                  <div className="text-sm text-blue-700">Verbs Practiced</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">{stats.averageMastery}%</div>
                  <div className="text-sm text-green-700">Average Mastery</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">{stats.recentlyPracticed}</div>
                  <div className="text-sm text-purple-700">Recently Practiced</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-yellow-600">{stats.notPracticed}</div>
                  <div className="text-sm text-yellow-700">Not Practiced</div>
                </div>
              </div>

              {/* Mastery Distribution */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-4">Mastery Distribution</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Beginner (0-30%)</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-red-500 h-2 rounded-full"
                          style={{ width: `${(stats.masteryDistribution.beginner / masterVerbList.length) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold">{stats.masteryDistribution.beginner}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Intermediate (31-70%)</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{ width: `${(stats.masteryDistribution.intermediate / masterVerbList.length) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold">{stats.masteryDistribution.intermediate}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Advanced (71-100%)</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${(stats.masteryDistribution.advanced / masterVerbList.length) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold">{stats.masteryDistribution.advanced}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verbs Needing Practice */}
              <div className="bg-orange-50 p-6 rounded-lg">
                <h3 className="font-semibold text-orange-800 mb-4">Verbs Needing Practice</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {verbsNeedingPractice.map(verb => (
                    <div key={verb.dictionary} className="bg-white p-3 rounded-lg border">
                      <div className="font-semibold text-gray-800">{verb.dictionary}</div>
                      <div className="text-sm text-gray-600">{verb.meaning}</div>
                      <div className="text-xs text-gray-500">{verb.type} • {verb.difficultyLevel}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Verb Mastery Tab */}
          {activeTab === 'verbs' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-800">Verb Mastery Details</h3>
                <input
                  type="text"
                  placeholder="Search verbs..."
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-900 bg-white"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                {masterVerbList.map(verb => {
                  const mastery = masteryTracker.getMastery(verb.dictionary)
                  return (
                    <div 
                      key={verb.dictionary} 
                      className="bg-gray-50 p-4 rounded-lg border cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => setSelectedVerb(verb)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-semibold text-gray-800">{verb.dictionary}</div>
                        <span className={`text-sm font-semibold ${getMasteryColor(mastery.masteryScore)}`}>
                          {mastery.masteryScore}%
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">{verb.meaning}</div>
                      <div className="text-xs text-gray-500 mb-2">
                        {verb.type} • {verb.difficultyLevel} • {mastery.practiceCount} practices
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div 
                          className={`h-1 rounded-full ${getMasteryBarColor(mastery.masteryScore)}`}
                          style={{ width: `${mastery.masteryScore}%` }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Form Analysis Tab */}
          {activeTab === 'forms' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-gray-800">Form Mastery Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(['dictionary', 'masu', 'masu_past', 'ta', 'te', 'nai', 'nai_past', 'te_iru', 'potential', 'volitional', 'passive', 'causative', 'causative_passive', 'imperative', 'prohibitive', 'conditional_tara', 'conditional_ba', 'conjectural', 'desire', 'ease_yasui', 'ease_nikui'] as ConjugationType[]).map(form => {
                  let totalScore = 0
                  let practicedCount = 0
                  
                  masterVerbList.forEach(verb => {
                    const mastery = masteryTracker.getMastery(verb.dictionary)
                    const formScore = mastery.formScores[form] || 0
                    if (formScore > 0) {
                      totalScore += formScore
                      practicedCount++
                    }
                  })
                  
                  const averageScore = practicedCount > 0 ? Math.round(totalScore / practicedCount) : 0
                  
                  return (
                    <div key={form} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-semibold text-gray-800">{getConjugationDisplayName(form)}</div>
                        <span className={`text-sm font-semibold ${getMasteryColor(averageScore)}`}>
                          {averageScore}%
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mb-2">
                        {practicedCount} verbs practiced
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div 
                          className={`h-1 rounded-full ${getMasteryBarColor(averageScore)}`}
                          style={{ width: `${averageScore}%` }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Export/Import Tab */}
          {activeTab === 'export' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-gray-800">Data Management</h3>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Export Mastery Data</h4>
                <p className="text-blue-700 mb-4">
                  Download your mastery data as a JSON file for backup or analysis.
                </p>
                <button
                  onClick={exportData}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Export Data
                </button>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Import Mastery Data</h4>
                <p className="text-green-700 mb-4">
                  Import previously exported mastery data to restore your progress.
                </p>
                <input
                  type="file"
                  accept=".json"
                  onChange={importData}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700"
                />
              </div>
              
              <div className="bg-red-50 p-6 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">Reset All Data</h4>
                <p className="text-red-700 mb-4">
                  Warning: This will permanently delete all mastery data and progress.
                </p>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
                      masteryTracker.resetData()
                      window.location.reload()
                    }
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  Reset All Data
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 