'use client';

import { AlertCircle, Download, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useApp } from '@/context/AppContext';

interface Algorithm {
  name: string;
  unit: string;
  complexity: string;
  purpose: string;
}

const algorithms: Algorithm[] = [
  {
    name: 'DFS Traversal',
    unit: 'DAA Unit II',
    complexity: 'O(V+E)',
    purpose: 'Pairwise interaction detection',
  },
  {
    name: 'Bron-Kerbosch',
    unit: 'DAA Unit V',
    complexity: 'O(3^n/3)',
    purpose: 'Maximal clique detection',
  },
  {
    name: 'Inclusion-Exclusion',
    unit: 'DMS Unit I',
    complexity: 'O(2^n)',
    purpose: 'Risk score computation',
  },
  {
    name: 'Partial Order / Hasse',
    unit: 'DMS Unit III',
    complexity: 'O(V²)',
    purpose: 'Substitution ranking',
  },
  {
    name: 'DFS Cycle Detection',
    unit: 'DAA Unit II',
    complexity: 'O(V+E)',
    purpose: 'Feedback loop detection',
  },
];

const getSeverityColor = (severity: 'major' | 'moderate' | 'minor' | string) => {
  switch (severity) {
    case 'major':
    case 'MAJOR':
      return 'bg-red-50 border-red-200';
    case 'moderate':
    case 'MODERATE':
      return 'bg-yellow-50 border-yellow-200';
    case 'minor':
    case 'MINOR':
      return 'bg-green-50 border-green-200';
    default:
      return 'bg-gray-50 border-gray-200';
  }
};

const getSeverityBadgeColor = (severity: 'major' | 'moderate' | 'minor' | string) => {
  switch (severity) {
    case 'major':
    case 'MAJOR':
      return 'bg-red-100 text-red-800';
    case 'moderate':
    case 'MODERATE':
      return 'bg-yellow-100 text-yellow-800';
    case 'minor':
    case 'MINOR':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export function ClinicalReport() {
  const { interactionResults, riskScore, detectedCliques, selectedDrugs } = useApp();

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  // Get today's date
  const reportDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Get risk level
  const getRiskLevel = () => {
    if (riskScore <= 30) return 'LOW RISK';
    if (riskScore <= 60) return 'MODERATE RISK';
    return 'HIGH RISK';
  };

  return (
    <div className="w-full">
      {/* Print Styles */}
      <style>{`
        @media print {
          nav,
          button,
          .no-print {
            display: none !important;
          }
          body {
            background: white !important;
            color: black !important;
            margin: 0;
            padding: 0;
          }
          .print-container {
            max-width: 100%;
            margin: 0;
            padding: 40px;
          }
          .print-section {
            break-inside: avoid;
          }
          table {
            border: 1px solid #ccc !important;
          }
          table th,
          table td {
            border: 1px solid #ccc !important;
          }
        }
      `}</style>

      {/* Header with Action Buttons */}
      <nav className="sticky top-0 z-10 bg-white dark:bg-slate-950 border-b border-gray-200 dark:border-gray-700 no-print">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Clinical Drug Interaction Report</h1>
          <div className="flex gap-2 sm:gap-3 w-full sm:w-auto no-print">
            <Button
              variant="outline"
              onClick={handleDownloadPDF}
              className="gap-2 flex-1 sm:flex-none no-print"
              aria-label="Download report as PDF"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download PDF</span>
              <span className="sm:hidden">PDF</span>
            </Button>
            <Button
              onClick={handlePrint}
              className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground flex-1 sm:flex-none no-print"
              aria-label="Print report"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print Report</span>
              <span className="sm:hidden">Print</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Report Content */}
      <main className="print-container max-w-5xl mx-auto">
        {/* Section 1: Header */}
        <article className="mb-6 sm:mb-8 print:mb-6 print-section">
          <div className="bg-gradient-to-r from-teal-700 to-teal-800 text-white rounded-lg p-4 sm:p-6 lg:p-8 print:p-6 flex flex-col lg:flex-row justify-between items-start gap-4 sm:gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div>
                  <h2 className="text-3xl font-bold">Patient Report</h2>
                  <p className="text-teal-100 mt-1">{selectedDrugs.length} medications analyzed</p>
                </div>
              </div>
              <div className="space-y-1 text-sm">
                <p>
                  <span className="font-semibold">Selected Drugs:</span> {selectedDrugs.map((d) => d.name).join(', ') || 'None'}
                </p>
                <p>
                  <span className="font-semibold">Report Date:</span> {reportDate}
                </p>
                <p>
                  <span className="font-semibold">Analysis Type:</span> Drug Interaction Report
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-white text-gray-600 rounded-lg px-4 py-3 inline-block">
                <p className="text-sm font-medium text-gray-700">Risk Score</p>
                <p className="text-4xl font-bold">{riskScore}%</p>
                <p className={`text-xs font-semibold mt-1 ${riskScore <= 30 ? 'text-green-600' : riskScore <= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {getRiskLevel()}
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* Section 2: Interaction Table */}
        <section className="mb-6 sm:mb-8 print:mb-6 print-section">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 print:mb-3">
            Detected Drug Interactions ({interactionResults.length})
          </h2>
          {interactionResults.length === 0 ? (
            <Card className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 p-4 text-center">
              <p className="text-green-800 dark:text-green-200 font-semibold">No interactions detected</p>
            </Card>
          ) : (
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100 border-b border-gray-200">
                      <th className="px-6 py-3 text-left font-semibold text-gray-900">Drug A</th>
                      <th className="px-6 py-3 text-center font-semibold text-gray-900">Interaction</th>
                      <th className="px-6 py-3 text-left font-semibold text-gray-900">Drug B</th>
                      <th className="px-6 py-3 text-center font-semibold text-gray-900">Severity</th>
                      <th className="px-6 py-3 text-left font-semibold text-gray-900">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {interactionResults.map((interaction, idx) => (
                      <tr
                        key={idx}
                        className={`border-b border-gray-200 print-section ${getSeverityColor(interaction.severity)}`}
                      >
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {interaction.drugA}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-gray-500">↔</span>
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {interaction.drugB}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Badge className={getSeverityBadgeColor(interaction.severity)}>
                            {interaction.severity.toUpperCase()}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          Clinical interaction detected. Review before prescribing.
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

        {/* Section 3: Dangerous Combinations */}
        <section className="mb-6 sm:mb-8 print:mb-6 print-section">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 print:mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            Dangerous Combinations ({detectedCliques.length})
          </h2>
          {detectedCliques.length === 0 ? (
            <Card className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 p-4 text-center">
              <p className="text-green-800 dark:text-green-200 font-semibold">No dangerous combinations detected</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {detectedCliques.map((clique, idx) => (
                <Card key={idx} className="border-2 border-red-500 bg-red-50 p-6 print:p-4 print-section">
                  <div className="space-y-3">
                    <p className="text-lg font-semibold text-gray-900">
                      {clique.drugs.join(' + ')}
                    </p>
                    <p className="text-gray-700">
                      {clique.drugs.length}-way drug interaction detected. All {clique.drugs.length} drugs mutually interact. This combination requires immediate clinical review and intervention.
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <Badge className="bg-red-600 text-white">{clique.severity.toUpperCase()}</Badge>
                      <Badge className="bg-teal-600 text-white">Bron-Kerbosch Backtracking</Badge>
                      <Badge className="bg-purple-600 text-white">DAA Unit V · NP-Complete</Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Section 4: Substitution Suggestions */}
        <section className="mb-6 sm:mb-8 print:mb-6 print-section">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 print:mb-3">Substitution Suggestions</h2>
          <div className="space-y-3">
            <Card className="border border-gray-200 p-5 print:p-4 print-section">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">
                    Ibuprofen <span className="text-gray-500 font-normal">→</span> Paracetamol
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Safer alternative with fewer interaction risks. Equally effective for pain relief in most cases.
                  </p>
                </div>
                <Badge className="ml-4 bg-green-100 text-green-800 whitespace-nowrap">
                  Safer
                </Badge>
              </div>
            </Card>
            <Card className="border border-gray-200 p-5 print:p-4 print:break-inside-avoid">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">
                    Aspirin <span className="text-gray-500 font-normal">→</span> Lower dose if unavoidable
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Reduce dosage and increase monitoring intervals. Consider alternative anticoagulation approach with specialist consultation.
                  </p>
                </div>
                <Badge className="ml-4 bg-yellow-100 text-yellow-800 whitespace-nowrap">
                  Caution
                </Badge>
              </div>
            </Card>
            <div className="flex gap-2 text-xs text-gray-600 mt-3">
              <Badge variant="outline" className="text-teal-700 border-teal-300 bg-teal-50">
                Partial Order Traversal
              </Badge>
              <Badge variant="outline" className="text-purple-700 border-purple-300 bg-purple-50">
                DMS Unit III
              </Badge>
            </div>
          </div>
        </section>

        {/* Section 5: Algorithms Used */}
        <section className="mb-6 sm:mb-8 print:mb-6 print-section">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 print:mb-3">Algorithms & Computational Methods</h2>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200">
                    <th className="px-6 py-3 text-left font-semibold text-gray-900">Algorithm</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-900">Course Unit</th>
                    <th className="px-6 py-3 text-center font-semibold text-gray-900">Time Complexity</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-900">Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  {algorithms.map((algo, idx) => (
                    <tr key={idx} className="border-b border-gray-200 print-section hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{algo.name}</td>
                      <td className="px-6 py-4 text-gray-700">
                        <Badge variant="outline" className="text-teal-700 border-teal-300 bg-teal-50">
                          {algo.unit}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-center font-mono text-gray-700">
                        {algo.complexity}
                      </td>
                      <td className="px-6 py-4 text-gray-700">{algo.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-700 pt-4 sm:pt-6 print:pt-4 mt-6 sm:mt-8 print:mt-6">
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 sm:p-6 print:p-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <p>
              <span className="font-semibold">Disclaimer:</span> This report is generated for clinical reference only. 
              All medication changes must be approved by the treating physician. Patient should not modify medication regimen 
              based on this report without direct consultation with their healthcare provider.
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-3 sm:mt-4">
              Report Generated: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
