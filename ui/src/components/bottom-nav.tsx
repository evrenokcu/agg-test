import { Eye, LayoutGrid, SpaceIcon as Planet, User } from 'lucide-react'

export function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700">
      <div className="flex justify-around items-center h-16">
        <button className="flex flex-col items-center gap-1">
          <Eye className="w-6 h-6 text-gray-400" />
          <span className="text-xs text-gray-400">Overview</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <LayoutGrid className="w-6 h-6 text-gray-400" />
          <span className="text-xs text-gray-400">Stream</span>
        </button>
        <button className="flex flex-col items-center justify-center w-14 h-14 rounded-full bg-white -mt-6">
          <div className="w-1.5 h-1.5 bg-black rounded-full" />
        </button>
        <button className="flex flex-col items-center gap-1">
          <Planet className="w-6 h-6 text-gray-400" />
          <span className="text-xs text-gray-400">Knowledge</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <User className="w-6 h-6 text-gray-400" />
          <span className="text-xs text-gray-400">Profile</span>
        </button>
      </div>
    </div>
  )
}

