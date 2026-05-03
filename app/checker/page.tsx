'use client'

import { DrugSearchCard } from '@/components/drug-search-card'
import { DrugGraph } from '@/components/DrugGraph'
import { useApp } from '@/context/AppContext'

export default function CheckerPage() {
  const { selectedDrugs, interactionResults } = useApp()

  // Extract drug names from selected drugs
  const drugNames = selectedDrugs.map((drug) => drug.name)

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-slate-950 dark:to-teal-950 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Drug Interaction Checker</h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Add medications to analyze potential interactions and contraindications.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Search Card */}
          <div>
            <DrugSearchCard />
          </div>

          {/* Right: Interaction Graph */}
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Interaction Graph</h2>
            <DrugGraph drugs={drugNames} interactions={interactionResults} />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-400">
          <p>
            <strong>Graph Legend:</strong> Teal nodes = drugs | Red edges (thick) = major interactions | Yellow edges (medium) = moderate | Green edges (thin) = minor | Pulsing glow = major interaction present
          </p>
        </div>
      </div>
    </div>
  )
}
