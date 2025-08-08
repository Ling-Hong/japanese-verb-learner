export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">日</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-800">
              Verb Learner
            </h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              Home
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              Progress
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              About
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
} 