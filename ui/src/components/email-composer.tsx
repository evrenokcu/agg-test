"use client"

import { X, MoreHorizontal } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function EmailComposer() {
  return (
    <div className="fixed inset-0 bg-gray-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center">
            <span className="text-sm">T</span>
          </div>
          <span className="font-medium">Timothy</span>
          <span className="text-emerald-500 text-sm">In Focus</span>
          <span className="text-gray-400 text-sm">1m</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 p-4">
        <Button className="bg-white text-black hover:bg-gray-200 px-8">Send</Button>
        <Button variant="secondary" className="px-8">Schedule</Button>
        <Button variant="secondary" className="px-8">Save Draft</Button>
      </div>

      {/* Email Form */}
      <div className="p-4 space-y-6">
        <div className="space-y-1">
          <label className="text-sm text-gray-400">To:</label>
          <Input 
            type="email" 
            value="tim.georgios@gmail.com"
            className="bg-transparent border-0 border-b border-gray-800 rounded-none px-0 text-white"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-400">Subject:</label>
          <Input 
            type="text"
            value="Thank you for your valuable insights!"
            className="bg-transparent border-0 border-b border-gray-800 rounded-none px-0 text-white"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-400">Body:</label>
          <Textarea 
            className="bg-transparent border-0 min-h-[300px] text-white resize-none"
            value={`Dear Timothy Georgios,

Thank you for taking the time to discuss the potential collaboration between our company and Mercedes-Benz. We appreciate your honesty regarding the marketing strategies and future plans. We look forward to receiving the strategy document from you soon. Once we review it, we will prepare a proposal for the Asimov initiative. Thank you once again for your support and cooperation.`}
          />
        </div>
      </div>

      {/* Sphere Visualization */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
        <div className="w-12 h-12 relative">
          <div className="absolute inset-0 animate-pulse">
            <svg width="48" height="48" viewBox="0 0 48 48">
              <g transform="translate(24 24)">
                <path
                  d="M0,-24 A24,24 0 1,1 0,24 A24,24 0 1,1 0,-24"
                  fill="none"
                  stroke="url(#sphereGradient)"
                  strokeWidth="0.5"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0"
                    to="360"
                    dur="8s"
                    repeatCount="indefinite"
                  />
                </path>
              </g>
              <defs>
                <linearGradient id="sphereGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#9333EA" stopOpacity="0.2" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

