'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Download, Plus, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { useApp } from '@/context/AppContext';
import { HasseDiagram } from '@/components/HasseDiagram';

export default function ResultsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { interactionResults, riskScore, detectedCliques, selectedDrugs, addDrug, removeDrug, availableDrugs, analyzeInteractions } = useApp();
  const [animatedScore, setAnimatedScore] = useState(0);

  // Animate risk score gauge on mount
  useEffect(() => {
    if (riskScore > 0) {
      let current = 0;
      const increment = riskScore / 30;
      const timer = setInterval(() => {
        current += increment;
        if (current >= riskScore) {
          setAnimatedScore(riskScore);
          clearInterval(timer);
        } else {
          setAnimatedScore(Math.floor(current));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [riskScore]);

  const getRiskLevel = (score: number) => {
    if (score <= 30) return { level: 'LOW RISK', color: 'text-green-600 dark:text-green-400' };
    if (score <= 60) return { level: 'MODERATE RISK', color: 'text-yellow-600 dark:text-yellow-400' };
    return { level: 'HIGH RISK — Immediate Review Required', color: 'text-red-600 dark:text-red-400' };
  };

  const getRiskColor = (score: number) => {
    if (score <= 30) return '#22c55e';
    if (score <= 60) return '#eab308';
    return '#ef4444';
  };

  // Sort interactions by severity
  const sortedInteractions = [...interactionResults].sort((a, b) => {
    const severityOrder = { major: 0, moderate: 1, minor: 2 };
    return severityOrder[a.severity] - severityOrder[b.severity];
  });

  const handleSubstitution = (replaceDrug: string, withDrug: string) => {
    // Find the drug to remove
    const drugToRemove = selectedDrugs.find((d) => d.name === replaceDrug);
    if (drugToRemove) {
      removeDrug(drugToRemove.id);
    }

    // Add the new drug
    const newDrug = availableDrugs.find((d) => d.name === withDrug);
    if (newDrug) {
      addDrug(newDrug);
      analyzeInteractions();
      toast({
        title: 'Drug Substituted',
        description: `${replaceDrug} replaced with ${withDrug}. Analysis updated.`,
      });
    }
  };

  const riskInfo = getRiskLevel(riskScore);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-6 sm:py-8 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-balance">
            Interaction Analysis Results
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm sm:text-base">
            Comprehensive analysis of selected medications and detected interactions
          </p>
        </div>

        {/* No analysis yet state */}
        {interactionResults.length === 0 && selectedDrugs.length === 0 && (
          <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 p-8 text-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Analysis Performed Yet</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Select drugs and click "Analyze Interactions" to see results</p>
            <Button onClick={() => router.push('/checker')} className="bg-primary hover:bg-primary/90">
              Go to Analyzer
            </Button>
          </Card>
        )}

        {/* Tabs with analysis results */}
        {interactionResults.length > 0 && (
          <div className="bg-white dark:bg-slate-950 rounded-lg shadow-lg overflow-hidden">
            <Tabs defaultValue="interactions" className="w-full">
              <TabsList className="w-full rounded-none border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-900">
                <TabsTrigger value="interactions" className="flex-1">
                  Interactions ({interactionResults.length})
                </TabsTrigger>
                <TabsTrigger value="risk" className="flex-1">
                  Risk Score
                </TabsTrigger>
                <TabsTrigger value="cliques" className="flex-1">
                  Cliques ({detectedCliques.length})
                </TabsTrigger>
                <TabsTrigger value="substitutions" className="flex-1">
                  Substitutions
                </TabsTrigger>
              </TabsList>

              {/* Tab 1: Interactions */}
              <TabsContent value="interactions" className="p-6 space-y-4">
                {sortedInteractions.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600 dark:text-gray-400">No interactions detected</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {sortedInteractions.map((interaction, idx) => {
                      const severityColor =
                        interaction.severity === 'major'
                          ? 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800'
                          : interaction.severity === 'moderate'
                            ? 'bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800'
                            : 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800';

                      const badgeVariant =
                        interaction.severity === 'major'
                          ? 'bg-red-200 dark:bg-red-900 text-red-800 dark:text-red-100'
                          : interaction.severity === 'moderate'
                            ? 'bg-yellow-200 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100'
                            : 'bg-green-200 dark:bg-green-900 text-green-800 dark:text-green-100';

                      return (
                        <Card key={idx} className={`border p-4 ${severityColor}`}>
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <p className="font-semibold text-gray-900 dark:text-white">
                                {interaction.drugA} <ArrowRight className="inline w-4 h-4 mx-2" /> {interaction.drugB}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{interaction.description}</p>
                            </div>
                            <Badge className={badgeVariant}>{interaction.severity.toUpperCase()}</Badge>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </TabsContent>

              {/* Tab 2: Risk Score */}
              <TabsContent value="risk" className="p-6">
                <div className="flex flex-col items-center justify-center py-8 space-y-6">
                  {/* Animated SVG Gauge */}
                  <div className="relative w-48 h-48 flex items-center justify-center">
                    <svg width="200" height="200" viewBox="0 0 200 200">
                      <circle cx="100" cy="100" r="85" fill="none" stroke="#e5e7eb" strokeWidth="20" />
                      <circle
                        cx="100"
                        cy="100"
                        r="85"
                        fill="none"
                        stroke={getRiskColor(animatedScore)}
                        strokeWidth="20"
                        strokeDasharray={`${(animatedScore / 100) * 534} 534`}
                        transform="rotate(-90 100 100)"
                        style={{ transition: 'stroke-dasharray 0.1s linear' }}
                      />
                      <text
                        x="100"
                        y="100"
                        textAnchor="middle"
                        dy="0.3em"
                        className="text-4xl font-bold fill-gray-900 dark:fill-white"
                      >
                        {animatedScore}%
                      </text>
                    </svg>
                  </div>

                  <div className="text-center space-y-2">
                    <p className={`text-xl font-bold ${riskInfo.color}`}>{riskInfo.level}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Computed using Inclusion-Exclusion Principle · DMS Unit I
                    </p>
                  </div>
                </div>
              </TabsContent>

              {/* Tab 3: Cliques */}
              <TabsContent value="cliques" className="p-6 space-y-4">
                {detectedCliques.length === 0 ? (
                  <Card className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 p-4 text-center">
                    <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                    <p className="text-green-800 dark:text-green-200 font-semibold">No dangerous combinations detected</p>
                  </Card>
                ) : (
                  <div className="space-y-3">
                    {detectedCliques.map((clique, idx) => (
                      <Card key={idx} className="border-2 border-red-500 dark:border-red-600 bg-red-50 dark:bg-red-950/30 p-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-red-900 dark:text-red-200">
                              {clique.drugs.length}-Drug Interaction
                            </h3>
                            <Badge className="bg-red-200 dark:bg-red-900 text-red-800 dark:text-red-100">
                              {clique.severity.toUpperCase()}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {clique.drugs.map((drug) => (
                              <Badge key={drug} variant="outline" className="border-red-300 dark:border-red-700">
                                {drug}
                              </Badge>
                            ))}
                          </div>
                          <p className="text-xs text-red-700 dark:text-red-300 font-mono">
                            Bron-Kerbosch Backtracking · DAA Unit V — NP-Complete
                          </p>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Tab 4: Substitutions */}
              <TabsContent value="substitutions" className="p-6 space-y-6">
                <div className="space-y-4">
                  {selectedDrugs.some((d) => d.name === 'Ibuprofen') && (
                    <Card className="border-2 border-amber-300 dark:border-amber-600 bg-amber-50 dark:bg-amber-950/30 p-4">
                      <div className="space-y-3">
                        <HasseDiagram />
                        <p className="text-xs text-amber-700 dark:text-amber-300 font-mono">
                          Partial Order · Hasse Diagram · DMS Unit III
                        </p>
                        <Button
                          onClick={() => handleSubstitution('Ibuprofen', 'Paracetamol')}
                          className="w-full bg-green-600 hover:bg-green-700"
                        >
                          Replace Ibuprofen → Paracetamol
                        </Button>
                      </div>
                    </Card>
                  )}

                  {selectedDrugs.every((d) => d.name !== 'Ibuprofen') && (
                    <Card className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/30 p-4 text-center">
                      <p className="text-gray-600 dark:text-gray-400">No substitution recommendations available</p>
                    </Card>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2" aria-label="Download interaction report as PDF">
            <Download className="w-4 h-4" />
            Download Report
          </Button>
          <Button
            onClick={() => router.push('/checker')}
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
