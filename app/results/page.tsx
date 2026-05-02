'use client';

import { Download, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InteractionResultsPanel } from '@/components/interaction-results-panel';

export default function ResultsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-6 sm:py-8 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-balance">
            Interaction Analysis Complete
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm sm:text-base">
            Review the comprehensive interaction report and risk assessment below
          </p>
        </div>

        <div className="bg-white dark:bg-slate-950 rounded-lg shadow-lg overflow-hidden">
          <InteractionResultsPanel />
        </div>

        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Button 
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2"
            aria-label="Download interaction report as PDF"
          >
            <Download className="w-4 h-4" />
            Download Report
          </Button>
          <Button 
            variant="outline"
            className="border-border text-foreground hover:bg-muted font-semibold gap-2"
            aria-label="Start a new drug interaction analysis"
          >
            <Plus className="w-4 h-4" />
            New Analysis
          </Button>
        </div>
      </div>
    </main>
  );
}
