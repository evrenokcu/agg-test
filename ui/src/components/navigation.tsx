"use client"

import { Search, Menu } from 'lucide-react'
import { TabOption } from "@/types/aggregator"

interface NavigationProps {
  activeTab: TabOption
  onTabChange: (tab: TabOption) => void
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-gray-800 border-b border-gray-700">
      <div className="flex items-center">
        <h1 className="text-xl font-bold mr-8">Omvi</h1>
        <div className="flex space-x-2 bg-gray-700 rounded-full p-1">
          {["Continuous", "Considered"].map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab as TabOption)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-gray-900 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Search className="w-6 h-6 text-gray-400" />
        <Menu className="w-6 h-6 text-gray-400" />
      </div>
    </div>
  )
}

