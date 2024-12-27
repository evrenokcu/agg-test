import { Button } from "@/components/ui/button"
import { Scale } from 'lucide-react'

interface AssessCompareButtonProps {
  onAssessCompare: () => void
}

export function AssessCompareButton({ onAssessCompare }: AssessCompareButtonProps) {
  return (
    <Button
      onClick={onAssessCompare}
      className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
    >
      <Scale className="w-5 h-5 mr-2" />
      Assess and Compare
    </Button>
  )
}

