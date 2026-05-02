'use client';

import { AlertCircle, Download, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface Interaction {
  drugA: string;
  drugB: string;
  severity: 'MAJOR' | 'MODERATE' | 'MINOR';
  recommendation: string;
}

interface Algorithm {
  name: string;
  unit: string;
  complexity: string;
  purpose: string;
}

const interactions: Interaction[] = [
  {
    drugA: 'Warfarin',
    drugB: 'Aspirin',
    severity: 'MAJOR',
    recommendation: 'Avoid concurrent use. Monitor INR closely if unavoidable.',
  },
  {
    drugA: 'Warfarin',
    drugB: 'Ibuprofen',
    severity: 'MAJOR',
    recommendation: 'Contraindicated. Use alternative analgesic.',
  },
  {
    drugA: 'Aspirin',
    drugB: 'Ibuprofen',
    severity: 'MODERATE',
    recommendation: 'Avoid combined use. May increase GI bleeding risk.',
  },
  {
    drugA: 'Lisinopril',
    drugB: 'Potassium Chloride',
    severity: 'MODERATE',
    recommendation: 'Monitor serum potassium levels regularly.',
  },
  {
    drugA: 'Warfarin',
    drugB: 'Lisinopril',
    severity: 'MINOR',
    recommendation: 'Minor interaction. Regular monitoring recommended.',
  },
];

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

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'MAJOR':
      return 'bg-red-50 border-red-200';
    case 'MODERATE':
      return 'bg-yellow-50 border-yellow-200';
    case 'MINOR':
      return 'bg-green-50 border-green-200';
    default:
      return 'bg-gray-50 border-gray-200';
  }
};

const getSeverityBadgeColor = (severity: string) => {
  switch (severity) {
    case 'MAJOR':
      return 'bg-red-100 text-red-800';
    case 'MODERATE':
      return 'bg-yellow-100 text-yellow-800';
    case 'MINOR':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export function ClinicalReport() {
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    alert('PDF download functionality would be implemented with a PDF library like jsPDF or pdfkit');
  };

  return (
    <div className="w-full">
      {/* Print Styles */}
      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            background: white;
            margin: 0;
            padding: 0;
          }
          .print-container {
            max-width: 100%;
            margin: 0;
            padding: 40px;
          }
        }
      `}</style>

      {/* Header with Action Buttons */}
      <nav className="sticky top-0 z-10 bg-white dark:bg-slate-950 border-b border-gray-200 dark:border-gray-700 no-print">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Clinical Drug Interaction Report</h1>
          <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={handleDownloadPDF}
              className="gap-2 flex-1 sm:flex-none"
              aria-label="Download report as PDF"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download PDF</span>
              <span className="sm:hidden">PDF</span>
            </Button>
            <Button
              onClick={handlePrint}
              className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground flex-1 sm:flex-none"
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
        <article className="mb-6 sm:mb-8 print:mb-6">
          <div className="bg-gradient-to-r from-teal-700 to-teal-800 text-white rounded-lg p-4 sm:p-6 lg:p-8 print:p-6 flex flex-col lg:flex-row justify-between items-start gap-4 sm:gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div>
                  <h2 className="text-3xl font-bold">John Anderson</h2>
                  <p className="text-teal-100 mt-1">52 years old | Blood Group: O+</p>
                </div>
              </div>
              <div className="space-y-1 text-sm">
                <p>
                  <span className="font-semibold">Attending Doctor:</span> Dr. Sarah Mitchell, MD
                </p>
                <p>
                  <span className="font-semibold">Report Date:</span> May 2, 2026
                </p>
                <p>
                  <span className="font-semibold">Hospital:</span> Clinical Care Hospital
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-white text-red-600 rounded-lg px-4 py-3 inline-block">
                <p className="text-sm font-medium text-gray-700">Risk Score</p>
                <p className="text-4xl font-bold">74%</p>
                <p className="text-xs font-semibold text-red-600 mt-1">HIGH RISK</p>
              </div>
            </div>
          </div>
        </article>

        {/* Section 2: Interaction Table */}
        <section className="mb-6 sm:mb-8 print:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 print:mb-3">Detected Drug Interactions</h2>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200">
                    <th className="px-6 py-3 text-left font-semibold text-gray-900">Drug A</th>
                    <th className="px-6 py-3 text-center font-semibold text-gray-900">Interaction</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-900">Drug B</th>
                    <th className="px-6 py-3 text-center font-semibold text-gray-900">Severity</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-900">Clinical Recommendation</th>
                  </tr>
                </thead>
                <tbody>
                  {interactions.map((interaction, idx) => (
                    <tr
                      key={idx}
                      className={`border-b border-gray-200 print:break-inside-avoid ${getSeverityColor(interaction.severity)}`}
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
                          {interaction.severity}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {interaction.recommendation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 3: Dangerous Combinations */}
        <section className="mb-6 sm:mb-8 print:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 print:mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            Dangerous Combination Detected
          </h2>
          <Card className="border-2 border-red-500 bg-red-50 p-6 print:p-4">
            <div className="space-y-3">
              <p className="text-lg font-semibold text-gray-900">
                Warfarin + Aspirin + Ibuprofen
              </p>
              <p className="text-gray-700">
                All three drugs mutually interact. Warfarin significantly increases bleeding risk when combined with both Aspirin and Ibuprofen. Additionally, Aspirin and Ibuprofen together increase gastrointestinal bleeding risk. This three-way interaction requires immediate intervention.
              </p>
              <div className="flex gap-2 flex-wrap">
                <Badge className="bg-red-600 text-white">Critical</Badge>
                <Badge className="bg-teal-600 text-white">Bron-Kerbosch Backtracking</Badge>
                <Badge className="bg-purple-600 text-white">DAA Unit V · NP-Complete</Badge>
              </div>
            </div>
          </Card>
        </section>

        {/* Section 4: Substitution Suggestions */}
        <section className="mb-6 sm:mb-8 print:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 print:mb-3">Substitution Suggestions</h2>
          <div className="space-y-3">
            <Card className="border border-gray-200 p-5 print:p-4 print:break-inside-avoid">
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
        <section className="mb-6 sm:mb-8 print:mb-6">
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
                    <tr key={idx} className="border-b border-gray-200 print:break-inside-avoid hover:bg-gray-50">
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
