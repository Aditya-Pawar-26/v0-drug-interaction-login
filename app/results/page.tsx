'use client';

import { InteractionResultsPanel } from '@/components/interaction-results-panel';

export default function ResultsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-8">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-balance">
            Interaction Analysis Complete
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Review the comprehensive interaction report and risk assessment below
          </p>
        </div>

        <div className="bg-white dark:bg-slate-950 rounded-lg shadow-lg overflow-hidden">
          <InteractionResultsPanel />
        </div>

        <div className="mt-8 flex gap-4 justify-center">
          <button className="px-6 py-3 bg-[#0f3638] hover:bg-[#0a2325] text-white font-semibold rounded-lg transition-colors">
            Download Report
          </button>
          <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 font-semibold rounded-lg transition-colors">
            New Analysis
          </button>
        </div>
      </div>
    </main>
  );
}
