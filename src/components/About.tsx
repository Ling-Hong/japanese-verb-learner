'use client'

interface AboutProps {
  onClose: () => void
}

export default function About({ onClose }: AboutProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">About Japanese Verb Conjugation Learner</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">🎯 What is this app?</h3>
              <p className="text-gray-600 leading-relaxed">
                Japanese Verb Conjugation Learner is an interactive web application designed to help you master 
                Japanese verb conjugations through systematic practice and structured learning. Whether you're 
                a beginner or intermediate learner, this app provides comprehensive coverage of all 18 major 
                Japanese verb conjugation forms.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">📚 Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><strong>Practice Mode:</strong> Free practice with any of the 18 conjugation forms</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><strong>Structured Study:</strong> 2-week comprehensive study plan covering all forms</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><strong>Mastery Tracking:</strong> Monitor your progress and identify areas for improvement</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><strong>100+ Verbs:</strong> Extensive verb database with difficulty levels</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><strong>Adaptive Learning:</strong> System prioritizes verbs you need to practice most</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">🗣️ Verb Types Covered</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Ichidan (一段)</h4>
                  <p className="text-blue-700 text-sm">Verbs ending in -る (e.g., 食べる, 見る)</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Godan (五段)</h4>
                  <p className="text-green-700 text-sm">Verbs ending in -u (e.g., 行く, 話す)</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">Irregular</h4>
                  <p className="text-purple-700 text-sm">する, 来る, and compound verbs</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">📖 Conjugation Forms</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Basic Forms</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Dictionary form (基本形)</li>
                    <li>• Polite present (ます形)</li>
                    <li>• Polite past (ました)</li>
                    <li>• Plain past (た形)</li>
                    <li>• Te-form (て形)</li>
                    <li>• Negative forms (ない形)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Advanced Forms</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Potential (可能形)</li>
                    <li>• Volitional (意向形)</li>
                    <li>• Passive (受け身形)</li>
                    <li>• Causative (使役形)</li>
                    <li>• Conditional (〜たら, 〜ば)</li>
                    <li>• And more...</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">💡 How to Use</h3>
              <ol className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 font-semibold">1.</span>
                  <span>Start with <strong>Practice Mode</strong> to get familiar with different conjugation forms</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 font-semibold">2.</span>
                  <span>Follow the <strong>Structured Study</strong> plan for systematic learning over 2 weeks</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 font-semibold">3.</span>
                  <span>Check your <strong>Mastery Dashboard</strong> to track progress and identify weak areas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 font-semibold">4.</span>
                  <span>Practice regularly to build muscle memory and improve accuracy</span>
                </li>
              </ol>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">🎯 Recommended Learning Path</h3>
              <p className="text-yellow-700 text-sm">
                For best results, we recommend starting with the <strong>Structured Study</strong> plan. 
                This 2-week program systematically covers all conjugation forms with daily practice sessions, 
                ensuring comprehensive mastery of Japanese verb conjugations.
              </p>
            </div>

            <div className="text-center pt-4">
              <button
                onClick={onClose}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 