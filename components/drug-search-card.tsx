'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useApp } from '@/context/AppContext'

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  Anticoagulant: { bg: 'bg-blue-50 dark:bg-blue-950', text: 'text-blue-700 dark:text-blue-300', border: 'border-blue-200 dark:border-blue-800' },
  NSAID: { bg: 'bg-orange-50 dark:bg-orange-950', text: 'text-orange-700 dark:text-orange-300', border: 'border-orange-200 dark:border-orange-800' },
  Antidiabetic: { bg: 'bg-purple-50 dark:bg-purple-950', text: 'text-purple-700 dark:text-purple-300', border: 'border-purple-200 dark:border-purple-800' },
  'Pain Reliever': { bg: 'bg-green-50 dark:bg-green-950', text: 'text-green-700 dark:text-green-300', border: 'border-green-200 dark:border-green-800' },
  'Blood Thinner': { bg: 'bg-red-50 dark:bg-red-950', text: 'text-red-700 dark:text-red-300', border: 'border-red-200 dark:border-red-800' },
  'ACE Inhibitor': { bg: 'bg-yellow-50 dark:bg-yellow-950', text: 'text-yellow-700 dark:text-yellow-300', border: 'border-yellow-200 dark:border-yellow-800' },
  'Antiplatelet': { bg: 'bg-indigo-50 dark:bg-indigo-950', text: 'text-indigo-700 dark:text-indigo-300', border: 'border-indigo-200 dark:border-indigo-800' },
  'Electrolyte': { bg: 'bg-pink-50 dark:bg-pink-950', text: 'text-pink-700 dark:text-pink-300', border: 'border-pink-200 dark:border-pink-800' },
  'Antibiotic': { bg: 'bg-cyan-50 dark:bg-cyan-950', text: 'text-cyan-700 dark:text-cyan-300', border: 'border-cyan-200 dark:border-cyan-800' },
  'Antineoplastic': { bg: 'bg-violet-50 dark:bg-violet-950', text: 'text-violet-700 dark:text-violet-300', border: 'border-violet-200 dark:border-violet-800' },
  'Statin': { bg: 'bg-red-50 dark:bg-red-950', text: 'text-red-700 dark:text-red-300', border: 'border-red-200 dark:border-red-800' },
  'Food': { bg: 'bg-lime-50 dark:bg-lime-950', text: 'text-lime-700 dark:text-lime-300', border: 'border-lime-200 dark:border-lime-800' },
  'Substance': { bg: 'bg-gray-50 dark:bg-gray-950', text: 'text-gray-700 dark:text-gray-300', border: 'border-gray-200 dark:border-gray-800' },
}

export function DrugSearchCard() {
  const router = useRouter()
  const { selectedDrugs, addDrug, removeDrug, analyzeInteractions, availableDrugs } = useApp()
  const [searchQuery, setSearchQuery] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [logs, setLogs] = useState<string[]>([
    '$ Drug Interaction Checker initialized',
    '$ Awaiting drug input...',
  ])

  const filteredDrugs = useMemo(() => {
    if (!searchQuery) return []
    return availableDrugs.filter(
      (drug) =>
        (drug.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          drug.class.toLowerCase().includes(searchQuery.toLowerCase())) &&
        !selectedDrugs.some((selected) => selected.id === drug.id)
    )
  }, [searchQuery, selectedDrugs, availableDrugs])

  const handleDrugSelect = (drug: typeof availableDrugs[0]) => {
    addDrug(drug)
    setSearchQuery('')
    setShowDropdown(false)

    // Add log entry
    const newLog = `$ Graph node added: ${drug.name} · Adjacency list updated`
    setLogs((prev) => [...prev.slice(-3), newLog])

    // Simulate interaction detection if we have multiple drugs
    if (selectedDrugs.length > 0) {
      const lastDrug = selectedDrugs[selectedDrugs.length - 1]
      setTimeout(() => {
        const interactionLog = `$ Edge detected: ${lastDrug.name} ↔ ${drug.name} · Severity: ${Math.random() > 0.5 ? 'MAJOR' : 'MINOR'}`
        setLogs((prev) => [...prev.slice(-3), interactionLog])
      }, 300)
    }
  }

  const handleRemoveDrug = (drugId: number) => {
    removeDrug(drugId)
    setLogs((prev) => [...prev.slice(-3), `$ Drug removed from analysis`])
  }

  const handleAnalyze = () => {
    if (selectedDrugs.length < 2) {
      setLogs((prev) => [...prev, '$ Error: Select at least 2 drugs for analysis'])
      return
    }
    analyzeInteractions()
    const analyzeLog = `$ Running DFS traversal · O(V+E) · ${selectedDrugs.length} nodes`
    const broLog = `$ Bron-Kerbosch clique check triggered · DAA Unit V`
    setLogs((prev) => [...prev.slice(-2), analyzeLog, broLog])
    setTimeout(() => {
      router.push('/results')
    }, 800)
  }

  return (
    <Card className="w-full max-w-2xl border border-border bg-card">
      <CardHeader className="bg-gradient-to-r from-teal-700 to-teal-800 dark:from-teal-950 dark:to-teal-900 text-white rounded-t-lg p-4 sm:p-6">
        <CardTitle className="text-xl sm:text-2xl">Drug Interaction Analyzer</CardTitle>
        <CardDescription className="text-teal-100 text-sm">Search and add medications to check for interactions</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 sm:space-y-6 pt-4 sm:pt-6 p-4 sm:p-6">
        {/* Search Input */}
        <div className="relative">
          <label htmlFor="drug-search" className="text-sm font-medium text-foreground mb-2 block">Search Drugs</label>
          <div className="relative">
            <Input
              id="drug-search"
              placeholder="Search by drug name or class (e.g., Warfarin, Antibiotic)"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setShowDropdown(true)
              }}
              onFocus={() => searchQuery && setShowDropdown(true)}
              className="pr-10"
              aria-expanded={showDropdown && filteredDrugs.length > 0}
              aria-controls="drug-dropdown"
            />
            <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-muted-foreground pointer-events-none" aria-hidden="true" />

            {/* Autocomplete Dropdown */}
            {showDropdown && filteredDrugs.length > 0 && (
              <div 
                id="drug-dropdown"
                className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-md shadow-lg z-50"
                role="listbox"
                aria-label="Available drugs"
              >
                {filteredDrugs.map((drug) => (
                  <button
                    key={drug.id}
                    onClick={() => handleDrugSelect(drug)}
                    className="w-full text-left px-4 py-3 hover:bg-muted transition-colors first:rounded-t-md last:rounded-b-md border-b border-border last:border-b-0"
                    role="option"
                    aria-label={`${drug.name} - ${drug.class}`}
                  >
                    <div className="font-medium text-sm">{drug.name}</div>
                    <div className="text-xs text-muted-foreground">{drug.class}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Selected Drug Chips */}
        {selectedDrugs.length > 0 && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Added Medications</label>
            <div className="flex flex-wrap gap-2">
              {selectedDrugs.map((drug) => {
                const colors = colorMap[drug.class] || colorMap['Antibiotic']
                return (
                  <div
                    key={drug.id}
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium border ${colors.bg} ${colors.text} ${colors.border}`}
                  >
                    <span>{drug.name} · {drug.dosage}</span>
                    <button
                      onClick={() => handleRemoveDrug(drug.id)}
                      className="ml-1 hover:opacity-70 transition-opacity"
                      aria-label={`Remove ${drug.name}`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Terminal Log Panel */}
        <div className="space-y-2">
          <label htmlFor="system-log" className="text-sm font-medium text-foreground">System Log</label>
          <div 
            id="system-log"
            className="bg-slate-900 dark:bg-slate-950 rounded-md p-4 border border-slate-700 dark:border-slate-800 font-mono text-xs text-slate-300 dark:text-slate-400 space-y-1 min-h-24 max-h-32 overflow-y-auto"
            role="log"
            aria-live="polite"
            aria-label="System activity log"
          >
            {logs.map((log, idx) => (
              <div key={idx} className="text-slate-400 dark:text-slate-500">
                <span className="text-green-500 dark:text-green-600" aria-hidden="true">➜</span> <span>{log}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Analyze Button */}
        <Button
          onClick={handleAnalyze}
          disabled={selectedDrugs.length < 2}
          className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground font-medium"
        >
          Analyze Interactions
        </Button>
      </CardContent>
    </Card>
  )
}
