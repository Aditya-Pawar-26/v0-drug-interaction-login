'use client'

import { useState, useMemo } from 'react'
import { X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

interface Drug {
  id: string
  name: string
  class: string
  color: 'blue' | 'orange' | 'purple' | 'green' | 'red'
}

const drugDatabase: Drug[] = [
  { id: '1', name: 'Warfarin', class: 'Anticoagulant', color: 'blue' },
  { id: '2', name: 'Aspirin', class: 'NSAID', color: 'orange' },
  { id: '3', name: 'Ibuprofen', class: 'NSAID', color: 'orange' },
  { id: '4', name: 'Metformin', class: 'Antidiabetic', color: 'purple' },
  { id: '5', name: 'Lisinopril', class: 'ACE Inhibitor', color: 'green' },
  { id: '6', name: 'Atorvastatin', class: 'Statin', color: 'red' },
  { id: '7', name: 'Amoxicillin', class: 'Antibiotic', color: 'blue' },
  { id: '8', name: 'Amlodipine', class: 'Calcium Channel Blocker', color: 'green' },
  { id: '9', name: 'Diclofenac', class: 'NSAID', color: 'orange' },
  { id: '10', name: 'Glibenclamide', class: 'Antidiabetic', color: 'purple' },
]

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: 'bg-blue-50 dark:bg-blue-950', text: 'text-blue-700 dark:text-blue-300', border: 'border-blue-200 dark:border-blue-800' },
  orange: { bg: 'bg-orange-50 dark:bg-orange-950', text: 'text-orange-700 dark:text-orange-300', border: 'border-orange-200 dark:border-orange-800' },
  purple: { bg: 'bg-purple-50 dark:bg-purple-950', text: 'text-purple-700 dark:text-purple-300', border: 'border-purple-200 dark:border-purple-800' },
  green: { bg: 'bg-green-50 dark:bg-green-950', text: 'text-green-700 dark:text-green-300', border: 'border-green-200 dark:border-green-800' },
  red: { bg: 'bg-red-50 dark:bg-red-950', text: 'text-red-700 dark:text-red-300', border: 'border-red-200 dark:border-red-800' },
}

interface SelectedDrug extends Drug {
  dosage: string
}

export function DrugSearchCard() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDrugs, setSelectedDrugs] = useState<SelectedDrug[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [logs, setLogs] = useState<string[]>([
    '$ Drug Interaction Checker initialized',
    '$ Awaiting drug input...',
  ])

  const filteredDrugs = useMemo(() => {
    if (!searchQuery) return []
    return drugDatabase.filter(
      (drug) =>
        (drug.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          drug.class.toLowerCase().includes(searchQuery.toLowerCase())) &&
        !selectedDrugs.some((selected) => selected.id === drug.id)
    )
  }, [searchQuery, selectedDrugs])

  const handleDrugSelect = (drug: Drug) => {
    const newDrug: SelectedDrug = { ...drug, dosage: '1 tablet daily' }
    setSelectedDrugs([...selectedDrugs, newDrug])
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

  const removeDrug = (drugId: string) => {
    const removedDrug = selectedDrugs.find((d) => d.id === drugId)
    setSelectedDrugs(selectedDrugs.filter((d) => d.id !== drugId))
    if (removedDrug) {
      const newLog = `$ Node removed: ${removedDrug.name} · Graph updated`
      setLogs((prev) => [...prev.slice(-3), newLog])
    }
  }

  const handleAnalyze = () => {
    if (selectedDrugs.length < 2) {
      setLogs((prev) => [...prev, '$ Error: Select at least 2 drugs for analysis'])
      return
    }
    const analyzeLog = `$ Running DFS traversal · O(V+E) · ${selectedDrugs.length} nodes, ${selectedDrugs.length - 1} edges`
    const broLog = `$ Bron-Kerbosch clique check triggered · DAA Unit V · Processing...`
    setLogs((prev) => [...prev.slice(-2), analyzeLog, broLog])
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
                const colors = colorMap[drug.color]
                return (
                  <div
                    key={drug.id}
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium border ${colors.bg} ${colors.text} ${colors.border}`}
                  >
                    <span>{drug.name} · {drug.dosage}</span>
                    <button
                      onClick={() => removeDrug(drug.id)}
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
          className="w-full bg-teal-600 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600 text-white font-medium"
        >
          Analyze Interactions
        </Button>
      </CardContent>
    </Card>
  )
}
