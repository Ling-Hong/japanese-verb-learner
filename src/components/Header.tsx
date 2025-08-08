interface HeaderProps {
  onHomeClick?: () => void
  onProgressClick?: () => void
  onAboutClick?: () => void
}

export default function Header({ onHomeClick, onProgressClick, onAboutClick }: HeaderProps) {
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
            <button 
              onClick={onHomeClick}
              className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
            >
              Home
            </button>
            <button 
              onClick={onProgressClick}
              className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
            >
              Progress
            </button>
            <button 
              onClick={onAboutClick}
              className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
            >
              About
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
} 