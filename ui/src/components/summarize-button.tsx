import { Button } from "@/components/ui/button"
import { Sparkles } from 'lucide-react'

interface SummarizeButtonProps {
  onSummarize: () => void
}

export function SummarizeButton({ onSummarize }: SummarizeButtonProps) {
  return (
    <Button 
      onClick={onSummarize}
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
    >
      <Sparkles className="w-5 h-5 mr-2" />
      Summarize Responses
    </Button>
  )
}

