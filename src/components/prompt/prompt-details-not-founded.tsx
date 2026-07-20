import {
   
 ArrowLeft
} from 'lucide-react';


export function NotFound({ onBack }: { onBack?: () => void }) {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-2xl mx-auto">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-800 mb-6 transition-colors"
          >
            <ArrowLeft size={15} /> Back
          </button>
        )}
        <div className="flex flex-col items-center justify-center py-32 gap-3 text-gray-400">
          <span className="text-6xl select-none">🔍</span>
          <p className="text-base font-semibold text-gray-600">Prompt not found</p>
          <p className="text-sm">This prompt may have been removed or doesn't exist.</p>
        </div>
      </div>
    </div>
  )
}