'use client';

import React, { useState, useEffect } from 'react';
import { AlertCircle, ArrowRight } from 'lucide-react';

interface Interaction {
  drugA: string;
  drugB: string;
  severity: 'MAJOR' | 'MODERATE' | 'MINOR';
  description: string;
}

interface DangerousCombination {
  drugs: string[];
  description: string;
}

export function InteractionResultsPanel() {
  const [animateGauge, setAnimateGauge] = useState(false);
  const riskScore = 74;
  const riskLevel = 'HIGH RISK';

  const interactions: Interaction[] = [
    {
      drugA: 'Warfarin',
      drugB: 'Aspirin',
      severity: 'MAJOR',
      description: 'Increased bleeding risk due to anticoagulant and antiplatelet effects',
    },
    {
      drugA: 'Metformin',
      drugB: 'Lisinopril',
      severity: 'MINOR',
      description: 'Monitor renal function; dosage adjustment may be needed',
    },
    {
      drugA: 'Warfarin',
      drugB: 'Ibuprofen',
      severity: 'MAJOR',
      description: 'Severe GI bleeding risk and prolonged anticoagulation effects',
    },
    {
      drugA: 'Aspirin',
      drugB: 'Ibuprofen',
      severity: 'MODERATE',
      description: 'Duplicate antiplatelet activity; gastrointestinal ulceration risk',
    },
  ];

  const dangerousCombination: DangerousCombination = {
    drugs: ['Warfarin', 'Aspirin', 'Ibuprofen'],
    description: 'All three mutually interact with severe bleeding complications',
  };

  useEffect(() => {
    setAnimateGauge(true);
  }, []);

  const getRiskColor = (score: number) => {
    if (score <= 30) return '#22c55e'; // green
    if (score <= 60) return '#eab308'; // yellow
    return '#ef4444'; // red
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'MAJOR':
        return { bg: 'bg-red-50 dark:bg-red-950', text: 'text-red-700 dark:text-red-300', badge: 'bg-red-200 dark:bg-red-900 text-red-800 dark:text-red-100' };
      case 'MODERATE':
        return { bg: 'bg-yellow-50 dark:bg-yellow-950', text: 'text-yellow-700 dark:text-yellow-300', badge: 'bg-yellow-200 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100' };
      case 'MINOR':
        return { bg: 'bg-green-50 dark:bg-green-950', text: 'text-green-700 dark:text-green-300', badge: 'bg-green-200 dark:bg-green-900 text-green-800 dark:text-green-100' };
      default:
        return { bg: 'bg-gray-50', text: 'text-gray-700', badge: 'bg-gray-200 text-gray-800' };
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0f3638] to-[#1a4d50] px-6 py-4 mb-6 rounded-t-lg">
        <h2 className="text-2xl font-bold text-white">Drug Interaction Analysis Results</h2>
        <p className="text-teal-100 text-sm mt-1">Comprehensive interaction report using graph algorithms</p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6 py-6 bg-white dark:bg-slate-950">
        
        {/* LEFT: Risk Score Gauge */}
        <div className="flex flex-col items-center justify-center py-8">
          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* SVG Arc Gauge */}
            <svg width="260" height="260" viewBox="0 0 260 260" className="transform -rotate-90">
              {/* Background arc */}
              <circle
                cx="130"
                cy="130"
                r="115"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="20"
              />
              {/* Colored zones background */}
              <circle
                cx="130"
                cy="130"
                r="115"
                fill="none"
                stroke="url(#zoneGradient)"
                strokeWidth="20"
                strokeDasharray={`${(riskScore / 100) * 722.6} 722.6`}
                className={animateGauge ? 'transition-all duration-1000 ease-out' : ''}
              />
              <defs>
                <linearGradient id="zoneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="50%" stopColor="#eab308" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>
            </svg>

            {/* Center Content */}
            <div className="absolute flex flex-col items-center justify-center">
              <div className="text-5xl font-bold text-[#0f3638]">{riskScore}%</div>
              <div className="text-xs text-gray-500 mt-2">Risk Score</div>
            </div>
          </div>

          {/* Risk Label */}
          <div className="mt-6 text-center">
            <div className="text-lg font-bold text-red-600 dark:text-red-400">
              {riskLevel} — Immediate Review Required
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-3">
              Computed using Inclusion-Exclusion Principle · DMS Unit I
            </div>
          </div>
        </div>

        {/* RIGHT: Interaction List */}
        <div className="flex flex-col space-y-4">
          <div className="flex-1 space-y-3 max-h-96 overflow-y-auto pr-2">
            {interactions.map((interaction, idx) => {
              const colors = getSeverityColor(interaction.severity);
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border border-gray-200 dark:border-gray-700 transition-all ${colors.bg}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 flex-1">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {interaction.drugA}
                      </span>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {interaction.drugB}
                      </span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors.badge}`}>
                      {interaction.severity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {interaction.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Dangerous Combination Card */}
          <div className="border-2 border-red-500 dark:border-red-600 bg-red-50 dark:bg-red-950/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-bold text-red-900 dark:text-red-200 mb-2">
                  Dangerous Combination Detected
                </h3>
                <p className="text-sm text-red-800 dark:text-red-300 mb-2">
                  {dangerousCombination.drugs.join(' + ')} — {dangerousCombination.description}
                </p>
                <div className="inline-block bg-red-200 dark:bg-red-900 text-red-800 dark:text-red-100 px-2 py-1 rounded text-xs font-semibold">
                  Bron-Kerbosch Backtracking · DAA Unit V — NP-Complete
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
