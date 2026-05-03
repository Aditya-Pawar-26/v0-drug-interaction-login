'use client';

import { useRouter } from 'next/navigation';
import { ClinicalReport } from '@/components/clinical-report';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ReportPage() {
  const router = useRouter();
  const { interactionResults, riskScore, detectedCliques } = useApp();

  // Check if there's analysis data
  const hasAnalysisData = interactionResults.length > 0;

  return (
    <div className="min-h-screen bg-white">
      {!hasAnalysisData && (
        <div className="fixed inset-0 bg-blue-50 dark:bg-blue-950/30 z-50 flex items-center justify-center p-4">
          <Card className="bg-white dark:bg-slate-950 border-blue-200 dark:border-blue-800 p-8 max-w-md text-center shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Analysis Data</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Run an interaction analysis first to generate a report.
            </p>
            <Button onClick={() => router.push('/checker')} className="bg-primary hover:bg-primary/90">
              Go to Analyzer
            </Button>
          </Card>
        </div>
      )}

      {hasAnalysisData && <ClinicalReport />}
    </div>
  );
}
