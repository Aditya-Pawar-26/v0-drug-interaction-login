import { DrugSearchCard } from '@/components/drug-search-card'

export const metadata = {
  title: 'Drug Interaction Checker',
  description: 'Check for drug interactions and contraindications',
}

export default function CheckerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-slate-950 dark:to-teal-950 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Drug Interaction Checker</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Add medications to analyze potential interactions and contraindications.
          </p>
        </div>

        <DrugSearchCard />

        <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-400">
          <p>
            <strong>Note:</strong> This is a demonstration of the Drug Interaction Checker interface. The analysis results
            are simulated for preview purposes.
          </p>
        </div>
      </div>
    </div>
  )
}
