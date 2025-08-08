'use client'

import { useState } from 'react'
import { studyPlan, getTotalDays } from '@/data/studyPlan'
import { StudyProgress } from '@/types/verb'

interface ProgressTrackerProps {
  progress: StudyProgress
  onClose: () => void
}

export default function ProgressTracker({ progress, onClose }: ProgressTrackerProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'achievements'>('overview')

  const totalDays = getTotalDays()
  const completedDays = progress.completedDays.length
  const progressPercentage = Math.round((completedDays / totalDays) * 100)
  
  const averageScore = completedDays > 0 
    ? Object.values(progress.scores).reduce((sum, score) => sum + score, 0) / completedDays
    : 0

  const totalStudyTime = Object.values(progress.timeRecords).reduce((sum, time) => sum + time, 0)
  const averageTimePerDay = completedDays > 0 ? totalStudyTime / completedDays : 0

  const getWeekProgress = (week: number) => {
    const weekData = studyPlan.find(w => w.week === week)
    if (!weekData) return 0
    
    const weekDays = weekData.days.map(d => d.day)
    const completedWeekDays = progress.completedDays.filter(day => weekDays.includes(day))
    return Math.round((completedWeekDays.length / weekDays.length) * 100)
  }

  const getAchievements = () => {
    const achievements = []
    
    if (completedDays >= 1) achievements.push({ title: 'First Steps', description: 'Completed your first day', icon: '🎯' })
    if (completedDays >= 7) achievements.push({ title: 'Week Warrior', description: 'Completed Week 1', icon: '📅' })
    if (completedDays >= 14) achievements.push({ title: 'Master Learner', description: 'Completed the full cycle', icon: '🏆' })
    if (averageScore >= 8) achievements.push({ title: 'High Scorer', description: 'Maintained high accuracy', icon: '⭐' })
    if (totalStudyTime >= 1200) achievements.push({ title: 'Dedicated Student', description: 'Studied for 20+ minutes total', icon: '⏰' })
    
    return achievements
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Study Progress</h2>
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
              onClick={() => setActiveTab('details')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'details'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Details
            </button>
            <button
              onClick={() => setActiveTab('achievements')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'achievements'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Achievements
            </button>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Overall Progress */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Overall Progress</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-blue-600">Days Completed</span>
                  <span className="font-semibold text-blue-800">{completedDays} / {totalDays}</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-3">
                  <div 
                    className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <div className="text-center mt-2">
                  <span className="text-lg font-bold text-blue-800">{progressPercentage}%</span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">{averageScore.toFixed(1)}</div>
                  <div className="text-sm text-green-700">Average Score</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">{Math.round(averageTimePerDay / 60)}</div>
                  <div className="text-sm text-purple-700">Avg Minutes/Day</div>
                </div>
              </div>

              {/* Week Progress */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800">Week Progress</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Week 1</span>
                      <span className="font-semibold text-gray-800">{getWeekProgress(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${getWeekProgress(1)}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Week 2</span>
                      <span className="font-semibold text-gray-800">{getWeekProgress(2)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${getWeekProgress(2)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Details Tab */}
          {activeTab === 'details' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 mb-4">Daily Performance</h3>
              <div className="space-y-3">
                {studyPlan.flatMap(week => week.days).map(day => {
                  const isCompleted = progress.completedDays.includes(day.day)
                  const score = progress.scores[day.day] || 0
                  const time = progress.timeRecords[day.day] || 0
                  
                  return (
                    <div key={day.day} className={`p-3 rounded-lg border ${
                      isCompleted ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                    }`}>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold text-gray-800">Day {day.day}: {day.title}</div>
                          <div className="text-sm text-gray-600">{day.description}</div>
                        </div>
                        <div className="text-right">
                          {isCompleted ? (
                            <>
                              <div className="text-sm text-green-600">Score: {score}</div>
                              <div className="text-xs text-gray-500">{Math.round(time / 60)}m</div>
                            </>
                          ) : (
                            <div className="text-sm text-gray-500">Not started</div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 mb-4">Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getAchievements().map((achievement, index) => (
                  <div key={index} className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div>
                        <div className="font-semibold text-yellow-800">{achievement.title}</div>
                        <div className="text-sm text-yellow-700">{achievement.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {getAchievements().length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-4">🎯</div>
                  <p>Complete more days to unlock achievements!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 